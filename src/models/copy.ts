import mongoose, {model, Schema, Types} from "mongoose";
import {Book} from "./book";

interface ICopy {
    status: string,
    created: Date,
    book: Types.ObjectId
}

const CopySchema: mongoose.Schema<ICopy> = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['available', 'pending', 'borrowed', 'lost']
    },
    created: {
        type: Date,
        required: true,
        default: Date.now

    },
    book: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Book
    }
});

export const Copy = model<ICopy>('Copy', CopySchema)