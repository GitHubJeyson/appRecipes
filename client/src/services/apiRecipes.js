import axios from "./axios";

export const getRecipesAllRequest = async () => { return axios.get("/")};

export const getRecipesRequest = async () => { return axios.get("/recipes")};

export const createRecipeRequest = async (recipe) => { return axios.post("/recipes", recipe)};

export const updateRecipeRequest = async (id, recipe) => { return axios.put(`/recipes/${id}`, recipe)};

export const deleteRecipeRequest = async (id) => { return axios.delete(`/recipes/${id}`)};

export const getRecipeRequest = async (id) => { return axios.get(`/recipes/${id}`)};

// Category and tags

export const assignCategoryAndTagsRequest = async (recipeId, categoryId, tagIds) => { return axios.put('/assign', {recipeId, categoryId, tagIds})};

export const removeCategoryAndTagsRequest = async (recipeId) => { return axios.put('/remove', {recipeId})};

// favorites

export const addFavoriteRequest = async (recipeId) => { return axios.post("/favorites", { recipeId })};
  
export const removeFavoriteRequest = async (recipeId) => { return axios.delete("/favorites", { data: { recipeId } })};
  
export const getFavoritesRequest = async () => { return axios.get("/favorites")}