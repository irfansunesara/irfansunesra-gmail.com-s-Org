import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { NUTRITION_DATA, ICONS } from '../../constants';

const CravingsSolutionsScreen: React.FC = () => {
    return (
        <div>
            <Header title="Cravings Solutions" backScreen="NutritionMain" />
            <div className="p-4 space-y-4">
                 <p className="text-center text-slate-500 px-2">Cravings are normal! Here are some healthy and delicious ways to honor what your body is asking for.</p>
                {NUTRITION_DATA.CravingsSolutions.map((item, index) => {
                    const Icon = ICONS[item.icon as keyof typeof ICONS];
                    return (
                        <div key={item.craving} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms`}}>
                            <Card>
                                <div className="flex items-start space-x-4">
                                     <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-7 h-7 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Craving: {item.craving}</h3>
                                        <p className="text-sm text-slate-600 mt-1">{item.solution}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CravingsSolutionsScreen;
