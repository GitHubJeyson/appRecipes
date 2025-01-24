import { useContext} from "react";
import RecipeContext from '../context/recipeContext.js'


export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};