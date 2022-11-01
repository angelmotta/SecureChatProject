import {Request, Response} from 'express';
import { HydratedDocument } from 'mongoose';
import {UserModel, IUser} from '../models/user.model';
import { getListContactsDetails } from '../service/contacts.service';

export const homeController = async (req: Request, res: Response) => {
    const email = req.email;
    
    // Find User in MongoDB
    const userDocument: HydratedDocument<IUser> | null = await UserModel.findOne({email: email});
    if (!userDocument) {
        res.status(404).json({"status": 0, "message": "User not found"});
        return;
    }

    // get ListContactDetail
    const myContacts = userDocument.contacts;
    await getListContactsDetails(myContacts);

    // Make and Send Response
    const response = {
        "contacts": userDocument.contacts
    }
    res.status(200).json(response);
}