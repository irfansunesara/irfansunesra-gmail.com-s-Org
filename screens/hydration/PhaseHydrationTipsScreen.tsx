import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { HYDRATION_TIPS, ICONS } from '../../constants';
import type { CyclePhaseInfo } from '../../types';

const phases: CyclePhaseInfo['phase'][] = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];

const PhaseHydrationTipsScreen: React.FC = () => {
    return (
        <div>
            <Header title="Phase-Based Hydration Tips" backScreen="HydrationMain" />
            <div className="p-4 space-y-4">
                <p className="text-center text-slate-500 px-2">
                    Your body's needs for water can change with your hormonal fluctuations. Here are some things to keep in mind for each phase.
                </p>
                {phases.map((phase, index) => (
                    <div key={phase} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms` }}>
                        <Card>
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-sky-100 rounded-full flex-shrink-0 flex items-center justify-center">
                                    <ICONS.WaterDrop className="w-6 h-6 text-sky-500" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-xl mb-2 text-sky-600">{phase} Phase</h2>
                                    <p className="text-slate-600">{HYDRATION_TIPS[phase]}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhaseHydrationTipsScreen;