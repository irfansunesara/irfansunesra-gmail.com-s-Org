import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ICONS } from '../constants';
import type { Screen } from '../types';
import Header from '../components/Header';

const WELLNESS_TOOLS = [
    {
        category: 'BODY TRACKING',
        items: [
            { id: 'SleepMain', title: 'Sleep Tracking', description: 'Log your sleep patterns & quality', icon: ICONS.Sleep, color: 'bg-indigo-100', textColor: 'text-indigo-500' },
            { id: 'HydrationMain', title: 'Hydration Tracking', description: 'Monitor your daily water intake', icon: ICONS.WaterDrop, color: 'bg-sky-100', textColor: 'text-sky-500' },
            { id: 'BbtMain', title: 'Temperature (BBT) Tracking', description: 'Track basal body temperature for insights', icon: ICONS.Temperature, color: 'bg-amber-100', textColor: 'text-amber-500' },
            { id: 'WeightMain', title: 'Weight Tracking', description: 'Keep a record of your weight changes', icon: ICONS.Weight, color: 'bg-lime-100', textColor: 'text-lime-500' },
            { id: 'MedicationMain', title: 'Medication & Supplements', description: 'Track your daily medications', icon: ICONS.Medication, color: 'bg-slate-100', textColor: 'text-slate-500' },
        ],
    },
    {
        category: 'CYCLE INSIGHTS',
        items: [
            { id: 'PmsInsightsMain', title: 'PMS Insights', description: 'Understand your premenstrual symptoms', icon: ICONS.LogSymptom, color: 'bg-rose-100', textColor: 'text-rose-500' },
            { id: 'SymptomCorrelationMain', title: 'Symptom Correlations', description: 'See how symptoms relate to your cycle', icon: ICONS.Correlations, color: 'bg-fuchsia-100', textColor: 'text-fuchsia-500' },
            { id: 'CycleHistoryMain', title: 'Cycle History & Trends', description: 'View past cycles and analyze trends', icon: ICONS.Trends, color: 'bg-violet-100', textColor: 'text-violet-500' },
        ],
    },
    {
        category: 'WELLNESS SUPPORT',
        items: [
            { id: 'NutritionMain', title: 'Nutrition Suggestions', description: 'Get food tips for each phase', icon: ICONS.Nutrition, color: 'bg-green-100', textColor: 'text-green-500' },
            { id: 'ExerciseMain', title: 'Exercise Planner', description: 'Plan workouts aligned with your cycle', icon: ICONS.Exercise, color: 'bg-cyan-100', textColor: 'text-cyan-500' },
            { id: 'RelaxationMain', title: 'Relaxation & Mindfulness', description: 'Access calming exercises & meditations', icon: ICONS.Mindfulness, color: 'bg-teal-100', textColor: 'text-teal-500' },
            { id: 'SelfCareMain', title: 'Self-Care Library', description: 'A collection of self-care ideas', icon: ICONS.SelfCare, color: 'bg-pink-100', textColor: 'text-pink-500' },
        ],
    },
    {
        category: 'SPECIAL MODES',
        items: [
            { id: 'SexualWellnessEnable', title: 'Sexual Wellness', description: 'Optionally track sexual activity', icon: ICONS.SexualWellness, color: 'bg-red-100', textColor: 'text-red-500' },
            { id: 'PregnancyEnable', title: 'Pregnancy Mode', description: 'Track your pregnancy journey', icon: ICONS.Pregnancy, color: 'bg-blue-100', textColor: 'text-blue-500' },
            { id: 'MenopauseEnable', title: 'Menopause Mode', description: 'Navigate the transition with support', icon: ICONS.Menopause, color: 'bg-purple-100', textColor: 'text-purple-500' },
        ],
    },
];


interface FeatureCardProps {
    item: typeof WELLNESS_TOOLS[0]['items'][0];
    index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ item, index }) => {
    const context = useContext(AppContext);
    const { icon: Icon, title, description, color, textColor, id } = item;
    
    const handleClick = () => {
        // This screen's IDs now map directly to screen names
        context?.setScreen(id as Screen);
    };

    return (
        <button
            onClick={handleClick}
            className="w-full bg-[var(--card-bg)] p-4 rounded-2xl shadow-sm flex items-center space-x-4 text-left group transition-transform duration-200 active:scale-[0.98] animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${color}`}>
                <Icon className={`w-7 h-7 ${textColor}`} />
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-md">{title}</h3>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
            <ICONS.ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
        </button>
    );
};


const AddonsScreen: React.FC = () => {
    let itemIndex = 0;

    return (
        <div>
            <Header title="More Wellness Tools" backScreen="Home" />
            <div className="p-4 space-y-6">
                <p className="px-2 text-center text-slate-500">Explore additional options to support your cycle, body, and mind.</p>

                {WELLNESS_TOOLS.map((category) => (
                    <div key={category.category} className="space-y-3">
                        <h2 className="px-2 text-sm font-bold uppercase tracking-wider text-rose-400">{category.category}</h2>
                        {category.items.map((item) => {
                            const currentIndex = itemIndex;
                            itemIndex++;
                            return <FeatureCard key={item.title} item={item} index={currentIndex} />;
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddonsScreen;