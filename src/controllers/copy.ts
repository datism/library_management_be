import {NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Copy} from "../models/copy";

export const getCopyById = async (req: Request, res: Response, next: NextFunction) => {
    const copy = await Copy.findById(req.params.id)

    if (!copy)
        return next(new NotFound({ message: "Can not delete non-existed book"}));

    res.status(200).send(copy)
}

export const getCopies = async (req: Request, res: Response, next: NextFunction) => {
}

export const updateCopyStatus = async (req: Request, res: Response, next: NextFunction) => {
}
