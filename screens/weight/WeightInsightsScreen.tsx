import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { PHASE_WEIGHT_INSIGHTS, ICONS } from '../../constants';
import type { CyclePhaseInfo } from '../../types';

const phases: CyclePhaseInfo['phase'][] = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];

const WeightInsightsScreen: React.FC = () => {
    return (
        <div>
            <Header title="Cycle Phase Insights" backScreen="WeightMain" />
            <div className="p-4 space-y-4">
                <Card>
                    <div className="flex items-start space-x-3">
                        <ICONS.Correlations className="w-8 h-8 text-lime-500 flex-shrink-0" />
                        <div>
                            <h2 className="font-bold text-lg">Your Body's Rhythm</h2>
                            <p className="text-sm text-slate-500">
                                It's completely normal for your weight to fluctuate due to hormonal shifts. This is often just changes in water retention, not body fat. Understanding these patterns can bring peace of mind.
                            </p>
                        </div>
                    </div>
                </Card>

                {phases.map((phase, index) => (
                    <div key={phase} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 80}ms` }}>
                        <Card>
                            <h2 className="font-bold text-xl mb-2 text-lime-600">{phase} Phase</h2>
                            <p className="text-slate-600">{PHASE_WEIGHT_INSIGHTS[phase]}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeightInsightsScreen;