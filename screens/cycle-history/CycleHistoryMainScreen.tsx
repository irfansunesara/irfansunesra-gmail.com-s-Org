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

const CycleHistoryMainScreen: React.FC = () => {
    const context = useContext(AppContext);

    const menuItems: { id: Screen, title: string; subtitle: string; icon: React.FC<any>, color: string, textColor: string }[] = [
        { id: 'CycleTimeline', title: 'Cycle Timeline', subtitle: 'View an overview of all past cycles', icon: ICONS.Calendar, color: 'bg-violet-100', textColor: 'text-violet-500' },
        { id: 'CycleReports', title: 'Cycle Reports', subtitle: 'See a detailed report for each cycle', icon: ICONS.Clipboard, color: 'bg-sky-100', textColor: 'text-sky-500' },
        { id: 'CycleLengthPatterns', title: 'Cycle Length Patterns', subtitle: 'Analyze your cycle length variability', icon: ICONS.Trends, color: 'bg-amber-100', textColor: 'text-amber-500' },
        { id: 'SymptomMoodTrends', title: 'Symptom & Mood Trends', subtitle: 'Discover your most common feelings', icon: ICONS.Correlations, color: 'bg-rose-100', textColor: 'text-rose-500' },
    ];

    return (
        <div className="space-y-5">
            <Header title="Cycle History & Trends" backScreen="MoreHub" />
            <div className="p-4 space-y-3">
                 <p className="px-2 text-center text-slate-500">Look back at your past cycles to understand your unique patterns and see how your body changes over time.</p>
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

export default CycleHistoryMainScreen;