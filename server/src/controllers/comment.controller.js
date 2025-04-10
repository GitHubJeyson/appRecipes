import Comment from '../models/comment.model.js';
import mongoose from 'mongoose';

export const getCommentsByRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: 'ID de receta no válido' });
    }
    
    const comments = await Comment.find({ recipe: recipeId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

      if (comments.length === 0) {
        return res.status(200).json([]);
      }

    res.json(comments);
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  const { content } = req.body;
  const { recipeId } = req.params;

  if (!content) {
    return res.status(400).json({ message: 'El comentario no puede estar vacío' });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: 'ID de receta no válido' });
    }

    const newComment = new Comment({
      content,
      user: req.user.id,
      recipe: recipeId,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error al agregar el comentario:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { recipeId } = req.body;
    const user = req.user.id;
    const userRole = req.body.user.role;

    const comment = await Comment.findOne({ _id: commentId, recipe: recipeId });

    if (!comment) {
      console.log('Comentario no encontrado o no pertenece a la receta');
      return res.status(404).json({ message: 'Comentario no encontrado o no pertenece a esta receta.' });
    }

    if (comment.user.toString() !== user.toString() && userRole !== 'admin') {
      console.log('El usuario no tiene permiso para eliminar este comentario');
      return res.status(403).json({ message: 'No tienes permiso para eliminar este comentario.' });
    }

    await Comment.findOneAndDelete({ _id: commentId });
    console.log('Comentario eliminado exitosamente');
    res.status(200).json({ message: 'Comentario eliminado.' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ message: 'Error al eliminar comentario', error: error.message });
  }
};


  