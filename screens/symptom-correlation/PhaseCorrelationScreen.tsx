import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useSymptomCorrelation } from '../../hooks/useSymptomCorrelation';
import type { Symptom, CyclePhaseInfo } from '../../types';

const PhaseCorrelationScreen: React.FC = () => {
    const { logCount, topSymptoms, phaseCorrelations } = useSymptomCorrelation();
    const phases: CyclePhaseInfo['phase'][] = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];
    const phaseColors: Record<CyclePhaseInfo['phase'], string> = {
        Menstrual: 'bg-rose-300',
        Follicular: 'bg-violet-300',
        Ovulation: 'bg-emerald-300',
        Luteal: 'bg-orange-300',
    };

    if (logCount < 5) {
        return (
             <div>
                <Header title="Cycle Phase Correlations" backScreen="SymptomCorrelationMain" />
                <div className="p-4 text-center">
                    <Card><p className="text-slate-500">Log symptoms for a few more days to see your personalized correlations here. 🌸</p></Card>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header title="Cycle Phase Correlations" backScreen="SymptomCorrelationMain" />
            <div className="p-4 space-y-5">
                <p className="px-2 text-center text-slate-500">See when your most common symptoms tend to appear during your cycle.</p>
                {topSymptoms.map(symptom => {
                    const symptomData = phaseCorrelations[symptom];
                    // FIX: Cast the result of Object.values to number[] to fix reduce operation.
                    const totalCount = (Object.values(symptomData) as number[]).reduce((a, b) => a + b, 0);
                    if (totalCount === 0) return null;

                    return (
                        <Card key={symptom}>
                            <h2 className="font-bold text-lg mb-3 text-fuchsia-600">{symptom}</h2>
                            <div className="space-y-2">
                                {phases.map(phase => {
                                    const count = symptomData[phase];
                                    const percentage = (count / totalCount) * 100;
                                    return (
                                        <div key={phase} className="flex items-center space-x-3">
                                            <span className="w-24 text-sm font-medium text-slate-500">{phase}</span>
                                            <div className="flex-grow bg-slate-100 rounded-full h-5">
                                                <div 
                                                    className={`h-5 rounded-full ${phaseColors[phase]} transition-all duration-500`}
                                                    style={{ width: `${percentage}%`}}
                                                />
                                            </div>
                                            <span className="w-10 text-sm font-semibold text-slate-600 text-right">{percentage.toFixed(0)}%</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default PhaseCorrelationScreen;
