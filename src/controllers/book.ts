import { NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Book} from "../models/book";
import * as fs from "fs";
import {Copy} from "../models/copy";

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findById(req.params.id)

    if (!book)
        return next(new NotFound());

    res.status(200).send(book)
}

// TODO: Review this method later. Currently let's investigate this approach further
export const createBook = async(req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    if (!file)
        return next(new BadRequest({message:'No cover'}));

    try {
        await Book.create({
            ...req.body,
            cover: {
                image: fs.readFileSync(file.path),
                contentType: file.mimetype
            }
        })

        res.status(200).send('Inserted successfully');
    } catch (e) {
        return next(new BadRequest({}));
    }
}

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: get by query params
    const books = await Book.find();

    res.status(200).send(books)
}

// TODO: Review later
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const book = req.body;
    const file = req.file;

    if (file) {
        book.cover = {
            image: fs.readFileSync(file.path),
            contentType: file.mimetype
        }
    }
    try {
        await Book.findByIdAndUpdate(req.params.id, book)

        res.status(200).send('Updated successfully')
    } catch (e) {
        return next(new BadRequest())
    }
}

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).send('Deleted successfully')
    } catch (e) {
        return next(new NotFound({message: 'Book not found'}))
    }
}

export const createCopy = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await Copy.create({
            status: 'available',
            book: req.params.id
        })

        res.status(200).send('Inserted successfully');
    } catch (e) {
        return next(new BadRequest({message:'book doesnt exist'}));
    }
}

export const getCopiesFromBook = async (req: Request, res: Response, next: NextFunction) => {
}



