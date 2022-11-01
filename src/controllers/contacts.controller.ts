import {Request, Response} from 'express';
import { HydratedDocument } from 'mongoose';
import {UserModel, IUser} from '../models/user.model';
import Joi  from 'joi';

export const addContactController = async (req: Request, res: Response) => {
    const loggedUser = req.email;
    if (!loggedUser) {
        res.status(400).json({"status": 0, "message": "User not authorized"});
        return;
    }

    // Validate Request
    const {error, value: payloadRequest} = schemaRequest.validate(req.body);
    if (error) {
        console.log(error);
        res.status(404).json({"status": 0, "message": "Bad request"});
    }

    // Find Logged User in MongoDB
    const userDocument: HydratedDocument<IUser> | null = await UserModel.findOne({email: loggedUser});
    if (!userDocument) {
        res.status(404).json({"status": 0, "message": "User not found"});
        return;
    }

    // Validate new contact  Request exist in MongoDB
    const otherUserDocument: HydratedDocument<IUser> | null = await UserModel.findOne({email: payloadRequest.contact});
    if (!otherUserDocument) {
        res.status(404).json({"status": 0, "message": "User not found"});
        return;
    }

    // Validate if new contact is already registered in Request User's contacts
    const currentContactsUser: string[] = userDocument.contacts;
    for (const contact of currentContactsUser) {
        if (contact === payloadRequest.contact) {
            console.log(`user already registered`);
            res.status(400).json({"status": 0, "message": "User already registered"});
            return;
        }
    }

    // Add new contact and save in MongoDB
    userDocument.contacts.push(payloadRequest.contact);
    try {
        await userDocument.save();
    } catch(err) {
        console.log(err);
        res.status(500).json({"status": 0, "msg": "Service unavailable"});
        return;
    }

    // Validate if User Request is already registered in OtherUser's contacts
    const currentContactsOtherUser: string[] = otherUserDocument.contacts;
    let isInContactsOtherUser = false;
    for(const contact of currentContactsOtherUser) {
        if (contact === loggedUser) {
            isInContactsOtherUser = true;
        }
    };
    
    if (!isInContactsOtherUser) {
        otherUserDocument.contacts.push(loggedUser);
        try {
            await otherUserDocument.save();
        } catch (err) {
            console.log(err);
            res.status(500).json({"status": 0, "msg": "Service unavailable"});
            return;
        }
    }
    

    // Make and Send Response
    const response = {
        "contacts": userDocument.contacts
    }
    res.status(200).json(response);
}

// Joi Schema Definition
const schemaRequest = Joi.object({
    contact: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .trim()
});
