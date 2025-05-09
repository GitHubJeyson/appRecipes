import { Router } from 'express'
import { getAllRecipes, getRecipes, createRecipe, getRecipe, deleteRecipe, updateRecipe, addFavorite, removeFavorite, getFavorites } from '../controllers/recipes.controller.js'
import { auth } from '../middlewares/auth.middleware.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createRecipeSchema } from '../schemas/recipe.schema.js'

const router = Router();

router.get('/', getAllRecipes);

router.get('/recipes',auth, getRecipes);

router.post('/recipes',auth, validateSchema(createRecipeSchema), createRecipe);

router.get('/recipes/:id',auth, getRecipe);

router.delete('/recipes/:id',auth, deleteRecipe);

router.put('/recipes/:id',auth, validateSchema(createRecipeSchema), updateRecipe);

router.post('/favorites', auth, addFavorite);

router.delete('/favorites', auth, removeFavorite);

router.get('/favorites', auth, getFavorites);

 export default router