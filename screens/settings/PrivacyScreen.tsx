import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Card from '../../components/Card';
import type { PrivacySettings, WeightSettings } from '../../types';

const SettingRow: React.FC<{ label: string; children: React.ReactNode}> = ({ label, children }) => (
    <div className="flex items-center justify-between py-3 border-b border-rose-100 last:border-b-0">
        <label className="font-medium text-slate-600">{label}</label>
        {children}
    </div>
);

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-rose-400' : 'bg-slate-200'}`}>
        <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

const PrivacyScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [tempPrivacy, setTempPrivacy] = useState<PrivacySettings>(context!.privacySettings);
    const [tempWeight, setTempWeight] = useState<WeightSettings>(context!.weightSettings);

    useEffect(() => {
        setTempPrivacy(context!.privacySettings);
        setTempWeight(context!.weightSettings);
    }, [context!.privacySettings, context!.weightSettings]);

    const handleSave = () => {
        context?.updatePrivacySettings(tempPrivacy);
        context?.updateWeightSettings(tempWeight);
        alert('Privacy settings saved!');
        context?.setScreen('Profile');
    };

    return (
        <div>
            <Header title="Privacy & Security" backScreen="Profile" />
            <div className="p-4 space-y-4">
                <Card>
                    <SettingRow label="Enable Face ID / Passcode">
                        <Toggle checked={tempPrivacy.faceIdEnabled || false} onChange={v => setTempPrivacy(p => ({...p, faceIdEnabled: v}))} />
                    </SettingRow>
                    <SettingRow label="Lock Medication Tracker">
                        <Toggle checked={tempPrivacy.lockMedicationTracker || false} onChange={v => setTempPrivacy(p => ({...p, lockMedicationTracker: v}))} />
                    </SettingRow>
                    <SettingRow label="Hide Medication Names">
                        <Toggle checked={tempPrivacy.hideMedicationNames || false} onChange={v => setTempPrivacy(p => ({...p, hideMedicationNames: v}))} />
                    </SettingRow>
                    <SettingRow label="Hide Sensitive Terms">
                        <Toggle checked={tempPrivacy.hideSensitiveTerms || false} onChange={v => setTempPrivacy(p => ({...p, hideSensitiveTerms: v}))} />
                    </SettingRow>
                    <SettingRow label="Show BMI (optional)">
                        <Toggle checked={tempWeight.showBmi || false} onChange={v => setTempWeight(p => ({ ...p, showBmi: v }))} />
                    </SettingRow>
                </Card>
                 <Card>
                    <button className="w-full text-left py-2 font-medium text-rose-600 hover:text-rose-800">Change Password</button>
                </Card>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
};

export default PrivacyScreen;
