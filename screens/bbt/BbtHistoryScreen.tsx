import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { format } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import type { BbtLog } from '../../types';

const BbtHistoryScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { bbtLog } = context!;

    const history = useMemo(() => {
        return Object.entries(bbtLog)
            // FIX: Cast `log` to `BbtLog` before spreading its properties.
            .map(([date, log]) => ({ date: new Date(date), ...(log as BbtLog) }))
            .sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [bbtLog]);

    return (
        <div>
            <Header title="BBT History" backScreen="BbtMain" />
            <div className="p-4 space-y-3">
                {history.length > 0 ? (
                    history.map((item, index) => (
                        <div key={item.date.toISOString()} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                            <Card className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-700">{format(item.date, 'EEEE, MMM d')}</p>
                                    <p className="text-sm text-slate-500">Logged at {item.time}</p>
                                     {item.notes && item.notes.length > 0 && <p className="text-xs text-rose-500 mt-1">{item.notes.join(', ')}</p>}
                                </div>
                                <div className="text-right">
                                     <p className="font-bold text-2xl text-amber-600">{item.temp.toFixed(2)}°{item.unit}</p>
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <Card className="text-center text-slate-500 py-8">
                        <p>Your BBT history will appear here once you start logging.</p>
                        <p className="mt-2 text-sm">Consistency is key! 🌡️</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default BbtHistoryScreen;