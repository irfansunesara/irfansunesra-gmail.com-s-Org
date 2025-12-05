import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import { format } from 'date-fns';

const TodaysScheduleScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { medications, medicationLog, logMedication } = context!;
    const dateKey = format(new Date(), 'yyyy-MM-dd');

    const schedule = useMemo(() => {
        const todayLog = medicationLog[dateKey] || {};
        return medications
            .filter(med => med.schedule === 'Daily')
            .flatMap(med => med.times.map(time => ({ ...med, time, status: todayLog[med.id]?.[time]?.status })))
            .sort((a, b) => a.time.localeCompare(b.time));
    }, [medications, medicationLog, dateKey]);

    const handleLog = (medId: string, time: string, status: 'taken' | 'skipped') => {
        logMedication(dateKey, medId, time, { status, loggedAt: new Date().toISOString() });
    };

    return (
        <div>
            <Header title="Today's Schedule" backScreen="MedicationMain" />
            <div className="p-4 space-y-4">
                <p className="text-center text-slate-500">A look at your medication and supplement schedule for <strong>{format(new Date(), 'MMMM d')}</strong>.</p>
                {schedule.length > 0 ? (
                    schedule.map((item, index) => (
                        <div key={`${item.id}-${item.time}`} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                            <Card className="flex items-center space-x-4">
                                <div className="text-center flex-shrink-0 w-16">
                                    <p className="font-bold text-lg text-teal-600">{item.time}</p>
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-slate-800">{item.name}</p>
                                    <p className="text-sm text-slate-500">{item.dosage} - {item.purpose}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleLog(item.id, item.time, 'skipped')} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${item.status === 'skipped' ? 'bg-red-200' : 'bg-slate-100 hover:bg-slate-200'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line></svg>
                                    </button>
                                     <button onClick={() => handleLog(item.id, item.time, 'taken')} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${item.status === 'taken' ? 'bg-green-200' : 'bg-slate-100 hover:bg-slate-200'}`}>
                                        <ICONS.Checkmark className="w-6 h-6" />
                                     </button>
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <Card className="text-center text-slate-500 py-8">
                        <ICONS.Pill className="w-12 h-12 mx-auto text-teal-200" />
                        <p className="mt-4 font-semibold">No medications scheduled for today.</p>
                        <p className="text-sm mt-1">You can add a new medication from the main menu.</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default TodaysScheduleScreen;
