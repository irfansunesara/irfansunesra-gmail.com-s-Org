import React, { useMemo, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useCycle } from '../../hooks/useCycle';
import { startOfDay } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
// FIX: Added import for SLEEP_QUALITY_LEVELS to resolve 'Cannot find name' error.
import { SLEEP_QUALITY_LEVELS } from '../../constants';
// FIX: Added SleepQuality to type import for use in qualityMap.
import type { SleepLog, CyclePhaseInfo, SleepQuality } from '../../types';

const SleepTrendsScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { sleepLog } = context || {};
    const { getDayInfo } = useCycle();

    const stats = useMemo(() => {
        if (!sleepLog || Object.keys(sleepLog).length === 0) {
            return {
                averageHours: 0,
                averageQuality: 'N/A',
                phaseAverages: {},
                pmsSleepAvg: 0,
                nonPmsSleepAvg: 0,
                logCount: 0,
            };
        }

        const logs = Object.entries(sleepLog);
        const logCount = logs.length;

        // FIX: Cast `log` to `SleepLog` to correctly access `totalHours`.
        const totalHours = logs.reduce((sum, [, log]) => sum + (log as SleepLog).totalHours, 0);
        const averageHours = totalHours / logCount;
        
        const qualityMap: Record<SleepQuality, number> = { 'Excellent': 5, 'Good': 4, 'Okay': 3, 'Poor': 2, 'Very Poor': 1 };
        const qualityScores = Object.values(SLEEP_QUALITY_LEVELS).map(q => q.label);
        // FIX: Cast `log` to `SleepLog` to correctly access `quality`.
        const totalQualityScore = logs.reduce((sum, [, log]) => sum + (qualityMap[(log as SleepLog).quality] || 3), 0);
        const avgQualityIndex = Math.round(totalQualityScore / logCount) -1;
        const averageQuality = (qualityScores[avgQualityIndex] as SleepQuality) || 'Okay';
        
        const phaseData: Record<CyclePhaseInfo['phase'], { total: number, count: number }> = {
            Menstrual: { total: 0, count: 0 },
            Follicular: { total: 0, count: 0 },
            Ovulation: { total: 0, count: 0 },
            Luteal: { total: 0, count: 0 },
        };
        
        let pmsSleep = { total: 0, count: 0 };
        let nonPmsSleep = { total: 0, count: 0 };

        logs.forEach(([dateStr, logUntyped]) => {
            // FIX: Cast log to SleepLog to correctly access its properties.
            const log = logUntyped as SleepLog;
            const dayInfo = getDayInfo(startOfDay(new Date(dateStr)));
            phaseData[dayInfo.phase].total += log.totalHours;
            phaseData[dayInfo.phase].count++;
            
            if (dayInfo.isPms) {
                pmsSleep.total += log.totalHours;
                pmsSleep.count++;
            } else {
                nonPmsSleep.total += log.totalHours;
                nonPmsSleep.count++;
            }
        });

        const phaseAverages = Object.fromEntries(
            Object.entries(phaseData).map(([phase, data]) => [
                phase,
                data.count > 0 ? (data.total / data.count).toFixed(1) : 'N/A'
            ])
        );
        
        const pmsSleepAvg = pmsSleep.count > 0 ? (pmsSleep.total / pmsSleep.count) : 0;
        const nonPmsSleepAvg = nonPmsSleep.count > 0 ? (nonPmsSleep.total / nonPmsSleep.count) : 0;

        return { averageHours, averageQuality, phaseAverages, pmsSleepAvg, nonPmsSleepAvg, logCount };

    }, [sleepLog, getDayInfo]);

    if (stats.logCount < 3) {
        return (
            <div>
                <Header title="Sleep Trends" backScreen="SleepMain" />
                <div className="p-4 text-center">
                    <Card>
                        <p className="text-slate-500">Track your sleep for a few more nights to unlock personalized trends and insights here. 😴</p>
                    </Card>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <Header title="Sleep Trends" backScreen="SleepMain" />
            <div className="p-4 space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <Card className="text-center bg-indigo-50">
                        <p className="text-sm font-semibold text-indigo-500">Avg. Sleep</p>
                        <p className="text-3xl font-bold text-indigo-800">{stats.averageHours.toFixed(1)} <span className="text-lg">hrs</span></p>
                    </Card>
                     <Card className="text-center bg-sky-50">
                        <p className="text-sm font-semibold text-sky-500">Avg. Quality</p>
                        <p className="text-3xl font-bold text-sky-800">{stats.averageQuality}</p>
                    </Card>
                </div>
                
                <Card>
                    <h2 className="font-bold text-lg mb-3">Sleep by Cycle Phase</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(stats.phaseAverages).map(([phase, avg]) => (
                            <div key={phase} className="bg-indigo-50 p-3 rounded-lg text-center">
                                <p className="text-sm font-semibold text-slate-600">{phase}</p>
                                <p className="text-xl font-bold text-indigo-700">{avg} hrs</p>
                            </div>
                        ))}
                    </div>
                </Card>
                
                 {stats.pmsSleepAvg > 0 && (
                    <Card>
                        <h2 className="font-bold text-lg mb-2">PMS vs. Non-PMS Sleep</h2>
                        <p className="text-sm text-slate-600">
                            You seem to sleep about <strong className="text-indigo-600">{stats.pmsSleepAvg.toFixed(1)} hours</strong> during your PMS window, compared to <strong className="text-indigo-600">{stats.nonPmsSleepAvg.toFixed(1)} hours</strong> at other times.
                        </p>
                        <p className="text-xs text-slate-400 mt-2">This is a common pattern as hormonal shifts can affect sleep quality.</p>
                    </Card>
                 )}
            </div>
        </div>
    );
};

export default SleepTrendsScreen;