import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Card from '../../components/Card';
import type { PersonalizationSettings, ToneStyle } from '../../types';

const SettingRow: React.FC<{ label: string; children: React.ReactNode}> = ({ label, children }) => (
    <div className="flex items-center justify-between py-3 border-b border-rose-100 last:border-b-0">
        <label className="font-medium text-slate-600">{label}</label>
        {children}
    </div>
);

const Selector: React.FC<{ options: {label: string, value: any}[]; value: any; onChange: (value: any) => void }> = ({ options, value, onChange}) => (
    <div className="flex items-center space-x-1 bg-rose-100 p-1 rounded-full">
        {options.map(opt => (
            <button key={opt.value} onClick={() => onChange(opt.value)} className={`px-3 py-1 text-sm rounded-full transition-colors ${value === opt.value ? 'bg-white text-rose-600 shadow-sm font-semibold' : 'text-slate-500'}`}>
                {opt.label}
            </button>
        ))}
    </div>
);

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-rose-400' : 'bg-slate-200'}`}>
        <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

const PersonalizationScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [tempPersonalization, setTempPersonalization] = useState<PersonalizationSettings>(context!.personalizationSettings);

    useEffect(() => {
        setTempPersonalization(context!.personalizationSettings);
    }, [context!.personalizationSettings]);

    const handleSave = () => {
        context?.updatePersonalizationSettings(tempPersonalization);
        alert('Personalization saved!');
        context?.setScreen('Profile');
    };

    return (
        <div>
            <Header title="Personalization" backScreen="Profile" />
            <div className="p-4 space-y-4">
                <Card>
                    <SettingRow label="Tone Style">
                        <Selector options={['Gentle', 'Friendly', 'Scientific'].map(v => ({label: v, value: v}))} value={tempPersonalization.toneStyle} onChange={v => setTempPersonalization(p => ({...p, toneStyle: v as ToneStyle}))} />
                    </SettingRow>
                    <SettingRow label="Show phase-based insights">
                        <Toggle checked={tempPersonalization.phaseInsights || false} onChange={v => setTempPersonalization(p => ({...p, phaseInsights: v}))} />
                    </SettingRow>
                    <SettingRow label="Show daily quotes">
                        <Toggle checked={tempPersonalization.dailyQuotes || false} onChange={v => setTempPersonalization(p => ({...p, dailyQuotes: v}))} />
                    </SettingRow>
                    <SettingRow label="Show helpful emojis">
                        <Toggle checked={tempPersonalization.showEmojis || false} onChange={v => setTempPersonalization(p => ({...p, showEmojis: v}))} />
                    </SettingRow>
                </Card>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
};

export default PersonalizationScreen;
