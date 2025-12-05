import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { ICONS } from '../../constants';

const KickCounterScreen: React.FC = () => {
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        // FIX: Replaced NodeJS.Timeout with number for browser compatibility.
        let interval: number | null = null;
        if (startTime) {
            interval = window.setInterval(() => {
                setElapsed(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [startTime]);

    const startSession = () => {
        setCount(0);
        setElapsed(0);
        setStartTime(new Date());
    };

    const stopSession = () => {
        // Here you would save the session to context
        setStartTime(null);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="bg-blue-50 h-full">
            <Header title="Kick Counter" backScreen="Home" />
            <div className="p-4 text-center">
                {!startTime ? (
                    <Button onClick={startSession} className="bg-blue-500 hover:bg-blue-600">Start Kick Counting Session</Button>
                ) : (
                    <div className="space-y-4">
                        <Card className="bg-white">
                            <p className="text-6xl font-bold text-blue-700">{count}</p>
                            <p className="font-semibold text-slate-500">kicks</p>
                        </Card>
                        <Card className="bg-white">
                             <p className="text-4xl font-bold text-slate-600">{formatTime(elapsed)}</p>
                             <p className="font-semibold text-slate-500">timer</p>
                        </Card>
                        <Button onClick={() => setCount(c => c + 1)} className="bg-emerald-500 hover:bg-emerald-600">
                            Log a Kick / Movement
                        </Button>
                        <Button onClick={stopSession} variant="secondary">
                            End Session & Save
                        </Button>
                    </div>
                )}
                 <Card className="mt-6 text-left">
                    <h3 className="font-bold mb-2 flex items-center space-x-2"><ICONS.Clipboard className="w-5 h-5" /><span>Instructions</span></h3>
                    <p className="text-sm text-slate-600">Follow your provider's guidance. A common method is to time how long it takes to feel 10 kicks. Contact your doctor or midwife if you notice a significant change in your baby's movement.</p>
                </Card>
            </div>
        </div>
    );
};

export default KickCounterScreen;