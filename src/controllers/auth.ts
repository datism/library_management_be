import {NextFunction, Request, Response} from 'express';
import {BadRequest} from "../error";
import {User} from "../models/user";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const foundUser = await User.findOne({name: req.body.name})

    if (foundUser) {
        const isMatch = await foundUser.comparePassword(req.body.password);
        if (isMatch) {
            const token = jwt.sign({ _id: foundUser._id,  name: foundUser.name }, process.env.SECRET_KEY as string, {
                expiresIn: '2 days',
            });

            res.status(200).send({user: { _id: foundUser._id, name: foundUser.name }, token: token});
            return next()
        }
    }

    next(new BadRequest({message:'Invalid credentials'}));
}


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.create({
            ...req.body,
            role: "Admin"
        });

        res.status(200).send('Inserted successfully');
    }
    catch (error) {
        return next(new BadRequest({message:'Invalid credentials'}));
    }
}