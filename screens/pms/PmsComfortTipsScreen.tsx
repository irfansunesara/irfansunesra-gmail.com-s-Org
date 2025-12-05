import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { COMFORT_TIPS, ICONS } from '../../constants';

const PmsComfortTipsScreen: React.FC = () => {
    return (
        <div>
            <Header title="Comfort Tips for PMS" backScreen="PmsInsightsMain" />
            <div className="p-4 space-y-3">
                 <p className="px-2 text-center text-slate-500">Here are some gentle ideas to help you feel more comfortable during your PMS window. Be kind to yourself. 💗</p>
                {COMFORT_TIPS.map((tip, index) => {
                    const Icon = ICONS[tip.icon];
                    return (
                        <Card key={tip.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 70}ms` }}>
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-6 h-6 text-emerald-600" />
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

export default PmsComfortTipsScreen;
