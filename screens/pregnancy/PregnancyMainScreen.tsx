import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { usePregnancy } from '../../hooks/usePregnancy';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import type { Screen } from '../../types';

const InfoCard: React.FC<{ title: string; onClick: () => void, icon: React.FC<any> }> = ({ title, onClick, icon: Icon }) => (
    <button onClick={onClick} className="w-full bg-blue-100 p-4 rounded-2xl shadow-sm flex items-center space-x-4 text-left group">
        <Icon className="w-8 h-8 text-blue-500" />
        <h3 className="font-bold text-md flex-grow text-blue-800">{title}</h3>
        <ICONS.ChevronRight className="w-5 h-5 text-blue-400" />
    </button>
);

const PregnancyMainScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { user, setScreen } = context || {};
    const { isReady, pregnancyWeek, pregnancyDay, babySize } = usePregnancy();

    if (!isReady || !user) {
        return <div className="p-6 text-center">Loading your pregnancy data...</div>;
    }
    
    const menuItems: { id: Screen; title: string; icon: React.FC<any> }[] = [
        { id: 'BabyDevelopment', title: 'Weekly Baby Development', icon: ICONS.Seedling },
        { id: 'KickCounter', title: 'Kick Counter', icon: ICONS.Pregnancy },
        { id: 'ContractionTimer', title: 'Contraction Timer', icon: ICONS.Clock },
        { id: 'LogPregnancySymptoms', title: 'Log Symptoms', icon: ICONS.LogSymptom },
    ];


    return (
        <div className="p-4 space-y-5">
            <div className="px-2">
                <h1 className="text-3xl font-bold">Hi, {user.name}</h1>
            </div>

            <Card className="bg-gradient-to-br from-blue-400 to-sky-500 text-white shadow-lg text-center">
                <p className="text-4xl font-bold">Week {pregnancyWeek}</p>
                <p className="font-semibold">Day {pregnancyDay} of your pregnancy</p>
            </Card>

            <Card className="text-center">
                 <p className="text-slate-500">Your baby is about the size of</p>
                 <p className="text-2xl font-bold text-blue-700 mt-1">an {babySize}</p>
            </Card>
            
            <div className="space-y-3">
                {menuItems.map(item => (
                    <InfoCard 
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        onClick={() => setScreen?.(item.id)}
                    />
                ))}
            </div>

        </div>
    );
};

export default PregnancyMainScreen;
