import {Request, Response} from 'express';
import {UserModel, IUser} from '../models/user.model';
import jwt from 'jsonwebtoken';
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
    const isValidRequest = await userDocument?.isValidPassword(reqPassword);
    console.log(`isValidRequest: ${isValidRequest}`);

    // Generate Token
    

    // Send HTTP Response
    res.status(200).json({"status": 1, "msg": "Login success"})
}