import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import type { ReminderSettings } from '../../types';

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-rose-400' : 'bg-slate-200'}`}>
        <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

const SettingRow: React.FC<{ label: string; description: string; children: React.ReactNode; icon: React.FC<any>}> = ({ label, description, children, icon: Icon }) => (
     <div className="flex justify-between items-start space-x-4 py-3 border-b border-rose-100 last:border-b-0">
        <div className="flex items-start space-x-3">
            <Icon className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
            <div>
                <h3 className="font-semibold">{label}</h3>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
        </div>
        {children}
    </div>
);

const ReminderSettingsScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [tempReminders, setTempReminders] = useState<ReminderSettings>(context!.reminderSettings);
    
    useEffect(() => {
        setTempReminders(context!.reminderSettings);
    }, [context!.reminderSettings]);

    const handleSave = () => {
        context?.updateReminderSettings(tempReminders);
        alert('Reminders saved!');
        context?.setScreen('Profile');
    };
    
    const reminderOptions = [
        { key: 'periodReminder', icon: ICONS.Bell, title: 'Period Reminder', description: 'Notify before your period starts' },
        { key: 'pmsWindowReminder', icon: ICONS.LogSymptom, title: 'PMS Window', description: 'Notify before PMS may begin' },
        { key: 'fertileWindow', icon: ICONS.Seedling, title: 'Fertile Window', description: 'Notify on your first fertile day' },
        { key: 'ovulation', icon: ICONS.Star, title: 'Ovulation Day', description: 'Notify on predicted ovulation day' },
        { key: 'bedtimeReminder', icon: ICONS.Moon, title: 'Bedtime Reminder', description: 'Remind you to wind down' },
        { key: 'bbtReminder', icon: ICONS.Temperature, title: 'BBT Reminder', description: 'Time to take your temperature' },
        { key: 'relaxationReminder', icon: ICONS.Mindfulness, title: 'Relaxation', description: 'A prompt for a mindful moment' },
    ] as const;

    return (
        <div>
            <Header title="Notifications & Reminders" backScreen="Profile" />
            <div className="p-4 space-y-4">
                <Card>
                    {reminderOptions.map(({ key, icon, title, description }) => (
                        <div key={key}>
                            <SettingRow label={title} description={description} icon={icon}>
                                <Toggle checked={tempReminders[key] || false} onChange={val => setTempReminders(p => ({...p, [key]: val}))} />
                            </SettingRow>
                            {key === 'periodReminder' && tempReminders.periodReminder && (
                                <div className="pl-10 pt-3 pb-3 border-b border-rose-100">
                                    <p className="text-sm font-medium text-slate-600 mb-2">Notify me this many days before:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {[1, 2, 3, 5, 7].map(day => (
                                            <button
                                                key={day}
                                                onClick={() => setTempReminders(p => ({ ...p, periodReminderDays: day }))}
                                                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                                    tempReminders.periodReminderDays === day
                                                        ? 'bg-rose-500 text-white font-semibold shadow-sm'
                                                        : 'bg-rose-100 text-rose-700'
                                                }`}
                                            >
                                                {day} day{day > 1 ? 's' : ''}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {key === 'bedtimeReminder' && tempReminders.bedtimeReminder && (
                                <div className="pl-10 pb-2 border-b border-rose-100">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm text-slate-500">Bedtime</label>
                                        <input type="time" value={tempReminders.bedtimeReminderTime} onChange={e => setTempReminders(p => ({ ...p, bedtimeReminderTime: e.target.value }))} className="p-1 bg-rose-50 border-rose-200 rounded-lg" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </Card>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
};

export default ReminderSettingsScreen;