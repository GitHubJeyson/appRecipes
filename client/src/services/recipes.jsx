import { useState } from "react";
import RecipeContext from '../context/recipeContext.js'
import {
  createRecipeRequest,
  deleteRecipeRequest,
  getRecipesAllRequest,
  getRecipesRequest,
  getRecipeRequest,
  updateRecipeRequest,
} from "./apiRecipes.js";



export function RecipeProvider({ children }) {
    const [recipes, setRecipes] = useState([]);

    const getAllRecipes = async () => {
      try {
        const res = await getRecipesAllRequest();
        setRecipes(res.data);
      } catch (error) {
        console.log(error)
      }
    };
  
    const getRecipes = async () => {
      try {
        const res = await getRecipesRequest();
        setRecipes(res.data);
      } catch (error) {
        console.log(error)
      }
    };
  
    const deleteRecipe = async (id) => {
      try {
        const res = await deleteRecipeRequest(id);
        if (res.status === 204) return setRecipes(recipes.filter((recipe) => recipe._id !== id));
      } catch (error) {
        console.log(error);
      }
    };
  
    const createRecipe = async (recipe) => {
      try {
        const res = await createRecipeRequest(recipe);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
  
    const getRecipe = async (id) => {
      try {
        const res = await getRecipeRequest(id);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    };
  
    const updateRecipe = async (id, recipe) => {
      try {
        await updateRecipeRequest(id, recipe);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <RecipeContext.Provider
        value={{
          recipes,
          getAllRecipes,
          getRecipes,
          deleteRecipe,
          createRecipe,
          getRecipe,
          updateRecipe,
        }}
      >
        {children}
      </RecipeContext.Provider>
    );
  }