import {Router} from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { login, register, verifyToken, logout, checkAdminExists, getUsers, deleteUser} from '../controllers/auth.controller.js';
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'


const router = Router();

router.post('/register',validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.get('/verify', verifyToken);

router.post('/logout', verifyToken, logout);

router.get('/check-admin', checkAdminExists);

router.get('/users', auth, getUsers);

router.delete('/users/:id', auth, deleteUser);

export default router