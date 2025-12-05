import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { useCycle } from '../../hooks/useCycle';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS, SELF_CARE_DATA } from '../../constants';
import type { Screen } from '../../types';
import { format } from 'date-fns';

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

const SelfCareMainScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { currentPhase } = useCycle();
    const { aiInsights } = context || {};

    const dailySuggestion = useMemo(() => {
        const todayKey = format(new Date(), 'yyyy-MM-dd');
        const todayInsight = aiInsights?.find(i => i.date === todayKey && i.type === 'self-care');
        if (todayInsight) {
            return todayInsight.text;
        }
        // Fallback to simple suggestion logic
        return SELF_CARE_DATA.PhaseCare[currentPhase].items[0] || "Take a moment for yourself.";
    }, [currentPhase, aiInsights]);

    const menuItems: { id: Screen, title: string; subtitle: string; icon: React.FC<any>, color: string, textColor: string }[] = [
        { id: 'PhaseCare', title: 'Cycle Phase Care', subtitle: 'Routines for each phase', icon: ICONS.Core, color: 'bg-pink-100', textColor: 'text-pink-500' },
        { id: 'SymptomCare', title: 'Symptom-Based Care', subtitle: 'Find relief for specific symptoms', icon: ICONS.LogSymptom, color: 'bg-rose-100', textColor: 'text-rose-500' },
        { id: 'MoodSupport', title: 'Mood Support', subtitle: 'Tools for emotional wellness', icon: ICONS.LogMood, color: 'bg-amber-100', textColor: 'text-amber-500' },
        { id: 'RitualsRoutines', title: 'Rituals & Routines', subtitle: 'Build healthy habits', icon: ICONS.Clipboard, color: 'bg-sky-100', textColor: 'text-sky-500' },
        { id: 'SelfCareFavorites', title: 'Your Favorites', subtitle: 'Your saved self-care ideas', icon: ICONS.Heart, color: 'bg-red-100', textColor: 'text-red-500' },
    ];

    return (
        <div className="space-y-5">
            <Header title="Self-Care Library" backScreen="Addons" />
            <div className="p-4 space-y-4">
                 <p className="px-2 text-center text-slate-500">A collection of gentle ideas to support your body and mind, tailored to your cycle.</p>

                <Card className="bg-gradient-to-br from-pink-300 to-rose-400 text-white shadow-lg">
                    <div className="text-center p-2">
                        <p className="font-semibold opacity-90">Today's Gentle Suggestion</p>
                        <p className="text-xl font-bold my-1">{dailySuggestion}</p>
                    </div>
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

export default SelfCareMainScreen;