import React, { useMemo, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useCycle } from '../../hooks/useCycle';
import { format, subDays, startOfDay } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import type { WeightLog } from '../../types';

const WeightGraphScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { weightLog } = context!;
    const { getDayInfo } = useCycle();

    const chartData = useMemo(() => {
        const today = startOfDay(new Date());
        return Array.from({ length: 30 }).map((_, i) => {
            const date = subDays(today, 29 - i);
            const dateKey = format(date, 'yyyy-MM-dd');
            return {
                date,
                weight: weightLog[dateKey]?.weight || null,
                isLuteal: getDayInfo(date).phase === 'Luteal',
            };
        });
    }, [weightLog, getDayInfo]);
    
    const filteredChartData = chartData.filter(d => d.weight !== null);
    if (filteredChartData.length < 2) {
         return (
             <div>
                <Header title="Weight Graph" backScreen="WeightMain" />
                 <div className="p-4 text-center">
                    <Card><p className="text-slate-500">Log your weight for a few more days to see your chart here. Be kind to yourself! 💗</p></Card>
                </div>
            </div>
         )
    }
    
    const weights = filteredChartData.map(d => d.weight!);
    const minWeight = Math.min(...weights) - 2;
    const maxWeight = Math.max(...weights) + 2;
    const weightRange = maxWeight - minWeight;
    const width = 300, height = 150;

    const getX = (index: number) => (index / (chartData.length - 1)) * width;
    const getY = (weight: number) => height - ((weight - minWeight) / weightRange) * height;
    
    const path = filteredChartData
        .map((point) => {
            const index = chartData.findIndex(d => d.date === point.date);
            return `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getY(point.weight!)}`;
        }).join(' ');

    return (
        <div>
            <Header title="Weight Graph" backScreen="WeightMain" />
            <div className="p-4 space-y-5">
                 <p className="text-center text-slate-500 px-2">This chart shows your weight fluctuations over the last 30 days. Remember that small changes are normal and expected.</p>
                <Card>
                    <div className="relative">
                        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
                            {/* Luteal phase background highlight */}
                             <path 
                                d={chartData.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${p.isLuteal ? 0 : height}`).join(' ') + ` L ${getX(29)} ${height} L ${getX(0)} ${height} Z`}
                                fill="rgba(192, 132, 252, 0.1)"
                             />
                            <path d={path} fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            {filteredChartData.map((point) => {
                                const index = chartData.findIndex(d => d.date === point.date);
                                 return (
                                    <circle 
                                        key={point.date.toISOString()}
                                        cx={getX(index)}
                                        cy={getY(point.weight!)}
                                        r="2.5"
                                        fill="#a855f7"
                                    />
                                 )
                            })}
                        </svg>
                    </div>
                     <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>{format(chartData[0].date, 'MMM d')}</span>
                        <span>{format(chartData[29].date, 'MMM d')}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 bg-violet-50 p-2 rounded-lg">
                        <div className="w-4 h-4 rounded-sm bg-violet-100" />
                        <p className="text-sm font-semibold text-violet-600">Luteal phase highlighted</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default WeightGraphScreen;