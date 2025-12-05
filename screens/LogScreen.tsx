import React, { useState, useContext, useEffect, useRef } from 'react';
import { format, isValid } from 'date-fns';
import { AppContext } from '../context/AppContext';
import { MOODS, SYMPTOMS, ENERGY_LEVELS, CRAVINGS, ICONS } from '../constants';
import Button from '../components/Button';
import type { Symptom, Mood, EnergyLevel, Craving, SymptomDetail } from '../types';
import Header from '../components/Header';

const SectionCard: React.FC<{ title: React.ReactNode, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
        {typeof title === 'string' ? <h2 className="font-bold text-lg text-slate-700 px-1">{title}</h2> : title}
        {children}
    </div>
);

// FIX: Changed to a named export to resolve import error in App.tsx.
export const LogScreen: React.FC = () => {
    const context = useContext(AppContext);
    
    const initialDate = context?.selectedLogDate ? new Date(context.selectedLogDate) : new Date();
    const [logDate, setLogDate] = useState(initialDate);
    const dateKey = format(logDate, 'yyyy-MM-dd');

    const [mood, setMood] = useState<Mood | undefined>(context?.logData[dateKey]?.mood);
    const [symptoms, setSymptoms] = useState<Symptom[]>(context?.logData[dateKey]?.symptoms || []);
    const [symptomDetails, setSymptomDetails] = useState<Record<string, SymptomDetail>>(context?.logData[dateKey]?.symptomDetails || {});
    const [energy, setEnergy] = useState<EnergyLevel | undefined>(context?.logData[dateKey]?.energy);
    const [cravings, setCravings] = useState<Craving[]>(context?.logData[dateKey]?.cravings || []);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        return () => {
            context?.setSelectedLogDate(null);
        };
    }, [context]);

    useEffect(() => {
        const currentLog = context?.logData[dateKey];
        setMood(currentLog?.mood);
        setSymptoms(currentLog?.symptoms || []);
        setSymptomDetails(currentLog?.symptomDetails || {});
        setEnergy(currentLog?.energy);
        setCravings(currentLog?.cravings || []);
    }, [dateKey, context?.logData]);

    const toggleSymptom = (symptom: Symptom) => {
        setSymptoms(prev => {
            const isActive = prev.includes(symptom);
            if (isActive) {
                // Remove detail
                const newDetails = { ...symptomDetails };
                delete newDetails[symptom];
                setSymptomDetails(newDetails);
                return prev.filter(s => s !== symptom);
            } else {
                // Initialize detail with default severity 3
                setSymptomDetails(prevD => ({ ...prevD, [symptom]: { severity: 3, note: '' } }));
                return [...prev, symptom];
            }
        });
    };
    
    const updateSymptomDetail = (symptom: string, field: 'severity' | 'note', value: any) => {
        setSymptomDetails(prev => ({
            ...prev,
            [symptom]: { ...prev[symptom], [field]: value }
        }));
    };
    
    const toggleCraving = (craving: Craving) => {
        setCravings(prev => prev.includes(craving) ? prev.filter(c => c !== craving) : [...prev, craving]);
    };

    const handleSave = () => {
        context?.updateLogData(dateKey, { mood, symptoms, symptomDetails, energy, cravings });
        setShowConfirmation(true);
        setIsLeaving(false);
        
        setTimeout(() => {
            setIsLeaving(true);
        }, 1800);

        setTimeout(() => {
            setShowConfirmation(false);
            context?.setScreen('Home');
        }, 2100); // 1.8s pause + 0.3s fade out
    };
    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        if(isValid(newDate)) {
            const timezoneOffset = newDate.getTimezoneOffset() * 60000;
            setLogDate(new Date(newDate.getTime() + timezoneOffset));
        }
    }

    if (!context) return null;

    return (
        <div>
            <Header title="Log Symptoms & Mood" backScreen="LogHub" />
            <div className="p-4 space-y-5 relative">
                <input 
                    type="date"
                    value={format(logDate, 'yyyy-MM-dd')}
                    onChange={handleDateChange}
                    className="w-full p-3 rounded-xl border-2 border-rose-200 bg-white text-lg font-semibold focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />

                <SectionCard title="How are you feeling?">
                    <div className="grid grid-cols-5 gap-2 text-center">
                        {MOODS.map(({ emoji, label }) => (
                            <button key={label} onClick={() => setMood(label)} className="flex flex-col items-center space-y-1 group">
                                <div className={`w-12 h-12 flex items-center justify-center text-3xl rounded-full transition-all duration-200 ${mood === label ? 'bg-rose-200 scale-110 shadow-md' : 'bg-rose-50 group-hover:bg-rose-100'}`}>
                                    {emoji}
                                </div>
                                <span className={`text-xs font-medium transition-colors ${mood === label ? 'text-rose-600' : 'text-slate-500'}`}>{label}</span>
                            </button>
                        ))}
                    </div>
                </SectionCard>

                {SYMPTOMS.map(category => (
                    <SectionCard key={category.category} title={category.category + ' Symptoms'}>
                         <div className="flex flex-wrap gap-2">
                            {category.items.map(s => (
                                <button key={s} onClick={() => toggleSymptom(s)} className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 transform active:scale-95 ${symptoms.includes(s) ? 'bg-rose-500 text-white shadow-sm' : 'bg-rose-100 text-rose-700 hover:bg-rose-200'}`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </SectionCard>
                ))}
                
                {symptoms.length > 0 && (
                    <SectionCard title="Symptom Details">
                        <div className="space-y-4">
                            {symptoms.map(s => (
                                <div key={s} className="bg-rose-50 p-3 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-slate-700">{s}</span>
                                        <span className="text-xs text-rose-500 font-bold">Severity: {symptomDetails[s]?.severity || 3}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-3">
                                        {[1, 2, 3, 4, 5].map(level => (
                                            <button
                                                key={level}
                                                onClick={() => updateSymptomDetail(s, 'severity', level)}
                                                className={`flex-1 h-8 rounded-lg text-sm font-bold transition-all ${
                                                    (symptomDetails[s]?.severity || 3) === level 
                                                    ? 'bg-rose-500 text-white shadow-md scale-105' 
                                                    : 'bg-white text-rose-300 hover:bg-rose-100'
                                                }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        rows={2}
                                        placeholder="Add a specific note... (e.g., 'dull ache on right side')"
                                        value={symptomDetails[s]?.note || ''}
                                        onChange={(e) => updateSymptomDetail(s, 'note', e.target.value)}
                                        className="w-full bg-white border border-rose-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder-slate-400 resize-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                    <SectionCard title="Energy">
                         <div className="flex justify-around items-center pt-2">
                            {ENERGY_LEVELS.map(e => (
                                 <button key={e} onClick={() => setEnergy(e)} className="flex flex-col items-center space-y-2 group">
                                    <div className={`w-10 h-10 rounded-full transition-all border-2 ${energy === e ? 'bg-teal-400 border-teal-500 shadow' : 'bg-gray-100 border-transparent group-hover:border-teal-200'}`} />
                                    <span className={`text-sm font-medium transition-colors ${energy === e ? 'text-teal-600' : 'text-slate-500'}`}>{e}</span>
                                </button>
                            ))}
                        </div>
                    </SectionCard>
                     <SectionCard title="Cravings">
                         <div className="flex flex-wrap gap-2 justify-center">
                             {CRAVINGS.map(c => (
                                 <button key={c} onClick={() => toggleCraving(c)} className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${cravings.includes(c) ? 'bg-amber-400 text-white shadow-sm' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}>
                                     {c}
                                 </button>
                             ))}
                        </div>
                    </SectionCard>
                </div>

                <div className="pt-2 pb-16">
                    <Button onClick={handleSave} disabled={showConfirmation}>Save Today's Log</Button>
                </div>

                 {showConfirmation && (
                    <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 ${isLeaving ? 'animate-toast-out' : 'animate-toast-in'}`}>
                        <div className="bg-slate-800 text-white py-3 px-5 rounded-full shadow-lg flex items-center space-x-3">
                            <ICONS.Checkmark className="w-5 h-5 text-emerald-400" />
                            <span className="font-semibold">Log saved! 🌸</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};