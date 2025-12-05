import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { SEXUAL_WELLNESS_DATA } from '../../constants';
import type { CyclePhaseInfo } from '../../types';

const phases: CyclePhaseInfo['phase'][] = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];

const LibidoInsightsScreen: React.FC = () => {
    return (
        <div>
            <Header title="Libido & Your Cycle" backScreen="SexualWellnessMain" />
            <div className="p-4 space-y-4">
                <p className="text-center text-slate-500 px-2">
                    Your desire naturally ebbs and flows with your hormones. Understanding these shifts can be empowering.
                </p>
                {phases.map((phase, index) => (
                    <div key={phase} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms` }}>
                        <Card>
                            <h2 className="font-bold text-xl mb-2 text-red-600">{phase} Phase</h2>
                            <p className="text-slate-600">{SEXUAL_WELLNESS_DATA.LibidoInsights[phase]}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LibidoInsightsScreen;