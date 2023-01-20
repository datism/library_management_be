import * as admin from '../models/admin';
import {NextFunction, Request, Response} from 'express';
import {BadRequest} from "../error";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await admin.findByCredentials(req.body);
        res.status(200).send(user);
    }
    catch (error) {
        return next(new BadRequest({message:'Invalid credentials'}));
    }
}


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await admin.createAdmin(req.body);

        res.status(200).send('Inserted successfully');
    }
    catch (error) {
        return next(new BadRequest({message:'Invalid credentials'}));
    }
}