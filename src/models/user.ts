import mongoose, {DocumentDefinition, model} from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface IUser {
    name: string;
    password: string;
    role: string;
}

const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['Admin']
    }
});

UserSchema.pre('validate', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

export const User = model<IUser>('User', UserSchema)

const saltRounds = 8
export async function findByCredentials(user: DocumentDefinition<IUser>) {
    const foundUser = await User.findOne({name: user.name})

    if (!foundUser) {
        throw new Error('Name of user is not correct');
    }

    const isMatch = bcrypt.compareSync(user.password, foundUser.password);

    if (isMatch) {
        const token = jwt.sign({ _id: foundUser._id,  name: foundUser.name }, process.env.SECRET_KEY as string, {
            expiresIn: '2 days',
        });

        return { user: { _id: foundUser._id, name: foundUser.name }, token: token};
    }
    else {
        throw new Error('Password is not correct');
    }
}

export async function createUser(user: DocumentDefinition<IUser>): Promise<void> {
    const newUser = new User({
        ...user,
        role: 'Admin'
    });

    await newUser.save()
}
