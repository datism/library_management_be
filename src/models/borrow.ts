import mongoose, {model, Schema, Types} from "mongoose";
import {Subscriber} from "./subscriber";
import {Copy} from "./copy";

export interface IBorrow {
    subscriber: Types.ObjectId,
    copy: Types.ObjectId,
    startDate: Date,
    endDate: Date,
    status: string
}

// TODO: let's change subscriber, copy to subscriberId, copyId. Modify other schema too.
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
        default: Date.now // TODO: no need default here. Let's remove
    },
    status: {
        type: String,
        required: true,
        enum: ['inProgress', 'returned', 'lost', 'overdue']
    }
});

BorrowSchema.pre('save', async function (next) {
    try {
        await Copy.findByIdAndUpdate(this.copy, {status: 'borrowed'})
    } catch (e) {
        console.log(e)
    }

    next()
})

export const Borrow = model<IBorrow>('Borrow', BorrowSchema)
