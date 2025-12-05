import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useCycleHistory } from '../../hooks/useCycleHistory';
import { format } from 'date-fns';
import { ICONS } from '../../constants';

const CycleReportsScreen: React.FC = () => {
    const history = useCycleHistory();
    
    if (history.length === 0) {
        return (
            <div>
                <Header title="Cycle Reports" backScreen="CycleHistoryMain" />
                <div className="p-4 text-center">
                    <Card><p>No cycle reports available yet. Keep logging to see your detailed reports here.</p></Card>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header title="Cycle Reports" backScreen="CycleHistoryMain" />
            <div className="p-4 space-y-4">
                 <p className="px-2 text-center text-slate-500">Here's a detailed breakdown of each of your past cycles.</p>
                {history.map((cycle, index) => (
                    <div key={cycle.cycleNumber} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms` }}>
                        <Card>
                            <h2 className="font-bold text-xl text-sky-600">Cycle #{cycle.cycleNumber} Report</h2>
                            <p className="text-sm text-slate-500 mb-4">{format(cycle.startDate, 'MMM d')} - {format(cycle.endDate, 'MMM d')}</p>
                            <div className="grid grid-cols-2 gap-3 text-center">
                                <div className="bg-sky-50 p-3 rounded-lg">
                                    <p className="font-bold text-2xl text-sky-700">{cycle.length}</p>
                                    <p className="text-xs font-medium text-slate-500">Cycle Length</p>
                                </div>
                                <div className="bg-sky-50 p-3 rounded-lg">
                                    <p className="font-bold text-2xl text-sky-700">{cycle.periodLength}</p>
                                    <p className="text-xs font-medium text-slate-500">Period Length</p>
                                </div>
                            </div>
                            {cycle.topSymptoms.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="font-semibold mb-2">Top Logged Symptoms:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cycle.topSymptoms.map(s => <span key={s} className="text-sm bg-rose-100 text-rose-700 px-3 py-1 rounded-full">{s}</span>)}
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CycleReportsScreen;