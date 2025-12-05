import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import { ICONS } from '../../constants';
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

const SleepMainScreen: React.FC = () => {
    const context = useContext(AppContext);

    const menuItems: { id: Screen, title: string; subtitle: string; icon: React.FC<any>, color: string, textColor: string }[] = [
        { id: 'LogSleep', title: 'Log Last Night’s Sleep', subtitle: 'Record your bedtime and wake-up', icon: ICONS.Log, color: 'bg-indigo-100', textColor: 'text-indigo-500' },
        { id: 'SleepTrends', title: 'Sleep Trends', subtitle: 'View your sleep patterns over time', icon: ICONS.Trends, color: 'bg-sky-100', textColor: 'text-sky-500' },
        { id: 'PhaseSleepInsights', title: 'Phase-Aware Insights', subtitle: 'Learn how your cycle affects sleep', icon: ICONS.Correlations, color: 'bg-violet-100', textColor: 'text-violet-500' },
        { id: 'SleepTips', title: 'Sleep Tips', subtitle: 'Discover ways to improve your rest', icon: ICONS.SelfCare, color: 'bg-teal-100', textColor: 'text-teal-500' },
        { id: 'SleepHistory', title: 'Sleep History', subtitle: 'Browse your past sleep logs', icon: ICONS.Clipboard, color: 'bg-slate-100', textColor: 'text-slate-500' },
    ];

    return (
        <div className="space-y-5">
            <Header title="Sleep Tracking" backScreen="Addons" />
            <div className="p-4 space-y-3">
                 <p className="px-2 text-center text-slate-500">Track your sleep to understand your patterns, improve your rest, and feel your best throughout your cycle 🌙</p>
                {menuItems.map((item, index) => (
                    <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms`}}>
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

export default SleepMainScreen;