import {Borrow} from "../models/borrow";
import {Subscriber} from "../models/subscriber";
import {Copy} from "../models/copy";

import { CourierClient } from "@trycourier/courier";
import {Book} from "../models/book";

export class EmailSendingError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Email Sending Error";
    }
}

const sendEmail = async (
    toEmail: string,
    title: string,
    content: string,
) => {
    const courier = CourierClient({ authorizationToken: process.env["MANDRILL_API_KEY"] });
    try {
        await courier.send({
            message: {
                to: {
                    email: toEmail,
                },
                content: {
                    title: title,
                    body: content,
                },
            },
        });
    }
    catch (error) {
        throw new EmailSendingError("Error on sending email")
    }
}

export const sendBorrowCreatedNotificationEmail = async (borrowId: string) => {
    const borrow = await Borrow.findById(borrowId)

    if (!borrow)
        throw new EmailSendingError("Borrow missing")

    const subscriber = await Subscriber.findById(borrow.subscriber)
    const copy = await Copy.findById(borrow.copy)

    if (!subscriber || !copy)
        throw new EmailSendingError("Subscriber or copy missing")

    const book = await Book.findById(copy.book)

    if (!book)
        throw new EmailSendingError("Book missing")

    await sendEmail(
        subscriber.email,
        "Borrowed notification",
        `You have borrowed book ${book.title}`
    )

}

export const sendBorrowExpiredNotificationEmail = async(borrowId: string) => {
    const borrow = await Borrow.findById(borrowId)

    if (!borrow)
        throw new EmailSendingError("Borrow missing")

    const subscriber = await Subscriber.findById(borrow.subscriber)
    const copy = await Copy.findById(borrow.copy)

    if (!subscriber || !copy)
        throw new EmailSendingError("Subscriber or copy missing")

    const book = await Book.findById(copy.book)

    if (!book)
        throw new EmailSendingError("Book missing")

    await sendEmail(
        subscriber.email,
        "Overdue notice",
        `This OVERDUE NOTIFICATION for: ${subscriber.name}
        
        ${book.title}
        This item was due back on ${borrow.endDate.toString()}
        
        The following item is now overdue and fine is accruing. 
        You are incurring a fine of two cents for every day's detention.
        If you think a mistake has been made, please notify us.
        
        Sincerely yours,
        Library`
    )
}