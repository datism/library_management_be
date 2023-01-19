import { model, Schema, Model} from "mongoose"
import * as bcrypt from 'bcryptjs';

interface IUser {
    name: string;
    password: string;
    role: string;
}

interface IUserMethods {
    comparePassword(pass: string): Promise<boolean>;
}

type UserModel = Model<IUser, unknown, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['Admin']
    }
})

UserSchema.method('comparePassword', async function (pass: string): Promise<boolean> {
    return  bcrypt.compare(pass, this.password).catch(() => false);
})

const saltRounds = 8
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

export const User = model<IUser, UserModel>('User', UserSchema)
