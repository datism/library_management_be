import * as authController from '../controllers/auth';
import {Router} from "express";

export const router = Router();

router.get('/login', authController.login);
router.post('/signup', authController.signup);

export default router;