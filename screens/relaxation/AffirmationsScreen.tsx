import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useCycle } from '../../hooks/useCycle';
import { RELAXATION_DATA } from '../../constants';

const Sparkles: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
            <div 
                key={i} 
                className="animate-sparkle" 
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    backgroundColor: ['#fecdd3', '#fda4af', '#fb7185'][Math.floor(Math.random() * 3)],
                }}
            />
        ))}
    </div>
);

const AffirmationsScreen: React.FC = () => {
    const { currentPhase } = useCycle();
    const affirmation = RELAXATION_DATA.Affirmations[currentPhase];

    return (
        <div className="bg-gradient-to-b from-pink-100 to-rose-100 h-full">
            <Header title="Daily Affirmation" backScreen="RelaxationMain" />
            <div className="p-4 flex-grow flex items-center justify-center">
                <Card className="relative text-center max-w-sm w-full shadow-xl">
                    <Sparkles />
                    <p className="text-sm font-semibold text-rose-500">For your {currentPhase} Phase</p>
                    <p className="text-2xl font-bold text-slate-700 mt-4 leading-relaxed">
                        "{affirmation}"
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default AffirmationsScreen;