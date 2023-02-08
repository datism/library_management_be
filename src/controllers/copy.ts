import {NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Copy} from "../models/copy";
import mongoose, {Types} from "mongoose";
import {Book} from "../models/book";
import {Borrow} from "../models/borrow";
import copy from "../routes/copy";
const ObjectId = require('mongoose').Types.ObjectId;

export const getCopyById = async (req: Request, res: Response, next: NextFunction) => {
    const copy = await Copy.findById(req.params.id).populate('book')

    if (!copy)
        return next(new NotFound({ message: "Can not delete non-existed book"}));

    res.status(200).send(copy)
}

export const createCopy = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if (!await Book.findById(req.body.book))
            return next(new NotFound({message: 'Book not exist'}))

        const copy = await Copy.create({
            status: 'available',
            book: req.body.book
        })

        await copy.populate('book');

        res.status(200).send(copy);
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
    const bookId = req.query.book
    const status = req.query.status

    console.log(bookId)

    const copies = await Copy.find({book: new ObjectId(bookId), status: status}).populate('book');

    res.status(200).send(copies)
}

export const updateCopyStatus = async (req: Request, res: Response, next: NextFunction) => {
}
