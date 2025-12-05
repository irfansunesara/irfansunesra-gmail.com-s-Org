import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useSymptomCorrelation } from '../../hooks/useSymptomCorrelation';
import { SLEEP_QUALITY_LEVELS } from '../../constants';
import type { SleepQuality } from '../../types';

const LifestyleCorrelationScreen: React.FC = () => {
    const { logCount, topSymptoms, sleepCorrelations } = useSymptomCorrelation();

    if (logCount < 5) {
        return (
             <div>
                <Header title="Symptom & Lifestyle Correlations" backScreen="SymptomCorrelationMain" />
                <div className="p-4 text-center">
                    <Card><p className="text-slate-500">Log symptoms and your daily habits (like sleep) to see your personalized correlations here. 🌸</p></Card>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header title="Symptom & Lifestyle Correlations" backScreen="SymptomCorrelationMain" />
            <div className="p-4 space-y-5">
                <p className="px-2 text-center text-slate-500">Discover how your daily habits might influence how you feel.</p>
                
                {/* Sleep Correlations */}
                {topSymptoms.map(symptom => {
                    const correlations = sleepCorrelations[symptom];
                    if (!correlations || Object.keys(correlations).length === 0) return null;

                    // FIX: Cast Object.entries to ensure values are treated as numbers for sorting.
                    const topQuality = (Object.entries(correlations) as [string, number][]).sort((a, b) => b[1] - a[1])[0][0] as SleepQuality;
                    const qualityEmoji = SLEEP_QUALITY_LEVELS.find(q => q.label === topQuality)?.emoji;

                    return (
                        <Card key={symptom}>
                             <div className="flex items-center space-x-4">
                                <div className="text-4xl">{qualityEmoji}</div>
                                <div>
                                    <p className="text-slate-600">
                                        On days you log <strong className="text-fuchsia-600">{symptom}</strong>, the sleep quality you most often report is <strong className="text-fuchsia-600">{topQuality}</strong>.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )
                })}

                {/* Placeholder for other lifestyle correlations */}
                 <Card>
                    <p className="text-center text-sm text-slate-400">More lifestyle correlations, like hydration and exercise, are coming soon!</p>
                </Card>
            </div>
        </div>
    );
};

export default LifestyleCorrelationScreen;
