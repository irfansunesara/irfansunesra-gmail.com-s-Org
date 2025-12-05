import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useCycle } from '../../hooks/useCycle';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { EXERCISE_DATA, ICONS } from '../../constants';
import type { CyclePhaseInfo } from '../../types';

const PhaseExerciseScreen: React.FC = () => {
    const { currentPhase } = useCycle();
    const phaseData = EXERCISE_DATA[currentPhase];

    if (!phaseData) return null;

    return (
        <div className={`space-y-5 ${phaseData.theme.bg}`}>
            <Header title="Exercise for Your Phase" backScreen="ExerciseMain" />
            <div className="p-4 space-y-5">
                <div className="text-center px-2">
                    <h2 className={`text-3xl font-bold ${phaseData.theme.text}`}>{phaseData.title}</h2>
                    <p className="text-slate-600 mt-2">{phaseData.description}</p>
                </div>

                <h3 className="font-bold text-lg px-2">Suggestions for You</h3>
                {phaseData.suggestions.map((item, index) => {
                    const Icon = ICONS[item.icon as keyof typeof ICONS];
                    return (
                         <div key={item.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms`}}>
                            <Card className="flex items-start space-x-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${phaseData.theme.accent}`}>
                                    <Icon className={`w-7 h-7 ${phaseData.theme.text}`} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                                    <p className="text-sm text-slate-600">{item.details}</p>
                                </div>
                            </Card>
                         </div>
                    );
                })}

                <Card className={`bg-gradient-to-br ${phaseData.theme.accent} from-white/50`}>
                     <div className="flex items-start space-x-3">
                        <ICONS.Sparkles className={`w-6 h-6 ${phaseData.theme.text} flex-shrink-0`} />
                        <div>
                            <h3 className="font-bold text-lg">A Gentle Tip</h3>
                            <p className="text-sm text-slate-600">{phaseData.tip}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PhaseExerciseScreen;