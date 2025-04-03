import { useState } from "react";
import RecipeContext from '../context/recipeContext.js';
import {
  createRecipeRequest,
  deleteRecipeRequest,
  getRecipesAllRequest,
  getRecipesRequest,
  getRecipeRequest,
  updateRecipeRequest,
  assignCategoryAndTagsRequest,
  removeCategoryAndTagsRequest,
  addFavoriteRequest,
  removeFavoriteRequest,
  getFavoritesRequest,
} from "./apiRecipes.js";


export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
  
  const createRecipe = async (recipe) => {
    console.log('Envio de formulario Frontend', recipe);
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
      const res = await updateRecipeRequest(id, recipe);
      return res.data;
    } catch (error) {
      console.error(error);
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

  //category and tags

  const assignCategoryAndTags = async (recipeId, categoryId, tagIds) => {
    try {
      const res = await assignCategoryAndTagsRequest(recipeId, categoryId, tagIds);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const removeCategoryAndTags = async (recipeId) => {
    try {
      const res = await removeCategoryAndTagsRequest(recipeId);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  // Obtener recetas favoritas

  const getFavorites = async () => {
    try {
      const response = await getFavoritesRequest();
      setFavorites(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addFavorite = async (recipeId) => {
    try {
      await addFavoriteRequest(recipeId);
      setFavorites([...favorites, { _id: recipeId }]);
    } catch (error) {
      console.error(error);
    }
  };
  
  const removeFavorite = async (recipeId) => {
    try {
      await removeFavoriteRequest(recipeId);
      setFavorites(favorites.filter((fav) => fav._id !== recipeId));
    } catch (error) {
      console.error(error);
    }
  };  
  
  
    return (
      <RecipeContext.Provider
        value={{
          recipes,
          setRecipes,
          getAllRecipes,
          getRecipes,
          deleteRecipe,
          createRecipe,
          getRecipe,
          updateRecipe,
          assignCategoryAndTags,
          removeCategoryAndTags,
          favorites,
          getFavorites,
          addFavorite,
          removeFavorite,
        }}
      >
        {children}
      </RecipeContext.Provider>
    );
  }