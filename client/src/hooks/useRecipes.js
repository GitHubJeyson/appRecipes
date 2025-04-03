import { useContext} from "react";
import RecipeContext from '../context/recipeContext.js'


export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) throw new Error("useRecipe debe usarse dentro de un RecipesProvider");
  return context;
};