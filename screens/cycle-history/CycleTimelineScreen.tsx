import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useCycleHistory } from '../../hooks/useCycleHistory';
import { format } from 'date-fns';
import { ICONS } from '../../constants';

const CycleTimelineScreen: React.FC = () => {
    const history = useCycleHistory();

    if (history.length === 0) {
        return (
            <div>
                <Header title="Cycle Timeline" backScreen="CycleHistoryMain" />
                <div className="p-4 text-center">
                    <Card><p>Not enough data yet. Log a few cycles to see your timeline here!</p></Card>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header title="Cycle Timeline" backScreen="CycleHistoryMain" />
            <div className="p-4 space-y-4">
                {history.map((cycle, index) => (
                    <div key={cycle.cycleNumber} className="flex space-x-4 animate-fade-in-up" style={{ animationDelay: `${index * 80}ms` }}>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center font-bold text-sm">{cycle.cycleNumber}</div>
                            <div className="w-0.5 flex-grow bg-violet-200"></div>
                        </div>
                        <div className="flex-grow pb-4">
                            <Card>
                                <p className="font-bold text-lg">{format(cycle.startDate, 'MMM d, yyyy')} - {format(cycle.endDate, 'MMM d, yyyy')}</p>
                                <div className="flex space-x-4 text-sm mt-2 text-slate-500">
                                    <span>{cycle.length} day cycle</span>
                                    <span>{cycle.periodLength} period days</span>
                                </div>
                                {cycle.topSymptoms.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {cycle.topSymptoms.map(s => <span key={s} className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">{s}</span>)}
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CycleTimelineScreen;