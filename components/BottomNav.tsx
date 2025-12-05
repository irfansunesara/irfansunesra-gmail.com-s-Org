import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ICONS } from '../constants';
import type { Screen } from '../types';

interface NavItem {
    screen: Screen;
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const NAV_ITEMS: NavItem[] = [
    { screen: 'Home', label: 'Home', icon: ICONS.Home },
    { screen: 'Calendar', label: 'Calendar', icon: ICONS.Calendar },
    { screen: 'LogHub', label: 'Log', icon: ICONS.Log },
    { screen: 'WellnessHub', label: 'Wellness', icon: ICONS.SelfCare },
    { screen: 'MoreHub', label: 'More', icon: ICONS.Grid },
];

const BottomNav: React.FC = () => {
    const context = useContext(AppContext);

    if (!context) return null;

    const { screen, setScreen } = context;
    const mainScreens = ['Home', 'Calendar', 'LogHub', 'WellnessHub', 'MoreHub'];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-rose-200 shadow-t-lg z-50">
            <div className="flex justify-around max-w-lg mx-auto">
                {NAV_ITEMS.map((item) => {
                    const isActive = screen === item.screen;
                    return (
                        <button
                            key={item.screen}
                            onClick={() => setScreen(item.screen)}
                            className={`flex flex-col items-center justify-center w-full pt-3 pb-2 transition-colors duration-200 ${
                                isActive ? 'text-rose-500' : 'text-slate-400 hover:text-rose-400'
                            }`}
                        >
                            <item.icon className="w-6 h-6 mb-1" />
                            <span className="text-xs font-medium">{item.label}</span>
                            {isActive && (
                                <div className="w-8 h-1 bg-rose-500 rounded-full mt-1"></div>
                            )}
                        </button>
                    )
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
