import {Request, Response} from 'express';
import { encryptionPassword } from '../libs/crypto.helpers';
import {UserModel, IUser} from '../models/user.model';
import { HydratedDocument } from 'mongoose';
import { generateToken } from '../libs/jwt.helpers';

export const signupController = async (req: Request, res: Response) => {
    const hashedPassword = await encryptionPassword(req.body.password);
    const newReqUser = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
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