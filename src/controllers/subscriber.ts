import {NextFunction, Request, Response} from 'express';
import {BadRequest} from "../error";
import {Subscriber} from "../models/subscriber";

export const getSubscribers = async (req: Request, res: Response, next: NextFunction) => {
    const subscribers = await Subscriber.find();

    res.status(200).send(subscribers)
}

export const createSubscriber = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await Subscriber.create({
            ...req.body,
        });

        res.status(200).send('Inserted successfully');
    }
    catch (error) {
        return next(new BadRequest({message:'Invalid credentials'}));
    }
}
