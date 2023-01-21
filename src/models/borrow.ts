import mongoose, {model, Schema, Types} from "mongoose";
import {Subscriber} from "./subscriber";
import {Copy} from "./copy";

interface IBorrow {
    subscriber: Types.ObjectId,
    copy: Types.ObjectId,
    startDate: Date,
    endDate: Date,
    status: string
}

const BorrowSchema: mongoose.Schema<IBorrow> = new mongoose.Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Subscriber
    },
    copy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Copy
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['inProgress', 'returned', 'lost', 'overdue']
    }
});

export const Borrow = model<IBorrow>('Borrow', BorrowSchema)