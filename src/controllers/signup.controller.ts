import {Request, Response} from 'express';
import { encryptionPassword } from '../libs/crypto.helpers';
import {UserModel, IUser} from '../models/user.model';
import { HydratedDocument } from 'mongoose';
import { generateToken } from '../libs/jwt.helpers';
import Joi  from 'joi';

export const signupController = async (req: Request, res: Response) => {
    // Validation Request
    const {error, value: payloadRequest} = schemaRequest.validate(req.body);
    if (error) {
        console.log(error.message);
        res.status(404).json({"status": 0, "message": error.message});
        return;
    }

    const hashedPassword = await encryptionPassword(payloadRequest.password);
    const newReqUser = {
        email: payloadRequest.email,
        firstname: payloadRequest.firstname,
        lastname: payloadRequest.lastname,
        password: hashedPassword
    }
    
    // Create a Document (Instance Model)
    const newUser: HydratedDocument<IUser> =  new UserModel(newReqUser);
    console.log(newUser);

    // Insert new User in MongoDB
    try {
        await newUser.save();
    }
    catch(err) {
        console.log(err);
        res.status(400).json({"message": "Email already registered"});
        return;
    }

    // Generate Token and send Response
    console.log(`Generate token`);
    const token = generateToken(newUser.email);

    // Send HTTP Response
    const response = {
        "message": "Signup Success",
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
    firstname: Joi.string()
        .required()
        .trim(),
    lastname: Joi.string()
        .required()
        .trim(),
    password: Joi.string()
        .trim()
        .required()
});