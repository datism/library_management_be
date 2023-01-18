import * as authController from '../controllers/auth';
import {Router} from "express";

export const router = Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);

export default router;