import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { format } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import type { ExerciseLog } from '../../types';

const HistoryStreaksScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { exerciseLog } = context!;

    const streak = useMemo(() => {
        // This is a simplified streak calculation
        return Object.keys(exerciseLog).length;
    }, [exerciseLog]);

    const history = useMemo(() => {
        return Object.entries(exerciseLog)
            // FIX: Cast log to ExerciseLog to allow spreading its properties.
            .map(([date, log]) => ({ date: new Date(date), ...(log as ExerciseLog) }))
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 15);
    }, [exerciseLog]);

    return (
        <div>
            <Header title="History & Streaks" backScreen="ExerciseMain" />
            <div className="p-4 space-y-5">
                <Card className="bg-gradient-to-br from-amber-300 to-orange-400 text-white text-center">
                    <ICONS.Sparkles className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-5xl font-bold">{streak}</p>
                    <p className="font-semibold">{streak === 1 ? 'Day Streak' : 'Day Streak'}</p>
                    <p className="text-xs opacity-80 mt-2">Keep up the amazing work!</p>
                </Card>

                <Card>
                    <h2 className="font-bold text-lg mb-3">Recent Activity</h2>
                    {history.length > 0 ? (
                        <div className="space-y-2">
                            {history.map(item => (
                                <div key={item.date.toISOString()} className="flex justify-between items-center bg-rose-50 p-3 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-slate-700">{format(item.date, 'EEEE, MMM d')}</p>
                                        <p className="text-sm text-slate-500">{item.type} - {item.intensity}</p>
                                    </div>
                                    <span className="font-bold text-rose-500">{item.duration} min</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-slate-500 py-4">Your logged workouts will appear here. Let's get moving! 🤸‍♀️</p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default HistoryStreaksScreen;