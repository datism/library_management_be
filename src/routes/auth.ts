import * as adminController from '../controllers/auth';
import {Router} from "express";

export const router = Router();

router.get('/login', adminController.login);
router.post('/signup', adminController.signup);

export default router;