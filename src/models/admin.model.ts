import mongoose, {DocumentDefinition, Model, model} from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface IAdmin extends mongoose.Document {
    name: string;
    password: string;
}

const saltRounds = 8

const AdminSchema: mongoose.Schema<IAdmin> = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

AdminSchema.pre('validate', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
})

export const AdminModel = model<IAdmin>('Admin', AdminSchema)

export async function findByCredentials(admin: DocumentDefinition<IAdmin>) {
    const user = await AdminModel.findOne({name: admin.name})

    if (!user) {
        throw new Error('Name of admin is not correct');
    }

    const isMatch = bcrypt.compareSync(admin.password, user.password);

    if (isMatch) {
        const token = jwt.sign({ _id: user._id.toString(), name: user.name }, process.env.SECRET_KEY as string, {
           expiresIn: '2 days',
        });

        return { admin: { _id: user._id, name: user.name }, token: token};
    }
    else {
        throw new Error('Password is not correct');
    }
}

export async function createAdmin(admin: DocumentDefinition<IAdmin>): Promise<void> {
    const newAdmin = new AdminModel({
        ...admin
    });

    await newAdmin.save()
}

