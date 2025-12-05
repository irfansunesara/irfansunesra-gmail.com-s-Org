import React, { useState, useContext } from 'react';
import { format } from 'date-fns';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import type { SexualActivityLog } from '../../types';

const LogSexualActivityScreen: React.FC = () => {
    const context = useContext(AppContext);
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    const existingLog = context?.sexualActivityLog[dateKey];
    
    const [comfortLevel, setComfortLevel] = useState(existingLog?.comfortLevel || 4);
    const [emotionalFeeling, setEmotionalFeeling] = useState(existingLog?.emotionalFeeling || 'Connected');
    const [notes, setNotes] = useState(existingLog?.notes || '');
    
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    
    const handleSave = () => {
        const log: SexualActivityLog = { comfortLevel, emotionalFeeling, notes };
        context?.logSexualActivity(dateKey, log);
        
        setShowConfirmation(true);
        setIsLeaving(false);
        setTimeout(() => setIsLeaving(true), 1800);
        setTimeout(() => {
            setShowConfirmation(false);
            context?.setScreen('SexualWellnessMain');
        }, 2100);
    };

    return (
         <div className="relative h-full flex flex-col">
            <Header title="Log Intimate Activity" backScreen="SexualWellnessMain" />
            <div className="p-4 space-y-5 flex-grow overflow-y-auto pb-24">
                <p className="text-center text-slate-500 -mt-3">A private log for <strong>{format(new Date(), 'MMMM d')}</strong></p>
                <Card>
                    <h2 className="font-bold text-lg mb-4">Physical Comfort Level</h2>
                     <input type="range" min="1" max="5" value={comfortLevel} onChange={e => setComfortLevel(parseInt(e.target.value))} className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-500" />
                    <div className="flex justify-between text-xs font-medium text-slate-500 mt-2">
                        <span>Uncomfortable</span>
                        <span>Very Comfortable</span>
                    </div>
                </Card>

                <Card>
                    <h2 className="font-bold text-lg mb-2">Emotional Feeling</h2>
                    <input value={emotionalFeeling} onChange={e => setEmotionalFeeling(e.target.value)} className="w-full p-3 rounded-lg border border-rose-200 bg-rose-50 focus:ring-rose-400 focus:border-rose-400 transition" placeholder="e.g., Connected, Playful, Relaxed..."/>
                </Card>
                
                <Card>
                    <h2 className="font-bold text-lg mb-2">Private Notes</h2>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full p-3 rounded-lg border border-rose-200 bg-rose-50 focus:ring-rose-400 focus:border-rose-400 transition" placeholder="Anything you want to remember?"></textarea>
                </Card>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-rose-100">
                <Button onClick={handleSave} disabled={showConfirmation} className="bg-red-500 hover:bg-red-600">Save Activity</Button>
            </div>
            
             {showConfirmation && (
                 <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 ${isLeaving ? 'animate-toast-out' : 'animate-toast-in'}`}>
                    <div className="bg-slate-800 text-white py-3 px-5 rounded-full shadow-lg flex items-center space-x-3">
                        <ICONS.Checkmark className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold">Log saved privately</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogSexualActivityScreen;