import React, { useState, useContext } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { AppContext } from '../../context/AppContext';
import { SELF_CARE_DATA, ICONS } from '../../constants';
import type { Mood } from '../../types';

type SupportedMood = 'Stressed' | 'Anxiety';

const MoodSupportScreen: React.FC = () => {
    const context = useContext(AppContext);
    const availableMoods = Object.keys(SELF_CARE_DATA.MoodSupport) as SupportedMood[];
    const [selectedMood, setSelectedMood] = useState<SupportedMood | null>(availableMoods[0]);
    const careData = selectedMood ? SELF_CARE_DATA.MoodSupport[selectedMood] : [];

    return (
        <div>
            <Header title="Mood Support" backScreen="SelfCareMain" />
            <div className="p-4 space-y-5">
                <p className="text-center text-slate-500 px-2">Find tools and exercises to support your emotional well-being. How are you feeling right now?</p>
                
                <div className="flex flex-wrap justify-center gap-2 px-2">
                    {availableMoods.map(mood => (
                        <button 
                            key={mood} 
                            onClick={() => setSelectedMood(mood)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${selectedMood === mood ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700'}`}
                        >
                            {mood}
                        </button>
                    ))}
                </div>

                {careData.length > 0 && selectedMood && (
                    <div className="space-y-3 animate-fade-in-up">
                         <h2 className="font-bold text-lg px-2">Support for Feeling <span className="text-amber-600">{selectedMood}</span></h2>
                        {careData.map((item) => (
                            <Card key={item.id} className="flex items-center space-x-3">
                                <ICONS.Mindfulness className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                <p className="text-slate-700">{item.tip}</p>
                                <button onClick={() => context?.toggleFavorite(item.id)} className="ml-auto p-2">
                                     <ICONS.Heart className={`w-6 h-6 transition-colors ${context?.favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-slate-300'}`} />
                                </button>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoodSupportScreen;