import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { BBT_TIPS, ICONS } from '../../constants';

const BbtTipsScreen: React.FC = () => {
    return (
        <div>
            <Header title="BBT Tracking Tips" backScreen="BbtMain" />
            <div className="p-4 space-y-3">
                 <p className="px-2 text-center text-slate-500">For the most accurate and useful chart, consistency is key. Here are some tips to help you get reliable readings.</p>
                {BBT_TIPS.map((tip, index) => {
                    const Icon = ICONS[tip.icon as keyof typeof ICONS];
                    return (
                        <Card key={tip.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 70}ms` }}>
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-6 h-6 text-teal-600" />
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

export default BbtTipsScreen;