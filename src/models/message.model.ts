import { Schema, model } from 'mongoose';

export interface IMessage {
    sender: string;
    receiver: string;
    message: string;
    date: Date;
}

// Schema corresponding to the document interface.
const messageSchema = new Schema<IMessage>({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

// Create and export Model
export const MessageModel = model<IMessage>('Message', messageSchema);
