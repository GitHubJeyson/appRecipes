import axios from "./axios";

export const getRecipesAllRequest = async () => axios.get("/");

export const getRecipesRequest = async () => axios.get("/recipes");

export const createRecipeRequest = async (recipe) => axios.post("/recipes", recipe);

export const updateRecipeRequest = async (id, recipe) =>
  axios.put(`/recipes/${id}`, recipe);

export const deleteRecipeRequest = async (id) => axios.delete(`/recipes/${id}`);

export const getRecipeRequest = async (id) => axios.get(`/recipes/${id}`);


