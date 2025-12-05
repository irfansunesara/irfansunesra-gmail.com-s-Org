import { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { useCycle } from './useCycle';
import { startOfDay } from 'date-fns';
// FIX: Import LogData to allow for explicit casting.
import type { Symptom, Mood, CyclePhaseInfo, SleepQuality, LogData } from '../types';

export const useSymptomCorrelation = () => {
    const context = useContext(AppContext);
    const { getDayInfo } = useCycle();

    const correlations = useMemo(() => {
        if (!context || !context.logData) {
            return { logCount: 0, topSymptoms: [], phaseCorrelations: {}, moodCorrelations: {}, sleepCorrelations: {} };
        }

        const { logData, sleepLog } = context;
        const logEntries = Object.entries(logData);
        // FIX: Cast log to LogData to correctly access its properties.
        const logCount = logEntries.filter(([, log]) => (log as LogData).symptoms && (log as LogData).symptoms.length > 0).length;

        if (logCount < 5) { // Require a minimum amount of data
            return { logCount, topSymptoms: [], phaseCorrelations: {}, moodCorrelations: {}, sleepCorrelations: {} };
        }

        const symptomCounts: Record<Symptom, number> = {} as any;
        const phaseCorrelations: Record<Symptom, Record<CyclePhaseInfo['phase'], number>> = {} as any;
        const moodCorrelations: Record<Symptom, Record<Mood, number>> = {} as any;
        const sleepCorrelations: Record<Symptom, Record<SleepQuality, number>> = {} as any;

        for (const [dateStr, logUntyped] of logEntries) {
            // FIX: Cast log to LogData to correctly access its properties.
            const log = logUntyped as LogData;
            if (!log.symptoms || log.symptoms.length === 0) continue;
            
            const date = startOfDay(new Date(dateStr));
            const dayInfo = getDayInfo(date);
            const sleepInfo = sleepLog[dateStr];

            for (const symptom of log.symptoms) {
                // Initialize if not present
                if (!symptomCounts[symptom]) {
                    symptomCounts[symptom] = 0;
                    phaseCorrelations[symptom] = { Menstrual: 0, Follicular: 0, Ovulation: 0, Luteal: 0 };
                    moodCorrelations[symptom] = {} as any;
                    sleepCorrelations[symptom] = {} as any;
                }

                // Tally counts
                symptomCounts[symptom]++;
                phaseCorrelations[symptom][dayInfo.phase]++;

                if (log.mood) {
                    moodCorrelations[symptom][log.mood] = (moodCorrelations[symptom][log.mood] || 0) + 1;
                }
                if (sleepInfo?.quality) {
                    sleepCorrelations[symptom][sleepInfo.quality] = (sleepCorrelations[symptom][sleepInfo.quality] || 0) + 1;
                }
            }
        }
        
        const topSymptoms = Object.entries(symptomCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([symptom]) => symptom as Symptom);

        return { logCount, topSymptoms, phaseCorrelations, moodCorrelations, sleepCorrelations };

    }, [context, getDayInfo]);

    return correlations;
};
