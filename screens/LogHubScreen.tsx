

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ICONS } from '../constants';
import { format } from 'date-fns';
import type { Screen } from '../types';

interface LogButtonProps {
    title: string;
    icon: React.FC<any>;
    color: string;
    textColor: string;
    onClick: () => void;
}

const LogButton: React.FC<LogButtonProps> = ({ title, icon: Icon, color, textColor, onClick }) => (
    <button onClick={onClick} className={`w-full p-6 rounded-2xl shadow-sm text-center group transition-all duration-300 ease-out active:scale-95 hover:scale-105 hover:shadow-lg ${color}`}>
        <Icon className={`w-10 h-10 mx-auto ${textColor} transition-transform duration-300 group-hover:scale-110`} />
        <p className={`mt-3 font-bold ${textColor}`}>{title}</p>
    </button>
);


const LogHubScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { appMode, setScreen, privacySettings } = context || {};
    
    const cycleLogOptions = [
        { id: 'Log', title: 'Symptoms & Mood', icon: ICONS.LogSymptom, color: 'bg-rose-100', textColor: 'text-rose-600' },
        { id: 'LogSleep', title: 'Sleep', icon: ICONS.Sleep, color: 'bg-indigo-100', textColor: 'text-indigo-600' },
        { id: 'LogHydration', title: 'Hydration', icon: ICONS.WaterDrop, color: 'bg-sky-100', textColor: 'text-sky-600' },
        { id: 'LogBbt', title: 'BBT', icon: ICONS.Temperature, color: 'bg-amber-100', textColor: 'text-amber-600' },
        { id: 'LogWeight', title: 'Weight', icon: ICONS.Weight, color: 'bg-lime-100', textColor: 'text-lime-600' },
        { id: 'MedicationMain', title: 'Medication', icon: ICONS.Medication, color: 'bg-teal-100', textColor: 'text-teal-600' },
    ];
    if(privacySettings?.sexualWellnessEnabled) {
        cycleLogOptions.push({ id: 'LogSexualActivity', title: 'Intimacy', icon: ICONS.SexualWellness, color: 'bg-red-100', textColor: 'text-red-600' });
    }

    const pregnancyLogOptions = [
        { id: 'LogPregnancySymptoms', title: 'Symptoms', icon: ICONS.LogSymptom, color: 'bg-rose-100', textColor: 'text-rose-600' },
        { id: 'KickCounter', title: 'Kick Counter', icon: ICONS.Pregnancy, color: 'bg-blue-100', textColor: 'text-blue-600' },
        { id: 'ContractionTimer', title: 'Contractions', icon: ICONS.Clock, color: 'bg-amber-100', textColor: 'text-amber-600' },
        { id: 'LogWeight', title: 'Weight', icon: ICONS.Weight, color: 'bg-lime-100', textColor: 'text-lime-600' },
        { id: 'LogSleep', title: 'Sleep', icon: ICONS.Sleep, color: 'bg-indigo-100', textColor: 'text-indigo-600' },
        { id: 'MedicationMain', title: 'Medication', icon: ICONS.Medication, color: 'bg-teal-100', textColor: 'text-teal-600' },
    ];
    
    const menopauseLogOptions = [
        { id: 'LogMenopauseSymptoms', title: 'Symptoms', icon: ICONS.LogSymptom, color: 'bg-purple-100', textColor: 'text-purple-600' },
        { id: 'LogSleep', title: 'Sleep', icon: ICONS.Sleep, color: 'bg-indigo-100', textColor: 'text-indigo-600' },
        { id: 'LogWeight', title: 'Weight', icon: ICONS.Weight, color: 'bg-lime-100', textColor: 'text-lime-600' },
        { id: 'MedicationMain', title: 'Medication', icon: ICONS.Medication, color: 'bg-teal-100', textColor: 'text-teal-600' },
    ];

    let logOptions;
    switch (appMode) {
        case 'Pregnancy': logOptions = pregnancyLogOptions; break;
        case 'Menopause': logOptions = menopauseLogOptions; break;
        case 'Cycle': default: logOptions = cycleLogOptions;
    }

    return (
        <div className="p-4 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-800">What would you like to log?</h1>
                <p className="text-slate-500 mt-1">Logging for {format(new Date(), 'MMMM d')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {logOptions.map((item, index) => (
                    <div 
                        key={item.id} 
                        className="animate-fade-in-up" 
                        style={{ animationDelay: `${index * 75}ms` }}
                    >
                        <LogButton
                            title={item.title}
                            icon={item.icon}
                            color={item.color}
                            textColor={item.textColor}
                            onClick={() => setScreen?.(item.id as Screen)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogHubScreen;
