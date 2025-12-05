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

const SexualWellnessMainScreen: React.FC = () => {
    const context = useContext(AppContext);

    const menuItems: { id: Screen, title: string; subtitle: string; icon: React.FC<any>, color: string, textColor: string }[] = [
        { id: 'LogSexualActivity', title: 'Log Intimate Activity', subtitle: 'A private log for your moments', icon: ICONS.Log, color: 'bg-red-100', textColor: 'text-red-500' },
        { id: 'LibidoInsights', title: 'Libido Insights', subtitle: 'How desire can shift with your cycle', icon: ICONS.Correlations, color: 'bg-rose-100', textColor: 'text-rose-500' },
        { id: 'SexualHealthTips', title: 'Sexual Health Tips', subtitle: 'Guidance for communication & wellness', icon: ICONS.SelfCare, color: 'bg-pink-100', textColor: 'text-pink-500' },
        { id: 'EmotionalIntimacy', title: 'Emotional Intimacy', subtitle: 'Nurturing connection & confidence', icon: ICONS.HeartHand, color: 'bg-violet-100', textColor: 'text-violet-500' },
        { id: 'SafeDayAwareness', title: 'Fertility Awareness', subtitle: 'Understanding your fertile window', icon: ICONS.Seedling, color: 'bg-emerald-100', textColor: 'text-emerald-500' },
        { id: 'SexualWellnessHistory', title: 'History & Trends', subtitle: 'View your private log history', icon: ICONS.Trends, color: 'bg-slate-100', textColor: 'text-slate-500' },
    ];

    return (
        <div className="space-y-5">
            <Header title="Sexual Wellness" backScreen="MoreHub" />
            <div className="p-4 space-y-3">
                 <p className="px-2 text-center text-slate-500">A private space to explore the connections between your cycle, your body, and your intimate life.</p>
                {menuItems.map((item, index) => (
                    <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms`}}>
                        <InfoCard {...item} onClick={() => context?.setScreen(item.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SexualWellnessMainScreen;