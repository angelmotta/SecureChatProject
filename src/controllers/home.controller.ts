import {Request, Response} from 'express';
import { HydratedDocument } from 'mongoose';
import {UserModel, IUser} from '../models/user.model';

export const homeController = async (req: Request, res: Response) => {
    console.log(`--- call homeController ---`);
    const email = req.email;
    
    // Find User in MongoDB
    const userDocument: HydratedDocument<IUser> | null = await UserModel.findOne({email: email});
    
    // Make and Send Response
    const response = {
        "contacts": userDocument?.contacts
    }
    res.status(200).json(response);
}