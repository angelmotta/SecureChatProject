import {Request, Response} from 'express';

export const homeController = async (_req: Request, res: Response) => {
    console.log(`--- call contactsController ---`);
    res.status(200).json({"contacts": []});
}