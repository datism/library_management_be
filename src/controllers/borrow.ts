import {NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Copy} from "../models/copy";
import mongoose from "mongoose";
import {Subscriber} from "../models/subscriber";
import {Borrow} from "../models/borrow";

export const getBorrows = async (req: Request, res: Response, next: NextFunction) => {
    // TODO use query params here
    const borrows = await Borrow.find();

    res.status(200).send(borrows)
}


export const createBorrow = async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)

        const copy = await Copy.findById(req.body.copyId);
        const subscriber = await Subscriber.findById(req.body.subscriberId);

        if (!copy)
            return next(new BadRequest({message: 'Copy not exist'}))

        if (!subscriber)
            return next(new BadRequest({message: 'Subscriber not exist'}))

        await Borrow.create({
            copy: copy._id,
            subscriber: subscriber._id,
            status: 'inProgress',
            endDate: Date.now() + 7 * 24 * 60 * 60 * 1000 // TODO: Let's make this endDate configurable in the UI
        })

        res.status(200).send('Inserted successfully');

    } catch (error) {
        // TODO: no need the catch?
        let message;

        if (error instanceof mongoose.Error.ValidationError) {
            message = Object.values(error.errors).map(value => value.message).toString();
        }

        if (error instanceof mongoose.Error.CastError) {
            message = error.message
        }

        return next(new BadRequest({message: message}));
    }
}

export const getBorrowById = async (req: Request, res: Response, next: NextFunction) => {
    const borrow = await Borrow.findById(req.params.id)

    if (!borrow)
        return next(new NotFound({message: 'Book not exist'}));

    res.status(200).send(borrow)
}


// TODO: BUG - copy status must be updated too. Need to verify target status
export const updateBorrowStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Borrow.findByIdAndUpdate(req.params.id, {status: req.body.status}, {runValidators: true});

        res.status(200).send('Updated successfully')
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const message = Object.values(error.errors).map(value => value.message).toString();
            return next(new BadRequest({message: message}));
        }
        console.error(error)
        throw error
    }
}


