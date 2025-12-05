import React, { useMemo, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { MOODS } from '../../constants';
// FIX: Added import for LogData type.
import type { LogData } from '../../types';

const SymptomMoodTrendsScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { logData } = context || {};

    const trends = useMemo(() => {
        if (!logData) return { symptomCounts: [], moodCounts: [] };

        const symptomCounts: { [key: string]: number } = {};
        const moodCounts: { [key: string]: number } = {};

        // FIX: Explicitly type `log` as `LogData` to allow safe property access.
        Object.values(logData).forEach((log: LogData) => {
            log.symptoms?.forEach(s => symptomCounts[s] = (symptomCounts[s] || 0) + 1);
            if (log.mood) {
                moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1;
            }
        });
        
        return {
            symptomCounts: Object.entries(symptomCounts).sort((a,b) => b[1] - a[1]),
            moodCounts: Object.entries(moodCounts).sort((a,b) => b[1] - a[1]),
        }
    }, [logData]);

    const totalSymptomLogs = trends.symptomCounts.reduce((sum, [, count]) => sum + count, 0);
    const totalMoodLogs = trends.moodCounts.reduce((sum, [, count]) => sum + count, 0);

    return (
        <div>
            <Header title="Symptom & Mood Trends" backScreen="CycleHistoryMain" />
            <div className="p-4 space-y-5">
                <p className="px-2 text-center text-slate-500">See your most frequently logged symptoms and moods over time.</p>
                <Card>
                    <h2 className="font-bold text-lg mb-3">Most Common Symptoms</h2>
                    {trends.symptomCounts.length > 0 ? (
                        <div className="space-y-2">
                            {trends.symptomCounts.map(([symptom, count]) => (
                                <div key={symptom} className="flex items-center space-x-3">
                                    <span className="w-24 text-sm font-medium text-slate-500">{symptom}</span>
                                    <div className="flex-grow bg-slate-100 rounded-full h-5">
                                        <div className="h-5 rounded-full bg-rose-300" style={{ width: `${(count / totalSymptomLogs) * 100}%` }} />
                                    </div>
                                    <span className="w-12 text-sm font-semibold text-slate-600 text-right">{count} {count === 1 ? 'day' : 'days'}</span>
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-sm text-slate-500 text-center">No symptoms logged yet.</p>}
                </Card>
                 <Card>
                    <h2 className="font-bold text-lg mb-3">Most Common Moods</h2>
                     {trends.moodCounts.length > 0 ? (
                        <div className="space-y-2">
                            {trends.moodCounts.map(([mood, count]) => {
                                const emoji = MOODS.find(m => m.label === mood)?.emoji;
                                return (
                                <div key={mood} className="flex items-center space-x-3">
                                    <span className="w-24 text-sm font-medium text-slate-500 flex items-center">{emoji && <span className="mr-2 text-lg">{emoji}</span>}{mood}</span>
                                    <div className="flex-grow bg-slate-100 rounded-full h-5">
                                        <div className="h-5 rounded-full bg-amber-300" style={{ width: `${(count / totalMoodLogs) * 100}%` }} />
                                    </div>
                                    <span className="w-12 text-sm font-semibold text-slate-600 text-right">{count} {count === 1 ? 'day' : 'days'}</span>
                                </div>
                            )})}
                        </div>
                    ) : <p className="text-sm text-slate-500 text-center">No moods logged yet.</p>}
                </Card>
            </div>
        </div>
    );
};

export default SymptomMoodTrendsScreen;