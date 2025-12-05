import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import { ICONS } from '../../constants';
import type { Screen, CyclePhaseInfo } from '../../types';

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

const NutritionMainScreen: React.FC = () => {
    const context = useContext(AppContext);

    const handlePhaseClick = (phase: CyclePhaseInfo['phase']) => {
        context?.setSelectedPhase(phase);
        context?.setScreen('PhaseNutrition');
    };

    const menuItems: { id: Screen | 'PhaseHeader', title: string; subtitle: string; icon: React.FC<any>, color: string, textColor: string, action?: () => void }[] = [
        { id: 'PhaseHeader', title: 'Eat for Your Phase', subtitle: 'Nutritional guidance for each phase', icon: ICONS.Core, color: 'bg-rose-100', textColor: 'text-rose-500' },
        { id: 'SymptomFoods', title: 'Foods for Symptoms', subtitle: 'Find foods that help with symptoms', icon: ICONS.Leaf, color: 'bg-emerald-100', textColor: 'text-emerald-500', action: () => context?.setScreen('SymptomFoods') },
        { id: 'CravingsSolutions', title: 'Cravings Solutions', subtitle: 'Healthy alternatives for cravings', icon: ICONS.Chocolate, color: 'bg-amber-100', textColor: 'text-amber-500', action: () => context?.setScreen('CravingsSolutions') },
        { id: 'MealInspiration', title: 'Weekly Meal Inspiration', subtitle: 'A simple 7-day example plan', icon: ICONS.Clipboard, color: 'bg-sky-100', textColor: 'text-sky-500', action: () => context?.setScreen('MealInspiration') },
        { id: 'Favorites', title: 'Your Favorites', subtitle: 'Saved foods and meals', icon: ICONS.Heart, color: 'bg-pink-100', textColor: 'text-pink-500', action: () => context?.setScreen('Favorites') },
    ];
    
    const phaseItems: { phase: CyclePhaseInfo['phase'], color: string }[] = [
        { phase: 'Menstrual', color: 'bg-rose-100' },
        { phase: 'Follicular', color: 'bg-emerald-100' },
        { phase: 'Ovulation', color: 'bg-amber-100' },
        { phase: 'Luteal', color: 'bg-violet-100' },
    ];

    return (
        <div className="space-y-5">
            <Header title="Nourish Your Body" backScreen="Addons" />
            <div className="p-4 space-y-4">
                 <p className="px-2 text-center text-slate-500">Discover foods that support your body's natural rhythm and help you feel your best throughout your cycle.</p>
                {menuItems.map((item, index) => (
                    <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms`}}>
                        <InfoCard 
                            title={item.title}
                            subtitle={item.subtitle}
                            icon={item.icon}
                            color={item.color}
                            textColor={item.textColor}
                            onClick={item.action || (() => {})}
                        />
                         {item.id === 'PhaseHeader' && (
                             <div className="grid grid-cols-2 gap-2 mt-2 px-4">
                                {phaseItems.map(p => (
                                    <button key={p.phase} onClick={() => handlePhaseClick(p.phase)} className={`p-2 rounded-lg font-semibold text-sm ${p.color} text-slate-700`}>{p.phase}</button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NutritionMainScreen;
