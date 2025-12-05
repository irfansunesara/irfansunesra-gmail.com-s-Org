import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { MEDICATION_TYPES } from '../../constants';
import type { Medication, MedicationScheduleType, MedicationType } from '../../types';

const Selector: React.FC<{ options: string[], value: string, onChange: (value: any) => void }> = ({ options, value, onChange}) => (
    <div className="flex flex-wrap gap-2">
        {options.map(opt => (
            <button key={opt} onClick={() => onChange(opt)} className={`px-3 py-1.5 text-sm rounded-full transition-colors ${value === opt ? 'bg-teal-500 text-white font-semibold' : 'bg-teal-100 text-teal-700'}`}>
                {opt}
            </button>
        ))}
    </div>
);

const AddMedicationScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [med, setMed] = useState<Partial<Medication>>({
        name: '',
        type: 'Pill',
        dosage: '',
        schedule: 'Daily',
        times: ['09:00'],
        purpose: '',
    });

    const updateField = <K extends keyof Medication>(key: K, value: Medication[K]) => {
        setMed(prev => ({ ...prev, [key]: value }));
    };

    const handleTimeChange = (index: number, value: string) => {
        const newTimes = [...(med.times || [])];
        newTimes[index] = value;
        updateField('times', newTimes);
    };
    
    const addTime = () => {
        updateField('times', [...(med.times || []), '17:00']);
    };

    const removeTime = (index: number) => {
        updateField('times', (med.times || []).filter((_, i) => i !== index));
    };
    
    const handleSave = () => {
        if (!med.name || !med.dosage) {
            alert('Please fill in the medication name and dosage.');
            return;
        }
        const newMed: Medication = {
            id: Date.now().toString(),
            ...med
        } as Medication;
        
        context?.addMedication(newMed);
        context?.setScreen('MedicationMain');
    };

    return (
        <div>
            <Header title="Add Medication" backScreen="MedicationMain" />
            <div className="p-4 space-y-4">
                <Card>
                    <Input id="name" label="Medication Name" placeholder="e.g., Vitamin D" value={med.name} onChange={e => updateField('name', e.target.value)} />
                </Card>
                <Card>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Type</label>
                    <Selector options={MEDICATION_TYPES} value={med.type!} onChange={v => updateField('type', v)} />
                </Card>
                <Card>
                    <Input id="dosage" label="Dosage" placeholder="e.g., 1 tablet, 50mg" value={med.dosage} onChange={e => updateField('dosage', e.target.value)} />
                </Card>
                 <Card>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Schedule</label>
                    <Selector options={['Daily', 'Weekly', 'As Needed', 'Cycle-Based']} value={med.schedule!} onChange={v => updateField('schedule', v as MedicationScheduleType)} />
                    {med.schedule === 'Daily' && (
                        <div className="mt-4 space-y-2">
                             {(med.times || []).map((time, index) => (
                                 <div key={index} className="flex items-center space-x-2">
                                     <input type="time" value={time} onChange={e => handleTimeChange(index, e.target.value)} className="w-full bg-teal-50 rounded-lg p-2 border-teal-200" />
                                     <button onClick={() => removeTime(index)} className="text-red-500">✕</button>
                                 </div>
                             ))}
                             <button onClick={addTime} className="text-sm font-semibold text-teal-600">+ Add another time</button>
                        </div>
                    )}
                </Card>
                <Card>
                     <Input id="purpose" label="Purpose (Optional)" placeholder="e.g., For bone health" value={med.purpose} onChange={e => updateField('purpose', e.target.value)} />
                </Card>
                <div className="pt-4">
                    <Button onClick={handleSave} className="bg-teal-500 hover:bg-teal-600">Save Medication</Button>
                </div>
            </div>
        </div>
    );
};

export default AddMedicationScreen;
