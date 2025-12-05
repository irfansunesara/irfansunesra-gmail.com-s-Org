import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { SELF_CARE_DATA, ICONS } from '../../constants';

const SelfCareFavoritesScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { favorites, toggleFavorite } = context!;

    const allItems = [
        ...Object.values(SELF_CARE_DATA.SymptomCare).flat(),
        ...Object.values(SELF_CARE_DATA.MoodSupport).flat(),
    ];

    const favoriteItems = allItems.filter(item => favorites.includes(item.id));

    return (
        <div>
            <Header title="Your Favorite Ideas" backScreen="SelfCareMain" />
            <div className="p-4 space-y-4">
                {favoriteItems.length > 0 ? (
                    favoriteItems.map(item => (
                         <Card key={item.id} className="flex items-center justify-between">
                            <p className="text-slate-700 flex-grow pr-4">{item.tip}</p>
                            <button onClick={() => toggleFavorite(item.id)}>
                                <ICONS.Heart className="w-6 h-6 text-red-500 fill-current" />
                            </button>
                        </Card>
                    ))
                ) : (
                    <Card className="text-center text-slate-500">
                        <p>You haven't saved any favorites yet.</p>
                        <p className="mt-2 text-sm">Tap the ♥️ icon next to a self-care tip to save it here for later!</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default SelfCareFavoritesScreen;