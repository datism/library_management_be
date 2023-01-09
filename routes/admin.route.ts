import * as adminController from '../controllers/admin.controller';
import {Router} from "express";
import {auth} from "../middleware/auth";

export const adminRoute = Router();

adminRoute.get('/login', adminController.login);
adminRoute.post('/logout', auth, adminController.logout);
adminRoute.post('/signup', adminController.signup);