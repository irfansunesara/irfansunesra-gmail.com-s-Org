import React, { useState } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { RELAXATION_DATA } from '../../constants';

const StressCheckScreen: React.FC = () => {
    const [stressLevel, setStressLevel] = useState(3); // 1-5 scale
    const [suggestion, setSuggestion] = useState<string | null>(null);

    const handleCheckIn = () => {
        if (stressLevel > 3) {
            setSuggestion(RELAXATION_DATA.MoodResets[0].title);
        } else {
            setSuggestion(RELAXATION_DATA.Breathing[0].title);
        }
    };

    return (
        <div>
            <Header title="Stress Check-In" backScreen="RelaxationMain" />
            <div className="p-4 space-y-5 text-center">
                <p className="px-2 text-slate-500">Take a moment to check in with yourself. How are you feeling right now?</p>
                <Card>
                    <h2 className="font-bold text-lg mb-4">Current Stress Level</h2>
                    <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        value={stressLevel} 
                        onChange={e => setStressLevel(parseInt(e.target.value))} 
                        className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-xs font-medium text-slate-500 mt-2">
                        <span>Very Low</span>
                        <span>High</span>
                    </div>
                </Card>
                
                <Button onClick={handleCheckIn}>Get a Suggestion</Button>

                {suggestion && (
                    <div className="animate-fade-in-up">
                        <Card>
                            <h3 className="font-semibold text-slate-600">A gentle suggestion for you:</h3>
                            <p className="font-bold text-xl text-rose-500 mt-2">{suggestion}</p>
                            <p className="text-sm text-slate-500 mt-2">You can find this in the Relaxation library.</p>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StressCheckScreen;