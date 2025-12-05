import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ICONS } from '../constants';
import type { Screen } from '../types';

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


const MoreHubScreen: React.FC = () => {
    const context = useContext(AppContext);

    if (!context) return null;

    const { setScreen, setAppMode, appMode, privacySettings, updatePrivacySettings } = context;

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-3xl font-bold text-slate-800 px-2">More</h1>

            <Section title="Modes & Life Stages">
                <ListItem title="Pregnancy Mode" icon={ICONS.Pregnancy} onClick={() => setScreen('PregnancyEnable')} />
                <ListItem title="Menopause Mode" icon={ICONS.Menopause} onClick={() => setScreen('MenopauseEnable')} />
                {appMode !== 'Cycle' && <ListItem title="Return to Cycle Tracking" icon={ICONS.Trends} onClick={() => setAppMode('Cycle')} />}
                <ListItem title="Sexual Wellness" icon={ICONS.SexualWellness} onClick={() => {
                    if (privacySettings.sexualWellnessEnabled) {
                        setScreen('SexualWellnessMain');
                    } else {
                        setScreen('SexualWellnessEnable');
                    }
                }} />
            </Section>
            
            <Section title="Insights & Analytics">
                 <ListItem title="Cycle History" icon={ICONS.Trends} onClick={() => setScreen('CycleHistoryMain')} />
                 <ListItem title="Symptom Correlation" icon={ICONS.Correlations} onClick={() => setScreen('SymptomCorrelationMain')} />
            </Section>
            
            <Section title="Health Management">
                <ListItem title="Medication Tracker" icon={ICONS.Medication} onClick={() => setScreen('MedicationMain')} />
            </Section>

            <Section title="Profile & Settings">
                <ListItem title="Profile & Settings" icon={ICONS.Profile} onClick={() => setScreen('Profile')} />
            </Section>
        </div>
    );
};

export default MoreHubScreen;
