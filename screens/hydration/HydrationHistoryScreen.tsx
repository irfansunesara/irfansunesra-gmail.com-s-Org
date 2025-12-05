import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { format, subDays } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import type { HydrationLog } from '../../types';

const HydrationHistoryScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { hydrationLog, hydrationSettings } = context!;

    const last7DaysData = useMemo(() => {
        const today = new Date();
        return Array.from({ length: 7 }).map((_, i) => {
            const date = subDays(today, i);
            const dateKey = format(date, 'yyyy-MM-dd');
            const log = hydrationLog[dateKey];
            return {
                date,
                amount: log?.amount || 0,
            };
        }).reverse();
    }, [hydrationLog]);

    const stats = useMemo(() => {
        // FIX: Cast the result of Object.values to an array of HydrationLog to ensure type safety.
        const loggedDays = (Object.values(hydrationLog) as HydrationLog[]).filter(log => log && log.amount > 0);
        if (loggedDays.length === 0) return { avg: 0, total: 0 };

        const total = loggedDays.reduce((sum, log) => sum + log.amount, 0);
        const avg = total / loggedDays.length;
        return { avg, total };
    }, [hydrationLog]);

    return (
        <div>
            <Header title="Hydration History" backScreen="HydrationMain" />
            <div className="p-4 space-y-5">
                <Card>
                    <h2 className="font-bold text-lg mb-4">Last 7 Days</h2>
                    <div className="flex justify-between items-end h-40 border-l border-b border-slate-200 pl-4 pb-2">
                        {last7DaysData.map(({ date, amount }) => {
                            const percentage = Math.min((amount / hydrationSettings.dailyGoal) * 100, 100);
                            return (
                                <div key={date.toISOString()} className="flex flex-col items-center h-full w-full justify-end">
                                    <div 
                                        className="w-3/5 bg-sky-300 rounded-t-md transition-all duration-500"
                                        style={{ height: `${percentage}%`}}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">{format(date, 'E')}</p>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                    <Card className="text-center bg-sky-50">
                        <p className="text-sm font-semibold text-sky-500">Avg. Daily Intake</p>
                        <p className="text-3xl font-bold text-sky-800">{stats.avg.toFixed(0)} <span className="text-lg">ml</span></p>
                    </Card>
                    <Card className="text-center bg-blue-50">
                        <p className="text-sm font-semibold text-blue-500">Total This Week</p>
                        <p className="text-3xl font-bold text-blue-800">{(stats.total / 1000).toFixed(1)} <span className="text-lg">L</span></p>
                    </Card>
                </div>

                {last7DaysData.filter(d => d.amount > 0).length === 0 && (
                     <Card className="text-center text-slate-500">
                        <p>Your history will appear here once you start logging your water intake. 💧</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default HydrationHistoryScreen;