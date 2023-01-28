import {Document, model, Schema} from "mongoose";

interface ISubscriber {
    name: string;
    email: string;
    phone: string
}

const SubscriberSchema = new Schema<ISubscriber> ({
    name: { type: String, required: true},
    email: {type: String, required:true, unique: true},
    phone: {type: String}
});

export const Subscriber = model<ISubscriber>('Subscriber', SubscriberSchema)