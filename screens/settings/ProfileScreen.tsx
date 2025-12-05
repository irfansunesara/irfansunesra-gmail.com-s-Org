import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ICONS } from '../../constants';
import Header from '../../components/Header';
import type { Screen } from '../../types';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h2 className="px-4 text-sm font-bold uppercase tracking-wider text-rose-400 mb-2">{title}</h2>
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm overflow-hidden">
            {children}
        </div>
    </div>
);

const ListItem: React.FC<{ title: string; icon: React.FC<any>; onClick: () => void }> = ({ title, icon: Icon, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center space-x-4 p-4 text-left transition-colors hover:bg-rose-50/50 group">
        <Icon className="w-6 h-6 text-rose-500 flex-shrink-0" />
        <span className="flex-grow font-semibold">{title}</span>
        <ICONS.ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
    </button>
);

const ProfileScreen: React.FC = () => {
    const context = useContext(AppContext);

    if (!context) return null;

    const { user, setScreen } = context;

    return (
        <div>
            <Header title="Profile & Settings" backScreen="Home" />
            <div className="p-4 space-y-6">
                <div className="flex items-center space-x-4 px-2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-200 to-violet-200 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{user?.name.charAt(0)}</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl">{user?.name}</h1>
                        <p className="text-sm text-slate-500">{user?.email}</p>
                    </div>
                </div>

                <Section title="General">
                    <ListItem title="Cycle Settings" icon={ICONS.Trends} onClick={() => setScreen('CycleSettings')} />
                    <ListItem title="Notifications & Reminders" icon={ICONS.Bell} onClick={() => setScreen('ReminderSettings')} />
                </Section>

                <Section title="Customization">
                    <ListItem title="Personalization" icon={ICONS.Sparkles} onClick={() => setScreen('Personalization')} />
                    <ListItem title="Appearance & Themes" icon={ICONS.Sleep} onClick={() => setScreen('Appearance')} />
                     <ListItem title="Accessibility" icon={ICONS.Exercise} onClick={() => setScreen('Accessibility')} />
                </Section>
                
                <Section title="Account & Data">
                    <ListItem title="Privacy & Security" icon={ICONS.Privacy} onClick={() => setScreen('Privacy')} />
                    <ListItem title="Data Control" icon={ICONS.Clipboard} onClick={() => setScreen('DataControl')} />
                </Section>

                 <div className="text-center text-sm text-slate-400 space-y-1 pt-4">
                    <p>App Version 1.0.0</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;