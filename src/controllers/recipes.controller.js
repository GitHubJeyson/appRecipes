import Recipe from '../models/recipe.model.js'

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
      const { title, description, imageUrl, ingredients, instructions, cookingtime } = req.body;
      const newRecipe = new Recipe({
        title,
        description,
        imageUrl,
        ingredients,
        instructions,
        cookingtime,
        user: req.user.id,
      });
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
      const { title, description, imageUrl, ingredients, instructions, cookingtime } = req.body;
      const updateRecipe = await Recipe.findOneAndUpdate(
        { _id: req.params.id },
        { title, description, imageUrl, ingredients, instructions, cookingtime},
        { new: true }
      );
      return res.json(updateRecipe);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
 
  