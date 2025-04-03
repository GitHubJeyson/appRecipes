import Recipe from '../models/recipe.model.js';
import User from "../models/user.model.js";

  export const getAllRecipes = async (req, res) => {
    try {
      const recipesAll = await Recipe.find();
      res.json(recipesAll);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const getRecipes = async (req, res) => {
      try {
        const recipes = await Recipe.find({ user : req.user.id }).populate("user");
        res.json(recipes);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };

  export const createRecipe = async (req, res) => {
    try {
      const { title, description, imageUrl, ingredients, instructions, cookingtime, category, tags } = req.body;
      console.log('Datos recibidos en el Backend', req.body);
      const newRecipe = new Recipe({
        title,
        description,
        imageUrl,
        ingredients,
        instructions,
        cookingtime,
        category: category,
        tags: tags,
        user: req.user.id,
      });
      await newRecipe.populate('category tags');

      await newRecipe.save();
      return res.json(newRecipe);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
   
  export const getRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) return res.status(404).json({ message: "Receta no Encontrada" });
      return res.json(recipe);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const deleteRecipe = async (req, res) => {
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!deletedRecipe) return res.status(404).json({ message: "Receta no Encontrada" });
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const updateRecipe = async (req, res) => {
    try {
      const { title, description, imageUrl, ingredients, instructions, cookingtime, category, tags } = req.body;
      const updateRecipe = await Recipe.findOneAndUpdate(
        { _id: req.params.id },
        { title, description, imageUrl, ingredients, instructions, cookingtime, category, tags},
        { new: true }
      );
      return res.json(updateRecipe);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Favorite

  export const addFavorite = async (req, res) => {
    try {
      const { recipeId } = req.body;
      const user = await User.findById(req.user.id);
      const recipe = await Recipe.findById(recipeId);

      if (!recipe) return res.status(404).json({ message: "Receta no encontrada" });
      if (!user.favorites.includes(recipeId)) {
        user.favorites.push(recipeId);
        await user.save();
      }
      return res.json({ message: "Receta añadida a favoritos" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const removeFavorite = async (req, res) => {
    try {
      const { recipeId } = req.body;
      const user = await User.findById(req.user.id);

      user.favorites = user.favorites.filter(fav => fav.toString() !== recipeId);
      await user.save();
      return res.json({ message: "Receta eliminada de favoritos" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const getFavorites = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate("favorites");
      res.json(user.favorites);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
