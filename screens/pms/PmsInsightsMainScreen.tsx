import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { useCycle } from '../../hooks/useCycle';
import { format, differenceInDays } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
// FIX: Import LogData type to allow for explicit casting.
import type { PmsSymptom, LogData } from '../../types';

const InfoCard: React.FC<{
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    subtitle: string;
    color: string;
    textColor: string;
    onClick: () => void;
}> = ({ icon: Icon, title, subtitle, color, textColor, onClick }) => (
    <button onClick={onClick} className="w-full bg-[var(--card-bg)] p-4 rounded-2xl shadow-sm flex items-center space-x-4 text-left group transition-transform duration-200 active:scale-[0.98]">
        <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${color}`}>
            <Icon className={`w-7 h-7 ${textColor}`} />
        </div>
        <div className="flex-grow">
            <h3 className="font-bold text-md">{title}</h3>
            <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <ICONS.ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
    </button>
);


const PmsInsightsMainScreen: React.FC = () => {
    const context = useContext(AppContext);
    // FIX: Destructured logData from context, as useCycle does not return it.
    const { pmsWindow } = useCycle();
    const { logData } = context || {};
    const daysUntilPms = differenceInDays(pmsWindow.start, new Date());

    const topSymptoms = useMemo(() => {
        if (!logData) return [];
        const symptomCounts: { [key in PmsSymptom]?: number } = {};
        Object.values(logData).forEach(log => {
            // FIX: Cast log to LogData to correctly access its properties.
            (log as LogData).pmsSymptoms?.forEach(symptom => {
                symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
            });
        });

        return Object.entries(symptomCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(entry => entry[0]);
    }, [logData]);


    return (
        <div className="space-y-5">
            <Header title="PMS Insights" backScreen="Addons" />
            <div className="p-4 space-y-5">
                <Card className="bg-gradient-to-br from-rose-400 to-orange-300 text-white text-center shadow-lg">
                    <p className="font-semibold opacity-90">Expected PMS Window</p>
                    <p className="text-2xl font-bold my-1">{format(pmsWindow.start, 'MMM d')} – {format(pmsWindow.end, 'MMM d')}</p>
                    {daysUntilPms > 0 && <p className="text-sm bg-white/20 px-3 py-1 rounded-full inline-block mt-2">Starts in {daysUntilPms} {daysUntilPms === 1 ? 'day' : 'days'}</p>}
                </Card>

                <div className="space-y-3">
                     <InfoCard 
                        title="Track Today's Symptoms" 
                        subtitle="Log how you're feeling"
                        icon={ICONS.Clipboard}
                        color="bg-rose-100"
                        textColor="text-rose-500"
                        onClick={() => context?.setScreen('PmsSymptomTracker')}
                    />
                    <InfoCard 
                        title="View Your Patterns" 
                        subtitle="Discover your recurring symptoms"
                        icon={ICONS.Trends}
                        color="bg-violet-100"
                        textColor="text-violet-500"
                        onClick={() => context?.setScreen('PmsPatterns')}
                    />
                     <InfoCard 
                        title="Find Comfort Tips" 
                        subtitle="Gentle advice for PMS relief"
                        icon={ICONS.HeartHand}
                        color="bg-emerald-100"
                        textColor="text-emerald-500"
                        onClick={() => context?.setScreen('PmsComfortTips')}
                    />
                </div>

                <Card>
                    <h2 className="font-bold text-lg mb-3">Your Common PMS Symptoms</h2>
                    {topSymptoms.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                        {topSymptoms.map(symptom => (
                            <div key={symptom} className="px-3 py-1.5 text-sm font-medium rounded-full bg-rose-100 text-rose-700">
                                {symptom}
                            </div>
                        ))}
                        </div>
                    ) : (
                         <p className="text-sm text-slate-500">Track your symptoms for a few cycles to see your patterns here! 🌸</p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default PmsInsightsMainScreen;