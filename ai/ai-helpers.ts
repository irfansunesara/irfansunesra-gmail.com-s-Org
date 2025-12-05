import { format, subMonths, startOfDay } from 'date-fns';
import type { AppState, AIProfile, LogData } from '../types';

export function summarizeUserDataForAI(appState: AppState): string {
    const { logData, sleepLog, hydrationLog, cycleData } = appState;
    if (!cycleData) return "No cycle data available.";

    const threeMonthsAgo = subMonths(new Date(), 3);
    
    const relevantLogs = Object.entries(logData)
        .filter(([dateStr]) => new Date(dateStr) >= threeMonthsAgo)
        .map(([date, log]) => {
            const sleep = sleepLog[date];
            const hydration = hydrationLog[date];
            return {
                date,
                ...log,
                sleep: sleep ? `${sleep.totalHours}h, ${sleep.quality} quality` : 'Not logged',
                hydration: hydration ? `${hydration.amount}ml` : 'Not logged'
            };
        });

    if (relevantLogs.length < 10) {
        return "Insufficient data. User has logged less than 10 days in the last 3 months.";
    }

    const summary = {
        userProvidedCycleLength: cycleData.cycleLength,
        userProvidedPeriodLength: cycleData.periodLength,
        userProvidedRegularity: cycleData.regularity,
        recentLogs: relevantLogs.slice(-90) // Limit to last 90 logs
    };

    return JSON.stringify(summary, null, 2);
}

export function parseAIProfileResponse(jsonString: string): AIProfile | null {
    try {
        const parsed = JSON.parse(jsonString);

        // Basic validation
        if (parsed.cycleAnalysis && parsed.symptomPatterns) {
            return {
                ...parsed,
                lastUpdated: new Date().toISOString()
            };
        }
        return null;
    } catch (error) {
        console.error("Failed to parse AI profile response:", error, "Raw string:", jsonString);
        return null;
    }
}
