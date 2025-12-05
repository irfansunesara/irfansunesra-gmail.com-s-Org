import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useSymptomCorrelation } from '../../hooks/useSymptomCorrelation';
import { MOODS } from '../../constants';
import type { Symptom, Mood } from '../../types';

const MoodCorrelationScreen: React.FC = () => {
    const { logCount, topSymptoms, moodCorrelations } = useSymptomCorrelation();

    if (logCount < 5) {
        return (
             <div>
                <Header title="Symptom & Mood Correlations" backScreen="SymptomCorrelationMain" />
                <div className="p-4 text-center">
                    <Card><p className="text-slate-500">Log symptoms and moods for a few more days to see your personalized correlations here. 🌸</p></Card>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header title="Symptom & Mood Correlations" backScreen="SymptomCorrelationMain" />
            <div className="p-4 space-y-5">
                 <p className="px-2 text-center text-slate-500">Understand how your physical symptoms might relate to your emotional state.</p>
                {topSymptoms.map(symptom => {
                    const correlations = moodCorrelations[symptom];
                    if (!correlations || Object.keys(correlations).length === 0) return null;
                    
                    // FIX: Cast Object.entries to ensure values are treated as numbers for sorting.
                    const topMood = (Object.entries(correlations) as [string, number][]).sort((a, b) => b[1] - a[1])[0];
                    const moodEmoji = MOODS.find(m => m.label === topMood[0])?.emoji;

                    return (
                        <Card key={symptom}>
                            <div className="flex items-center space-x-4">
                                <div className="text-4xl">{moodEmoji}</div>
                                <div>
                                    <p className="text-slate-600">
                                        When you log <strong className="text-fuchsia-600">{symptom}</strong>, the mood you most often log is <strong className="text-fuchsia-600">{topMood[0]}</strong>.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default MoodCorrelationScreen;
