import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IPublicKey {
    x: string;
    y: string;
}

// Interface representing a document in MongoDB.
export interface IUser {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    contacts: string[];
    registerdate: Date;
    publickey: IPublicKey;
    isValidPassword(givenPasswd: string): boolean;
}

// Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    contacts: [String],
    publickey: {
        type: {
            x: { type: String, required: true },
            y: { type: String, required: true },
        },
        required: false,
    },
    registerdate: { type: Date, default: Date.now },
});

// Define Methods
userSchema.methods.isValidPassword = async function (
    givenPasswd: string
): Promise<boolean> {
    const isValid = await bcrypt.compare(givenPasswd, this.password);
    return isValid;
};

// Create and export Model
//export default model<IUser>('User', userSchema);
export const UserModel = model<IUser>('User', userSchema);
