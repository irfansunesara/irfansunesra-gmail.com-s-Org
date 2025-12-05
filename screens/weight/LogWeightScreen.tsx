import React, { useState, useContext } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import type { WeightLog } from '../../types';

const LogWeightScreen: React.FC = () => {
    const context = useContext(AppContext);
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    const existingLog = context?.weightLog[dateKey];
    const defaultUnit = context?.weightSettings.unit || 'lbs';

    const [weight, setWeight] = useState(existingLog?.weight?.toString() || '');
    const [unit, setUnit] = useState<'kg' | 'lbs'>(existingLog?.unit || defaultUnit);
    const [notes, setNotes] = useState<string[]>(existingLog?.notes || []);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    const toggleNote = (note: string) => {
        setNotes(prev => prev.includes(note) ? prev.filter(n => n !== note) : [...prev, note]);
    };
    
    const handleSave = () => {
        const weightValue = parseFloat(weight);
        if (isNaN(weightValue) || weightValue <= 0) {
            alert('Please enter a valid weight.');
            return;
        }

        const weightLog: WeightLog = { weight: weightValue, unit, notes };
        context?.logWeight(dateKey, weightLog);
        
        setShowConfirmation(true);
        setIsLeaving(false);
        setTimeout(() => setIsLeaving(true), 1800);
        setTimeout(() => {
            setShowConfirmation(false);
            context?.setScreen('WeightMain');
        }, 2100);
    };
    
    const noteOptions = ['Bloating', 'PMS', 'Cravings', 'Stress', 'Poor Sleep'];

    return (
        <div className="relative h-full flex flex-col">
            <Header title="Log Your Weight" backScreen="WeightMain" />
            <div className="p-4 space-y-5 flex-grow overflow-y-auto pb-24">
                <p className="text-center text-slate-500 -mt-3">A gentle check-in for <strong>{format(new Date(), 'MMMM d')}</strong></p>
                <Card>
                    <div className="flex items-center justify-center space-x-2">
                        <input 
                            type="number"
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            placeholder="150.0"
                            step="0.1"
                            className="text-5xl font-bold text-center w-40 bg-lime-50 rounded-lg p-2 border-2 border-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                         <div className="flex flex-col space-y-1">
                            <button onClick={() => setUnit('lbs')} className={`px-4 py-1 text-lg rounded-full ${unit === 'lbs' ? 'bg-lime-500 text-white' : 'bg-lime-100 text-lime-700'}`}>lbs</button>
                            <button onClick={() => setUnit('kg')} className={`px-4 py-1 text-lg rounded-full ${unit === 'kg' ? 'bg-lime-500 text-white' : 'bg-lime-100 text-lime-700'}`}>kg</button>
                         </div>
                    </div>
                </Card>

                <Card>
                     <h2 className="font-bold text-lg mb-3">Notes</h2>
                     <p className="text-sm text-slate-500 mb-3">Anything that might be influencing today's number?</p>
                     <div className="flex flex-wrap gap-2">
                        {noteOptions.map(note => (
                            <button key={note} onClick={() => toggleNote(note)} className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${notes.includes(note) ? 'bg-lime-500 text-white' : 'bg-lime-100 text-lime-700'}`}>
                                {note}
                            </button>
                        ))}
                    </div>
                </Card>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-rose-100">
                <Button onClick={handleSave} disabled={showConfirmation} className="bg-lime-500 hover:bg-lime-600">Save Weight</Button>
            </div>
             {showConfirmation && (
                 <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 ${isLeaving ? 'animate-toast-out' : 'animate-toast-in'}`}>
                    <div className="bg-slate-800 text-white py-3 px-5 rounded-full shadow-lg flex items-center space-x-3">
                        <ICONS.Checkmark className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold">Weight log saved 💗</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogWeightScreen;