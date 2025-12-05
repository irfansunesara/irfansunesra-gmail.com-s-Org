import React, { useState, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import type { BbtLog } from '../../types';

const LogBbtScreen: React.FC = () => {
    const context = useContext(AppContext);
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    const existingLog = context?.bbtLog[dateKey];
    
    const [temp, setTemp] = useState(existingLog?.temp?.toFixed(2) || '');
    const [unit, setUnit] = useState<'C' | 'F'>(existingLog?.unit || 'F');
    const [time, setTime] = useState(existingLog?.time || format(new Date(), 'HH:mm'));
    const [notes, setNotes] = useState<string[]>(existingLog?.notes || []);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    const toggleNote = (note: string) => {
        setNotes(prev => prev.includes(note) ? prev.filter(n => n !== note) : [...prev, note]);
    };
    
    const handleSave = () => {
        const tempValue = parseFloat(temp);
        if (isNaN(tempValue) || tempValue <= 0) {
            alert('Please enter a valid temperature.');
            return;
        }

        const bbtLog: BbtLog = { temp: tempValue, unit, time, notes };
        context?.logBbt(dateKey, bbtLog);
        
        setShowConfirmation(true);
        setIsLeaving(false);
        setTimeout(() => setIsLeaving(true), 1800);
        setTimeout(() => {
            setShowConfirmation(false);
            context?.setScreen('BbtMain');
        }, 2100);
    };
    
    const noteOptions = ['Illness', 'Stress', 'Alcohol', 'Poor Sleep'];

    return (
        <div className="relative h-full flex flex-col">
            <Header title="Log Temperature" backScreen="BbtMain" />
            <div className="p-4 space-y-5 flex-grow overflow-y-auto pb-24">
                <p className="text-center text-slate-500 -mt-3">For: <strong>{format(new Date(), 'MMMM d, yyyy')}</strong></p>
                <Card>
                    <div className="flex items-center justify-center space-x-2">
                        <input 
                            type="number"
                            value={temp}
                            onChange={e => setTemp(e.target.value)}
                            placeholder="97.70"
                            step="0.01"
                            className="text-5xl font-bold text-center w-40 bg-amber-50 rounded-lg p-2 border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                         <div className="flex flex-col space-y-1">
                            <button onClick={() => setUnit('F')} className={`px-4 py-1 text-lg rounded-full ${unit === 'F' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700'}`}>°F</button>
                            <button onClick={() => setUnit('C')} className={`px-4 py-1 text-lg rounded-full ${unit === 'C' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700'}`}>°C</button>
                         </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between">
                        <label className="font-semibold text-slate-600">Time</label>
                        <input type="time" value={time} onChange={e => setTime(e.target.value)} className="block text-lg font-bold bg-amber-50 rounded-lg p-2 border-amber-200" />
                    </div>
                </Card>

                <Card>
                     <h2 className="font-bold text-lg mb-3">Notes</h2>
                     <p className="text-sm text-slate-500 mb-3">Anything that might affect your temperature?</p>
                     <div className="flex flex-wrap gap-2">
                        {noteOptions.map(note => (
                            <button key={note} onClick={() => toggleNote(note)} className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${notes.includes(note) ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700'}`}>
                                {note}
                            </button>
                        ))}
                    </div>
                </Card>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-rose-100">
                <Button onClick={handleSave} disabled={showConfirmation} className="bg-amber-500 hover:bg-amber-600">Save Temperature</Button>
            </div>
             {showConfirmation && (
                 <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 ${isLeaving ? 'animate-toast-out' : 'animate-toast-in'}`}>
                    <div className="bg-slate-800 text-white py-3 px-5 rounded-full shadow-lg flex items-center space-x-3">
                        <ICONS.Checkmark className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold">Temperature saved 🌡️</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogBbtScreen;