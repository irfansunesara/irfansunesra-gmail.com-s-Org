import React, { useContext } from 'react';
import { useCycle } from '../../hooks/useCycle';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import type { ExerciseIntensity, CyclePhaseInfo } from '../../types';

const INTENSITY_LEVELS: { level: ExerciseIntensity; color: string; icon: React.FC<any> }[] = [
    { level: 'Very Gentle', color: 'bg-emerald-100', icon: ICONS.Seedling },
    { level: 'Gentle', color: 'bg-sky-100', icon: ICONS.Walking },
    { level: 'Balanced', color: 'bg-amber-100', icon: ICONS.Pilates },
    { level: 'Strong', color: 'bg-rose-100', icon: ICONS.HIIT },
];

const PHASE_RECOMMENDATIONS: Record<CyclePhaseInfo['phase'], ExerciseIntensity[]> = {
    Menstrual: ['Very Gentle', 'Gentle'],
    Follicular: ['Gentle', 'Balanced'],
    Ovulation: ['Balanced', 'Strong'],
    Luteal: ['Gentle', 'Balanced'],
};

const IntensityGuideScreen: React.FC = () => {
    const { currentPhase } = useCycle();
    const recommendedLevels = PHASE_RECOMMENDATIONS[currentPhase];

    return (
        <div>
            <Header title="Workout Intensity Guide" backScreen="ExerciseMain" />
            <div className="p-4 space-y-5">
                <p className="text-center text-slate-500 px-2">
                    Your energy shifts throughout your cycle. Use this guide to choose an intensity that honors your body's current needs.
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                    {INTENSITY_LEVELS.map(({ level, color, icon: Icon }, index) => {
                        const isRecommended = recommendedLevels.includes(level);
                        return (
                             <div key={level} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms`}}>
                                <Card className={`text-center transition-all duration-300 ${isRecommended ? 'border-2 border-rose-400 shadow-lg' : ''}`}>
                                    <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mx-auto mb-3`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-bold">{level}</h3>
                                     {isRecommended && <p className="text-xs font-semibold text-rose-500 mt-1">Recommended</p>}
                                </Card>
                             </div>
                        );
                    })}
                </div>

                <Card>
                    <h2 className="font-bold text-lg mb-2">Today's Recommendation</h2>
                    <p className="text-sm text-slate-600">
                        You are in your <strong className="text-rose-500">{currentPhase} phase</strong>. 
                        Your body will likely respond best to <strong className="text-rose-500">{recommendedLevels.join(' or ')}</strong> intensity workouts. 
                        Always listen to your body first!
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default IntensityGuideScreen;