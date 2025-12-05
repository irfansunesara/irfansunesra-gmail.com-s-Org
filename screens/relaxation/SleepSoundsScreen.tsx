import React, { useState } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { RELAXATION_DATA, ICONS } from '../../constants';

const SleepSoundsScreen: React.FC = () => {
    const [playingSound, setPlayingSound] = useState<string | null>(null);
    const [timer, setTimer] = useState(15); // in minutes

    return (
        <div>
            <Header title="Sleep & Calm Sounds" backScreen="RelaxationMain" />
            <div className="p-4 space-y-4">
                <p className="px-2 text-center text-slate-500">Choose a sound to help you relax, focus, or drift off to sleep.</p>

                <div className="grid grid-cols-2 gap-4">
                    {RELAXATION_DATA.Sounds.map((sound, index) => {
                        const Icon = ICONS[sound.icon as keyof typeof ICONS];
                        const isPlaying = playingSound === sound.id;
                        return (
                            <div key={sound.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 70}ms`}}>
                                <Card className={`text-center transition-all ${isPlaying ? 'border-2 border-indigo-400 shadow-lg' : ''}`}>
                                    <button onClick={() => setPlayingSound(isPlaying ? null : sound.id)} className="w-full">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors ${isPlaying ? 'bg-indigo-500' : 'bg-indigo-100'}`}>
                                            <Icon className={`w-8 h-8 ${isPlaying ? 'text-white' : 'text-indigo-500'}`} />
                                        </div>
                                        <h3 className="font-bold">{sound.title}</h3>
                                    </button>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                <Card>
                    <div className="flex items-center justify-between">
                        <label className="font-semibold text-slate-600">Timer</label>
                        <div className="flex items-center space-x-2">
                            {[15, 30, 60].map(t => (
                                <button key={t} onClick={() => setTimer(t)} className={`px-3 py-1 text-sm rounded-full ${timer === t ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                                    {t} min
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SleepSoundsScreen;