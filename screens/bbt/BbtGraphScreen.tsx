import React, { useMemo, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { format, subDays, startOfDay, addDays, differenceInDays } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import type { BbtLog } from '../../types';

// A simple utility to find a sustained thermal shift
const findOvulationDay = (temps: { date: Date; temp: number }[]): Date | null => {
    if (temps.length < 10) return null; // Not enough data

    for (let i = 6; i < temps.length - 3; i++) {
        const coverline = Math.max(...temps.slice(i - 6, i).map(t => t.temp));
        const postShiftTemps = temps.slice(i, i + 3).map(t => t.temp);

        // Check for 3 consecutive days above the coverline
        if (postShiftTemps.every(temp => temp > coverline + 0.1)) {
            return temps[i-1].date; // Ovulation is the day *before* the temp rise
        }
    }
    return null;
};

const BbtGraphScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { bbtLog } = context!;

    const chartData = useMemo(() => {
        const today = startOfDay(new Date());
        return Array.from({ length: 30 }).map((_, i) => {
            const date = subDays(today, 29 - i);
            const dateKey = format(date, 'yyyy-MM-dd');
            return {
                date,
                temp: bbtLog[dateKey]?.temp || null,
            };
        });
    }, [bbtLog]);
    
    const ovulationDay = useMemo(() => {
        const validTemps = Object.entries(bbtLog)
            // FIX: Cast `log` to `BbtLog` to safely access the `temp` property.
            .map(([dateStr, log]) => ({ date: startOfDay(new Date(dateStr)), temp: (log as BbtLog).temp }))
            .filter(item => item.temp !== null)
            .sort((a, b) => a.date.getTime() - b.date.getTime());
        return findOvulationDay(validTemps as { date: Date; temp: number }[]);
    }, [bbtLog]);
    
    const filteredChartData = chartData.filter(d => d.temp !== null);
    if (filteredChartData.length < 2) {
         return (
             <div>
                <Header title="Temperature Graph" backScreen="BbtMain" />
                 <div className="p-4 text-center">
                    <Card><p className="text-slate-500">Log your temperature for a few more days to see your chart here. 🌡️</p></Card>
                </div>
            </div>
         )
    }
    
    const temps = filteredChartData.map(d => d.temp!);
    const minTemp = Math.min(...temps) - 0.2;
    const maxTemp = Math.max(...temps) + 0.2;
    const tempRange = maxTemp - minTemp;
    const width = 300, height = 150;

    const getX = (index: number) => (index / (chartData.length - 1)) * width;
    const getY = (temp: number) => height - ((temp - minTemp) / tempRange) * height;
    
    const path = filteredChartData
        .map((point, index, points) => {
            if (index === 0) return `M ${getX(chartData.findIndex(d => d.date === point.date))} ${getY(point.temp!)}`;
            return `L ${getX(chartData.findIndex(d => d.date === point.date))} ${getY(point.temp!)}`;
        }).join(' ');

    return (
        <div>
            <Header title="Temperature Graph" backScreen="BbtMain" />
            <div className="p-4 space-y-5">
                 <p className="text-center text-slate-500 px-2">Your 30-day BBT chart. A sustained temperature rise can indicate that ovulation has occurred.</p>
                <Card>
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>{maxTemp.toFixed(1)}°</span>
                        <span>{minTemp.toFixed(1)}°</span>
                    </div>
                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
                        <path d={path} fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        {filteredChartData.map((point) => {
                             const isOvulation = ovulationDay && differenceInDays(point.date, ovulationDay) >= 0 && differenceInDays(point.date, ovulationDay) <= 1;
                             return (
                                <circle 
                                    key={point.date.toISOString()}
                                    cx={getX(chartData.findIndex(d => d.date === point.date))}
                                    cy={getY(point.temp!)}
                                    r={isOvulation ? "4" : "2.5"}
                                    fill={isOvulation ? '#ec4899' : '#f472b6'}
                                    stroke={isOvulation ? '#fff' : 'none'}
                                    strokeWidth="1"
                                />
                             )
                        })}
                        {ovulationDay && <line x1={getX(chartData.findIndex(d => d.date >= ovulationDay))} y1="0" x2={getX(chartData.findIndex(d => d.date >= ovulationDay))} y2={height} stroke="#f43f5e" strokeWidth="1" strokeDasharray="4 2" />}
                    </svg>
                     <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>{format(chartData[0].date, 'MMM d')}</span>
                        <span>{format(chartData[29].date, 'MMM d')}</span>
                    </div>
                    {ovulationDay && (
                        <div className="flex items-center space-x-2 mt-4 bg-rose-50 p-2 rounded-lg">
                            <ICONS.Star className="w-5 h-5 text-rose-500" />
                            <p className="text-sm font-semibold text-rose-600">Ovulation likely occurred around {format(ovulationDay, 'MMM d')}</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default BbtGraphScreen;