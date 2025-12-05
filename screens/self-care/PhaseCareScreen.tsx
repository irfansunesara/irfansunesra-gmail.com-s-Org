import React, { useState } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { SELF_CARE_DATA, ICONS } from '../../constants';
import type { CyclePhaseInfo } from '../../types';

const phases: CyclePhaseInfo['phase'][] = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];

const PhaseCareScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<CyclePhaseInfo['phase']>('Menstrual');
    const phaseData = SELF_CARE_DATA.PhaseCare[activeTab];
    
    return (
        <div>
            <Header title="Cycle Phase Care" backScreen="SelfCareMain" />
            <div className="p-4 space-y-4">
                <div className="flex space-x-1 bg-pink-100 p-1 rounded-full">
                    {phases.map(phase => (
                        <button 
                            key={phase} 
                            onClick={() => setActiveTab(phase)}
                            className={`w-full px-2 py-1.5 text-sm rounded-full transition-colors ${activeTab === phase ? 'bg-white text-pink-600 shadow font-semibold' : 'text-slate-500'}`}
                        >
                            {phase}
                        </button>
                    ))}
                </div>
                
                <div key={activeTab} className="animate-fade-in-up">
                    <Card>
                        <h2 className="font-bold text-xl text-pink-600 mb-3">{phaseData.title}</h2>
                        <ul className="space-y-2">
                            {phaseData.items.map(item => (
                                <li key={item} className="flex items-center space-x-3">
                                    <ICONS.Heart className="w-5 h-5 text-pink-400" />
                                    <span className="text-slate-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PhaseCareScreen;