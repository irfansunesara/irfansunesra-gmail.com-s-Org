import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { PHASE_SLEEP_INSIGHTS } from '../../constants';
import type { CyclePhaseInfo } from '../../types';

const phases: CyclePhaseInfo['phase'][] = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];

const PhaseSleepInsightsScreen: React.FC = () => {
    return (
        <div>
            <Header title="Phase-Aware Sleep Insights" backScreen="SleepMain" />
            <div className="p-4 space-y-4">
                <p className="text-center text-slate-500 px-2">
                    Your hormones fluctuate throughout your cycle, and this can impact your sleep. Here’s what to expect in each phase.
                </p>
                {phases.map((phase, index) => (
                    <div key={phase} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms` }}>
                        <Card>
                            <h2 className="font-bold text-xl mb-2 text-indigo-600">{phase} Phase</h2>
                            <p className="text-slate-600">{PHASE_SLEEP_INSIGHTS[phase]}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhaseSleepInsightsScreen;