import { useEffect, useState } from "react";
import { useRecipes } from "../hooks/useRecipes.js";
import RecipeCard from "../components/recipes/RecipeCard.jsx";
import { ImFileEmpty } from "react-icons/im";

export function MyFavoritesRecipes() {
  const { favorites, getFavorites } = useRecipes();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      await getFavorites();
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10 text-center">
        <h1 className="font-semibold text-xl text-gray-600">Cargando favoritos...</h1>
      </div>
    );
  }

  return (
    <div className="w-full" role="region" aria-labelledby="favorite-recipe-list">
      {favorites.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-10 text-center">
          <ImFileEmpty className="text-6xl text-gray-400 mb-4" />
          <h1 className="font-semibold text-xl text-gray-600">
            Aún no tienes recetas favoritas
          </h1>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((recipe) => (
            <RecipeCard 
            recipe={recipe} 
            key={recipe._id} 
            showComments={false} 
            showFavorites={true}/>
          ))}
        </div>
      )}
    </div>
  );
}
