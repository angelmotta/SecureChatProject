import jwt, { JwtPayload } from 'jsonwebtoken';
//import {Request, Response, NextFunction} from 'express';

export const generateToken = (email: string) : string => {
    console.log(`--- call generateToken --`);
    const token: string = jwt.sign({email: email}, process.env.SECRET_TOKEN || 'testsecrettoken');
    return token;
}
