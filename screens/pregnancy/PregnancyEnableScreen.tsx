import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { format, addWeeks } from 'date-fns';

const PregnancyEnableScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [dueDate, setDueDate] = useState(format(addWeeks(new Date(), 40), 'yyyy-MM-dd'));

    const handleEnable = () => {
        const startDate = addWeeks(new Date(dueDate), -40);
        context?.enterPregnancyMode({ dueDate: new Date(dueDate), startDate });
    };

    return (
        <div className="p-6 bg-blue-50 flex flex-col h-full items-center justify-center text-center">
            <h1 className="text-3xl font-bold text-blue-800">Enter Pregnancy Mode</h1>
            <p className="text-slate-600 mt-2 max-w-sm">
                Congratulations! Enabling this mode will pause cycle tracking and transform the app into your personal pregnancy companion.
            </p>

            <Card className="w-full max-w-sm mt-8">
                <label className="font-bold text-slate-700">What is your estimated due date?</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full mt-3 p-3 rounded-xl border-2 border-blue-200 bg-white text-lg font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </Card>
            
            <div className="w-full max-w-sm mt-8 space-y-3">
                <Button onClick={handleEnable} className="bg-blue-500 hover:bg-blue-600">
                    Confirm & Enter Pregnancy Mode
                </Button>
                <Button variant="ghost" onClick={() => context?.setScreen('MoreHub')}>
                    Not Now
                </Button>
            </div>
        </div>
    );
};

export default PregnancyEnableScreen;
