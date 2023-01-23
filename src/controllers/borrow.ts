import {NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Book} from "../models/book";
import {Copy} from "../models/copy";
import mongoose from "mongoose";
import {Subscriber} from "../models/subscriber";
import {Borrow} from "../models/borrow";

export const getBorrows = async (req: Request, res: Response, next: NextFunction) => {
    const borrows = await Borrow.find();

    res.status(200).send(borrows)
}


export const createBorrow = async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.query)

        const copy = await Copy.findById(req.query.copyId);
        const subscriber = await Subscriber.findById(req.query.subscriberId);

        if (!copy)
            return next(new NotFound({message: 'Copy not exist'}))

        if (!subscriber)
            return next(new NotFound({message: 'Subscriber not exist'}))

        await Borrow.create({
            copy: copy._id,
            subscriber: subscriber._id,
            status: 'inProgress',
            endDate: Date.now() + 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).send('Inserted successfully');

    } catch (error) {
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

export const updateBorrowStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Borrow.findByIdAndUpdate(req.params.id, {status: req.body.status}, {runValidators: true});

        res.status(200).send('Updated successfully')
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const message = Object.values(error.errors).map(value => value.message).toString();
            return next(new BadRequest({message: message}));
        }
        console.log(error)
    }
}


