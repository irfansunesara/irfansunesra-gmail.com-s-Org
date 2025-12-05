import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Calendar from '../../components/Calendar';
import { format, isSameMonth } from 'date-fns';

const MedicationHistoryScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { medicationLog, medications } = context!;

    const dayRenderer = (date: Date) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        const dayLog = medicationLog[dateKey];
        
        let totalDoses = 0;
        let takenDoses = 0;

        if (dayLog) {
            medications.forEach(med => {
                if(med.schedule === 'Daily') {
                    med.times.forEach(time => {
                        totalDoses++;
                        if (dayLog[med.id]?.[time]?.status === 'taken') {
                            takenDoses++;
                        }
                    });
                }
            });
        }
        
        const compliance = totalDoses > 0 ? (takenDoses / totalDoses) : -1;
        
        let bgColor = 'bg-white';
        if (compliance === 1) bgColor = 'bg-green-200'; // All taken
        else if (compliance > 0.5) bgColor = 'bg-yellow-200'; // Most taken
        else if (compliance >= 0) bgColor = 'bg-red-200'; // Some or none taken

        return (
            <div className={`w-full h-full flex items-center justify-center rounded-xl transition-all ${bgColor}`}>
                <span className={`text-sm ${isSameMonth(date, new Date()) ? 'text-slate-700' : 'text-slate-400'}`}>
                    {format(date, 'd')}
                </span>
            </div>
        );
    };

    return (
        <div>
            <Header title="Medication History" backScreen="MedicationMain" />
            <div className="p-4 space-y-4">
                <p className="text-center text-slate-500 px-2">View your medication adherence at a glance. Green means you took all your doses for that day.</p>
                <Calendar dayRenderer={dayRenderer} />
                <div className="grid grid-cols-3 gap-x-2 px-2 text-center text-xs text-slate-500">
                    <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-green-200"/><span>All Taken</span></div>
                    <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-yellow-200"/><span>Some Taken</span></div>
                    <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-red-200"/><span>None/Skipped</span></div>
                </div>
            </div>
        </div>
    );
};

export default MedicationHistoryScreen;
