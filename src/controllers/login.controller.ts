import {Request, Response} from 'express';
import {UserModel, IUser} from '../models/user.model';
import { generateToken } from '../libs/jwt.helpers';
import { HydratedDocument } from 'mongoose';

export const loginController = async (req: Request, res: Response) => {
    // Get Data Request
    const email: string = req.body.email;
    const reqPassword: string = req.body.password;
    
    // Find User in MongoDB
    const userDocument: HydratedDocument<IUser> | null = await UserModel.findOne({email: email});

    if (!userDocument) {
        res.status(400).json({"status": 0, "msg": "User or password incorrect"});
        return;
    }

    //Check Credentials
    console.log(`Running this`);
    const isValidPassword = await userDocument?.isValidPassword(reqPassword);
    console.log(`isValidRequest: ${isValidPassword}`);
    if (!isValidPassword) {
        res.status(400).json({"status": 0, "msg": "User or password incorrect"});
        return;
    }

    // Generate Token
    const token = generateToken(userDocument.email);

    // Send HTTP Response
    const response = {
        "firstname": userDocument.firstname,
        "lastname": userDocument.lastname,
        "token": token
    }
    res.status(200).json(response);
}