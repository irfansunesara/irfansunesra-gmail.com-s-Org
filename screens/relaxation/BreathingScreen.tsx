import React, { useState, useEffect, useMemo, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { format } from 'date-fns';
import Header from '../../components/Header';
import { RELAXATION_DATA } from '../../constants';
import type { RelaxationLog } from '../../types';

const BreathingScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [selectedExercise, setSelectedExercise] = useState(RELAXATION_DATA.Breathing[0]);
    const [isBreathing, setIsBreathing] = useState(false);
    const [prompt, setPrompt] = useState('Get Ready');
    const [timer, setTimer] = useState(0);

    const fullCycleTime = useMemo(() => {
        const { inhale, hold, exhale, hold2 } = selectedExercise.pattern;
        return (inhale || 0) + (hold || 0) + (exhale || 0) + (hold2 || 0);
    }, [selectedExercise]);

    useEffect(() => {
        let interval: number;
        if (isBreathing) {
            setTimer(0); // Reset timer on start
            const runCycle = () => {
                const { inhale, hold, exhale, hold2 } = selectedExercise.pattern;
                setPrompt('Breathe In...');
                setTimeout(() => {
                    if (hold) setPrompt('Hold');
                    setTimeout(() => {
                        setPrompt('Breathe Out...');
                        setTimeout(() => {
                            if (hold2) setPrompt('Hold');
                        }, exhale * 1000);
                    }, (hold || 0) * 1000);
                }, inhale * 1000);
            };

            runCycle(); // Initial cycle
            interval = window.setInterval(runCycle, fullCycleTime * 1000);
        } else {
            setPrompt('Select an Exercise');
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isBreathing, selectedExercise, fullCycleTime]);
    
    useEffect(() => {
        let timerInterval: number;
        if(isBreathing) {
            timerInterval = window.setInterval(() => {
                setTimer(t => t + 1);
            }, 1000);
        }
        return () => {
            if (timerInterval) clearInterval(timerInterval);
        }
    }, [isBreathing]);

    const stopBreathing = () => {
        setIsBreathing(false);
        if (timer > 10) { // Only log if they did it for a bit
            const log: RelaxationLog = {
                type: 'Breathing',
                duration: Math.round(timer / 60),
                completedAt: new Date().toISOString()
            };
            context?.logRelaxation(format(new Date(), 'yyyy-MM-dd'), log);
        }
        setTimer(0);
    }

    return (
        <div className="bg-gradient-to-b from-sky-100 to-teal-100 h-full flex flex-col">
            <Header title="Breathing" backScreen="RelaxationMain" />
            <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <div 
                    className="w-56 h-56 rounded-full bg-white/50 flex items-center justify-center transition-all duration-300"
                    style={{ animation: isBreathing ? `breathe ${fullCycleTime}s ease-in-out infinite` : 'none' }}
                >
                    <div className="w-48 h-48 rounded-full bg-white/70 flex items-center justify-center">
                        <span className="text-2xl font-bold text-teal-700">{prompt}</span>
                    </div>
                </div>
                
                 <p className="mt-4 font-semibold text-slate-600">{timer > 0 ? `${Math.floor(timer/60)}m ${timer%60}s` : selectedExercise.title}</p>
                 <p className="text-sm text-slate-500">{selectedExercise.description}</p>
            </div>
            
            <div className="p-4 space-y-2">
                 {!isBreathing && (
                    <div className="flex space-x-2 bg-white/50 p-1 rounded-full">
                        {RELAXATION_DATA.Breathing.map(ex => (
                             <button 
                                key={ex.id} 
                                onClick={() => setSelectedExercise(ex)}
                                className={`w-full px-2 py-1.5 text-sm rounded-full transition-colors ${selectedExercise.id === ex.id ? 'bg-white text-sky-600 shadow font-semibold' : 'text-slate-500'}`}
                            >
                                {ex.title}
                            </button>
                        ))}
                    </div>
                 )}
                <button 
                    onClick={() => isBreathing ? stopBreathing() : setIsBreathing(true)}
                    className={`w-full py-4 rounded-full font-bold text-white text-lg transition-colors ${isBreathing ? 'bg-red-400' : 'bg-sky-500'}`}
                >
                    {isBreathing ? 'Stop' : 'Begin'}
                </button>
            </div>
        </div>
    );
};

export default BreathingScreen;