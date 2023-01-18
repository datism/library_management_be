import jwt, {JsonWebTokenError, JwtPayload} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {BadRequest, Unauthorized} from "../error";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return next(new Unauthorized({message:'Invalid credentials'}));
    }

    try {
        (req as CustomRequest).token = jwt.verify(token, process.env.SECRET_KEY as string)
    }
    catch (JsonWebTokenError) {
        return next(new Unauthorized({message:'Invalid credentials'}));
    }

    next();
};