import {NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Copy} from "../models/copy";
import mongoose from "mongoose";
import {Book} from "../models/book";
import {Borrow} from "../models/borrow";

export const getCopyById = async (req: Request, res: Response, next: NextFunction) => {
    const copy = await Copy.findById(req.params.id)

    if (!copy)
        return next(new NotFound({ message: "Can not delete non-existed book"}));

    res.status(200).send(copy)
}

export const createCopy = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if (!await Book.findById(req.body.bookId))
            return next(new NotFound({message: 'Book not exist'}))

        await Copy.create({
            status: 'available',
            book: req.body.bookId
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

export const getCopies = async (req: Request, res: Response, next: NextFunction) => {
    // TODO use query params here
    const copies = await Copy.find();

    res.status(200).send(copies)
}

export const updateCopyStatus = async (req: Request, res: Response, next: NextFunction) => {
}
