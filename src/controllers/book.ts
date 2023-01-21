import { NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Book} from "../models/book";
import * as fs from "fs";

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await Book.findById(req.params.id)

        if (!book)
            return next(new NotFound({ message: "book not found"}));

        res.status(200).send(book)
    } catch (e) {
        return next(new BadRequest({message: "wrong id format"}))
    }
}

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
        console.log(e)
        return next(new BadRequest({}));
    }
}

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
    const books = await Book.find();

    if (!books || books.length == 0) {
        return next(new NotFound({message:'no books'}))
    }

    res.status(200).send(books)
}

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
        return next(new NotFound({message: 'book not found'}))
    }
}



