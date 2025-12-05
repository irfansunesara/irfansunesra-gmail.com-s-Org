import { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { addDays, subDays, differenceInDays, startOfDay, format, isWithinInterval, isSameDay } from 'date-fns';
import type { CyclePhaseInfo } from '../types';

const disabledState = {
    isReady: false,
    cycleData: null,
    currentCycleDay: 0,
    daysUntilNextPeriod: 0,
    nextPeriodDate: new Date(),
    nextPeriodDateRange: null,
    currentPhase: 'Follicular' as const,
    fertileWindow: { start: new Date(), end: new Date() },
    ovulationDay: new Date(),
    pmsWindow: { start: new Date(), end: new Date() },
    getDayInfo: (_date: Date) => ({
        isPeriod: false,
        isFertile: false,
        isOvulation: false,
        isPms: false,
        phase: 'Follicular' as const,
        cycleDay: 0,
    })
};

export const useCycle = () => {
    const context = useContext(AppContext);

    if (!context || !context.cycleData || context.appMode !== 'Cycle') {
        return disabledState;
    }
    
    // AI Integration: Use AI profile if available
    const { cycleData, aiProfile } = context;

    const calculations = useMemo(() => {
        const today = startOfDay(new Date());
        
        // Use AI-refined data if it exists, otherwise use user-provided data
        const aiCycleLength = aiProfile?.cycleAnalysis?.avgCycleLength;
        const effectiveCycleLength = aiCycleLength && aiCycleLength > 15 ? aiCycleLength : cycleData.cycleLength;

        const { lastPeriodStart, periodLength, regularity } = cycleData;
        
        const cycleStartDate = startOfDay(lastPeriodStart);

        let cyclesSinceStart = Math.floor(differenceInDays(today, cycleStartDate) / effectiveCycleLength);
        if (differenceInDays(today, cycleStartDate) < 0) {
           cyclesSinceStart = -1;
        }
        
        let currentCycleStartDate = addDays(cycleStartDate, cyclesSinceStart * effectiveCycleLength);
        if (isSameDay(today, currentCycleStartDate) || today < currentCycleStartDate) {
            currentCycleStartDate = addDays(cycleStartDate, (cyclesSinceStart -1) * effectiveCycleLength);
            if(differenceInDays(today, currentCycleStartDate) > effectiveCycleLength) {
                 currentCycleStartDate = addDays(currentCycleStartDate, effectiveCycleLength);
            }
        }
        
        let currentCycleDay = differenceInDays(today, currentCycleStartDate) + 1;
        
        if(currentCycleDay > effectiveCycleLength) {
          currentCycleStartDate = addDays(currentCycleStartDate, effectiveCycleLength);
          currentCycleDay = differenceInDays(today, currentCycleStartDate) + 1;
        }

        const nextPeriodStartDate = addDays(currentCycleStartDate, effectiveCycleLength);
        const isIrregular = regularity === 'Irregular' || (aiProfile?.cycleAnalysis.irregularitySigns && aiProfile.cycleAnalysis.irregularitySigns !== 'None');
        
        // Use AI-powered variance for prediction window, with a fallback for irregular cycles.
        const variance = aiProfile?.cycleAnalysis.cycleLengthVariance || (isIrregular ? 3 : 0);
        const nextPeriodDateRange = variance > 0
            ? { start: subDays(nextPeriodStartDate, variance), end: addDays(nextPeriodStartDate, variance) }
            : null;
            
        const daysUntilNextPeriod = differenceInDays(nextPeriodDateRange ? nextPeriodDateRange.start : nextPeriodStartDate, today);

        const aiOvulationDay = aiProfile?.cycleAnalysis.ovulationDay;
        const ovulationDayOffset = aiOvulationDay && aiOvulationDay > 5 ? aiOvulationDay : Math.round(effectiveCycleLength - 14);
        const ovulationDay = addDays(currentCycleStartDate, ovulationDayOffset - 1);

        const fertileWindowStart = addDays(ovulationDay, -5);
        const fertileWindowEnd = addDays(ovulationDay, 1);
        
        const aiPmsDays = aiProfile?.cycleAnalysis.pmsWindowDays || 7;
        const pmsWindowStart = subDays(nextPeriodStartDate, aiPmsDays);
        const pmsWindowEnd = subDays(nextPeriodStartDate, 1);
        
        const getPhase = (day: number): CyclePhaseInfo['phase'] => {
            if (day <= periodLength) return 'Menstrual';
            if (day < ovulationDayOffset) return 'Follicular';
            if (day >= ovulationDayOffset && day <= ovulationDayOffset + 1) return 'Ovulation';
            return 'Luteal';
        };

        const currentPhase = getPhase(currentCycleDay);

        const getDayInfo = (date: Date) => {
            const normalizedDate = startOfDay(date);
            
            let tempCyclesSinceStart = Math.floor(differenceInDays(normalizedDate, cycleStartDate) / effectiveCycleLength);
            let cycleStartDateForDate = addDays(cycleStartDate, tempCyclesSinceStart * effectiveCycleLength);
            let cycleDay = differenceInDays(normalizedDate, cycleStartDateForDate) + 1;

            if (cycleDay > effectiveCycleLength) {
                cycleStartDateForDate = addDays(cycleStartDateForDate, effectiveCycleLength);
                cycleDay = differenceInDays(normalizedDate, cycleStartDateForDate) + 1;
            }

            const nextPeriodStartForDate = addDays(cycleStartDateForDate, effectiveCycleLength);
            const pmsStartForDate = subDays(nextPeriodStartForDate, aiPmsDays);
            const pmsEndForDate = subDays(nextPeriodStartForDate, 1);

            const ovulationDayForDate = addDays(cycleStartDateForDate, ovulationDayOffset - 1);
            const fertileStartForDate = addDays(ovulationDayForDate, -5);
            const fertileEndForDate = addDays(ovulationDayForDate, 1);
            
            const isPeriod = cycleDay > 0 && cycleDay <= periodLength;
            const isFertile = isWithinInterval(normalizedDate, { start: fertileStartForDate, end: fertileEndForDate });
            const isOvulation = isSameDay(normalizedDate, ovulationDayForDate) || isSameDay(normalizedDate, addDays(ovulationDayForDate, 1));
            const isPms = isWithinInterval(normalizedDate, { start: pmsStartForDate, end: pmsEndForDate });
            
            return { isPeriod, isFertile, isOvulation, isPms, phase: getPhase(cycleDay), cycleDay };
        };

        return {
            isReady: true,
            cycleData,
            currentCycleDay,
            daysUntilNextPeriod: daysUntilNextPeriod > 0 ? daysUntilNextPeriod : 0,
            nextPeriodDate: nextPeriodStartDate,
            nextPeriodDateRange,
            currentPhase,
            fertileWindow: { start: fertileWindowStart, end: fertileWindowEnd },
            ovulationDay,
            pmsWindow: { start: pmsWindowStart, end: pmsWindowEnd },
            getDayInfo
        };
    }, [cycleData, aiProfile]);

    return calculations;
};