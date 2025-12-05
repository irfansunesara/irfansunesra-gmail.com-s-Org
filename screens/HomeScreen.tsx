

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useCycle } from '../hooks/useCycle';
import Card from '../components/Card';
import { format, subDays } from 'date-fns';
import { ICONS } from '../constants';
import type { CyclePhaseInfo } from '../types';
import PregnancyMainScreen from './pregnancy/PregnancyMainScreen';
import MenopauseMainScreen from './menopause/MenopauseMainScreen';

const phaseInfo: Record<CyclePhaseInfo['phase'], {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    bgColor: string;
    textColor: string;
}> = {
    Menstrual: { icon: ICONS.Menstrual, bgColor: 'bg-rose-100', textColor: 'text-rose-600' },
    Follicular: { icon: ICONS.Follicular, bgColor: 'bg-violet-100', textColor: 'text-violet-600' },
    Ovulation: { icon: ICONS.Ovulation, bgColor: 'bg-emerald-100', textColor: 'text-emerald-600' },
    Luteal: { icon: ICONS.Luteal, bgColor: 'bg-orange-100', textColor: 'text-orange-600' },
};

const ActionButton: React.FC<{
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
    onClick: () => void;
    className?: string;
}> = ({ icon: Icon, label, onClick, className }) => (
    <button onClick={onClick} className="flex flex-col items-center space-y-2 group transition-transform duration-200 active:scale-95">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:scale-105 ${className}`}>
            <Icon className="w-8 h-8 text-white" />
        </div>
        <span className="text-sm font-medium text-slate-600 group-hover:text-rose-500 transition-colors">{label}</span>
    </button>
);

const CycleHome: React.FC = () => {
    const context = useContext(AppContext);
    const { user, setScreen, updateLogData, sleepLog, hydrationLog, hydrationSettings, aiInsights, logData } = context || {};
    const { isReady, daysUntilNextPeriod, nextPeriodDate, nextPeriodDateRange, cycleData, currentPhase } = useCycle();
    
    const todayKey = format(new Date(), 'yyyy-MM-dd');
    const todaySleep = sleepLog?.[todayKey];
    const todayHydration = hydrationLog?.[todayKey];
    const todayInsight = aiInsights?.find(insight => insight.date === todayKey);

    if (!isReady || !user || !cycleData) {
        return <div className="p-6 text-center">Loading your cycle data...</div>;
    }

    const CurrentPhaseIcon = phaseInfo[currentPhase].icon;
    
    const handleLogPeriod = () => {
        if (!updateLogData || !logData) return;
        
        const today = new Date();
        const yesterdayKey = format(subDays(today, 1), 'yyyy-MM-dd');
        const yesterdayLog = logData[yesterdayKey];

        // If yesterday was a period day, today is 'flow'. Otherwise, it's the 'start'.
        const periodStatus = yesterdayLog?.period ? 'flow' : 'start';

        updateLogData(format(today, 'yyyy-MM-dd'), { period: periodStatus });
        alert('Period logged for today!');
    };

    return (
        <div className="p-4 space-y-5">
            <div className="px-2 animate-fade-in-up">
                <h1 className="text-3xl font-bold">Hi, {user.name} 💗</h1>
                <div className={`mt-2 inline-flex items-center space-x-2 px-3 py-1 rounded-full ${phaseInfo[currentPhase].bgColor}`}>
                    <CurrentPhaseIcon className={`w-4 h-4 ${phaseInfo[currentPhase].textColor}`} />
                    <span className={`text-sm font-semibold ${phaseInfo[currentPhase].textColor}`}>{currentPhase} Phase</span>
                </div>
            </div>

            {todayInsight && (
                <div className="animate-fade-in-up" style={{ animationDelay: '50ms' }}>
                    <Card className="bg-violet-100 border border-violet-200">
                        <div className="flex items-start space-x-3">
                            <ICONS.Sparkles className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-violet-700">Insight for Today</h3>
                                <p className="text-sm text-slate-600">{todayInsight.text}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <Card className="bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg">
                    <div className="text-center p-4">
                        {(cycleData.regularity === 'Irregular' || nextPeriodDateRange) ? (
                            <>
                                <p className="font-semibold text-lg opacity-90">Next period expected between</p>
                                <p className="text-sm font-bold bg-white/20 px-3 py-1.5 rounded-full inline-block mt-3">
                                    {format(nextPeriodDateRange!.start, 'MMM d')} – {format(nextPeriodDateRange!.end, 'MMM d')}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-6xl font-bold tracking-tighter">{daysUntilNextPeriod}</p>
                                <p className="text-lg font-semibold -mt-1">{daysUntilNextPeriod === 1 ? 'day' : 'days'}</p>
                                <p className="text-sm opacity-90 mt-3">until your next period</p>
                                <p className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full inline-block mt-3">
                                    Estimated Start: {format(nextPeriodDate, 'EEEE, MMM d')}
                                </p>
                            </>
                        )}
                    </div>
                </Card>
            </div>
            
            <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                {todaySleep && (
                    <Card>
                        <p className="text-sm text-slate-500">Sleep</p>
                        <p className="text-xl font-bold">{todaySleep.totalHours} hrs</p>
                    </Card>
                )}
                {todayHydration && hydrationSettings && (
                     <Card>
                        <p className="text-sm text-slate-500">Hydration</p>
                        <p className="text-xl font-bold">{((todayHydration.amount / hydrationSettings.dailyGoal) * 100).toFixed(0)}%</p>
                    </Card>
                )}
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-2 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <ActionButton 
                    icon={ICONS.Menstrual} 
                    label="Log Period" 
                    onClick={handleLogPeriod}
                    className="bg-rose-400"
                />
                <ActionButton 
                    icon={ICONS.LogSymptom} 
                    label="Symptoms" 
                    onClick={() => setScreen?.('LogHub')}
                    className="bg-teal-400"
                />
                 <ActionButton 
                    icon={ICONS.LogMood} 
                    label="Mood" 
                    onClick={() => setScreen?.('LogHub')}
                    className="bg-amber-400"
                />
            </div>

             <div className="text-center text-slate-500 py-2 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <Card>
                    <p>Be kind to yourself today 🌸</p>
                </Card>
            </div>
        </div>
    );
};


const HomeScreen: React.FC = () => {
    const context = useContext(AppContext);

    if (!context) return null;

    const { appMode } = context;

    switch (appMode) {
        case 'Pregnancy':
            return <PregnancyMainScreen />;
        case 'Menopause':
            return <MenopauseMainScreen />;
        case 'Cycle':
        default:
            return <CycleHome />;
    }
};

export default HomeScreen;