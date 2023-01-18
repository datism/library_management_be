import mongoose, {model, Schema, Types} from "mongoose";
import {Subscriber} from "./subscriber";
import {Book} from "./book";

interface IBorrow {
    reader: Types.ObjectId,
    book: Types.ObjectId,
    at: Date,
    isReturned: boolean
}

const BorrowSchema: mongoose.Schema<IBorrow> = new mongoose.Schema({
    reader: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Subscriber
    },
    book: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Book
    },
    at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export const Borrow = model<IBorrow>('Borrow', BorrowSchema)