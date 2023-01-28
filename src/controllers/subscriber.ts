import {NextFunction, Request, Response} from 'express';
import {BadRequest} from "../error";
import {Subscriber} from "../models/subscriber";
const {Index} = require("flexsearch")

export const getSubscribers = async (req: Request, res: Response, next: NextFunction) => {
    let subscribers = await Subscriber.find();
    let totalSubscribers = subscribers.length

    // Let the queried result passed through partial-text search for name field (if included)
    if (req.query.name) {
        const index = new Index();
        const idToItemMapping: {[k: string]: any} = {}
        for (let subscriber of subscribers) {

            index.add(subscriber._id, subscriber.name)

            // Since index.search only return item id, we have to map item id to item to perform search.
            idToItemMapping[subscriber['id']] = subscriber
        }
        const subscriberIds = index.search(req.query.name)
        subscribers = subscriberIds.map((id: string | number) => idToItemMapping[id])
        totalSubscribers = subscriberIds.length
    }

    res.status(200).send({
        totalItems: totalSubscribers,
        items: subscribers,
    })
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
