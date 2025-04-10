import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import { getCommentsByRecipe, addComment, deleteComment } from '../controllers/comment.controller.js';

const router = Router();

router.get('/comments/recipe/:recipeId', getCommentsByRecipe);

router.post('/comments/recipe/:recipeId', auth, addComment);

router.delete('/comments/:commentId', auth, deleteComment);

export default router;
