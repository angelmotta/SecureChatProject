import {Request, Response} from 'express';
import {UserModel, IUser} from '../models/user.model';
import { generateToken } from '../libs/jwt.helpers';
import { HydratedDocument } from 'mongoose';
import { getListContactsDetails } from '../service/contacts.service';
import Joi  from 'joi';

export const loginController = async (req: Request, res: Response) => {
    // Validate Request
    const {error, value: payloadRequest} = schemaRequest.validate(req.body);
    if (error) {
        console.log(error.message);
        res.status(404).json({"status": 0, "message": error.message});
        return;
    }

    // Get Data Request
    const email: string = payloadRequest.email;
    const reqPassword: string = payloadRequest.password;
    console.log(payloadRequest);

    // Find User in MongoDB
    const userDocument: HydratedDocument<IUser> | null = await UserModel.findOne({email: email});

    if (!userDocument) {
        res.status(400).json({"status": 0, "msg": "User or password incorrect"});
        return;
    }

    //Check Credentials
    const isValidPassword = await userDocument?.isValidPassword(reqPassword);
    if (!isValidPassword) {
        res.status(400).json({"status": 0, "msg": "User or password incorrect"});
        return;
    }

    // Generate Token
    const token = generateToken(userDocument.email);

    // Get Contacts List
    const myContactListDetail = await getListContactsDetails(userDocument.contacts);

    // Send HTTP Response
    const response = {
        "firstname": userDocument.firstname,
        "lastname": userDocument.lastname,
        "contacts": myContactListDetail,
        "token": token
    }
    res.status(200).json(response);
}

// Joi Schema Definition
const schemaRequest = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .lowercase()
        .trim(),

    password: Joi.string()
        .trim()
        .required()
});