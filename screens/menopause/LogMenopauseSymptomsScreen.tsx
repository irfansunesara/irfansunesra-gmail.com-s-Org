import React, { useState, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../../context/AppContext';
import { MENOPAUSE_SYMPTOMS, ICONS } from '../../constants';
import Button from '../../components/Button';
import Header from '../../components/Header';
import type { MenopauseSymptom, MenopauseSymptomDetail, MenopauseSymptomLog } from '../../types';

const SectionCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
        <h2 className="font-bold text-lg text-slate-700 px-1">{title}</h2>
        {children}
    </div>
);

// FIX: Changed to a named export to resolve import error in App.tsx.
export const LogMenopauseSymptomsScreen: React.FC = () => {
    const context = useContext(AppContext);
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    
    const existingLog = context?.menopauseSymptomLog[dateKey];

    const [selectedSymptoms, setSelectedSymptoms] = useState<MenopauseSymptom[]>(existingLog?.symptoms || []);
    const [symptomDetails, setSymptomDetails] = useState<Record<string, MenopauseSymptomDetail>>(existingLog?.symptomDetails || {});
    const [intensity, setIntensity] = useState(existingLog?.intensity || 2);
    
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    
    useEffect(() => {
        const currentLog = context?.menopauseSymptomLog[dateKey];
        setSelectedSymptoms(currentLog?.symptoms || []);
        setSymptomDetails(currentLog?.symptomDetails || {});
        setIntensity(currentLog?.intensity || 2);
    }, [dateKey, context?.menopauseSymptomLog]);


    const toggleSymptom = (symptom: MenopauseSymptom) => {
        setSelectedSymptoms(prev => {
            const isActive = prev.includes(symptom);
            if (isActive) {
                const newDetails = { ...symptomDetails };
                delete newDetails[symptom];
                setSymptomDetails(newDetails);
                return prev.filter(s => s !== symptom);
            } else {
                setSymptomDetails(prevD => ({ ...prevD, [symptom]: { severity: 3, note: '' } }));
                return [...prev, symptom];
            }
        });
    };
    
    const updateSymptomDetail = (symptom: MenopauseSymptom, field: 'severity' | 'note', value: any) => {
        setSymptomDetails(prev => ({
            ...prev,
            [symptom]: { ...(prev[symptom] || { severity: 3, note: '' }), [field]: value }
        }));
    };

    const handleSave = () => {
        const log: MenopauseSymptomLog = { symptoms: selectedSymptoms, symptomDetails, intensity };
        context?.logMenopauseSymptom(dateKey, log);
        
        setShowConfirmation(true);
        setIsLeaving(false);
        setTimeout(() => setIsLeaving(true), 1800);
        setTimeout(() => {
            setShowConfirmation(false);
            context?.setScreen('Home');
        }, 2100);
    };

    return (
        <div className="relative h-full flex flex-col">
            <Header title="Log Menopause Symptoms" backScreen="Home" />
            <div className="p-4 space-y-5 flex-grow overflow-y-auto pb-24">
                <p className="text-center text-slate-500 -mt-3">Logging for: <strong>{format(new Date(), 'MMMM d, yyyy')}</strong></p>

                <SectionCard title="Symptoms">
                     <div className="flex flex-wrap gap-2">
                        {MENOPAUSE_SYMPTOMS.map(symptom => (
                            <button 
                                key={symptom} 
                                onClick={() => toggleSymptom(symptom)} 
                                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 transform active:scale-95 ${
                                    selectedSymptoms.includes(symptom) 
                                    ? 'bg-purple-500 text-white shadow-sm' 
                                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                }`}
                            >
                                {symptom}
                            </button>
                        ))}
                    </div>
                </SectionCard>
                
                {selectedSymptoms.length > 0 && (
                    <SectionCard title="Symptom Details">
                        <div className="space-y-4">
                            {selectedSymptoms.map(s => (
                                <div key={s} className="bg-purple-50 p-3 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-slate-700">{s}</span>
                                        <span className="text-xs text-purple-500 font-bold">Severity: {symptomDetails[s]?.severity || 3}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-3">
                                        {[1, 2, 3, 4, 5].map(level => (
                                            <button
                                                key={level}
                                                onClick={() => updateSymptomDetail(s, 'severity', level)}
                                                className={`flex-1 h-8 rounded-lg text-sm font-bold transition-all ${
                                                    (symptomDetails[s]?.severity || 3) === level 
                                                    ? 'bg-purple-500 text-white shadow-md scale-105' 
                                                    : 'bg-white text-purple-300 hover:bg-purple-100'
                                                }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        rows={2}
                                        placeholder="Add a specific note... (e.g., 'woke me up at 3am')"
                                        value={symptomDetails[s]?.note || ''}
                                        onChange={(e) => updateSymptomDetail(s, 'note', e.target.value)}
                                        className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-slate-400 resize-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                )}
                
                <SectionCard title="Overall Intensity">
                    <input type="range" min="1" max="5" value={intensity} onChange={e => setIntensity(parseInt(e.target.value))} className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>Very Mild</span>
                        <span>Moderate</span>
                        <span>Very Strong</span>
                    </div>
                </SectionCard>

            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-rose-100">
                <Button onClick={handleSave} className="bg-purple-500 hover:bg-purple-600">Save Symptoms</Button>
            </div>
             {showConfirmation && (
                 <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 ${isLeaving ? 'animate-toast-out' : 'animate-toast-in'}`}>
                    <div className="bg-slate-800 text-white py-3 px-5 rounded-full shadow-lg flex items-center space-x-3">
                        <ICONS.Checkmark className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold">Symptoms saved</span>
                    </div>
                </div>
            )}
        </div>
    );
};
