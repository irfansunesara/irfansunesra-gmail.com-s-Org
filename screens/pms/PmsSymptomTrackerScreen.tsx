import React, { useState, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../../context/AppContext';
import { PMS_SYMPTOMS, ICONS } from '../../constants';
import Button from '../../components/Button';
import Header from '../../components/Header';
import type { PmsSymptom } from '../../types';

const SectionCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
        <h2 className="font-bold text-lg text-slate-700 px-1">{title}</h2>
        {children}
    </div>
);

const PmsSymptomTrackerScreen: React.FC = () => {
    const context = useContext(AppContext);
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    
    const [selectedSymptoms, setSelectedSymptoms] = useState<PmsSymptom[]>(context?.logData[dateKey]?.pmsSymptoms || []);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        setSelectedSymptoms(context?.logData[dateKey]?.pmsSymptoms || []);
    }, [context?.logData, dateKey]);

    const toggleSymptom = (symptom: PmsSymptom) => {
        setSelectedSymptoms(prev => prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]);
    };

    const handleSave = () => {
        context?.updateLogData(dateKey, { pmsSymptoms: selectedSymptoms });
        setShowConfirmation(true);
        setIsLeaving(false);
        
        setTimeout(() => {
            setIsLeaving(true);
        }, 1800);

        setTimeout(() => {
            setShowConfirmation(false);
            context?.setScreen('PmsInsightsMain');
        }, 2100);
    };

    return (
        <div className="relative h-full flex flex-col">
            <Header title="Track PMS Symptoms" backScreen="PmsInsightsMain" />
            <div className="p-4 space-y-5 flex-grow overflow-y-auto pb-24">
                <p className="text-center text-slate-500 -mt-3">Logging for: <strong>{format(new Date(), 'MMMM d, yyyy')}</strong></p>

                {PMS_SYMPTOMS.map(category => (
                    <SectionCard key={category.category} title={category.category}>
                         <div className="flex flex-wrap gap-2">
                            {category.items.map(symptom => (
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
                    </SectionCard>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-rose-100">
                <Button onClick={handleSave} disabled={showConfirmation}>Save Symptoms</Button>
            </div>
            
            {showConfirmation && (
                 <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 ${isLeaving ? 'animate-toast-out' : 'animate-toast-in'}`}>
                    <div className="bg-slate-800 text-white py-3 px-5 rounded-full shadow-lg flex items-center space-x-3">
                        <ICONS.Checkmark className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold">Symptoms saved 💗</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PmsSymptomTrackerScreen;
