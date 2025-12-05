import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { ICONS } from '../../constants';

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void, label: string }> = ({ checked, onChange, label }) => (
    <div className="flex items-center justify-between w-full">
        <label className="font-medium text-slate-600">{label}</label>
        <button onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-rose-400' : 'bg-slate-200'}`}>
            <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

const SexualWellnessEnableScreen: React.FC = () => {
    const context = useContext(AppContext);

    const handleEnable = () => {
        context?.updatePrivacySettings({ sexualWellnessEnabled: true });
        context?.setScreen('SexualWellnessMain');
    };

    return (
        <div className="p-6 bg-red-50 flex flex-col h-full items-center justify-center text-center">
            <ICONS.Privacy className="w-16 h-16 text-red-400 mb-4" />
            <h1 className="text-3xl font-bold text-red-800">Enable Sexual Wellness</h1>
            <p className="text-slate-600 mt-2 max-w-sm">
                This is a private, optional module to help you understand the connections between your cycle and your intimate life.
            </p>

            <Card className="w-full max-w-sm mt-8">
                <div className="space-y-4">
                    <Toggle 
                        label="Lock with Face ID / PIN"
                        checked={context?.privacySettings.faceIdEnabled || false}
                        onChange={val => context?.updatePrivacySettings({ faceIdEnabled: val })}
                    />
                    <Toggle 
                        label="Use gentle, non-explicit terms"
                        checked={context?.privacySettings.hideSensitiveTerms || false}
                        onChange={val => context?.updatePrivacySettings({ hideSensitiveTerms: val })}
                    />
                </div>
            </Card>
            
            <div className="w-full max-w-sm mt-8 space-y-3">
                <Button onClick={handleEnable} className="bg-red-500 hover:bg-red-600">
                    Enable Module
                </Button>
                <Button variant="ghost" onClick={() => context?.setScreen('MoreHub')}>
                    Not Now
                </Button>
            </div>
             <p className="text-xs text-slate-500 mt-4 max-w-sm">You can change these settings and disable this module at any time from your profile.</p>
        </div>
    );
};

export default SexualWellnessEnableScreen;