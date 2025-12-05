import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { NUTRITION_DATA, ICONS } from '../../constants';
import type { CyclePhaseInfo } from '../../types';

const PhaseNutritionScreen: React.FC = () => {
    const context = useContext(AppContext);
    const phase = context?.selectedPhase;

    if (!phase) return null; // Or show a fallback

    const phaseData = NUTRITION_DATA[phase];

    return (
        <div className={`space-y-5 ${phaseData.theme.bg}`}>
            <Header title="Phase Nutrition" backScreen="NutritionMain" />
            <div className="p-4 space-y-5">
                <div className="text-center px-2">
                    <h2 className={`text-3xl font-bold ${phaseData.theme.text}`}>{phase} Phase</h2>
                    <p className="text-slate-600 mt-2">{phaseData.description}</p>
                </div>

                <h3 className="font-bold text-lg px-2">Foods to Focus On</h3>
                {phaseData.foods.map((item, index) => {
                    const Icon = ICONS[item.icon as keyof typeof ICONS];
                    return (
                         <div key={item.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms`}}>
                            <Card className="flex items-start space-x-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${phaseData.theme.accent}`}>
                                    {Icon && <Icon className={`w-7 h-7 ${phaseData.theme.text}`} />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                                    <p className="text-sm text-slate-600">{item.details}</p>
                                </div>
                                 <button onClick={() => context?.toggleFavorite(`food_${item.name}`)} className="ml-auto p-2">
                                     <ICONS.Heart className={`w-6 h-6 transition-colors ${context?.favorites.includes(`food_${item.name}`) ? 'fill-red-500 text-red-500' : 'text-slate-300'}`} />
                                 </button>
                            </Card>
                         </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PhaseNutritionScreen;
