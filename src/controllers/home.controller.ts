import {Request, Response} from 'express';

export const homeController = async (req: Request, res: Response) => {
    console.log(`--- call homeController ---`);
    console.log(req.email);
    // TODO: get contacts of user
    res.status(200).json({"contacts": []});
}