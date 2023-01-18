import mongoose, {model} from "mongoose";

interface IBook {
    title: string,
    description: string,
    category: string,
    type: string,
    author: string,
    publisher: string,
    publishingDate: Date,
    image: {
        data: Buffer,
        contentType: string,
    }
}

const BookSchema: mongoose.Schema<IBook> = new mongoose.Schema({
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
    image: {
        data: Buffer,
        contentType: String,
    }
});

export const Book = model<IBook>('Book', BookSchema)