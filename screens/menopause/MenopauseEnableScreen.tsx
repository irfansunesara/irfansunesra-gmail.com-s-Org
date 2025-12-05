import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import Card from '../../components/Card';
import type { MenopauseStage } from '../../types';

const MenopauseEnableScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [stage, setStage] = useState<MenopauseStage>('Perimenopause');
    
    const stages: MenopauseStage[] = ['Perimenopause', 'Menopause', 'Postmenopause'];

    const handleEnable = () => {
        context?.enterMenopauseMode({ stage, startDate: new Date() });
    };

    return (
        <div className="p-6 bg-purple-50 flex flex-col h-full items-center justify-center text-center">
            <h1 className="text-3xl font-bold text-purple-800">Enter Menopause Mode</h1>
            <p className="text-slate-600 mt-2 max-w-sm">
                This mode will pause cycle tracking and provide tools to help you navigate your menopause journey with support and insight.
            </p>

            <Card className="w-full max-w-sm mt-8">
                <label className="font-bold text-slate-700 mb-3 block">Which stage best describes you currently?</label>
                <div className="space-y-2">
                    {stages.map(s => (
                        <button key={s} onClick={() => setStage(s)} className={`w-full p-3 rounded-lg text-left font-semibold transition-colors ${stage === s ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'}`}>
                            {s}
                        </button>
                    ))}
                </div>
            </Card>
            
            <div className="w-full max-w-sm mt-8 space-y-3">
                <Button onClick={handleEnable} className="bg-purple-500 hover:bg-purple-600">
                    Confirm & Enter Menopause Mode
                </Button>
                <Button variant="ghost" onClick={() => context?.setScreen('MoreHub')}>
                    Not Now
                </Button>
            </div>
        </div>
    );
};

export default MenopauseEnableScreen;
