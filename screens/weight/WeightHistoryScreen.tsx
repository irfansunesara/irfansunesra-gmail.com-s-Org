import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { format } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import type { WeightLog } from '../../types';

const WeightHistoryScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { weightLog } = context!;

    const history = useMemo(() => {
        return Object.entries(weightLog)
            .map(([date, log]) => ({ date: new Date(date), ...(log as WeightLog) }))
            .sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [weightLog]);

    return (
        <div>
            <Header title="Weight History" backScreen="WeightMain" />
            <div className="p-4 space-y-3">
                {history.length > 0 ? (
                    history.map((item, index) => (
                        <div key={item.date.toISOString()} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                            <Card className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-700">{format(item.date, 'EEEE, MMM d')}</p>
                                    {item.notes && item.notes.length > 0 && <p className="text-xs text-rose-500 mt-1">{item.notes.join(', ')}</p>}
                                </div>
                                <div className="text-right">
                                     <p className="font-bold text-2xl text-lime-600">{item.weight.toFixed(1)} {item.unit}</p>
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <Card className="text-center text-slate-500 py-8">
                        <p>Your weight history will appear here once you start logging.</p>
                        <p className="mt-2 text-sm">Remember to be kind to yourself. 💗</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default WeightHistoryScreen;