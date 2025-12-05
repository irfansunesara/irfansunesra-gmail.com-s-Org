import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import { ICONS } from '../../constants';
import { format } from 'date-fns';

const LogHydrationScreen: React.FC = () => {
    const context = useContext(AppContext);
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    const todayIntake = context?.hydrationLog[dateKey]?.amount || 0;
    const dailyGoal = context?.hydrationSettings.dailyGoal || 2000;
    const progress = Math.min((todayIntake / dailyGoal) * 100, 100);

    const handleLog = (amount: number) => {
        context?.logHydration(dateKey, amount);
    };

    const quickLogAmounts = [
        { label: '+1 cup', amount: 240 },
        { label: '+250 ml', amount: 250 },
        { label: '+500 ml', amount: 500 },
    ];

    return (
        <div className="bg-sky-50 h-full flex flex-col">
            <Header title="Add Water Intake" backScreen="HydrationMain" />
            <div className="p-4 flex-grow flex flex-col justify-between items-center">
                
                <div className="relative w-40 h-80 bg-white/70 rounded-t-3xl rounded-b-lg border-4 border-white shadow-lg mt-8">
                    {/* Bottle Cap */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-4 bg-white rounded-t-md border-x-4 border-t-4 border-white"></div>
                    
                    {/* Water fill animation */}
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-400 to-blue-300 rounded-b-sm transition-all duration-500 ease-out"
                        style={{ height: `${progress}%`}}
                    ></div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <ICONS.WaterDrop className="w-10 h-10 text-white/50" />
                        <p className="text-3xl font-bold text-white mt-2">{todayIntake}</p>
                        <p className="text-sm text-white/80">/ {dailyGoal} ml</p>
                    </div>
                </div>

                <div className="w-full max-w-sm space-y-3">
                    <p className="text-center font-semibold text-slate-600">Quick Add</p>
                    <div className="grid grid-cols-3 gap-3">
                        {quickLogAmounts.map(item => (
                            <button 
                                key={item.label}
                                onClick={() => handleLog(item.amount)}
                                className="p-4 bg-white rounded-2xl shadow-sm text-center font-bold text-sky-600 active:scale-95 transition-transform"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LogHydrationScreen;