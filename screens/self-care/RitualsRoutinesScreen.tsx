import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { SELF_CARE_DATA, ICONS } from '../../constants';

const RitualsRoutinesScreen: React.FC = () => {
    return (
        <div>
            <Header title="Rituals & Routines" backScreen="SelfCareMain" />
            <div className="p-4 space-y-4">
                <p className="px-2 text-center text-slate-500">Build gentle, supportive habits into your day with these simple routines.</p>
                {SELF_CARE_DATA.Rituals.map((ritual, index) => (
                    <div key={ritual.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms`}}>
                        <Card>
                            <h2 className="font-bold text-xl text-sky-600 mb-2">{ritual.title}</h2>
                            <p className="text-sm text-slate-500 mb-4">{ritual.description}</p>
                            <ul className="space-y-2">
                                {ritual.items.map(item => (
                                    <li key={item} className="flex items-center space-x-3 bg-sky-50 p-2 rounded-lg">
                                        <ICONS.Checkmark className="w-5 h-5 text-sky-500" />
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RitualsRoutinesScreen;