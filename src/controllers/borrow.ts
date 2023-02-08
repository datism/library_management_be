import {NextFunction, Request, Response} from 'express';
import {BadRequest, NotFound} from "../error";
import {Copy} from "../models/copy";
import mongoose, {FilterQuery} from "mongoose";
import {Subscriber} from "../models/subscriber";
import {Borrow, IBorrow} from "../models/borrow";
import {sendBorrowCreatedNotificationEmail} from "../engines/emailSending";

export const getBorrows = async (req: Request, res: Response, next: NextFunction) => {

    const filter: FilterQuery<IBorrow> = {};
    if (req.query.copy)
        filter.copy = req.query.copy
    if (req.query.subscriber)
        filter.subscriber = req.query.subscriber
    if (req.query.status)
        filter.status = req.query.status

    const borrows = await Borrow.find(filter).populate('copy').populate('subscriber');

    res.status(200).send(borrows)
}


export const createBorrow = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const copy = await Copy.findOne({_id: req.body.copy});

        const subscriber = await Subscriber.findById(req.body.subscriber);

        if (!copy)
            return next(new BadRequest({message: 'Copy not found'}))

        if (copy.status !== 'available')
            return next(new BadRequest({message: 'Sách không sẵn sàng để cho mượn. Vui lòng thử sách khác'}))

        if (!subscriber)
            return next(new BadRequest({message: 'Subscriber not exist'}))

        const borrow = await Borrow.create({
            copy: copy._id,
            subscriber: subscriber._id,
            status: 'inProgress',
            endDate: Date.now() + 7 * 24 * 60 * 60 * 1000 // TODO: Let's make this endDate configurable in the UI
        })

        await sendBorrowCreatedNotificationEmail(borrow._id.toString())

        res.status(200).send('Inserted successfully');

    } catch (error) {
        // TODO: no need the catch?
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

export const getBorrowById = async (req: Request, res: Response, next: NextFunction) => {
    const borrow = await Borrow.findById(req.params.id).populate('copy').populate('subscriber')

    if (!borrow)
        return next(new NotFound({message: 'Book not exist'}));

    res.status(200).send(borrow)
}


// TODO: BUG - copy status must be updated too. Need to verify target status
export const updateBorrowStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const borrow = await Borrow.findByIdAndUpdate(req.params.id, {status: req.body.status}, {runValidators: true}).orFail();

        let copyStatus;

        switch (req.body.status) {
            case 'returned': copyStatus = 'available'; break;
            case 'lost': copyStatus = 'lost'; break;
        }

        if (copyStatus)
            await Copy.findByIdAndUpdate(borrow.copy, {status: copyStatus});

        res.status(200).send('Updated successfully')
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const message = Object.values(error.errors).map(value => value.message).toString();
            return next(new BadRequest({message: message}));
        }
        console.error(error)
        throw error
    }
}


