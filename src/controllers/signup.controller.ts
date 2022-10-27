import {Request, Response} from 'express';
import { encryptionPassword } from '../libs/crypto.helpers';

export const signupController = async (req: Request, res: Response) => {
    const hashedPassword = await encryptionPassword(req.body.password);
    const newUser = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedPassword
    }
    console.log(newUser);
    // TODO: Save newUser to MongoDB
    res.status(200).json("TODO: Signup");
}