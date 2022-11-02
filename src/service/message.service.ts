import { MessageModel, IMessage } from '../models/message.model';
import { HydratedDocument } from 'mongoose';

export const sendMessageService = async (message: IMessage): Promise<void | Error> => {
    // Create a Document (Instance Model)
    const newMsgDocument: HydratedDocument<IMessage> =  new MessageModel(message);

    // Insert new Message in MongoDB
    try {
        await newMsgDocument.save();
    }
    catch(err) {
        console.log(err);
        return Error("Service unavailable");
    }
}