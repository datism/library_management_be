import {Router} from "express";
import {adminRoute} from "./admin.route";

export const routes = Router();

routes.use('/admin', adminRoute);