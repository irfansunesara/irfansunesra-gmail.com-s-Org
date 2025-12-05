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

const FloatingParticles: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
            <div
                key={i}
                className="absolute w-2 h-2 bg-teal-200/50 rounded-full"
                style={{
                    left: `${Math.random() * 100}%`,
                    animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                }}
            />
        ))}
    </div>
);


const RelaxationMainScreen: React.FC = () => {
    const context = useContext(AppContext);

    const menuItems: { id: Screen, title: string; subtitle: string; icon: React.FC<any>, color: string, textColor: string }[] = [
        { id: 'Breathing', title: 'Breathing Exercises', subtitle: 'Calm your nervous system', icon: ICONS.Breathing, color: 'bg-sky-100', textColor: 'text-sky-500' },
        { id: 'Meditation', title: 'Meditation Library', subtitle: 'Short, guided sessions', icon: ICONS.Mindfulness, color: 'bg-violet-100', textColor: 'text-violet-500' },
        { id: 'SleepSounds', title: 'Sleep & Calm Sounds', subtitle: 'Relaxing ambient audio', icon: ICONS.Waves, color: 'bg-indigo-100', textColor: 'text-indigo-500' },
        { id: 'Affirmations', title: 'Cycle-Based Affirmations', subtitle: 'Supportive words for your phase', icon: ICONS.Sparkles, color: 'bg-pink-100', textColor: 'text-pink-500' },
        { id: 'StressCheck', title: 'Stress Check-In', subtitle: 'Log your stress & get suggestions', icon: ICONS.LogSymptom, color: 'bg-rose-100', textColor: 'text-rose-500' },
        { id: 'MoodReset', title: 'Mood Reset Tools', subtitle: 'Quick 1-minute exercises', icon: ICONS.Exercise, color: 'bg-emerald-100', textColor: 'text-emerald-500' },
        { id: 'RelaxationHistory', title: 'Relaxation History', subtitle: 'Track your mindfulness practice', icon: ICONS.Trends, color: 'bg-slate-100', textColor: 'text-slate-500' },
    ];

    return (
        <div className="space-y-5 bg-teal-50/50 min-h-full">
            <Header title="Relaxation & Mindfulness" backScreen="Addons" />
            <div className="p-4 space-y-3 relative">
                <FloatingParticles />
                 <p className="px-2 text-center text-slate-500 relative z-10">Relax, breathe, and care for your mind 🌿</p>
                {menuItems.map((item, index) => (
                    <div key={item.id} className="animate-fade-in-up relative z-10" style={{ animationDelay: `${index * 60}ms`}}>
                        <InfoCard {...item} onClick={() => context?.setScreen(item.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelaxationMainScreen;