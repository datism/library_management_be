import {NextFunction, Request, Response} from 'express';
import {BadRequest, Unauthorized} from "../error";
import {User} from "../models/user";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({name: req.body.name})

    if (user) {
        const isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            const token = jwt.sign(
                { _id: user._id,  name: user.name },
                process.env.SECRET_KEY as string,
                {
                expiresIn: '2 days',
                }
            );

            res.status(200).send({
                user: { _id: user._id, name: user.name },
                token: token,
            });
            return next()
        }

        next(new Unauthorized({message: 'Invalid password'}));
    }

    next(new Unauthorized({message:'Invalid credentials'}));
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