import {Request, Response} from 'express';

export const signupController = (_req: Request, res: Response) => {
    res.status(200).json("Signup");
}