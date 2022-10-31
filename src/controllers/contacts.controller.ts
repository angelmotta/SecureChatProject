import {Request, Response} from 'express';
import { HydratedDocument } from 'mongoose';
import {UserModel, IUser} from '../models/user.model';

export const addContactController = async (req: Request, res: Response) => {
    console.log(`--- call addContactController ---`);
    const email = req.email;
    const newContact = req.body.contact;

    // Find User in MongoDB
    const userDocument: HydratedDocument<IUser> | null = await UserModel.findOne({email: email});
    if (!userDocument) {
        res.status(400).json({"status": 0, "msg": "User not found"});
        return;
    }

    // Validate existence of new contact Request in MongoDB
    // TODO

    // Validate if new contact is already registered

    // Add new contact and save in MongoDB
    userDocument.contacts.push(newContact);
    try {
        await userDocument.save();
    } catch(err) {
        console.log(err);
        res.status(500).json({"status": 0, "msg": "Service unavailable"});
        return;
    }

    // Make and Send Response
    const response = {
        "contacts": userDocument?.contacts
    }
    res.status(200).json(response);
}