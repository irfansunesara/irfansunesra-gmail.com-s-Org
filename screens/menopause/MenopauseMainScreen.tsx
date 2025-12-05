import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useMenopause } from '../../hooks/useMenopause';
import Card from '../../components/Card';
import { ICONS } from '../../constants';

const MenopauseMainScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { user, setScreen } = context || {};
    const { isReady, stage } = useMenopause();

    if (!isReady || !user) {
        return <div className="p-6 text-center">Loading your data...</div>;
    }

    return (
        <div className="p-4 space-y-5">
            <div className="px-2">
                <h1 className="text-3xl font-bold">Hi, {user.name}</h1>
                 <div className="mt-2 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                    <ICONS.Menopause className="w-4 h-4" />
                    <span className="text-sm font-semibold">{stage}</span>
                </div>
            </div>

            <Card className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-lg text-center">
                <h2 className="text-xl font-bold">Daily Wellness Snapshot</h2>
                <p className="opacity-90 mt-1">A gentle check-in on how you're doing.</p>
                {/* Summary cards would go here */}
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setScreen?.('LogMenopauseSymptoms')} className="p-4 bg-purple-100 rounded-2xl text-center">
                    <ICONS.LogSymptom className="w-8 h-8 mx-auto text-purple-600" />
                    <p className="mt-2 font-bold text-purple-800">Log Symptoms</p>
                </button>
                <button onClick={() => setScreen?.('MenopauseEducation')} className="p-4 bg-purple-100 rounded-2xl text-center">
                    <ICONS.SelfCare className="w-8 h-8 mx-auto text-purple-600" />
                    <p className="mt-2 font-bold text-purple-800">Education</p>
                </button>
            </div>
        </div>
    );
};

export default MenopauseMainScreen;
