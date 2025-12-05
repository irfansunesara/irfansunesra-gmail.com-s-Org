import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Card from '../../components/Card';
import type { Theme } from '../../types';

const AppearanceScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [tempTheme, setTempTheme] = useState<Theme>(context!.theme);

    useEffect(() => {
        setTempTheme(context!.theme);
    }, [context!.theme]);

    const handleSave = () => {
        context?.setTheme(tempTheme);
        alert('Theme saved!');
        context?.setScreen('Profile');
    };

    const themeOptions: { name: Theme, gradient: string }[] = [
        { name: 'Pastel', gradient: 'from-rose-100 to-fuchsia-100' },
        { name: 'Blossom', gradient: 'from-pink-200 to-yellow-100' },
        { name: 'Mint Calm', gradient: 'from-emerald-100 to-cyan-100' },
        { name: 'Moonlight', gradient: 'from-slate-600 to-indigo-700' },
        { name: 'Minimal White', gradient: 'from-white to-gray-200' },
    ];

    return (
        <div>
            <Header title="Appearance & Themes" backScreen="Profile" />
            <div className="p-4 space-y-4">
                <Card>
                    <div className="grid grid-cols-2 gap-4">
                        {themeOptions.map(theme => (
                             <button key={theme.name} onClick={() => setTempTheme(theme.name)} className={`p-3 rounded-xl border-2 transition-all ${tempTheme === theme.name ? 'border-rose-400 shadow-md' : 'border-transparent'}`}>
                                <div className={`w-full h-16 rounded-lg bg-gradient-to-br ${theme.gradient}`} />
                                <p className="mt-2 text-sm font-semibold">{theme.name}</p>
                            </button>
                        ))}
                    </div>
                </Card>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
};

export default AppearanceScreen;
