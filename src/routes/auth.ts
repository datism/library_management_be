import * as authController from '../controllers/auth';
import {Router} from "express";
import {checkSchema, Schema} from "express-validator";
import {AuthSchema} from "../schema/auth";
import {validationResultMiddleware} from "../schema";

export const router = Router();

router.get(
    '/login',
    checkSchema(AuthSchema as Schema),
    validationResultMiddleware,
    authController.login
);
router.post(
    '/signup',
    checkSchema(AuthSchema as Schema),
    validationResultMiddleware,
    authController.signup
);

export default router;