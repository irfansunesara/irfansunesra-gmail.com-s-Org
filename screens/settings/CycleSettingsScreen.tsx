import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Card from '../../components/Card';
import type { CycleData, CycleRegularity, FlowLevel, WeightSettings } from '../../types';

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

const CycleSettingsScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [tempCycleData, setTempCycleData] = useState<Partial<CycleData>>({});
    const [tempWeightSettings, setTempWeightSettings] = useState<Partial<WeightSettings>>({});

    useEffect(() => {
        if (context) {
            setTempCycleData(context.cycleData || {});
            setTempWeightSettings(context.weightSettings || {});
        }
    }, [context]);

    const handleSave = () => {
        context?.updateCycleData(tempCycleData);
        context?.updateWeightSettings(tempWeightSettings);
        alert('Cycle settings saved!');
        context?.setScreen('Profile');
    };

    return (
        <div>
            <Header title="Cycle Settings" backScreen="Profile" />
            <div className="p-4 space-y-4">
                <Card>
                    <div className="space-y-1">
                        <SettingRow label="Last Period Start">
                             <input type="date" value={tempCycleData.lastPeriodStart ? format(new Date(tempCycleData.lastPeriodStart), 'yyyy-MM-dd') : ''} onChange={e => setTempCycleData(p => ({...p, lastPeriodStart: new Date(e.target.value)}))} className="p-1 bg-rose-50 border-rose-200 rounded-lg text-right" />
                        </SettingRow>
                        <SettingRow label="Typical Cycle Length">
                            <input type="number" value={tempCycleData.cycleLength || 28} onChange={e => setTempCycleData(p => ({...p, cycleLength: parseInt(e.target.value)}))} className="w-20 p-1 text-center bg-rose-50 border-rose-200 rounded-lg" />
                        </SettingRow>
                        <SettingRow label="Period Length">
                             <input type="number" value={tempCycleData.periodLength || 5} onChange={e => setTempCycleData(p => ({...p, periodLength: parseInt(e.target.value)}))} className="w-20 p-1 text-center bg-rose-50 border-rose-200 rounded-lg" />
                        </SettingRow>
                         <SettingRow label="Flow Level">
                            <Selector options={['Light', 'Medium', 'Heavy'].map(v => ({label: v, value: v}))} value={tempCycleData.flowLevel || 'Medium'} onChange={v => setTempCycleData(p => ({...p, flowLevel: v as FlowLevel}))} />
                        </SettingRow>
                        <SettingRow label="Cycle Regularity">
                            <Selector options={['Regular', 'Somewhat Regular', 'Irregular'].map(v => ({label: v, value: v}))} value={tempCycleData.regularity || 'Somewhat Regular'} onChange={v => setTempCycleData(p => ({...p, regularity: v as CycleRegularity}))} />
                        </SettingRow>
                         <SettingRow label="Weight Unit">
                            <Selector options={['lbs', 'kg'].map(v => ({label: v, value: v}))} value={tempWeightSettings.unit || 'lbs'} onChange={v => setTempWeightSettings(p => ({...p, unit: v as 'lbs' | 'kg'}))} />
                        </SettingRow>
                    </div>
                </Card>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
};

export default CycleSettingsScreen;
