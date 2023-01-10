import {Router} from "express";
import authRoute from "./auth";

export const routes = Router();

routes.use('/admin', authRoute);
