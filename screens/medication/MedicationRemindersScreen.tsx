import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import type { MedicationSettings } from '../../types';

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-teal-400' : 'bg-slate-200'}`}>
        <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

const SettingRow: React.FC<{ label: string; children: React.ReactNode}> = ({ label, children }) => (
    <div className="flex items-center justify-between py-2">
        <label className="font-medium text-slate-600">{label}</label>
        {children}
    </div>
);

const MedicationRemindersScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [settings, setSettings] = useState<MedicationSettings>(context!.medicationSettings);

    useEffect(() => {
        setSettings(context!.medicationSettings);
    }, [context!.medicationSettings]);

    const handleSave = () => {
        context?.updateMedicationSettings(settings);
        alert('Reminder settings saved!');
        context?.setScreen('MedicationMain');
    };

    return (
        <div>
            <Header title="Reminders & Refills" backScreen="MedicationMain" />
            <div className="p-4 space-y-5">
                <Card>
                    <h2 className="font-bold text-lg mb-3">General Reminders</h2>
                    <SettingRow label="Remind me to take medication">
                        <p className="text-sm text-slate-400">Coming soon</p>
                    </SettingRow>
                </Card>

                <Card>
                    <h2 className="font-bold text-lg mb-3">Refill Reminders</h2>
                    <SettingRow label="Notify me for refills">
                        <Toggle checked={settings.refillReminders} onChange={val => setSettings(s => ({...s, refillReminders: val}))} />
                    </SettingRow>
                    {settings.refillReminders && (
                        <p className="text-xs text-slate-500 mt-2">You can set quantities and refill dates when adding or editing a medication.</p>
                    )}
                </Card>

                <div className="pt-4">
                    <Button onClick={handleSave} className="bg-teal-500 hover:bg-teal-600">Save Settings</Button>
                </div>
            </div>
        </div>
    );
};

export default MedicationRemindersScreen;
