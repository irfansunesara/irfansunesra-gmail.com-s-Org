import { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { differenceInWeeks, differenceInDays } from 'date-fns';
import { BABY_DEVELOPMENT_DATA } from '../constants';

export const usePregnancy = () => {
    const context = useContext(AppContext);

    if (!context || !context.pregnancyData || context.appMode !== 'Pregnancy') {
        return {
            isReady: false,
            pregnancyWeek: 0,
            pregnancyDay: 0,
            trimester: 1,
            babySize: 'a poppy seed',
        };
    }
    
    const { pregnancyData } = context;

    const calculations = useMemo(() => {
        const today = new Date();
        const { startDate } = pregnancyData;

        const totalDays = differenceInDays(today, startDate);
        const pregnancyWeek = Math.floor(totalDays / 7) + 1;
        const pregnancyDay = (totalDays % 7) + 1;

        let trimester = 1;
        if (pregnancyWeek > 27) trimester = 3;
        else if (pregnancyWeek > 13) trimester = 2;

        const babySizeData = BABY_DEVELOPMENT_DATA.find(d => d.week === pregnancyWeek);

        return {
            isReady: true,
            pregnancyWeek,
            pregnancyDay,
            trimester,
            babySize: babySizeData ? babySizeData.size : '...',
        };

    }, [pregnancyData]);

    return calculations;
};
