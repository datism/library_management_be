import {Express, NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Book} from "../models/book";
import * as fs from "fs";
import mongoose from "mongoose";
import {uploadFile} from "../engines/fileUploading";
const {Index} = require("flexsearch")

const allowedFilterKeys = [
    {name: 'type', hasMultipleValue: true},
    {name: 'author', hasMultipleValue: false},
]

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findById(req.params.id)

    if (!book)
        return next(new NotFound({message: 'Book not exist'}));

    res.status(200).send(book)
}

export const createBook = async(req: Request, res: Response, next: NextFunction) => {
    const file: Express.Multer.File | undefined = req.file;

    if (!file)
        return next(new BadRequest({message:'No cover'}));

    const fileURL = await uploadFile(
        file,
        file.filename
    )

    console.log(fileURL)


    try {
        await Book.create({
            ...req.body,
            cover: fileURL
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

    const startItemIndex = (currentPage - 1) * itemsPerPage

    // Get filter from query params
    const query = req.query
    const filter: {[k: string]: any} = {};
    for (let i in allowedFilterKeys) {
        const key = allowedFilterKeys[i]
        if (key.name in query) {
            // If this key can not have multiple value, it can not be an array
            if (!key.hasMultipleValue && Array.isArray(query[key.name]))
                continue

            filter[key.name] = query[key.name]
        }
    }

    const totalBooks = await Book.count(filter);
    let books = await Book.find(filter).skip(startItemIndex).limit(itemsPerPage);

    // Let the queried result passed through partial-text search for title field (if included)
    if (req.query.title) {
        const index = new Index();
        const idToItemMapping: {[k: string]: any} = {}
        for (let idx in books) {
            const book = books[idx]
            // @ts-ignore
            index.add(book['id'], book['title'])

            // Since index.search only return item id, we have to map item id to item to perform search.
            idToItemMapping[book['id']] = book
        }
        const bookIds = index.search(req.query.title)
        books = bookIds.map((id: string | number) => idToItemMapping[id])
        // totalBooks = bookIds.length
    }

    // Let the queried result passed through partial-text search for author name field (if included)
    if (req.query.author) {
        const index = new Index();
        const idToItemMapping: {[k: string]: any} = {}
        for (let idx in books) {
            const book = books[idx]
            // @ts-ignore
            index.add(book['id'], book['author'])

            // Since index.search only return item id, we have to map item id to item to perform search.
            idToItemMapping[book['id']] = book
        }
        const bookIds = index.search(req.query.author)
        books = bookIds.map((id: string | number) => idToItemMapping[id])
        // totalBooks = bookIds.length
    }

    res.status(200).send({
        totalItems: totalBooks,
        items: books,
    })
}

// TODO: Review later
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const book = req.body;
    const file = req.file;

    if (file) {
        const fileURL = await uploadFile(
            file,
            file.filename
        )

        console.log(fileURL)
        book.cover = fileURL
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



