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

const ExerciseMainScreen: React.FC = () => {
    const context = useContext(AppContext);

    const menuItems: { id: Screen, title: string; subtitle: string; icon: React.FC<any>, color: string, textColor: string }[] = [
        { id: 'PhaseExercise', title: 'Exercise for Your Phase', subtitle: 'Workouts tailored to your cycle', icon: ICONS.Core, color: 'bg-rose-100', textColor: 'text-rose-500' },
        { id: 'DailyMovement', title: 'Daily Movement Suggestions', subtitle: 'Personalized ideas for today', icon: ICONS.Seedling, color: 'bg-emerald-100', textColor: 'text-emerald-500' },
        { id: 'ExerciseLibrary', title: 'Exercise Library', subtitle: 'Browse all workouts', icon: ICONS.Clipboard, color: 'bg-sky-100', textColor: 'text-sky-500' },
        { id: 'IntensityGuide', title: 'Workout Intensity Guide', subtitle: 'Learn what feels best, when', icon: ICONS.Temperature, color: 'bg-amber-100', textColor: 'text-amber-500' },
        { id: 'GoalsPreferences', title: 'Goals & Preferences', subtitle: 'Customize your movement plan', icon: ICONS.Profile, color: 'bg-violet-100', textColor: 'text-violet-500' },
        { id: 'HistoryStreaks', title: 'History & Streaks', subtitle: 'Track your progress', icon: ICONS.Trends, color: 'bg-slate-100', textColor: 'text-slate-500' },
    ];

    return (
        <div className="space-y-5">
            <Header title="Move with your cycle" backScreen="Addons" />
            <div className="p-4 space-y-3">
                 <p className="px-2 text-center text-slate-500">Sync your workouts with your body's natural rhythm to feel stronger, reduce symptoms, and honor your energy.</p>
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

export default ExerciseMainScreen;