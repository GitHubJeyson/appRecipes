import { useEffect } from "react";
import { useRecipes } from "../hooks/useRecipes.js";
import { RecipeCard } from "../components/recipes/RecipeCard.jsx";
import { ImFileEmpty } from "react-icons/im";

export function RecipesPage() {
  const { recipes, getRecipes } = useRecipes();

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-4" role="region" aria-labelledby="recipe-list">
        {recipes.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-10 text-center">
          <ImFileEmpty className="text-6xl text-gray-400 mb-4" />
          <h1 className="font-semibold text-xl text-gray-600">
            Aún no hay recetas
          </h1>
        </div>
        ) : (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id} />
          ))}
        </div>
        )}
      </div>
    </>
  );
}
