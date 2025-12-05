

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
// FIX: Import date-fns functions for date calculations and formatting.
import { format, startOfDay, differenceInDays, addDays, isSameDay } from "date-fns";
// FIX: Import AppState and CyclePhaseInfo types.
import { AppState, CyclePhaseInfo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function runWeeklyAnalysis(userDataSummary: string): Promise<string> {
    const model = 'gemini-3-pro-preview';

    const prompt = `
        You are a women's health and wellness assistant for a cycle tracking app called Luna.
        Analyze the following user data summary, which covers the last 3-6 months.
        Your task is to identify key patterns and create an internal "AI Profile" for the user.
        
        The user data summary is:
        \`\`\`
        ${userDataSummary}
        \`\`\`

        Based on the data, generate a JSON object with the following structure. Do NOT include any markdown formatting (like \`\`\`json).
        
        {
          "cycleAnalysis": {
            "avgCycleLength": <number>,
            "avgPeriodLength": <number>,
            "pmsWindowDays": <number>,
            "ovulationDay": <number>,
            "irregularitySigns": "<string: e.g., 'Cycle length varies by 5-7 days', 'Luteal phase is consistently short', or 'None'>",
            "cycleLengthVariance": <number>
          },
          "symptomPatterns": [
            {
              "symptom": "<string>",
              "phase": "<Menstrual|Follicular|Ovulation|Luteal>",
              "correlation": "<string: e.g., 'Often occurs after poor sleep', 'Correlates with high stress logs', or 'Most common during Luteal phase'>"
            }
          ],
          "lifestyleInsights": [
            "<string: a short, actionable insight, e.g., 'Hydration seems to be lower during the Luteal phase, which may correlate with headaches.'>",
            "<string: another insight>"
          ]
        }

        RULES:
        - Be gentle, supportive, and use non-medical language.
        - Calculate averages and typical windows.
        - Analyze the "isPeriodDay" logs to determine the start of each cycle and calculate the length between them.
        - Calculate a "cycleLengthVariance". This is a critical calculation for personalizing predictions, especially for irregular cycles. It must be a single integer representing the +/- days for a prediction window.
          - Analyze the user's actual cycle length history from the logs.
          - Heavily weigh the user's self-reported \`userProvidedRegularity\`. If it's 'Irregular', you MUST calculate a higher variance (e.g., 3 to 5) based on the standard deviation or range of their actual cycle lengths.
          - If \`userProvidedRegularity\` is 'Regular' and the data confirms this with low variation, the variance should be low (e.g., 1 or 2).
          - The goal is to create a realistic, personalized prediction window: (avgCycleLength - variance) to (avgCycleLength + variance).
        - Find at least 2-3 significant symptom patterns.
        - Provide 2 lifestyle insights connecting data points (e.g., sleep and mood, hydration and symptoms).
        - If data is insufficient, provide reasonable defaults (e.g., avgCycleLength: 28, cycleLengthVariance: 3).
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for weekly analysis:", error);
        throw new Error("Failed to generate AI profile.");
    }
}

export async function generateDailyInsight(appState: AppState): Promise<string | null> {
    const model = 'gemini-2.5-flash';

    // FIX: Calculate currentPhase since it's not stored in AppState.
    let currentPhase: CyclePhaseInfo['phase'] | 'N/A' = 'N/A';
    if (appState.cycleData) {
        const { cycleData, aiProfile } = appState;
        const today = startOfDay(new Date());

        const aiCycleLength = aiProfile?.cycleAnalysis?.avgCycleLength;
        const effectiveCycleLength = aiCycleLength && aiCycleLength > 15 ? aiCycleLength : cycleData.cycleLength;

        const cycleStartDate = startOfDay(new Date(cycleData.lastPeriodStart));
        const periodLength = cycleData.periodLength;

        let cyclesSinceStart = Math.floor(differenceInDays(today, cycleStartDate) / effectiveCycleLength);
        if (differenceInDays(today, cycleStartDate) < 0) {
           cyclesSinceStart = -1;
        }

        let currentCycleStartDate = addDays(cycleStartDate, cyclesSinceStart * effectiveCycleLength);
        if (isSameDay(today, currentCycleStartDate) || today < currentCycleStartDate) {
            currentCycleStartDate = addDays(cycleStartDate, (cyclesSinceStart -1) * effectiveCycleLength);
            if(differenceInDays(today, currentCycleStartDate) > effectiveCycleLength) {
                 currentCycleStartDate = addDays(currentCycleStartDate, effectiveCycleLength);
            }
        }
        
        let currentCycleDay = differenceInDays(today, currentCycleStartDate) + 1;
        
        if(currentCycleDay > effectiveCycleLength) {
          currentCycleStartDate = addDays(currentCycleStartDate, effectiveCycleLength);
          currentCycleDay = differenceInDays(today, currentCycleStartDate) + 1;
        }
        
        const aiOvulationDay = aiProfile?.cycleAnalysis.ovulationDay;
        const ovulationDayOffset = aiOvulationDay && aiOvulationDay > 5 ? aiOvulationDay : Math.round(effectiveCycleLength - 14);

        const getPhase = (day: number): CyclePhaseInfo['phase'] => {
            if (day <= periodLength) return 'Menstrual';
            if (day < ovulationDayOffset) return 'Follicular';
            if (day >= ovulationDayOffset && day <= ovulationDayOffset + 1) return 'Ovulation';
            return 'Luteal';
        };

        currentPhase = getPhase(currentCycleDay);
    }

    const todayLog = appState.logData[format(new Date(), 'yyyy-MM-dd')] || {};
    const recentInsights = appState.aiInsights.slice(-3).map(i => i.text).join('\n');

    const prompt = `
        You are a women's health and wellness assistant for a cycle tracking app called Luna.
        Your task is to generate ONE short, gentle, and supportive insight for the user for today.

        Current User Status:
        - Cycle Phase: ${currentPhase || 'N/A'}
        - Today's logged mood: ${todayLog.mood || 'Not logged'}
        - Today's logged symptoms: ${todayLog.symptoms?.join(', ') || 'None'}
        - Recent insights shown to user (avoid repeating these): ${recentInsights}

        Generate a single sentence (max 25 words) that is either:
        1. A wellness insight related to the current cycle phase.
        2. A pattern observation if a symptom is logged (e.g., "We've noticed headaches sometimes follow days with less hydration.").
        3. A gentle self-care suggestion based on mood or symptoms.

        Example outputs:
        - "During your Luteal phase, be extra kind to yourself as energy may naturally decrease."
        - "Remember to stay hydrated today; it can sometimes help with headaches."
        - "Since you're feeling tired, a short, gentle walk might be a nice way to boost your energy."

        RULES:
        - Be encouraging and non-medical.
        - DO NOT output any prefix like "Insight:" or quotes.
        - Keep it under 25 words.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for daily insight:", error);
        return null;
    }
}

// FIX: Add the missing 'generateRecipe' function to be used for recipe generation.
export async function generateRecipe(food: string, phase: string): Promise<string> {
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are a wellness-focused chef for the Luna cycle tracking app. 
        Generate a simple, healthy recipe that includes "${food}" and is suitable for the "${phase}" phase of the menstrual cycle.
        
        Return a JSON object with the following structure. Do NOT include any markdown formatting (like \`\`\`json).
        
        {
          "title": "<string: a creative and appealing recipe title>",
          "description": "<string: a short, one-sentence description of the recipe and its benefits for the phase>",
          "ingredients": [
            "<string: ingredient 1 with quantity>",
            "<string: ingredient 2 with quantity>"
          ],
          "instructions": [
            "<string: step 1>",
            "<string: step 2>"
          ],
          "prepTime": "<string: e.g., '15 minutes'>"
        }
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for recipe generation:", error);
        throw new Error("Failed to generate recipe.");
    }
}
