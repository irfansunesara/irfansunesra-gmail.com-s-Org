import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { MEDICATION_GUIDES } from '../../constants';
import type { Medication } from '../../types';

interface GuideSectionProps {
    title: string;
    items: Partial<Medication>[];
}

const GuideSection: React.FC<GuideSectionProps> = ({ title, items }) => (
    <div className="space-y-3">
        <h2 className="text-xl font-bold text-rose-500 px-2">{title}</h2>
        {items.map((item, index) => (
            <div key={item.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                <Card>
                    <h3 className="font-bold text-slate-800">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.purpose}</p>
                    <p className="text-xs font-semibold text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full inline-block mt-2">{item.type}</p>
                </Card>
            </div>
        ))}
    </div>
);


const MedicationGuidesScreen: React.FC = () => {
    return (
        <div>
            <Header title="Medication & Supplement Guides" backScreen="MedicationMain" />
            <div className="p-4 space-y-6">
                 <Card>
                    <p className="text-sm text-center text-slate-500">
                        Here are some commonly used supplements and medications for different life stages.
                        <strong> This is for informational purposes only and is not medical advice.</strong> Always consult your healthcare provider.
                    </p>
                </Card>
                <GuideSection title="For PMS Support" items={MEDICATION_GUIDES.pms} />
                <GuideSection title="For Pregnancy Wellness" items={MEDICATION_GUIDES.pregnancy} />
                <GuideSection title="For Menopause Support" items={MEDICATION_GUIDES.menopause} />
            </div>
        </div>
    );
};

export default MedicationGuidesScreen;
