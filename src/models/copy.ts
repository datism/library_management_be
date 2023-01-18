import mongoose, {model, Schema, Types} from "mongoose";
import {Book} from "./book";

interface IBook {
    coverType: string,
    status: string,
    dayAdded: Date,
    detail: Types.ObjectId
}

const BookSchema: mongoose.Schema<IBook> = new mongoose.Schema({
    coverType: {
        type: String,
        required: true,
        enum: ['paperback', 'case wrap', 'paperback']
    },
    status: {
        type: String,
        required: true,
        enum: ['available', 'pending', 'borrowed']
    },
    dayAdded: {
        type: Date,
        required: true,
        default: Date.now

    },
    detail: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Book
    }
});

export const Copy = model<IBook>('Copy', BookSchema)