import {NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Copy} from "../models/copy";

export const getCopyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const copy = await Copy.findById(req.params.id)

        if (!copy)
            return next(new NotFound({ message: "book not found"}));

        res.status(200).send(copy)
    } catch (e) {
        return next(new BadRequest({message: "wrong id format"}))
    }
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

// export const login = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await admin.findByCredentials(req.body);
//         res.status(200).send(user);
//     }
//     catch (error) {
//         return next(new BadRequest({message:'Invalid credentials'}));
//     }
// }
//
// export const signup = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         await admin.createAdmin(req.body);
//
//         res.status(200).send('Inserted successfully');
//     }
//     catch (error) {
//         return next(new BadRequest({message:'Invalid credentials'}));
//     }
// }