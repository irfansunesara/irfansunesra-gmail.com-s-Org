import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import { format } from 'date-fns';
import type { Screen } from '../../types';

const InfoCard: React.FC<{
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    subtitle: string;
    color: string;
    textColor: string;
    onClick: () => void;
}> = ({ icon: Icon, title, subtitle, color, textColor, onClick }) => (
    <button onClick={onClick} className="w-full bg-[var(--card-bg)] p-4 rounded-2xl shadow-sm flex items-center space-x-4 text-left group transition-transform duration-200 active:scale-[0.98]">
        <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${color}`}>
            <Icon className={`w-7 h-7 ${textColor}`} />
        </div>
        <div className="flex-grow">
            <h3 className="font-bold text-md">{title}</h3>
            <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <ICONS.ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
    </button>
);

const MedicationMainScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { medications, medicationLog } = context!;
    const dateKey = format(new Date(), 'yyyy-MM-dd');

    const todaysMeds = useMemo(() => {
        const todayLog = medicationLog[dateKey] || {};
        return medications
            .flatMap(med => med.times.map(time => ({ ...med, time })))
            .filter(med => med.schedule === 'Daily') // Simplified for now
            .sort((a, b) => a.time.localeCompare(b.time))
            .map(med => ({
                ...med,
                status: todayLog[med.id]?.[med.time]?.status,
            }));
    }, [medications, medicationLog, dateKey]);

    const menuItems: { id: Screen, title: string; subtitle: string; icon: React.FC<any>, color: string, textColor: string }[] = [
        { id: 'AddMedication', title: 'Add Medication', subtitle: 'Add a new pill or supplement', icon: ICONS.Pill, color: 'bg-teal-100', textColor: 'text-teal-600' },
        { id: 'TodaysSchedule', title: 'Today\'s Schedule', subtitle: 'View and log today\'s doses', icon: ICONS.Calendar, color: 'bg-sky-100', textColor: 'text-sky-500' },
        { id: 'MedicationList', title: 'Medication List', subtitle: 'View all your medications', icon: ICONS.Clipboard, color: 'bg-slate-100', textColor: 'text-slate-500' },
        { id: 'MedicationGuides', title: 'Guides', subtitle: 'Info for PMS, pregnancy, menopause', icon: ICONS.Correlations, color: 'bg-violet-100', textColor: 'text-violet-500' },
        { id: 'MedicationReminders', title: 'Reminders & Refills', subtitle: 'Manage your notifications', icon: ICONS.Bell, color: 'bg-rose-100', textColor: 'text-rose-500' },
        { id: 'MedicationHistory', title: 'History & Compliance', subtitle: 'Track your adherence over time', icon: ICONS.Trends, color: 'bg-amber-100', textColor: 'text-amber-500' },
    ];

    return (
        <div className="space-y-5">
            <Header title="Medication & Supplements" backScreen="Addons" />
            <div className="p-4 space-y-4">
                 <p className="px-2 text-center text-slate-500">Gently track your medications and supplements to support your wellness journey.</p>

                <Card>
                    <h2 className="font-bold text-lg mb-3">Today's Schedule</h2>
                    {todaysMeds.length > 0 ? (
                        <div className="space-y-2">
                        {todaysMeds.slice(0,3).map(med => (
                            <div key={`${med.id}-${med.time}`} className="flex items-center justify-between p-2 bg-teal-50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-slate-700">{med.name}</p>
                                    <p className="text-sm text-slate-500">{med.dosage} at {med.time}</p>
                                </div>
                                <div className={`px-2 py-0.5 text-xs font-semibold rounded-full ${med.status === 'taken' ? 'bg-green-200 text-green-800' : 'bg-slate-200 text-slate-600'}`}>
                                    {med.status ? (med.status === 'taken' ? 'Taken' : 'Skipped') : 'Pending'}
                                </div>
                            </div>
                        ))}
                         {todaysMeds.length > 3 && <p className="text-center text-sm text-teal-600 mt-2">...and {todaysMeds.length - 3} more</p>}
                        </div>
                    ) : (
                        <p className="text-center text-sm text-slate-500 py-2">No medications scheduled for today.</p>
                    )}
                </Card>

                {menuItems.map((item, index) => (
                    <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 60}ms`}}>
                        <InfoCard {...item} onClick={() => context?.setScreen(item.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MedicationMainScreen;
