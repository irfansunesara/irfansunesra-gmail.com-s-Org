import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import type { HydrationSettings } from '../../types';

const HydrationGoalsScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [settings, setSettings] = useState<HydrationSettings>(context!.hydrationSettings);

    useEffect(() => {
        setSettings(context!.hydrationSettings);
    }, [context!.hydrationSettings]);

    const handleSave = () => {
        context?.updateHydrationSettings(settings);
        alert('Goal saved! 💧');
        context?.setScreen('HydrationMain');
    };

    const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setSettings(s => ({ ...s, dailyGoal: value }));
        }
    };
    
    return (
        <div>
            <Header title="Set Daily Goal" backScreen="HydrationMain" />
            <div className="p-4 space-y-5">
                <Card>
                    <h2 className="text-lg font-bold text-center mb-4">Your Daily Hydration Goal</h2>
                    <div className="flex items-center justify-center">
                        <input 
                            type="number"
                            value={settings.dailyGoal}
                            onChange={handleGoalChange}
                            className="text-5xl font-bold text-center w-48 bg-sky-50 rounded-lg p-2 border-2 border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            step="100"
                        />
                        <span className="text-2xl font-semibold ml-2 text-slate-500">ml</span>
                    </div>
                    <p className="text-center text-sm text-slate-500 mt-4">A common recommendation is around 2000ml (about 8 cups), but listen to your body's needs.</p>
                </Card>

                <Card>
                     <h2 className="text-lg font-bold mb-3">Reminders</h2>
                     <div className="flex items-center justify-between">
                        <label className="font-medium text-slate-600">Enable Hydration Reminders</label>
                        <button onClick={() => setSettings(s => ({...s, reminder: !s.reminder}))} className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 flex-shrink-0 ${settings.reminder ? 'bg-sky-400' : 'bg-slate-200'}`}>
                             <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${settings.reminder ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                    {settings.reminder && (
                        <div className="flex items-center justify-between mt-4">
                            <label className="font-medium text-slate-600">Remind me every</label>
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="number" 
                                    value={settings.reminderFrequency} 
                                    onChange={e => setSettings(s => ({...s, reminderFrequency: parseInt(e.target.value)}))}
                                    className="w-16 p-2 text-center bg-sky-50 border-sky-200 rounded-lg"
                                    min="1" max="8"
                                />
                                <span className="font-medium">hours</span>
                            </div>
                        </div>
                    )}
                </Card>

                <div className="pt-4">
                    <Button onClick={handleSave} className="bg-sky-500 hover:bg-sky-600">Save Goal</Button>
                </div>
            </div>
        </div>
    );
};

export default HydrationGoalsScreen;