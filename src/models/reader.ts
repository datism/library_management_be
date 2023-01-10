import mongoose, {model} from "mongoose";

interface IReader {
    name: string;
    studentId: string;
    school: string;
    email: string;
}

const ReaderSchema: mongoose.Schema<IReader> = new mongoose.Schema({
    name: { type: String, required: true},
    studentId: String,
    school: String,
    email: {type: String, required:true, unique: true}
});

export const Reader = model<IReader>('Admin', ReaderSchema)