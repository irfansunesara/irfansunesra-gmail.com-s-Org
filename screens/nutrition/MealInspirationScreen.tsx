import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { NUTRITION_DATA } from '../../constants';

const MealInspirationScreen: React.FC = () => {
    return (
        <div>
            <Header title="Weekly Meal Inspiration" backScreen="NutritionMain" />
            <div className="p-4 space-y-5">
                <p className="text-center text-slate-500 px-2">This is an example plan to inspire you. Feel free to mix and match based on your preferences and what feels good.</p>
                
                <div className="space-y-4">
                    {NUTRITION_DATA.MealPlan.map((dayPlan, index) => (
                        <div key={dayPlan.day} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms`}}>
                            <Card>
                                <h3 className="font-bold text-2xl text-rose-500">{dayPlan.day}</h3>
                                <div className="mt-4 space-y-3 text-sm">
                                    <p><strong>Breakfast:</strong> {dayPlan.breakfast}</p>
                                    <p><strong>Lunch:</strong> {dayPlan.lunch}</p>
                                    <p><strong>Dinner:</strong> {dayPlan.dinner}</p>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MealInspirationScreen;