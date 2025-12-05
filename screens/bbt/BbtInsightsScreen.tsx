import React, { useMemo, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { format, startOfDay, differenceInDays } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';
import type { BbtLog } from '../../types';

// Re-using the same detection logic as the graph
const findOvulationDay = (temps: { date: Date; temp: number }[]): Date | null => {
    if (temps.length < 10) return null;
    for (let i = 6; i < temps.length - 3; i++) {
        const coverline = Math.max(...temps.slice(i - 6, i).map(t => t.temp));
        const postShiftTemps = temps.slice(i, i + 3).map(t => t.temp);
        if (postShiftTemps.every(temp => temp > coverline + 0.1)) {
            return temps[i-1].date;
        }
    }
    return null;
};

const BbtInsightsScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { bbtLog, cycleData } = context!;

    const ovulationDay = useMemo(() => {
        const validTemps = Object.entries(bbtLog)
            // FIX: Cast `log` to `BbtLog` to safely access the `temp` property.
            .map(([dateStr, log]) => ({ date: startOfDay(new Date(dateStr)), temp: (log as BbtLog).temp }))
            .sort((a, b) => a.date.getTime() - b.date.getTime());
        return findOvulationDay(validTemps);
    }, [bbtLog]);

    const ovulationCycleDay = useMemo(() => {
        if (!ovulationDay || !cycleData) return null;
        return differenceInDays(ovulationDay, cycleData.lastPeriodStart) + 1;
    }, [ovulationDay, cycleData]);

    return (
        <div>
            <Header title="Ovulation Insights" backScreen="BbtMain" />
            <div className="p-4 space-y-5">
                <Card>
                    <div className="flex items-start space-x-3">
                        <ICONS.Correlations className="w-8 h-8 text-rose-500 flex-shrink-0" />
                        <div>
                            <h2 className="font-bold text-lg">How We Detect Ovulation</h2>
                            <p className="text-sm text-slate-500">
                                After ovulation, progesterone causes your basal body temperature to rise slightly (about 0.2-0.5°F or 0.1-0.2°C) and stay elevated. We look for this sustained thermal shift to confirm that ovulation has likely occurred.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="text-center">
                    <h2 className="font-bold text-lg mb-3">Your Ovulation Insight</h2>
                    {ovulationDay && ovulationCycleDay ? (
                        <div className="space-y-2">
                             <ICONS.Star className="w-12 h-12 text-amber-400 mx-auto" />
                            <p className="text-xl font-bold text-slate-700">
                                Ovulation likely occurred on
                            </p>
                            <p className="text-3xl font-bold text-rose-500">
                               {format(ovulationDay, 'MMMM d')}
                            </p>
                             <p className="font-semibold text-slate-600">(Cycle Day {ovulationCycleDay})</p>
                        </div>
                    ) : (
                        <p className="text-slate-500">
                           Not enough data yet to confirm ovulation for this cycle. Keep tracking your temperature daily for the clearest insights! 🌸
                        </p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default BbtInsightsScreen;