import { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { format, addDays, differenceInDays, startOfDay } from 'date-fns';
import type { PastCycle, LogData } from '../types';

export const useCycleHistory = () => {
    const context = useContext(AppContext);

    const history = useMemo((): PastCycle[] => {
        if (!context || !context.cycleData || !context.logData) {
            return [];
        }

        const { cycleData, logData } = context;
        const allPeriodDays = Object.entries(logData)
            // FIX: Cast log to LogData to safely access its properties.
            .filter(([, log]) => !!(log as LogData).period)
            .map(([dateStr]) => startOfDay(new Date(dateStr)))
            .sort((a, b) => a.getTime() - b.getTime());

        if (allPeriodDays.length === 0) return [];
        
        const cycleStartDates: Date[] = [];
        if (allPeriodDays.length > 0) {
            cycleStartDates.push(allPeriodDays[0]);
            for (let i = 1; i < allPeriodDays.length; i++) {
                if (differenceInDays(allPeriodDays[i], allPeriodDays[i - 1]) > 1) {
                    cycleStartDates.push(allPeriodDays[i]);
                }
            }
        }

        const pastCycles: PastCycle[] = [];
        for (let i = 0; i < cycleStartDates.length; i++) {
            const startDate = cycleStartDates[i];
            const endDate = (i + 1 < cycleStartDates.length) ? addDays(cycleStartDates[i + 1], -1) : addDays(startDate, cycleData.cycleLength - 1);
            const length = differenceInDays(endDate, startDate) + 1;
            
            let periodLength = 0;
            const topSymptoms: { [key: string]: number } = {};

            for (let d = 0; d < length; d++) {
                const currentDate = addDays(startDate, d);
                const dateKey = format(currentDate, 'yyyy-MM-dd');
                const dayLog = logData[dateKey];
                
                if (dayLog?.period) {
                    periodLength++;
                }
                
                dayLog?.symptoms?.forEach(symptom => {
                    topSymptoms[symptom] = (topSymptoms[symptom] || 0) + 1;
                });
            }

            pastCycles.push({
                cycleNumber: i + 1,
                startDate,
                endDate,
                length,
                periodLength,
                ovulationDay: Math.round(length - 14),
                topSymptoms: Object.entries(topSymptoms).sort((a,b) => b[1] - a[1]).slice(0, 3).map(s => s[0]),
            });
        }

        return pastCycles.reverse(); // Show most recent first
    }, [context]);

    return history;
};