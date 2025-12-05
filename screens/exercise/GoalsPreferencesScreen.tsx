import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import type { ExerciseSettings, ExerciseType } from '../../types';

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-rose-400' : 'bg-slate-200'}`}>
        <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

const SettingRow: React.FC<{ label: string; children: React.ReactNode}> = ({ label, children }) => (
    <div className="flex items-center justify-between py-2">
        <label className="font-medium text-slate-600">{label}</label>
        {children}
    </div>
);

const GoalsPreferencesScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [settings, setSettings] = useState<ExerciseSettings>(context!.exerciseSettings);

    useEffect(() => {
        setSettings(context!.exerciseSettings);
    }, [context!.exerciseSettings]);

    const handleSave = () => {
        context?.updateExerciseSettings(settings);
        alert('Preferences saved!');
    };

    const togglePreferredType = (type: ExerciseType) => {
        const currentTypes = settings.preferredTypes || [];
        const newTypes = currentTypes.includes(type)
            ? currentTypes.filter(t => t !== type)
            : [...currentTypes, type];
        setSettings(s => ({ ...s, preferredTypes: newTypes }));
    };
    
    const exerciseTypes: ExerciseType[] = ['Yoga', 'Walking', 'Cardio', 'Strength', 'Pilates', 'HIIT'];

    return (
        <div>
            <Header title="Goals & Preferences" backScreen="ExerciseMain" />
            <div className="p-4 space-y-5">
                <Card>
                    <h2 className="font-bold text-lg mb-3">Your Movement Goal</h2>
                    <SettingRow label="Workouts per week">
                         <input 
                            type="number" 
                            value={settings.weeklyGoal} 
                            onChange={e => setSettings(s => ({...s, weeklyGoal: parseInt(e.target.value)}))}
                            className="w-20 p-2 text-center bg-rose-50 border-rose-200 rounded-lg"
                            min="1" max="7"
                        />
                    </SettingRow>
                </Card>

                <Card>
                    <h2 className="font-bold text-lg mb-3">Preferred Workouts</h2>
                    <div className="flex flex-wrap gap-2">
                        {exerciseTypes.map(type => (
                            <button key={type} onClick={() => togglePreferredType(type)} className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${settings.preferredTypes.includes(type) ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'}`}>
                                {type}
                            </button>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h2 className="font-bold text-lg mb-3">Reminders</h2>
                    <SettingRow label="Movement Reminder">
                        <Toggle checked={settings.reminder} onChange={val => setSettings(s => ({...s, reminder: val}))} />
                    </SettingRow>
                    {settings.reminder && (
                        <SettingRow label="Reminder Time">
                            <input 
                                type="time" 
                                value={settings.reminderTime} 
                                onChange={e => setSettings(s => ({...s, reminderTime: e.target.value}))}
                                className="bg-rose-50 border-rose-200 rounded-md p-1"
                            />
                        </SettingRow>
                    )}
                </Card>

                <div className="pt-4">
                    <Button onClick={handleSave}>Save Preferences</Button>
                </div>
            </div>
        </div>
    );
};

export default GoalsPreferencesScreen;