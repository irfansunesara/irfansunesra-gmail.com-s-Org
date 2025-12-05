import React, { useState } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import { EXERCISE_LIBRARY, ICONS } from '../../constants';

const ExerciseLibraryScreen: React.FC = () => {
    const [selectedExercise, setSelectedExercise] = useState<{name: string} | null>(null);

    return (
        <div>
            <Header title="Exercise Library" backScreen="ExerciseMain" />
            <div className="p-4 space-y-6">
                <p className="text-center text-slate-500 px-2">Browse different types of movement. Find what feels good for your body today.</p>
                {EXERCISE_LIBRARY.map(category => (
                    <div key={category.category}>
                        <h2 className="text-lg font-bold mb-3 px-2 text-rose-500">{category.category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {category.items.map((item, index) => (
                                <div key={item.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms`}}>
                                    <Card className="flex items-center justify-between">
                                        <span className="font-semibold">{item.name}</span>
                                        <button onClick={() => setSelectedExercise(item)} className="p-2 rounded-full bg-rose-100 hover:bg-rose-200 transition-colors">
                                            <ICONS.ChevronRight className="w-5 h-5 text-rose-500" />
                                        </button>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <Modal 
                isOpen={!!selectedExercise} 
                onClose={() => setSelectedExercise(null)}
                title={selectedExercise?.name || ''}
            >
                <div className="space-y-4">
                    <div className="w-full h-40 bg-gradient-to-br from-rose-100 to-violet-100 rounded-xl flex items-center justify-center">
                        <ICONS.Exercise className="w-16 h-16 text-rose-300" />
                    </div>
                    <p className="text-slate-600">
                        Detailed instructions and a video guide for this exercise will be available here soon.
                        Remember to listen to your body and move in a way that feels supportive and nourishing.
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default ExerciseLibraryScreen;
