import {NextFunction, Request, Response} from 'express';
import {BadRequest} from "../error";
import {Subscriber} from "../models/subscriber";

export const getSubscribers = async (req: Request, res: Response, next: NextFunction) => {
    const subscribers = await Subscriber.find();

    res.status(200).send(subscribers)
}

export const createSubscriber = async(req: Request, res: Response, next: NextFunction) => {
    // Check duplication for name, email and phone (if any)
    let subscriber = await Subscriber.findOne({name: req.body.name})

    if (subscriber) {
        return next(new BadRequest({
            message:`Another subscriber with name ${req.body.name} has already existed.`,
            customCode: 400002
        }));
    }

    subscriber = await Subscriber.findOne({email: req.body.email})
    if (subscriber) {
        return next(new BadRequest({
            message: `Another subscriber with email ${req.body.email} has already existed.`,
            customCode: 400002
        }));
    }

    if (req.body.phone) {
        subscriber = await Subscriber.findOne({phone: req.body.phone})
        if (subscriber) {
            return next(new BadRequest({
                message: `Another subscriber with phone ${req.body.phone} has already existed.`,
                customCode: 400002
            }));
        }
    }

    await Subscriber.create({
        ...req.body,
    });

    res.status(200).send('Subscriber created successfully');
}
