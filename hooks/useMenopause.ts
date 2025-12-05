import { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';

export const useMenopause = () => {
    const context = useContext(AppContext);

    if (!context || !context.menopauseData || context.appMode !== 'Menopause') {
        return {
            isReady: false,
            stage: null,
            // Add other menopause-related calculations here
        };
    }
    
    const { menopauseData } = context;

    const calculations = useMemo(() => {
        return {
            isReady: true,
            stage: menopauseData.stage,
        };

    }, [menopauseData]);

    return calculations;
};
