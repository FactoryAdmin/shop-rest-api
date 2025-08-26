import { Router } from 'express';
import { login, registerUser } from '../controllers/users.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
// @ts-ignore
router.post('/login', login);
router.post('/register', authenticateToken as any, registerUser as any);

export default router;
