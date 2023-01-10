import mongoose, {model} from "mongoose";

interface IBookDetail {
    title: string,
    overview: string,
    category: string,
    subject: string,
    author: string,
    publisher: string,
    publishingDate: Date,
    ISBN: string,
    cover: {
        data: Buffer,
        contentType: string,
    }
}

const BookDetailSchema: mongoose.Schema<IBookDetail> = new mongoose.Schema({
    title: { type: String, required: true},
    overview:  String,
    category: {
        type: String,
        required: true,
        enum: ['Essays', 'Case Studies', 'Syllabus', 'Thesis']
    },
    subject: {
        type: String,
        required: true,
        enum: ['Art', 'Language', 'Literature', 'Gymnastics', 'Physics', 'Chemistry', 'Biology', 'Math', 'History']
    },
    publisher: String,
    publishingDate: Date,
    ISBN: String,
    cover: {
        data: Buffer,
        contentType: String,
    }
});

export const BookDetail = model<IBookDetail>('BookDetail', BookDetailSchema)