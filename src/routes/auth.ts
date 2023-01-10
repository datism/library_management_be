import * as adminController from '../controllers/auth';
import {Router} from "express";

export const authRoute = Router();

authRoute.get('/login', adminController.login);
authRoute.post('/signup', adminController.signup);

export default authRoute;