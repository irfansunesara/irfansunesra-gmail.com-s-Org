import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { format } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { SLEEP_QUALITY_LEVELS } from '../../constants';
import type { SleepLog } from '../../types';

const SleepHistoryScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { sleepLog } = context!;

    const history = useMemo(() => {
        return Object.entries(sleepLog)
            // FIX: Cast log to SleepLog to allow spreading its properties.
            .map(([date, log]) => ({ date: new Date(date), ...(log as SleepLog) }))
            .sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [sleepLog]);

    const getQualityEmoji = (quality: SleepLog['quality']) => {
        return SLEEP_QUALITY_LEVELS.find(q => q.label === quality)?.emoji || '😐';
    };

    return (
        <div>
            <Header title="Sleep History" backScreen="SleepMain" />
            <div className="p-4 space-y-3">
                {history.length > 0 ? (
                    history.map((item, index) => (
                        <div key={item.date.toISOString()} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                            <Card className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-700">{format(item.date, 'EEEE, MMM d')}</p>
                                    <p className="text-sm text-slate-500">
                                        {item.bedtime} - {item.wakeTime}
                                    </p>
                                </div>
                                <div className="text-right">
                                     <p className="font-bold text-lg text-indigo-600">{item.totalHours} hrs</p>
                                     <p className="text-2xl">{getQualityEmoji(item.quality)}</p>
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <Card className="text-center text-slate-500 py-8">
                        <p>Your sleep history will appear here once you start logging.</p>
                        <p className="mt-2 text-sm">Sweet dreams! 😴</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default SleepHistoryScreen;