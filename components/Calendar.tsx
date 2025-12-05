

import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, getDay } from 'date-fns';
import { ICONS } from '../constants';
import Card from './Card';

interface CalendarProps {
    onDateSelect?: (date: Date) => void;
    selectedDate?: Date | null;
    dayRenderer?: (date: Date) => React.ReactNode;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate, dayRenderer }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const renderHeader = () => (
        <div className="flex items-center justify-between mb-4 px-2">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-rose-100">
                <ICONS.ChevronLeft className="w-5 h-5 text-rose-500" />
            </button>
            <h2 className="text-lg font-semibold text-slate-700">
                {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-rose-100">
                <ICONS.ChevronRight className="w-5 h-5 text-rose-500" />
            </button>
        </div>
    );

    const renderDays = () => {
        const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        return (
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500">
                {days.map(day => <div key={day}>{day}</div>)}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;
        let cellIndex = 0;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                const isCurrentMonth = isSameMonth(day, monthStart);

                days.push(
                    <div 
                        key={day.toString()} 
                        className="aspect-square flex items-center justify-center animate-fade-in-up"
                        style={{ animationDelay: `${cellIndex * 15}ms`}}
                    >
                        {dayRenderer ? (
                            <div onClick={() => onDateSelect && onDateSelect(cloneDay)} className="w-full h-full">
                                {dayRenderer(cloneDay)}
                            </div>
                        ) : (
                            <button
                                onClick={() => onDateSelect && onDateSelect(cloneDay)}
                                className={`w-full h-full p-1 rounded-2xl text-xl transition-colors duration-200 flex items-center justify-center ${
                                    !isCurrentMonth ? 'text-slate-300' : 'text-slate-700'
                                } ${
                                    isSameDay(day, selectedDate || new Date(0)) ? 'bg-rose-500 text-white font-bold' : 'hover:bg-rose-100'
                                }`}
                            >
                                {format(day, 'd')}
                            </button>
                        )}
                    </div>
                );
                day = addDays(day, 1);
                cellIndex++;
            }
            rows.push(<div className="grid grid-cols-7 gap-1" key={day.toString()}>{days}</div>);
            days = [];
        }
        return <div key={currentMonth.toISOString()}>{rows}</div>;
    };

    return (
        <Card className="w-full max-w-3xl mx-auto">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </Card>
    );
};

export default Calendar;