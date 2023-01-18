import * as User from '../models/user';
import {NextFunction, Request, Response} from 'express';
import {BadRequest} from "../error";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByCredentials(req.body);
        res.status(200).send(user);
    }
    catch (error) {
        return next(new BadRequest({message:'Invalid credentials'}));
    }
}

export const logout = async (req: Request, res: Response) => {
    res.status(200).send("log out successfully")
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.createUser(req.body);

        res.status(200).send('Inserted successfully');
    }
    catch (error) {
        console.log(error)
        return next(new BadRequest({message:'Invalid credentials'}));
    }
}