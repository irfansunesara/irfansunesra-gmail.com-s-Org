import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useCycle } from '../../hooks/useCycle';
import { format } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { EXERCISE_DATA, ICONS } from '../../constants';

const DailyMovementScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { currentPhase } = useCycle();
    
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    const energyLevel = context?.logData[dateKey]?.energy || 'Medium';
    
    const phaseData = EXERCISE_DATA[currentPhase];
    
    // Simple logic to pick a suggestion
    let suggestion;
    if (energyLevel === 'Low') {
        suggestion = phaseData.suggestions[phaseData.suggestions.length - 1]; // Pick the most gentle one
    } else if (energyLevel === 'High') {
        suggestion = phaseData.suggestions[0]; // Pick the most energetic one
    } else {
        suggestion = phaseData.suggestions[Math.floor(phaseData.suggestions.length / 2)]; // Pick the middle one
    }
    
    const Icon = ICONS[suggestion.icon as keyof typeof ICONS];

    return (
        <div>
            <Header title="Daily Movement" backScreen="ExerciseMain" />
            <div className="p-4 space-y-5">
                <div className="text-center px-2">
                    <h2 className="text-2xl font-bold">Today's Suggestion</h2>
                    <p className="text-slate-500 mt-1">Based on your {currentPhase} phase and {energyLevel} energy.</p>
                </div>
                
                <Card className={`bg-gradient-to-br ${phaseData.theme.accent} from-white/50 shadow-lg`}>
                    <div className="text-center p-4">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-white/50`}>
                             <Icon className={`w-12 h-12 ${phaseData.theme.text}`} />
                        </div>
                        <h3 className="text-2xl font-bold">{suggestion.name}</h3>
                        <p className="text-slate-600 mt-2">{suggestion.details}</p>
                    </div>
                </Card>
                
                <Card>
                    <h3 className="font-bold text-lg mb-2">Why this movement?</h3>
                    <p className="text-sm text-slate-600">
                        During the <strong className={phaseData.theme.text}>{currentPhase} phase</strong>, your body responds well to this type of activity. 
                        Since you're feeling <strong className={phaseData.theme.text}>{energyLevel} energy</strong>, this suggestion is tailored to support you without causing extra stress.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default DailyMovementScreen;