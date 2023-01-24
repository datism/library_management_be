import {NextFunction, Request, Response} from 'express';
import {
    EmailSendingError,
    sendBorrowExpiredNotificationEmail
} from "../engines/emailSending";
import {BadRequest} from "../error";

export const warningExpiredBorrow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await sendBorrowExpiredNotificationEmail(req.body.borrowId)
    }
    catch (error) {
        if (error instanceof EmailSendingError)
            throw new BadRequest({message: error.message})
    }

    res.status(200).send('Email sent successfully');
}
