import {NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Copy} from "../models/copy";
import {Book} from "../models/book";

export const getCopyById = async (req: Request, res: Response, next: NextFunction) => {
    const copy = await Copy.findById(req.params.id)

    if (!copy)
        return next(new NotFound({ message: "Can not delete non-existed book"}));

    res.status(200).send(copy)
}

export const createCopy = async(req: Request, res: Response, next: NextFunction) => {
    const bookId = req.body.bodyId
    const book = await Book.findById(bookId)

    if (!book)
        return next(new BadRequest({message:'Book not existed'}));

    // TODO: extract status to enums
    await Copy.create({
        status: 'available',
        book: req.body.bookId
    })

    res.status(200).send('Copy created successfully');

}

export const getCopies = async (req: Request, res: Response, next: NextFunction) => {
}

export const updateCopyStatus = async (req: Request, res: Response, next: NextFunction) => {
}
