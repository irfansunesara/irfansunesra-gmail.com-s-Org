import React, { useMemo, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useCycle } from '../../hooks/useCycle';
import { format, differenceInDays, startOfDay, addDays } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
// FIX: Import LogData type to allow for explicit casting.
import type { PmsSymptom, LogData } from '../../types';

interface Pattern {
    symptom: PmsSymptom;
    count: number;
    avgDaysBeforePeriod: number;
}

const PmsPatternsScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { cycleData, logData } = context || {};

    const patterns = useMemo((): Pattern[] => {
        if (!cycleData || !logData) return [];

        const { lastPeriodStart, cycleLength } = cycleData;
        const symptomData: { [key in PmsSymptom]?: { count: number; totalDaysBefore: number } } = {};
        
        Object.entries(logData).forEach(([dateStr, log]) => {
            // FIX: Cast log to LogData to resolve typing issue.
            const currentLog = log as LogData;
            if (currentLog.pmsSymptoms && currentLog.pmsSymptoms.length > 0) {
                const logDate = startOfDay(new Date(dateStr));
                
                const cyclesSinceStart = Math.floor(differenceInDays(logDate, lastPeriodStart) / cycleLength);
                const currentCycleStartDate = addDays(lastPeriodStart, cyclesSinceStart * cycleLength);
                const nextPeriodStartDate = addDays(currentCycleStartDate, cycleLength);
                const daysBeforePeriod = differenceInDays(nextPeriodStartDate, logDate);

                // Only count if it's within a typical PMS window (1-10 days before period)
                if (daysBeforePeriod > 0 && daysBeforePeriod <= 10) {
                    currentLog.pmsSymptoms.forEach(symptom => {
                        if (!symptomData[symptom]) {
                            symptomData[symptom] = { count: 0, totalDaysBefore: 0 };
                        }
                        symptomData[symptom]!.count++;
                        symptomData[symptom]!.totalDaysBefore += daysBeforePeriod;
                    });
                }
            }
        });

        return Object.entries(symptomData)
            .map(([symptom, data]) => ({
                symptom: symptom as PmsSymptom,
                count: data.count,
                avgDaysBeforePeriod: Math.round(data.totalDaysBefore / data.count),
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5); // Show top 5 patterns

    }, [cycleData, logData]);
    
    const pmsHistory = useMemo(() => {
        // FIX: Add guard for logData to prevent runtime errors.
        if (!logData) return [];
        return Object.entries(logData)
            // FIX: Cast log to LogData to resolve typing issue.
            .filter(([, log]) => (log as LogData).pmsSymptoms && (log as LogData).pmsSymptoms.length > 0)
            .map(([dateStr]) => ({
                date: new Date(dateStr),
                // FIX: Cast logData value to LogData to resolve typing issue.
                symptomCount: (logData[dateStr] as LogData).pmsSymptoms?.length || 0
            }))
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 10); // Last 10 entries
    }, [logData]);

    return (
        <div>
            <Header title="Your PMS Patterns" backScreen="PmsInsightsMain" />
            <div className="p-4 space-y-5">
                <Card>
                    <div className="flex items-start space-x-3">
                        <ICONS.Correlations className="w-8 h-8 text-violet-500 flex-shrink-0" />
                        <div>
                            <h2 className="font-bold text-lg">Personalized Insights</h2>
                            <p className="text-sm text-slate-500">Based on your logs, we've noticed some patterns. The more you track, the smarter these insights become!</p>
                        </div>
                    </div>
                </Card>
                
                {patterns.length > 0 ? (
                    patterns.map(pattern => (
                        <Card key={pattern.symptom}>
                             <p className="text-slate-700">You've logged <strong className="text-rose-500">{pattern.symptom}</strong> <strong className="text-rose-500">{pattern.count}</strong> {pattern.count === 1 ? 'time' : 'times'}, often around <strong className="text-rose-500">{pattern.avgDaysBeforePeriod}</strong> days before your period.</p>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <p className="text-center text-slate-500">No patterns detected yet. Keep logging your PMS symptoms to unlock personalized insights here. 🌸</p>
                    </Card>
                )}
                
                 <Card>
                    <h2 className="font-bold text-lg mb-3">Recent PMS Log History</h2>
                    {pmsHistory.length > 0 ? (
                        <div className="space-y-2">
                            {pmsHistory.map(item => (
                                <div key={item.date.toISOString()} className="flex justify-between items-center bg-rose-50 p-2 rounded-lg">
                                    <span className="font-semibold text-sm text-slate-600">{format(item.date, 'MMMM d, yyyy')}</span>
                                    <span className="text-xs font-medium text-rose-600 bg-rose-200 px-2 py-0.5 rounded-full">{item.symptomCount} symptoms</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <p className="text-sm text-slate-500">Your logged PMS days will appear here.</p>
                    )}
                </Card>

            </div>
        </div>
    );
};

export default PmsPatternsScreen;