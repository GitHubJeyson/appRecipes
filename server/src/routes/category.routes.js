import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware.js'
import { getCategories, createCategory, deleteCategory, getTags, createTag, deleteTag } from '../controllers/category.controller.js';

const router = Router();

router.get('/category', getCategories);
router.post('/category', auth, createCategory);
router.delete('/category/:id', auth, deleteCategory);

//Tags

router.get('/tags', getTags);
router.post('/tags', auth, createTag);
router.delete('/tags/:id', auth, deleteTag);

export default router;
