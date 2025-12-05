import React, { useState } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { NUTRITION_DATA, ICONS } from '../../constants';
import type { Symptom } from '../../types';

const SymptomFoodsScreen: React.FC = () => {
    const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>('Cramps');
    const availableSymptoms = Object.keys(NUTRITION_DATA.SymptomFoods) as Symptom[];
    const foodData = selectedSymptom ? NUTRITION_DATA.SymptomFoods[selectedSymptom] : null;

    return (
        <div>
            <Header title="Foods for Symptoms" backScreen="NutritionMain" />
            <div className="p-4 space-y-5">
                <p className="text-center text-slate-500 px-2">Certain foods can help ease common cycle-related symptoms. Select a symptom to see suggestions.</p>
                
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

                {foodData && selectedSymptom && (
                    <div className="space-y-4 animate-fade-in-up">
                        <Card>
                            <h3 className="font-bold text-lg mb-3 text-emerald-600">Foods that may help</h3>
                            <div className="space-y-3">
                            {foodData.good.map(food => {
                                const Icon = ICONS[food.icon as keyof typeof ICONS];
                                return (<div key={food.name} className="flex items-center space-x-3 bg-emerald-50 p-2 rounded-lg">
                                    <Icon className="w-6 h-6 text-emerald-500" />
                                    <span className="font-semibold text-slate-700">{food.name}</span>
                                </div>);
                            })}
                            </div>
                        </Card>
                        <Card>
                            <h3 className="font-bold text-lg mb-3 text-rose-600">Foods to consider limiting</h3>
                             <div className="space-y-3">
                            {foodData.bad.map(food => {
                                const Icon = ICONS[food.icon as keyof typeof ICONS];
                                return (<div key={food.name} className="flex items-center space-x-3 bg-rose-50 p-2 rounded-lg">
                                    <Icon className="w-6 h-6 text-rose-500" />
                                    <span className="font-semibold text-slate-700">{food.name}</span>
                                </div>);
                            })}
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SymptomFoodsScreen;
