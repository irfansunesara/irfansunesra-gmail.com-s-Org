import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';

const MedicationListScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { medications } = context!;

    return (
        <div>
            <Header title="Your Medication List" backScreen="MedicationMain" />
            <div className="p-4 space-y-3">
                {medications.length > 0 ? (
                    medications.map((med, index) => (
                        <div key={med.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                            <Card>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800">{med.name}</h3>
                                        <p className="text-sm text-slate-500">{med.dosage} - {med.type}</p>
                                        <p className="text-sm text-slate-500">{med.schedule} {med.schedule === 'Daily' && `at ${med.times.join(', ')}`}</p>
                                        {med.purpose && <p className="text-sm italic text-teal-700 mt-1">Purpose: {med.purpose}</p>}
                                    </div>
                                    {/* Edit/Delete buttons could go here */}
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <Card className="text-center text-slate-500 py-8">
                        <ICONS.Pill className="w-12 h-12 mx-auto text-teal-200" />
                        <p className="mt-4 font-semibold">Your medication list is empty.</p>
                        <p className="text-sm mt-1">Tap "Add Medication" to get started.</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default MedicationListScreen;
