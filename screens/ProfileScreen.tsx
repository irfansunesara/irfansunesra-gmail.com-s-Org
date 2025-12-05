import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';
import Card from '../components/Card';
import { ICONS } from '../constants';
import Header from '../components/Header'; // Import the reusable header
import type { CycleData, ReminderSettings, PersonalizationSettings, PrivacySettings, CycleRegularity, FlowLevel, ToneStyle, Theme, WeightSettings } from '../types';

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-rose-400' : 'bg-slate-200'}`}>
        <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
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

const SettingsCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Card>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
    </Card>
);

const ProfileScreen: React.FC = () => {
    const context = useContext(AppContext);
    
    // This component will manage a local copy of settings to be saved on-click
    const [tempCycleData, setTempCycleData] = useState<Partial<CycleData>>({});
    const [tempReminders, setTempReminders] = useState<Partial<ReminderSettings>>({});
    const [tempPersonalization, setTempPersonalization] = useState<Partial<PersonalizationSettings>>({});
    const [tempPrivacy, setTempPrivacy] = useState<Partial<PrivacySettings>>({});
    const [tempTheme, setTempTheme] = useState<Theme | undefined>();
    const [tempWeightSettings, setTempWeightSettings] = useState<Partial<WeightSettings>>({});


    // Sync local state when context changes, but only on mount to avoid overwriting user edits.
    useEffect(() => {
        if (context) {
            setTempCycleData(context.cycleData || {});
            setTempReminders(context.reminderSettings);
            setTempPersonalization(context.personalizationSettings);
            setTempPrivacy(context.privacySettings);
            setTempTheme(context.theme);
            setTempWeightSettings(context.weightSettings);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { user, logout, updateCycleData, updateReminderSettings, updatePersonalizationSettings, updatePrivacySettings, setTheme, setScreen, updateWeightSettings, runWeeklyAIJob } = context || {};

    if (!user || !tempCycleData || !tempReminders || !tempPersonalization || !tempPrivacy || !tempTheme || !tempWeightSettings) return null;

    const saveChanges = () => {
        updateCycleData?.(tempCycleData);
        updateReminderSettings?.(tempReminders);
        updatePersonalizationSettings?.(tempPersonalization);
        updatePrivacySettings?.(tempPrivacy);
        setTheme?.(tempTheme);
        updateWeightSettings?.(tempWeightSettings);
        alert('Settings saved! 🌸');
    };
    
    const reminderOptions = [
        { key: 'periodReminder', icon: ICONS.Bell, title: 'Period Reminder', description: 'Notify before your period starts' },
        { key: 'periodStart', icon: ICONS.Menstrual, title: 'Period Start Day', description: 'Notify on your predicted start day' },
        { key: 'fertileWindow', icon: ICONS.Seedling, title: 'Fertile Window', description: 'Notify on your first fertile day' },
        { key: 'ovulation', icon: ICONS.Star, title: 'Ovulation Day', description: 'Notify on predicted ovulation day' },
        { key: 'pmsWindowReminder', icon: ICONS.LogSymptom, title: 'PMS Window', description: 'Notify before PMS may begin' },
        { key: 'dailyWellness', icon: ICONS.HeartHand, title: 'Daily Wellness', description: 'A gentle check-in with yourself' },
        { key: 'logSymptom', icon: ICONS.Clipboard, title: 'Symptom Log', description: 'Remind you to log symptoms' },
        { key: 'logMood', icon: ICONS.LogMood, title: 'Mood Log', description: 'Remind you to log your mood' },
        { key: 'bedtimeReminder', icon: ICONS.Moon, title: 'Bedtime Reminder', description: 'Remind you to wind down' },
        { key: 'wakeUpReminder', icon: ICONS.Sparkles, title: 'Wake Up Reminder', description: 'Start your day gently' },
        { key: 'bbtReminder', icon: ICONS.Temperature, title: 'BBT Reminder', description: 'Time to take your temperature' },
        { key: 'relaxationReminder', icon: ICONS.Mindfulness, title: 'Relaxation Reminder', description: 'A prompt for a mindful moment' },
    ] as const;

    const themeOptions: { name: Theme, gradient: string }[] = [
        { name: 'Pastel', gradient: 'from-rose-100 to-fuchsia-100' },
        { name: 'Blossom', gradient: 'from-pink-200 to-yellow-100' },
        { name: 'Mint Calm', gradient: 'from-emerald-100 to-cyan-100' },
        { name: 'Moonlight', gradient: 'from-slate-300 to-indigo-200' },
        { name: 'Minimal White', gradient: 'from-white to-gray-100' },
    ];

    const saveButton = (
        <button onClick={saveChanges} className="px-4 py-2 bg-rose-500 text-white rounded-full font-semibold text-sm hover:bg-rose-600 transition-colors shadow">
            Save Changes
        </button>
    );

    return (
        <div className="pb-12">
            <Header title="Profile & Settings" backScreen="MoreHub" actionButton={saveButton} />

            <div className="p-4 space-y-6">
                <SettingsCard title="Personal Information">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-200 to-violet-200 flex items-center justify-center">
                             <span className="text-3xl font-bold text-white">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                            <input type="text" value={user.name} className="font-bold text-xl bg-transparent focus:bg-rose-50 p-1 rounded-md" readOnly />
                            <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                    </div>
                </SettingsCard>

                <SettingsCard title="Cycle Settings">
                    <div className="space-y-4">
                        <SettingRow label="Last Period Start">
                             <input type="date" value={tempCycleData.lastPeriodStart ? format(new Date(tempCycleData.lastPeriodStart), 'yyyy-MM-dd') : ''} onChange={e => setTempCycleData(p => ({...p, lastPeriodStart: new Date(e.target.value)}))} className="input-style" />
                        </SettingRow>
                        <SettingRow label="Typical Cycle Length">
                            <input type="number" value={tempCycleData.cycleLength || 28} onChange={e => setTempCycleData(p => ({...p, cycleLength: parseInt(e.target.value)}))} className="w-20 input-style" />
                        </SettingRow>
                        <SettingRow label="Period Length">
                             <input type="number" value={tempCycleData.periodLength || 5} onChange={e => setTempCycleData(p => ({...p, periodLength: parseInt(e.target.value)}))} className="w-20 input-style" />
                        </SettingRow>
                         <SettingRow label="Flow Level">
                            <Selector options={['Light', 'Medium', 'Heavy'].map(v => ({label: v, value: v}))} value={tempCycleData.flowLevel || 'Medium'} onChange={v => setTempCycleData(p => ({...p, flowLevel: v as FlowLevel}))} />
                        </SettingRow>
                        <SettingRow label="Cycle Regularity">
                            <Selector options={['Regular', 'Somewhat Regular', 'Irregular'].map(v => ({label: v, value: v}))} value={tempCycleData.regularity || 'Somewhat Regular'} onChange={v => setTempCycleData(p => ({...p, regularity: v as CycleRegularity}))} />
                        </SettingRow>
                    </div>
                </SettingsCard>
                
                <SettingsCard title="Reminders">
                    <div className="space-y-4">
                        {reminderOptions.map(({ key, icon: Icon, title, description }) => (
                            <div key={key}>
                                <div className="flex justify-between items-start space-x-4">
                                    <div className="flex items-start space-x-3">
                                        <Icon className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold">{title}</h3>
                                            <p className="text-sm text-slate-500">{description}</p>
                                        </div>
                                    </div>
                                    <Toggle checked={tempReminders[key] || false} onChange={val => setTempReminders(p => ({...p, [key]: val}))} />
                                </div>
                                {key === 'bedtimeReminder' && tempReminders.bedtimeReminder && (
                                    <div className="pl-8 pt-2">
                                        <SettingRow label="Bedtime">
                                            <input type="time" value={tempReminders.bedtimeReminderTime} onChange={e => setTempReminders(p => ({ ...p, bedtimeReminderTime: e.target.value }))} className="input-style" />
                                        </SettingRow>
                                    </div>
                                )}
                                 {key === 'wakeUpReminder' && tempReminders.wakeUpReminder && (
                                    <div className="pl-8 pt-2">
                                        <SettingRow label="Wake Up Time">
                                            <input type="time" value={tempReminders.wakeUpReminderTime} onChange={e => setTempReminders(p => ({ ...p, wakeUpReminderTime: e.target.value }))} className="input-style" />
                                        </SettingRow>
                                    </div>
                                )}
                                {key === 'bbtReminder' && tempReminders.bbtReminder && (
                                    <div className="pl-8 pt-2">
                                        <SettingRow label="BBT Time">
                                            <input type="time" value={tempReminders.bbtReminderTime} onChange={e => setTempReminders(p => ({ ...p, bbtReminderTime: e.target.value }))} className="input-style" />
                                        </SettingRow>
                                    </div>
                                )}
                                {key === 'relaxationReminder' && tempReminders.relaxationReminder && (
                                    <div className="pl-8 pt-2">
                                        <SettingRow label="Relaxation Time">
                                            <input type="time" value={tempReminders.relaxationTime} onChange={e => setTempReminders(p => ({ ...p, relaxationTime: e.target.value }))} className="input-style" />
                                        </SettingRow>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div>
                             <div className="flex justify-between items-start space-x-4">
                                <div className="flex items-start space-x-3">
                                    <ICONS.Weight className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold">Weight Log Reminder</h3>
                                        <p className="text-sm text-slate-500">A kind nudge to log your weight</p>
                                    </div>
                                </div>
                                <Toggle checked={tempWeightSettings.reminder || false} onChange={val => setTempWeightSettings(p => ({...p, reminder: val}))} />
                            </div>
                            {tempWeightSettings.reminder && (
                                 <div className="pl-8 pt-2">
                                    <SettingRow label="Reminder Time">
                                        <input type="time" value={tempWeightSettings.reminderTime} onChange={e => setTempWeightSettings(p => ({ ...p, reminderTime: e.target.value }))} className="input-style" />
                                    </SettingRow>
                                </div>
                            )}
                        </div>
                    </div>
                </SettingsCard>
                
                <SettingsCard title="Personalization">
                    <div className="space-y-4">
                        <SettingRow label="Tone Style">
                            <Selector options={['Gentle', 'Friendly', 'Spiritual', 'Scientific'].map(v => ({label: v, value: v}))} value={tempPersonalization.toneStyle} onChange={v => setTempPersonalization(p => ({...p, toneStyle: v as ToneStyle}))} />
                        </SettingRow>
                         <SettingRow label="Show phase-based insights">
                            <Toggle checked={tempPersonalization.phaseInsights || false} onChange={v => setTempPersonalization(p => ({...p, phaseInsights: v}))} />
                        </SettingRow>
                    </div>
                </SettingsCard>

                <SettingsCard title="Appearance & Themes">
                     <div className="grid grid-cols-2 gap-3">
                        {themeOptions.map(theme => (
                             <button key={theme.name} onClick={() => setTempTheme(theme.name)} className={`p-3 rounded-xl border-2 transition-all ${tempTheme === theme.name ? 'border-rose-400 shadow-md' : 'border-transparent'}`}>
                                <div className={`w-full h-12 rounded-lg bg-gradient-to-br ${theme.gradient}`} />
                                <p className="mt-2 text-sm font-semibold">{theme.name}</p>
                            </button>
                        ))}
                    </div>
                </SettingsCard>
                
                <SettingsCard title="Accessibility">
                     <SettingRow label="Reduce Animations">
                        <Toggle checked={tempPersonalization.reduceMotion || false} onChange={v => setTempPersonalization(p => ({...p, reduceMotion: v}))} />
                    </SettingRow>
                </SettingsCard>
                
                 <SettingsCard title="Privacy & Security">
                     <div className="space-y-4">
                        <SettingRow label="Enable Face ID / Passcode">
                             <Toggle checked={tempPrivacy.faceIdEnabled || false} onChange={v => setTempPrivacy(p => ({...p, faceIdEnabled: v}))} />
                        </SettingRow>
                        <SettingRow label="Private Mode">
                             <Toggle checked={tempPrivacy.privateMode || false} onChange={v => setTempPrivacy(p => ({...p, privateMode: v}))} />
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
                            <Toggle checked={tempWeightSettings.showBmi || false} onChange={v => setTempWeightSettings(p => ({ ...p, showBmi: v }))} />
                        </SettingRow>
                        <button className="text-rose-600 font-semibold hover:underline">Change Password</button>
                    </div>
                 </SettingsCard>
                
                 <SettingsCard title="Data Control">
                     <div className="space-y-2">
                        <button className="settings-button">Export My Data</button>
                        <button className="settings-button">Clear All Logs</button>
                        <button onClick={() => logout?.()} className="settings-button">Log Out</button>
                        <button className="settings-button text-red-500">Delete Account & Data</button>
                     </div>
                </SettingsCard>

                <SettingsCard title="Developer">
                     <div className="space-y-2">
                        <Button variant="secondary" onClick={() => runWeeklyAIJob?.()}>Run Weekly AI Analysis</Button>
                        <p className="text-xs text-slate-400 text-center mt-2">This simulates the weekly background job to update your AI profile.</p>
                     </div>
                </SettingsCard>
                
                <div className="text-center text-sm text-slate-400 space-y-1">
                    <p>App Version 1.0.0</p>
                    <div className="space-x-4">
                        <a href="#" className="hover:underline">Terms of Use</a>
                        <span>&bull;</span>
                        <a href="#" className="hover:underline">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for consistent row layout
const SettingRow: React.FC<{ label: string; children: React.ReactNode}> = ({ label, children }) => (
    <div className="flex items-center justify-between">
        <label className="font-medium text-slate-600">{label}</label>
        {children}
    </div>
);

// Add some shared styles to index.html or a global CSS file if this was a real app.
// For now, let's use a CSS-in-JS approach with Tailwind's arbitrary properties.
const _sharedStyles = `
    .input-style {
        @apply p-2 text-center bg-rose-50 border-rose-200 rounded-lg;
    }
    .settings-button {
        @apply w-full text-left py-2 px-3 hover:bg-rose-100 rounded-lg transition-colors font-medium;
    }
`;


export default ProfileScreen;