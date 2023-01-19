import { Document, model, Schema} from "mongoose"
import * as bcrypt from 'bcryptjs';

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['Admin']
    }
})

export interface UserDocument extends Document{
    name: string;
    password: string;
    role: string;
    comparePassword(pass: string): Promise<boolean>;
}

const saltRounds = 8
UserSchema.pre<UserDocument>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

UserSchema.methods.comparePassword = async function (
    this: UserDocument,
    pass: string
): Promise<boolean> {
    return  bcrypt.compare(pass, this.password).catch(() => false);
}

export const User = model<UserDocument>('User', UserSchema)
