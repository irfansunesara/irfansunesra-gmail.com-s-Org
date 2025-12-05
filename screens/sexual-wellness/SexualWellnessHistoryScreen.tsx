import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { format } from 'date-fns';
import Header from '../../components/Header';
import Card from '../../components/Card';
import type { SexualActivityLog } from '../../types';

const SexualWellnessHistoryScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { sexualActivityLog } = context!;

    const history = useMemo(() => {
        return Object.entries(sexualActivityLog)
            .map(([date, log]) => ({ date: new Date(date), ...(log as SexualActivityLog) }))
            .sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [sexualActivityLog]);

    return (
        <div>
            <Header title="Activity History" backScreen="SexualWellnessMain" />
            <div className="p-4 space-y-3">
                {history.length > 0 ? (
                    history.map((item, index) => (
                        <div key={item.date.toISOString()} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                            <Card>
                                <p className="font-bold text-slate-700">{format(item.date, 'EEEE, MMM d')}</p>
                                <div className="mt-2 space-y-1 text-sm">
                                    <p><strong>Feeling:</strong> {item.emotionalFeeling}</p>
                                    <p><strong>Comfort:</strong> {'❤️'.repeat(item.comfortLevel)}{'🤍'.repeat(5 - item.comfortLevel)}</p>
                                    {item.notes && <p className="italic"><strong>Note:</strong> "{item.notes}"</p>}
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <Card className="text-center text-slate-500 py-8">
                        <p>Your private activity log will appear here.</p>
                        <p className="mt-2 text-sm">Your privacy is our priority. 💗</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default SexualWellnessHistoryScreen;