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

const BbtMainScreen: React.FC = () => {
    const context = useContext(AppContext);
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    const todayTemp = context?.bbtLog[dateKey];

    const menuItems: { id: Screen, title: string; subtitle: string; icon: React.FC<any>, color: string, textColor: string }[] = [
        { id: 'LogBbt', title: 'Log Temperature', subtitle: 'Add today\'s BBT reading', icon: ICONS.Log, color: 'bg-amber-100', textColor: 'text-amber-500' },
        { id: 'BbtGraph', title: 'Temperature Graph', subtitle: 'Visualize your BBT chart', icon: ICONS.Trends, color: 'bg-violet-100', textColor: 'text-violet-500' },
        { id: 'BbtInsights', title: 'Ovulation Insights', subtitle: 'See when you likely ovulated', icon: ICONS.Correlations, color: 'bg-rose-100', textColor: 'text-rose-500' },
        { id: 'BbtTips', title: 'BBT Tips', subtitle: 'Learn how to track accurately', icon: ICONS.SelfCare, color: 'bg-teal-100', textColor: 'text-teal-500' },
        { id: 'BbtHistory', title: 'BBT History', subtitle: 'Browse your past charts', icon: ICONS.Clipboard, color: 'bg-slate-100', textColor: 'text-slate-500' },
    ];

    return (
        <div className="space-y-5">
            <Header title="Basal Body Temperature" backScreen="Addons" />
            <div className="p-4 space-y-4">
                 <p className="px-2 text-center text-slate-500">Track your basal body temperature to confirm ovulation and gain deeper insights into your cycle 🌡💗</p>

                <Card className="bg-gradient-to-br from-amber-300 to-orange-300 text-white shadow-lg">
                    <div className="text-center p-2">
                        <p className="font-semibold opacity-90">Today's Temperature</p>
                        {todayTemp ? (
                             <p className="text-4xl font-bold my-1">{todayTemp.temp.toFixed(2)}°{todayTemp.unit}</p>
                        ) : (
                             <p className="text-2xl font-bold my-2">- . -</p>
                        )}
                        <p className="text-sm opacity-90">{todayTemp ? `Logged at ${todayTemp.time}` : 'Not logged yet'}</p>
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

export default BbtMainScreen;