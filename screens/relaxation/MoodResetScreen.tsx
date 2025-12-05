import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { RELAXATION_DATA, ICONS } from '../../constants';

const MoodResetScreen: React.FC = () => {
    return (
        <div>
            <Header title="Quick Mood Resets" backScreen="RelaxationMain" />
            <div className="p-4 space-y-3">
                 <p className="px-2 text-center text-slate-500">Feeling overwhelmed? Try one of these quick exercises to reset your nervous system in under a minute.</p>
                {RELAXATION_DATA.MoodResets.map((item, index) => {
                    const Icon = ICONS[item.icon as keyof typeof ICONS];
                    return (
                        <Card key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 70}ms` }}>
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.description}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default MoodResetScreen;