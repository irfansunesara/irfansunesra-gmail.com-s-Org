import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { BABY_DEVELOPMENT_DATA } from '../../constants';

const BabyDevelopmentScreen: React.FC = () => {
    return (
        <div>
            <Header title="Baby's Weekly Development" backScreen="Home" />
            <div className="p-4 space-y-3">
                {BABY_DEVELOPMENT_DATA.map((week, index) => (
                    <Card key={week.week} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                        <h2 className="font-bold text-xl text-blue-600">Week {week.week}</h2>
                        <p className="font-semibold text-slate-500">Baby is the size of {week.size}</p>
                        <p className="text-sm mt-2">{week.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BabyDevelopmentScreen;
