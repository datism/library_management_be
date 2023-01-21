import {NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Copy} from "../models/copy";

export const getCopyById = async (req: Request, res: Response, next: NextFunction) => {
    const copy = await Copy.findById(req.params.id)

    if (!copy)
        return next(new NotFound({ message: "Can not delete non-existed book"}));

    res.status(200).send(copy)
}

export const createCopy = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await Copy.create({
            status: 'available',
            book: req.body.bookId
        })

        res.status(200).send('Inserted successfully');
    } catch (e) {
        return next(new BadRequest({message:'book doesnt exist'}));
    }
}

export const getCopies = async (req: Request, res: Response, next: NextFunction) => {
}

export const updateCopyStatus = async (req: Request, res: Response, next: NextFunction) => {
}
