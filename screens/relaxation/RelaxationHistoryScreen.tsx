import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { format } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
// FIX: Import RelaxationLog type to allow for casting.
import type { RelaxationLog } from '../../types';

const RelaxationHistoryScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { relaxationLog } = context!;

    const history = useMemo(() => {
        return Object.entries(relaxationLog)
            // FIX: Cast `logs` to `RelaxationLog[]` to fix `map` not existing on `unknown` type.
            .flatMap(([date, logs]) => (logs as RelaxationLog[]).map(log => ({ date: new Date(date), ...log })))
            .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
    }, [relaxationLog]);

    const totalMinutes = useMemo(() => {
        return history.reduce((sum, log) => sum + log.duration, 0);
    }, [history]);

    return (
        <div>
            <Header title="Relaxation History" backScreen="RelaxationMain" />
            <div className="p-4 space-y-4">
                <Card className="text-center bg-teal-50">
                    <p className="text-sm font-semibold text-teal-500">Total Time Spent</p>
                    <p className="text-3xl font-bold text-teal-800">{totalMinutes} <span className="text-lg">minutes</span></p>
                    <p className="text-xs text-slate-500 mt-1">in mindful practice</p>
                </Card>

                {history.length > 0 ? (
                    history.map((item, index) => (
                        <div key={item.completedAt} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                            <Card className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-700">{item.type} Session</p>
                                    <p className="text-sm text-slate-500">{format(new Date(item.completedAt), 'MMMM d, yyyy')}</p>
                                </div>
                                <div className="font-bold text-lg text-teal-600">
                                    {item.duration} min
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <Card className="text-center text-slate-500 py-8">
                        <p>Your logged relaxation sessions will appear here.</p>
                        <p className="mt-2 text-sm">Take a moment for yourself today. 🌿</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default RelaxationHistoryScreen;
