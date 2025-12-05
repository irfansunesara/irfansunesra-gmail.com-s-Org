import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { ICONS } from '../../constants';

const ContractionTimerScreen: React.FC = () => {
    const [isTiming, setIsTiming] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [duration, setDuration] = useState(0);
    const [history, setHistory] = useState<{ start: Date, duration: number, interval?: number }[]>([]);

    useEffect(() => {
        // FIX: Replaced NodeJS.Timeout with number for browser compatibility.
        let interval: number | null = null;
        if (isTiming && startTime) {
            interval = window.setInterval(() => {
                setDuration(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTiming, startTime]);
    
    const handleToggle = () => {
        if (isTiming) { // Stopping a contraction
            const newEntry = { start: startTime!, duration };
            const lastEntry = history.length > 0 ? history[history.length - 1] : null;
            const interval = lastEntry ? Math.floor((newEntry.start.getTime() - lastEntry.start.getTime()) / 1000) : undefined;
            setHistory(prev => [...prev, {...newEntry, interval}]);
            setIsTiming(false);
        } else { // Starting a contraction
            setDuration(0);
            setStartTime(new Date());
            setIsTiming(true);
        }
    };
    
    return (
        <div className="bg-amber-50 h-full">
            <Header title="Contraction Timer" backScreen="Home" />
            <div className="p-4 text-center flex flex-col h-full justify-between">
                <div>
                    <Card className="bg-white">
                        <p className="font-semibold text-slate-500">Duration</p>
                        <p className="text-6xl font-bold text-amber-700">{duration}s</p>
                    </Card>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <Card className="bg-white">
                            <p className="font-semibold text-slate-500">Last Interval</p>
                            <p className="text-3xl font-bold text-slate-600">
                                {history.length > 0 && history[history.length-1].interval ? `${Math.floor(history[history.length-1].interval! / 60)}m ${history[history.length-1].interval! % 60}s` : '-'}
                            </p>
                        </Card>
                         <Card className="bg-white">
                            <p className="font-semibold text-slate-500">Last Duration</p>
                            <p className="text-3xl font-bold text-slate-600">
                                {history.length > 0 ? `${history[history.length-1].duration}s` : '-'}
                            </p>
                        </Card>
                    </div>
                </div>

                <div className="w-full">
                    <Button onClick={handleToggle} className={isTiming ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}>
                        {isTiming ? 'Stop Contraction' : 'Start Contraction'}
                    </Button>
                    <p className="text-xs text-slate-500 mt-4">If contractions are regular or intense, please contact your healthcare provider.</p>
                </div>
            </div>
        </div>
    );
};

export default ContractionTimerScreen;