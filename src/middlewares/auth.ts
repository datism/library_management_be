import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {Unauthorized} from "../error";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new Unauthorized();
    }

    // TODO: query in Admin db to find user. Ff no user found, let's return Unauthorized() again

    (req as CustomRequest).token = jwt.verify(token, process.env.SECRET_KEY as string);

    next();
};