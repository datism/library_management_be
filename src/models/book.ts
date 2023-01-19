import {Schema, model} from "mongoose";

export interface IBook {
    title: string,
    description: string,
    category: string,
    type: string,
    author: string,
    publisher: string,
    publishingDate: Date,
    cover: {
        data: Buffer,
        contentType: string,
    }
}

const BookSchema = new Schema<IBook> ({
    title: { type: String, required: true},
    description:  String,
    category: {
        type: String,
        required: true,
        enum: ['Essays', 'Case Studies', 'Syllabus', 'Thesis']
    },
    type: {
        type: String,
        required: true,
        enum: ['Art', 'Language', 'Literature', 'Gymnastics', 'Physics', 'Chemistry', 'Biology', 'Math', 'History']
    },
    publisher: String,
    publishingDate: Date,
    cover: {
        data: Buffer,
        contentType: String,
    }
});

export const Book = model<IBook>('Book', BookSchema)