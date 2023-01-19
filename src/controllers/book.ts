import {Express, NextFunction, Request, Response} from 'express';
import {BadRequest} from "../error";
import {Book, IBook} from "../models/book";
import * as fs from "fs";

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {

}

export const createBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await Book.create({
            ...req.body,
            cover: {
                data: fs.readFileSync('' + req.file?.path),
                contentType: req.file?.mimetype
            }
        })

        res.status(200).send('Inserted successfully');
    } catch (e) {
        return next(new BadRequest({message:'Lỗi cac'}));
    }
}

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {

}

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {

}

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {

}


