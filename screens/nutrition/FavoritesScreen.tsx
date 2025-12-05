import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ICONS } from '../../constants';

const FavoritesScreen: React.FC = () => {
    const context = useContext(AppContext);
    const { favorites, toggleFavorite } = context!;

    return (
        <div>
            <Header title="Your Favorites" backScreen="NutritionMain" />
            <div className="p-4 space-y-4">
                {favorites.length > 0 ? (
                    favorites.map(favId => {
                        const [type, name] = favId.split('_');
                        return (
                             <Card key={favId} className="flex items-center justify-between">
                                <span className="font-semibold">{name}</span>
                                <button onClick={() => toggleFavorite(favId)}>
                                    <ICONS.Heart className="w-6 h-6 text-red-500 fill-current" />
                                </button>
                            </Card>
                        )
                    })
                ) : (
                    <Card className="text-center text-slate-500">
                        <p>You haven't saved any favorites yet.</p>
                        <p className="mt-2 text-sm">Tap the ♥️ icon next to a food or meal to save it here for later!</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default FavoritesScreen;
