import {Request, Response} from 'express';
import { encryptionPassword } from '../libs/crypto.helpers';
import {UserModel, IUser} from '../models/user.model';
import { HydratedDocument } from 'mongoose';

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

    try {
        await newUser.save();
    }
    catch(err) {
        console.log(err);
    }
    res.status(200).json("Signup Success");
}