import { NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Book} from "../models/book";
import * as fs from "fs";
import mongoose from "mongoose";

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findById(req.params.id)

    if (!book)
        return next(new NotFound({message: 'Book not exist'}));

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

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const message = Object.values(error.errors).map(value => value.message).toString();
            next(new BadRequest({message: message}));
        }
    }

    fs.unlink(file.path, err => console.log(err));
}

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
    // Paginate the result

    const currentPage = parseInt(<string>req.query.currentPage)
    const itemsPerPage = parseInt(<string>req.query.itemsPerPage)
    console.log(req.query)

    const startItemIndex = (currentPage - 1) * itemsPerPage

    // TODO: get by query params
    const books = await Book.find().skip(startItemIndex).limit(itemsPerPage);

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



