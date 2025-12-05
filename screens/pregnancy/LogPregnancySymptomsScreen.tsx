import React, { useState, useContext } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../../context/AppContext';
import { PREGNANCY_SYMPTOMS, ICONS } from '../../constants';
import Button from '../../components/Button';
import Header from '../../components/Header';
import type { PregnancySymptom } from '../../types';

const LogPregnancySymptomsScreen: React.FC = () => {
    const context = useContext(AppContext);
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    
    const [selectedSymptoms, setSelectedSymptoms] = useState<PregnancySymptom[]>(context?.pregnancySymptomLog[dateKey] || []);
    
    const toggleSymptom = (symptom: PregnancySymptom) => {
        setSelectedSymptoms(prev => prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]);
    };

    const handleSave = () => {
        // In a real app, this would be context?.logPregnancySymptoms(dateKey, selectedSymptoms);
        alert('Symptoms saved!');
        context?.setScreen('Home');
    };

    return (
        <div className="relative h-full flex flex-col">
            <Header title="Log Pregnancy Symptoms" backScreen="Home" />
            <div className="p-4 space-y-5 flex-grow overflow-y-auto pb-24">
                 <p className="text-center text-slate-500 -mt-3">Logging for: <strong>{format(new Date(), 'MMMM d, yyyy')}</strong></p>
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <h2 className="font-bold text-lg text-slate-700 px-1 mb-3">Common Symptoms</h2>
                    <div className="flex flex-wrap gap-2">
                        {PREGNANCY_SYMPTOMS.map(symptom => (
                            <button 
                                key={symptom} 
                                onClick={() => toggleSymptom(symptom)} 
                                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 transform active:scale-95 ${
                                    selectedSymptoms.includes(symptom) 
                                    ? 'bg-rose-500 text-white shadow-sm' 
                                    : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                                }`}
                            >
                                {symptom}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-rose-100">
                <Button onClick={handleSave}>Save Symptoms</Button>
            </div>
        </div>
    );
};

export default LogPregnancySymptomsScreen;
