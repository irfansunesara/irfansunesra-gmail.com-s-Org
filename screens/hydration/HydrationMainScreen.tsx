import React, { useContext } from 'react';
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

const HydrationMainScreen: React.FC = () => {
    const context = useContext(AppContext);
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    const todayIntake = context?.hydrationLog[dateKey]?.amount || 0;
    const dailyGoal = context?.hydrationSettings.dailyGoal || 2000;
    const progress = Math.min((todayIntake / dailyGoal) * 100, 100);

    const menuItems: { id: Screen, title: string; subtitle: string; icon: React.FC<any>, color: string, textColor: string }[] = [
        { id: 'LogHydration', title: 'Add Water Intake', subtitle: 'Log the water you drink today', icon: ICONS.Log, color: 'bg-sky-100', textColor: 'text-sky-500' },
        { id: 'HydrationGoals', title: 'Set Daily Goal', subtitle: `Current goal: ${dailyGoal}ml`, icon: ICONS.Profile, color: 'bg-blue-100', textColor: 'text-blue-500' },
        { id: 'PhaseHydrationTips', title: 'Phase-Based Hydration Tips', subtitle: 'Learn how your needs change', icon: ICONS.Correlations, color: 'bg-teal-100', textColor: 'text-teal-500' },
        { id: 'HydrationHistory', title: 'History & Trends', subtitle: 'View your hydration patterns', icon: ICONS.Trends, color: 'bg-slate-100', textColor: 'text-slate-500' },
    ];

    return (
        <div className="space-y-5">
            <Header title="Hydration Tracking" backScreen="Addons" />
            <div className="p-4 space-y-4">
                 <p className="px-2 text-center text-slate-500">Stay hydrated, stay glowing 💧✨</p>

                <Card className="bg-gradient-to-br from-sky-300 to-blue-400 text-white shadow-lg">
                    <div className="text-center p-2">
                        <p className="font-semibold opacity-90">Today's Progress</p>
                        <p className="text-4xl font-bold my-1">{progress.toFixed(0)}%</p>
                        <p className="text-sm opacity-90">{todayIntake} / {dailyGoal} ml</p>
                        <div className="w-full bg-white/20 rounded-full h-2.5 mt-4">
                            <div className="bg-white h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </Card>

                {menuItems.map((item, index) => (
                    <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 60}ms`}}>
                        <InfoCard 
                            title={item.title}
                            subtitle={item.subtitle}
                            icon={item.icon}
                            color={item.color}
                            textColor={item.textColor}
                            onClick={() => context?.setScreen(item.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HydrationMainScreen;