import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Card from '../../components/Card';
import type { PersonalizationSettings } from '../../types';

const SettingRow: React.FC<{ label: string; children: React.ReactNode}> = ({ label, children }) => (
    <div className="flex items-center justify-between py-3">
        <label className="font-medium text-slate-600">{label}</label>
        {children}
    </div>
);

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-rose-400' : 'bg-slate-200'}`}>
        <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

const AccessibilityScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [tempSettings, setTempSettings] = useState<Partial<PersonalizationSettings>>({});

     useEffect(() => {
        if (context) {
            setTempSettings(context.personalizationSettings);
        }
    }, [context]);

    const handleSave = () => {
        context?.updatePersonalizationSettings(tempSettings);
        alert('Accessibility settings saved!');
        context?.setScreen('Profile');
    };

    return (
        <div>
            <Header title="Accessibility" backScreen="Profile" />
            <div className="p-4 space-y-4">
                <Card>
                    <SettingRow label="Reduce Animations">
                        <Toggle checked={tempSettings.reduceMotion || false} onChange={v => setTempSettings(p => ({...p, reduceMotion: v}))} />
                    </SettingRow>
                </Card>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
};

export default AccessibilityScreen;
