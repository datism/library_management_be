import mongoose, {DocumentDefinition, model} from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface IAdmin {
    name: string;
    password: string;
}

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

const saltRounds = 8
export async function findByCredentials(admin: DocumentDefinition<IAdmin>) {
    const foundAdmin = await AdminModel.findOne({name: admin.name})

    if (!foundAdmin) {
        throw new Error('Name of admin is not correct');
    }

    const isMatch = bcrypt.compareSync(admin.password, foundAdmin.password);

    if (isMatch) {
        const token = jwt.sign({ name: foundAdmin.name }, process.env.SECRET_KEY as string, {
           expiresIn: '2 days',
        });

        return { admin: { name: foundAdmin.name }, token: token};
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

