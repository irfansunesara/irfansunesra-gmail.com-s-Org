import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { RELAXATION_DATA, ICONS } from '../../constants';

const MeditationScreen: React.FC = () => {
    return (
        <div>
            <Header title="Meditation Library" backScreen="RelaxationMain" />
            <div className="p-4 space-y-4">
                <p className="px-2 text-center text-slate-500">Find a short, guided meditation to support how you're feeling right now.</p>
                
                {RELAXATION_DATA.Meditations.map((meditation, index) => (
                    <div key={meditation.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 70}ms`}}>
                        <Card>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <ICONS.Mindfulness className="w-7 h-7 text-violet-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{meditation.title}</h3>
                                    <p className="text-sm text-slate-500">{meditation.category}</p>
                                </div>
                                <button className="ml-auto p-2 bg-violet-50 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-violet-500"><path d="M8 5v14l11-7z"/></svg>
                                </button>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeditationScreen;