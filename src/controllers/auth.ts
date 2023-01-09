import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as admin from '../../models/admin.model';

export const login = async (req: Request, res: Response) => {
    try {
        const foundAdmin = await admin.findByCredentials(req.body);
        res.status(200).send(foundAdmin);
    }
    catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const logout = async (req: Request, res: Response) => {
    res.status(200).send("log out successfully")
}

export const signup = async (req: Request, res: Response) => {
    try {
        await admin.createAdmin(req.body);

        res.status(200).send('Inserted successfully');
    }
    catch (error) {
        res.status(500).send(error)
    }
}