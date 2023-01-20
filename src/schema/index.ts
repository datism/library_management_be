import { validationResult, checkSchema } from "express-validator";
import {BadRequest, ValidationError} from "../error";
import {NextFunction} from "express";

export const validationResultMiddleware = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new ValidationError({
            message:'Validation Error',
            data: errors.array(),
        }))
    }
    next();
};