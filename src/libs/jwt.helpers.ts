import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateToken = (email: string) : string => {
    console.log(`--- call generateToken --`);
    console.log(config.jwtSecret);
    const token: string = jwt.sign({email: email}, config.jwtSecret);
    return token;
}
