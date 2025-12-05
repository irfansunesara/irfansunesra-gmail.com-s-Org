import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ICONS } from '../constants';
import type { Screen } from '../types';

interface HeaderProps {
    title: string;
    backScreen: Screen;
    actionButton?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, backScreen, actionButton }) => {
    const context = useContext(AppContext);

    return (
        <div className="grid grid-cols-3 items-center p-4">
            <div className="flex justify-start">
                 <button 
                    onClick={() => context?.setScreen(backScreen)}
                    className="p-2 rounded-full hover:bg-rose-100"
                >
                    <ICONS.ChevronLeft className="w-6 h-6 text-slate-600" />
                </button>
            </div>
            <h1 className="text-xl font-bold text-slate-800 text-center whitespace-nowrap">{title}</h1>
            <div className="flex justify-end">
                {actionButton}
            </div>
        </div>
    );
};

export default Header;