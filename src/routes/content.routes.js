import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware.js'
import { getContent, insertContent, updateContent } from '../controllers/content.controller.js';

const router = Router();

router.get('/content', auth, getContent);
router.post('/content', auth, insertContent);
router.put('/content', auth, updateContent);

export default router;
