import React from 'react';
import { useCycle } from '../../hooks/useCycle';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { format } from 'date-fns';
import { ICONS } from '../../constants';

const SafeDayAwarenessScreen: React.FC = () => {
    const { isReady, fertileWindow, ovulationDay } = useCycle();

    return (
        <div>
            <Header title="Fertility Awareness" backScreen="SexualWellnessMain" />
            <div className="p-4 space-y-4">
                <Card className="bg-red-100 text-red-800">
                    <h3 className="font-bold flex items-center space-x-2"><ICONS.Privacy className="w-5 h-5" /><span>Important Disclaimer</span></h3>
                    <p className="text-sm mt-1">This information is for awareness only and is <strong>NOT a form of birth control</strong>. Fertility predictions are estimates and can vary.</p>
                </Card>

                {isReady ? (
                    <>
                        <Card>
                            <h2 className="font-bold text-lg mb-2">Estimated Fertile Window</h2>
                            <p className="text-xl font-bold text-emerald-600">{format(fertileWindow.start, 'MMM d')} - {format(fertileWindow.end, 'MMM d')}</p>
                            <p className="text-sm text-slate-500 mt-1">This is the time in your cycle when you are most likely to conceive.</p>
                        </Card>
                         <Card>
                            <h2 className="font-bold text-lg mb-2">Predicted Ovulation</h2>
                             <p className="text-xl font-bold text-emerald-600">{format(ovulationDay, 'MMM d')}</p>
                            <p className="text-sm text-slate-500 mt-1">This is your estimated peak fertility day.</p>
                        </Card>
                    </>
                ) : (
                    <Card className="text-center text-slate-500">
                        <p>Your fertility information will be displayed here once your cycle data is set up.</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default SafeDayAwarenessScreen;