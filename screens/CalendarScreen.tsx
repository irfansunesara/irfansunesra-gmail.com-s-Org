

import React, { useState, useContext, useMemo, useEffect } from 'react';
// FIX: Imported 'differenceInDays' to resolve 'Cannot find name' error.
import { format, isSameMonth, startOfDay, isToday, isWithinInterval, getWeekOfMonth, startOfWeek, addDays, eachDayOfInterval, differenceInDays } from 'date-fns';
import Calendar from '../components/Calendar';
import Button from '../components/Button';
import { useCycle } from '../hooks/useCycle';
import { usePregnancy } from '../hooks/usePregnancy';
import { AppContext } from '../context/AppContext';
import { ICONS } from '../constants';
import type { LogData } from '../types';
import Modal from '../components/Modal';

const LegendItem: React.FC<{ colorClass: string; label: string; children?: React.ReactNode }> = ({ colorClass, label, children }) => (
    <div className="flex items-center space-x-2">
        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${colorClass}`}>
            {children}
        </div>
        <span className="text-xs text-slate-500">{label}</span>
    </div>
);

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-rose-400' : 'bg-slate-200'}`}>
        <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);


const CalendarScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
    const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState('');

    const { getDayInfo, cycleData, nextPeriodDateRange } = useCycle();
    const { pregnancyWeek } = usePregnancy();
    const context = useContext(AppContext);
    const { appMode, menopauseSymptomLog, updateLogData, reminderSettings, updateReminderSettings } = context || {};

    useEffect(() => {
        if (!isToday(selectedDate)) {
             setIsDetailPanelOpen(true);
        }
    }, [selectedDate]);
    
    const dayInfo = useMemo(() => getDayInfo(selectedDate), [selectedDate, getDayInfo]);
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const loggedData: LogData | undefined = context?.logData[dateKey];

    const handleDateSelect = (date: Date) => {
        setSelectedDate(startOfDay(date));
        setIsDetailPanelOpen(true);
    }

    const dayRenderer = (date: Date) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        const dayStyle = {
            base: `w-full h-full flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-200 relative hover:scale-105 active:scale-95`,
            month: isSameMonth(date, selectedDate) ? 'text-slate-700' : 'text-slate-300',
            selection: format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'border-2 border-rose-500 shadow-md' : 'border-2 border-transparent',
            bg: 'bg-white',
        };

        if (appMode === 'Cycle') {
            const info = getDayInfo(date);
            const currentLogData = context?.logData[dateKey];
            const isLoggedPeriodDay = !!currentLogData?.period;
            const hasLogData = currentLogData && (currentLogData.mood || (currentLogData.symptoms && currentLogData.symptoms.length > 0) || currentLogData.energy || (currentLogData.cravings && currentLogData.cravings.length > 0) || (currentLogData.note && currentLogData.note.length > 0));
            const isNextPredictedPeriodRange = cycleData?.regularity === 'Irregular' && nextPeriodDateRange ? isWithinInterval(date, nextPeriodDateRange) : false;
            
            if (isLoggedPeriodDay) {
                dayStyle.bg = 'bg-rose-300';
                dayStyle.month = 'text-rose-800 font-semibold';
            } else if (isNextPredictedPeriodRange) {
                 dayStyle.bg = 'bg-rose-100';
            } else if (cycleData?.regularity !== 'Irregular' && info.isPeriod) {
                dayStyle.bg = 'bg-rose-100';
            } else if (info.isFertile) {
                dayStyle.bg = 'bg-emerald-100';
            }
            return (
                <div className={`${dayStyle.base} ${dayStyle.bg} ${dayStyle.selection}`}>
                    <span className={`text-xl ${dayStyle.month}`}>{format(date, 'd')}</span>
                    {info.isOvulation && <div className="w-6 h-6 rounded-full bg-mint-200 flex items-center justify-center -mt-1"><ICONS.Star className="w-3 h-3 text-emerald-600" /></div>}
                    {hasLogData && <ICONS.NoteDot className="absolute bottom-1 w-1.5 h-1.5 text-slate-400" />}
                </div>
            );
        } else if (appMode === 'Pregnancy') {
             const weekNumber = Math.floor(differenceInDays(date, context.pregnancyData!.startDate) / 7) + 1;
             const isCurrentWeek = weekNumber === pregnancyWeek;
             if (isCurrentWeek) {
                dayStyle.bg = 'bg-blue-100';
             }
             return (
                 <div className={`${dayStyle.base} ${dayStyle.bg} ${dayStyle.selection}`}>
                    <span className={`text-xl ${dayStyle.month}`}>{format(date, 'd')}</span>
                    {isToday(date) && <span className="text-xs font-bold text-blue-600">Today</span>}
                </div>
             );
        } else if (appMode === 'Menopause') {
            const hasSymptomLog = menopauseSymptomLog && menopauseSymptomLog[dateKey];
            if (hasSymptomLog) {
                const intensity = menopauseSymptomLog[dateKey].intensity;
                dayStyle.bg = `bg-purple-100 opacity-${intensity * 20}`;
            }
             return (
                 <div className={`${dayStyle.base} ${dayStyle.bg} ${dayStyle.selection}`}>
                    <span className={`text-xl ${dayStyle.month}`}>{format(date, 'd')}</span>
                    {isToday(date) && <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1" />}
                </div>
             );
        }
    };
    
    const handleLogForDay = () => {
        context?.setSelectedLogDate(selectedDate);
        context?.setScreen('LogHub');
    }

    const handleAddNote = () => {
        setCurrentNote(loggedData?.note || '');
        setIsDetailPanelOpen(false);
        setIsNoteModalOpen(true);
    }

    const handleSaveNote = () => {
        updateLogData?.(dateKey, { note: currentNote });
        setIsNoteModalOpen(false);
        setCurrentNote('');
    }

    const handlePeriodLog = (status: 'start' | 'flow' | 'end' | null) => {
        const currentStatus = loggedData?.period;
        if (currentStatus === status) {
            updateLogData?.(dateKey, { period: null });
        } else {
            updateLogData?.(dateKey, { period: status });
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-3xl font-bold text-slate-800 px-2">Calendar</h1>
            <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} dayRenderer={dayRenderer} />
            
            {appMode === 'Cycle' && (
                <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 px-2">
                    <LegendItem colorClass="bg-rose-300" label="Period Day" />
                    <LegendItem colorClass="bg-rose-100" label="Predicted Period" />
                    <LegendItem colorClass="bg-emerald-100" label="Fertile Window" />
                    <LegendItem colorClass="bg-white" label="Ovulation Day">
                        <ICONS.Star className="w-3 h-3 text-emerald-600" />
                    </LegendItem>
                </div>

                <div className="grid grid-cols-2 gap-2 px-2">
                    <Button variant="ghost" onClick={() => context?.setScreen('CycleHistoryMain')}>Cycle History</Button>
                    <Button variant="ghost" onClick={() => context?.setScreen('SymptomMoodTrends')}>Symptom Trends</Button>
                </div>
                </>
            )}
            
            <div 
                className={`fixed inset-0 bg-black/20 z-40 transition-opacity ${isDetailPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsDetailPanelOpen(false)}
            />
            <div 
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl z-50 transition-transform duration-300 ease-out ${isDetailPanelOpen ? 'translate-y-0' : 'translate-y-full'}`}
                style={{paddingBottom: 'calc(1.5rem + 5rem)'}}
            >
                 <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-1 text-slate-800">{format(selectedDate, 'EEEE, MMMM d')}</h2>
                {appMode === 'Cycle' && (
                    <>
                    <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                        <span>Cycle Day {dayInfo.cycleDay}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>{dayInfo.phase} Phase</span>
                    </div>

                    <div className="space-y-1 text-slate-600 mb-5">
                        {dayInfo.isPeriod && cycleData?.regularity !== 'Irregular' && <p className="text-rose-600 font-medium">Predicted Period Day</p>}
                        {isWithinInterval(selectedDate, nextPeriodDateRange || {start:0, end:0}) && cycleData?.regularity === 'Irregular' && <p className="text-rose-600 font-medium">Predicted Period Start Range</p>}
                        {loggedData?.period && <p className="text-rose-700 font-bold">Logged Period: <span className="capitalize">{loggedData.period}</span></p>}
                        {dayInfo.isFertile && <p className="text-emerald-600 font-medium">Fertile Day</p>}
                        {dayInfo.isOvulation && <p className="text-emerald-700 font-bold">Predicted Ovulation</p>}
                         
                         {loggedData?.symptoms && loggedData.symptoms.length > 0 && (
                            <div className="mt-2">
                                <p className="font-bold text-slate-700 mb-1">Symptoms:</p>
                                <ul className="space-y-1">
                                    {loggedData.symptoms.map(s => {
                                        const detail = loggedData.symptomDetails?.[s];
                                        return (
                                            <li key={s} className="text-sm text-slate-600 flex items-start">
                                                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                                <span>
                                                    {s} 
                                                    {detail && <span className="text-slate-400"> (Severity: {detail.severity})</span>}
                                                    {detail?.note && <span className="block text-xs italic text-slate-500">"{detail.note}"</span>}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                         )}
                         {loggedData?.note && <p className="mt-2"><strong>Note:</strong> <span className="italic">"{loggedData.note}"</span></p>}
                    </div>
                    
                    <div className="mb-4">
                         <h3 className="font-bold text-slate-700 mb-2">Period</h3>
                         <div className="flex space-x-2">
                             {(['start', 'flow', 'end'] as const).map(status => (
                                <button key={status} onClick={() => handlePeriodLog(status)} className={`px-4 py-2 text-sm font-semibold rounded-full flex-1 transition-all ${loggedData?.period === status ? 'bg-rose-500 text-white shadow' : 'bg-rose-100 text-rose-700'}`}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                             ))}
                         </div>
                    </div>
                    </>
                )}
                 {appMode === 'Pregnancy' && (
                    <div className="mb-5">
                        <p className="font-semibold text-blue-600">Week {Math.floor(differenceInDays(selectedDate, context.pregnancyData!.startDate) / 7) + 1} of your pregnancy.</p>
                    </div>
                 )}
                  {appMode === 'Menopause' && (
                    <div className="mb-5">
                         {menopauseSymptomLog?.[dateKey] ? (
                             <div>
                                <p>Symptoms logged with overall intensity {menopauseSymptomLog[dateKey].intensity}/5.</p>
                                <div className="mt-2 text-sm text-slate-600">
                                    {menopauseSymptomLog[dateKey].symptoms.map(s => {
                                        const detail = menopauseSymptomLog[dateKey].symptomDetails?.[s];
                                        return <p key={s}>- {s} (Severity: {detail?.severity}) {detail?.note ? `"${detail.note}"` : ''}</p>
                                    })}
                                </div>
                             </div>
                         ): (
                             <p className="text-slate-500">No symptoms logged for this day.</p>
                         )}
                    </div>
                 )}
                <div className="grid grid-cols-2 gap-2">
                   <Button variant="ghost" onClick={handleLogForDay}>
                        <div className="flex items-center justify-center space-x-2">
                           <ICONS.LogSymptom className="w-5 h-5" />
                           <span>Log More</span>
                       </div>
                   </Button>
                   <Button variant="ghost" onClick={handleAddNote}>
                       <div className="flex items-center justify-center space-x-2">
                           <ICONS.Log className="w-5 h-5" />
                           <span>{loggedData?.note ? 'Edit Note' : 'Add Note'}</span>
                           {reminderSettings?.noteReminder && <ICONS.Bell className="w-4 h-4 text-rose-400" />}
                       </div>
                   </Button>
                </div>
            </div>

            <Modal 
                isOpen={isNoteModalOpen} 
                onClose={() => setIsNoteModalOpen(false)} 
                title={`${loggedData?.note ? 'Edit' : 'Add'} Note for ${format(selectedDate, 'MMM d')}`}
            >
                <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    rows={5}
                    placeholder="Add your note for the day here..."
                    className="w-full p-3 bg-rose-50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                />

                <div className="mt-4 border-t border-rose-100 pt-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <ICONS.Bell className="w-5 h-5 text-slate-400" />
                            <label className="font-medium text-slate-600">Daily Note Reminder</label>
                        </div>
                        <Toggle 
                            checked={reminderSettings?.noteReminder || false}
                            onChange={(val) => updateReminderSettings?.({ noteReminder: val })}
                        />
                    </div>
                    {reminderSettings?.noteReminder && (
                        <div className="flex justify-between items-center mt-3 pl-7 animate-fade-in-down">
                            <label className="text-sm text-slate-500">Reminder Time</label>
                            <input 
                                type="time" 
                                value={reminderSettings.noteReminderTime}
                                onChange={(e) => updateReminderSettings?.({ noteReminderTime: e.target.value })}
                                className="bg-rose-50 border-rose-200 rounded-md p-1 text-sm"
                            />
                        </div>
                    )}
                </div>

                <Button onClick={handleSaveNote} className="mt-4">Save Note</Button>
            </Modal>
        </div>
    );
};

export default CalendarScreen;