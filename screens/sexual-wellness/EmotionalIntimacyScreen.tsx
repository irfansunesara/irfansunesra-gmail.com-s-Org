import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { SEXUAL_WELLNESS_DATA, ICONS } from '../../constants';

const EmotionalIntimacyScreen: React.FC = () => {
    return (
        <div>
            <Header title="Emotional Intimacy" backScreen="SexualWellnessMain" />
            <div className="p-4 space-y-3">
                 <p className="px-2 text-center text-slate-500">Nurturing your emotional connection is just as important as physical touch.</p>
                {SEXUAL_WELLNESS_DATA.EmotionalIntimacy.map((tip, index) => {
                    const Icon = ICONS[tip.icon as keyof typeof ICONS];
                    return (
                        <Card key={tip.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 70}ms` }}>
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-6 h-6 text-violet-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{tip.title}</h3>
                                    <p className="text-sm text-slate-600">{tip.description}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default EmotionalIntimacyScreen;