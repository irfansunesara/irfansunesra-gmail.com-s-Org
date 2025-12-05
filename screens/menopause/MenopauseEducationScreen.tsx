import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { MENOPAUSE_EDUCATION } from '../../constants';

const MenopauseEducationScreen: React.FC = () => {
    return (
        <div>
            <Header title="Menopause Insights" backScreen="Home" />
            <div className="p-4 space-y-3">
                <p className="px-2 text-center text-slate-500">Understanding the changes in your body can be empowering. Here’s some information to support you on your journey.</p>
                {MENOPAUSE_EDUCATION.map((item, index) => (
                    <Card key={item.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 70}ms` }}>
                        <h3 className="font-bold text-lg text-purple-800">{item.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MenopauseEducationScreen;
