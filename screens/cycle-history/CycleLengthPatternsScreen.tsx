import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useCycleHistory } from '../../hooks/useCycleHistory';
import { format } from 'date-fns';

const CycleLengthPatternsScreen: React.FC = () => {
    const history = useCycleHistory();
    const recentCycles = history.slice(0, 12).reverse(); // last 12 cycles

    if (recentCycles.length < 2) {
         return (
             <div>
                <Header title="Cycle Length Patterns" backScreen="CycleHistoryMain" />
                <div className="p-4 text-center">
                    <Card><p>Track at least two full cycles to see your length patterns here.</p></Card>
                </div>
            </div>
        );
    }
    
    const lengths = history.map(c => c.length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const minLength = Math.min(...lengths);
    const maxLength = Math.max(...lengths);
    const range = maxLength - minLength;

    return (
        <div>
            <Header title="Cycle Length Patterns" backScreen="CycleHistoryMain" />
            <div className="p-4 space-y-5">
                <p className="px-2 text-center text-slate-500">See how your cycle length varies over time. Some variation is completely normal!</p>
                <Card>
                    <h2 className="font-bold text-lg mb-4">Last {recentCycles.length} Cycles</h2>
                    <div className="flex justify-between items-end h-32 border-l border-b border-slate-200 pl-4 pb-2 space-x-1">
                        {recentCycles.map(cycle => {
                            const heightPercentage = range > 0 ? ((cycle.length - minLength) / range) * 80 + 20 : 100; // 20% base height
                            return (
                                <div key={cycle.cycleNumber} className="flex flex-col items-center h-full w-full justify-end group relative">
                                    <div className="absolute -top-6 bg-slate-700 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                        {cycle.length} days
                                    </div>
                                    <div 
                                        className="w-4/5 bg-amber-300 rounded-t-md transition-all hover:bg-amber-400"
                                        style={{ height: `${heightPercentage}%`}}
                                    />
                                </div>
                            );
                        })}
                    </div>
                     <div className="flex justify-between text-xs text-slate-400 mt-1 pl-4">
                        <span>{format(recentCycles[0].startDate, 'MMM yyyy')}</span>
                        <span>{format(recentCycles[recentCycles.length - 1].startDate, 'MMM yyyy')}</span>
                    </div>
                </Card>
                <div className="grid grid-cols-3 gap-3">
                    <Card className="text-center"><p className="text-xs text-slate-500">Average</p><p className="font-bold text-xl">{avgLength.toFixed(0)} days</p></Card>
                    <Card className="text-center"><p className="text-xs text-slate-500">Shortest</p><p className="font-bold text-xl">{minLength} days</p></Card>
                    <Card className="text-center"><p className="text-xs text-slate-500">Longest</p><p className="font-bold text-xl">{maxLength} days</p></Card>
                </div>
            </div>
        </div>
    );
};

export default CycleLengthPatternsScreen;