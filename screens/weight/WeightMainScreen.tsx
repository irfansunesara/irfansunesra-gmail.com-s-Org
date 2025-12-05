import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import { format } from 'date-fns';
import type { Screen } from '../../types';

const InfoCard: React.FC<{
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    subtitle: string;
    color: string;
    textColor: string;
    onClick: () => void;
}> = ({ icon: Icon, title, subtitle, color, textColor, onClick }) => (
    <button onClick={onClick} className="w-full bg-[var(--card-bg)] p-4 rounded-2xl shadow-sm flex items-center space-x-4 text-left group transition-transform duration-200 active:scale-[0.98]">
        <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${color}`}>
            <Icon className={`w-7 h-7 ${textColor}`} />
        </div>
        <div className="flex-grow">
            <h3 className="font-bold text-md">{title}</h3>
            <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <ICONS.ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
    </button>
);

const WeightMainScreen: React.FC = () => {
    const context = useContext(AppContext);
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    const todayWeight = context?.weightLog[dateKey];
    const unit = context?.weightSettings.unit || 'lbs';

    const menuItems: { id: Screen, title: string; subtitle: string; icon: React.FC<any>, color: string, textColor: string }[] = [
        { id: 'LogWeight', title: 'Log Today\'s Weight', subtitle: 'A gentle check-in', icon: ICONS.Log, color: 'bg-lime-100', textColor: 'text-lime-600' },
        { id: 'WeightGraph', title: 'Weight Graph', subtitle: 'Visualize your patterns over time', icon: ICONS.Trends, color: 'bg-violet-100', textColor: 'text-violet-500' },
        { id: 'WeightInsights', title: 'Cycle Phase Insights', subtitle: 'Understand natural fluctuations', icon: ICONS.Correlations, color: 'bg-rose-100', textColor: 'text-rose-500' },
        { id: 'WeightHistory', title: 'Weight History', subtitle: 'Browse your past entries', icon: ICONS.Clipboard, color: 'bg-slate-100', textColor: 'text-slate-500' },
    ];

    return (
        <div className="space-y-5">
            <Header title="Weight Tracking" backScreen="Addons" />
            <div className="p-4 space-y-4">
                 <p className="px-2 text-center text-slate-500">Track your weight with kindness, noticing patterns without judgment. Your body is always doing its best. 💗</p>

                <Card className="bg-gradient-to-br from-lime-300 to-green-300 text-white shadow-lg">
                    <div className="text-center p-2">
                        <p className="font-semibold opacity-90">Most Recent Entry</p>
                        {todayWeight ? (
                             <p className="text-4xl font-bold my-1">{todayWeight.weight.toFixed(1)} <span className="text-2xl">{unit}</span></p>
                        ) : (
                             <p className="text-2xl font-bold my-2">- . -</p>
                        )}
                        <p className="text-sm opacity-90">{todayWeight ? `Logged today` : 'Not logged yet today'}</p>
                    </div>
                </Card>

                {menuItems.map((item, index) => (
                    <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 60}ms`}}>
                        <InfoCard 
                            title={item.title}
                            subtitle={item.subtitle}
                            icon={item.icon}
                            color={item.color}
                            textColor={item.textColor}
                            onClick={() => context?.setScreen(item.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeightMainScreen;