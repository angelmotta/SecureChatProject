import { Schema, model } from 'mongoose';

// Interface representing a document in MongoDB.
export interface IUser {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    registerdate: Date;
}

// Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    email: { type: String, required: true},
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    password: { type: String, required: true},
    registerdate: {type: Date, default: Date.now}
});

// Create and export Model
export default model<IUser>('User', userSchema);