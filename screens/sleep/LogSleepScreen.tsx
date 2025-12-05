import React, { useState, useContext, useMemo } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { SLEEP_QUALITY_LEVELS, ICONS } from '../../constants';
import type { SleepLog, SleepQuality } from '../../types';

const LogSleepScreen: React.FC = () => {
    const context = useContext(AppContext);
    const dateKey = format(new Date(), 'yyyy-MM-dd'); // Always log for "last night", so today's date is the key
    const existingLog = context?.sleepLog[dateKey];
    
    const [bedtime, setBedtime] = useState(existingLog?.bedtime || '22:30');
    const [wakeTime, setWakeTime] = useState(existingLog?.wakeTime || '06:30');
    const [quality, setQuality] = useState<SleepQuality>(existingLog?.quality || 'Good');
    const [notes, setNotes] = useState(existingLog?.notes || '');
    
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    const totalHours = useMemo(() => {
        const [bedHour, bedMinute] = bedtime.split(':').map(Number);
        const [wakeHour, wakeMinute] = wakeTime.split(':').map(Number);

        let bed = bedHour + bedMinute / 60;
        let wake = wakeHour + wakeMinute / 60;

        if (wake < bed) { // Woke up the next day
            wake += 24;
        }

        const duration = wake - bed;
        return duration > 0 ? parseFloat(duration.toFixed(1)) : 0;
    }, [bedtime, wakeTime]);

    const handleSave = () => {
        const sleepLog: SleepLog = {
            bedtime,
            wakeTime,
            totalHours,
            quality,
            notes,
        };
        context?.logSleep(dateKey, sleepLog);
        
        setShowConfirmation(true);
        setIsLeaving(false);
        setTimeout(() => setIsLeaving(true), 1800);
        setTimeout(() => {
            setShowConfirmation(false);
            context?.setScreen('SleepMain');
        }, 2100);
    };

    return (
         <div className="relative h-full flex flex-col">
            <Header title="Log Last Night's Sleep" backScreen="SleepMain" />
            <div className="p-4 space-y-5 flex-grow overflow-y-auto pb-24">
                <Card>
                    <div className="flex justify-around">
                        <div className="text-center">
                            <label className="font-semibold text-slate-600">Bedtime</label>
                            <input type="time" value={bedtime} onChange={e => setBedtime(e.target.value)} className="block mt-2 text-2xl font-bold bg-indigo-50 rounded-lg p-2 border-indigo-200" />
                        </div>
                        <div className="text-center">
                             <label className="font-semibold text-slate-600">Wake-up Time</label>
                            <input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} className="block mt-2 text-2xl font-bold bg-indigo-50 rounded-lg p-2 border-indigo-200" />
                        </div>
                    </div>
                    <div className="text-center mt-6 bg-indigo-100 p-3 rounded-xl">
                        <p className="text-indigo-800 font-bold text-lg">{totalHours} hours of sleep</p>
                    </div>
                </Card>

                <Card>
                    <h2 className="font-bold text-lg mb-3">How was your sleep quality?</h2>
                    <div className="grid grid-cols-5 gap-2 text-center">
                        {SLEEP_QUALITY_LEVELS.map(({ emoji, label }) => (
                            <button key={label} onClick={() => setQuality(label)} className="flex flex-col items-center space-y-1 group">
                                <div className={`w-12 h-12 flex items-center justify-center text-3xl rounded-full transition-all duration-200 ${quality === label ? 'bg-indigo-200 scale-110 shadow-md' : 'bg-indigo-50 group-hover:bg-indigo-100'}`}>
                                    {emoji}
                                </div>
                                <span className={`text-xs font-medium transition-colors ${quality === label ? 'text-indigo-600' : 'text-slate-500'}`}>{label}</span>
                            </button>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h2 className="font-bold text-lg mb-2">Sleep Notes</h2>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full p-3 rounded-lg border border-indigo-200 bg-indigo-50 focus:ring-indigo-400 focus:border-indigo-400 transition" placeholder="Anything you want to note about your sleep?"></textarea>
                </Card>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-rose-100">
                <Button onClick={handleSave} disabled={showConfirmation}>Save Sleep Log</Button>
            </div>
            
             {showConfirmation && (
                 <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 ${isLeaving ? 'animate-toast-out' : 'animate-toast-in'}`}>
                    <div className="bg-slate-800 text-white py-3 px-5 rounded-full shadow-lg flex items-center space-x-3">
                        <ICONS.Checkmark className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold">Sleep log saved 🌙</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogSleepScreen;