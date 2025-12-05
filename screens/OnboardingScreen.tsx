import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';
import Calendar from '../components/Calendar';
import { ICONS } from '../constants';
import type { CycleData, CycleRegularity } from '../types';

const TOTAL_STEPS = 8;

const Sparkles: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
            <div 
                key={i} 
                className="animate-sparkle" 
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1}s`,
                    backgroundColor: ['#fecdd3', '#fda4af', '#fb7185'][Math.floor(Math.random() * 3)],
                }}
            />
        ))}
    </div>
);


const ProgressBar: React.FC<{ step: number }> = ({ step }) => (
    <div className="w-full bg-rose-100 rounded-full h-1.5">
        <div 
            className="bg-rose-400 h-1.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        ></div>
    </div>
);

const NumberSelector: React.FC<{ value: number, onChange: (value: number) => void, min: number, max: number }> = ({ value, onChange, min, max }) => (
    <div className="flex items-center justify-center space-x-6">
        <button 
            onClick={() => onChange(Math.max(min, value - 1))}
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl text-rose-500 hover:bg-rose-50 transition-colors"
        >
            -
        </button>
        <span className="text-5xl font-bold text-slate-700 w-20 text-center">{value}</span>
        <button 
            onClick={() => onChange(Math.min(max, value + 1))}
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl text-rose-500 hover:bg-rose-50 transition-colors"
        >
            +
        </button>
    </div>
);

const ChoiceButton: React.FC<{ onClick: () => void, isSelected: boolean, children: React.ReactNode }> = ({ onClick, isSelected, children }) => (
    <button
        onClick={onClick}
        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
            isSelected 
                ? 'bg-rose-100 border-rose-400 shadow-md' 
                : 'bg-white border-transparent hover:border-rose-200 hover:bg-rose-50'
        }`}
    >
        <span className={`font-semibold ${isSelected ? 'text-rose-600' : 'text-slate-700'}`}>{children}</span>
    </button>
);

const Toggle: React.FC<{ checked: boolean, onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 ${checked ? 'bg-rose-400' : 'bg-slate-200'}`}>
        <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);


const OnboardingScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [step, setStep] = useState(1);
    
    const [answers, setAnswers] = useState({
        lastPeriodStart: new Date(),
        periodLength: 5,
        cycleLength: 28,
        regularity: 'Somewhat Regular' as CycleRegularity,
        reminders: {
            period: true,
            fertile: true,
            ovulation: true,
            wellness: false,
        },
        wellnessTime: '09:00',
    });

    const updateAnswer = <K extends keyof typeof answers>(key: K, value: (typeof answers)[K]) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = () => setStep(s => Math.min(TOTAL_STEPS, s + 1));
    const prevStep = () => setStep(s => Math.max(1, s - 1));

    const finishOnboarding = () => {
        const cycleData: CycleData = {
            lastPeriodStart: answers.lastPeriodStart,
            periodLength: answers.periodLength,
            cycleLength: answers.cycleLength,
            regularity: answers.regularity,
            flowLevel: 'Medium', // Default flow level
        };
        context?.completeOnboarding(cycleData);
    };

    const renderStepContent = () => {
        switch (step) {
            case 1: return (
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Welcome to your gentle cycle companion 💗</h2>
                    <p>Let’s set up a few basics to understand your unique rhythm.</p>
                </div>
            );
            case 2: return (
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">When did your last period start?</h2>
                    <Calendar selectedDate={answers.lastPeriodStart} onDateSelect={date => updateAnswer('lastPeriodStart', date)} />
                </div>
            );
            case 3: return (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-8">How many days does your period usually last?</h2>
                    <NumberSelector value={answers.periodLength} onChange={val => updateAnswer('periodLength', val)} min={1} max={10} />
                    <p className="text-sm text-slate-500 mt-8">Most women experience 4–6 days, but everyone is unique.</p>
                </div>
            );
            case 4: return (
                 <div className="text-center">
                    <h2 className="text-2xl font-bold mb-8">How long is your full cycle on average?</h2>
                    <NumberSelector value={answers.cycleLength} onChange={val => updateAnswer('cycleLength', val)} min={15} max={45} />
                    <p className="text-sm text-slate-500 mt-8">If you’re not sure, 28 is a great starting point.</p>
                </div>
            );
            case 5:
                const regularityOptions: CycleRegularity[] = ['Regular', 'Somewhat Regular', 'Irregular'];
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-center">Is your cycle usually regular?</h2>
                        <div className="space-y-3">
                            {regularityOptions.map(opt => (
                                <ChoiceButton key={opt} isSelected={answers.regularity === opt} onClick={() => updateAnswer('regularity', opt)}>
                                    {opt}
                                </ChoiceButton>
                            ))}
                        </div>
                    </div>
                );
            case 6: 
                const reminderKeys = Object.keys(answers.reminders) as (keyof typeof answers.reminders)[];
                return (
                    <div>
                         <h2 className="text-2xl font-bold mb-6 text-center">Would you like helpful reminders?</h2>
                         <div className="space-y-3">
                             {reminderKeys.map(key => (
                                 <div key={key} className="bg-white p-4 rounded-xl flex justify-between items-center">
                                     <span className="font-medium text-slate-700 capitalize">{String(key).replace(' reminder', '')}</span>
                                     <Toggle checked={answers.reminders[key]} onChange={val => updateAnswer('reminders', {...answers.reminders, [key]: val})} />
                                 </div>
                             ))}
                             {answers.reminders.wellness && (
                                <div className="bg-white p-4 rounded-xl flex justify-between items-center">
                                    <span className="font-medium text-slate-700">Wellness Time</span>
                                    <input type="time" value={answers.wellnessTime} onChange={e => updateAnswer('wellnessTime', e.target.value)} className="bg-rose-50 border-rose-200 rounded-md p-1" />
                                </div>
                             )}
                         </div>
                    </div>
                );
            case 7:
                 return (
                    <div>
                         <h2 className="text-2xl font-bold mb-6 text-center">How should we personalize your experience?</h2>
                         <div className="space-y-4">
                            <Input label="Your Name (optional)" id="name" defaultValue={context?.user?.name || ''} />
                            {/* In a real app, these preferences would be saved */}
                            <div className="bg-white p-4 rounded-xl flex justify-between items-center">
                                <span className="font-medium text-slate-700">Show gentle daily quotes</span>
                                <Toggle checked={true} onChange={() => {}} />
                            </div>
                             <div className="bg-white p-4 rounded-xl flex justify-between items-center">
                                <span className="font-medium text-slate-700">Use helpful emojis</span>
                                <Toggle checked={true} onChange={() => {}} />
                            </div>
                         </div>
                    </div>
                );
            case 8: return (
                 <div className="text-center relative">
                    <Sparkles />
                    <ICONS.Flower className="w-16 h-16 text-rose-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-4">You're all set!</h2>
                    <p>Your cycle journey begins now 🌸</p>
                </div>
            );
            default: return null;
        }
    };

    // A simple wrapper for Input to avoid prop drilling in step 7
    const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {label: string, id: string}> = ({label, id, ...props}) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-2">{label}</label>
            <input id={id} {...props} className="w-full py-3 px-4 bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400" />
        </div>
    );

    const buttonText = useMemo(() => {
        if (step === 1) return "Let's Begin";
        if (step === TOTAL_STEPS - 1) return "Finish Setup";
        if (step === TOTAL_STEPS) return "Go to Dashboard";
        return "Continue";
    }, [step]);
    
    return (
        <div className="p-6 bg-gradient-to-b from-rose-50 to-purple-50 flex flex-col h-full animate-fade-in-down">
            <div className="flex items-center space-x-4 mb-6">
                {step > 1 && (
                    <button onClick={prevStep} className="p-2 text-slate-500 hover:text-slate-800">
                        <ICONS.ChevronLeft className="w-6 h-6" />
                    </button>
                )}
                <ProgressBar step={step} />
            </div>
            
            <div className="flex-grow flex flex-col justify-center max-w-md w-full mx-auto">
                <div key={step} className="animate-fade-in-down">
                    {renderStepContent()}
                </div>
            </div>
            
            <div className="mt-8 max-w-md w-full mx-auto">
                <Button onClick={step === TOTAL_STEPS ? finishOnboarding : nextStep}>
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

export default OnboardingScreen;