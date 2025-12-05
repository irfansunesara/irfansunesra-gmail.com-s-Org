import React, { useState, useContext } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { AppContext } from '../../context/AppContext';
import { SELF_CARE_DATA, ICONS } from '../../constants';
import type { Symptom } from '../../types';

const SymptomCareScreen: React.FC = () => {
    const context = useContext(AppContext);
    const availableSymptoms = Object.keys(SELF_CARE_DATA.SymptomCare) as Symptom[];
    const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(availableSymptoms[0]);
    const careData = selectedSymptom ? SELF_CARE_DATA.SymptomCare[selectedSymptom] : [];

    return (
        <div>
            <Header title="Symptom-Based Care" backScreen="SelfCareMain" />
            <div className="p-4 space-y-5">
                <p className="text-center text-slate-500 px-2">Find gentle remedies and relief tips for common symptoms. Select a symptom to get started.</p>
                
                <div className="flex flex-wrap justify-center gap-2 px-2">
                    {availableSymptoms.map(symptom => (
                        <button 
                            key={symptom} 
                            onClick={() => setSelectedSymptom(symptom)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${selectedSymptom === symptom ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'}`}
                        >
                            {symptom}
                        </button>
                    ))}
                </div>

                {careData.length > 0 && selectedSymptom && (
                    <div className="space-y-3 animate-fade-in-up">
                         <h2 className="font-bold text-lg px-2">Care for <span className="text-rose-600">{selectedSymptom}</span></h2>
                        {careData.map((item) => (
                            <Card key={item.id} className="flex items-center space-x-3">
                                <ICONS.Sparkles className="w-5 h-5 text-rose-400 flex-shrink-0" />
                                <p className="text-slate-700">{item.tip}</p>
                                <button onClick={() => context?.toggleFavorite(item.id)} className="ml-auto p-2">
                                     <ICONS.Heart className={`w-6 h-6 transition-colors ${context?.favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-slate-300'}`} />
                                </button>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SymptomCareScreen;