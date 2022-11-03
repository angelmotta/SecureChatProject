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

export const getChatService = async (user1: string, user2: string): Promise<IMessage[]> => {
    // Create a Document (Instance Model)
    const resMessages: IMessage[] = await MessageModel.find({$or: [{sender: user1, receiver: user2}, {sender: user2, receiver: user1}]});
    console.log(resMessages);
    return resMessages;
}