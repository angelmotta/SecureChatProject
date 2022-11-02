import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateToken = (email: string) : string => {
    const token: string = jwt.sign({email: email}, config.jwtSecret);
    return token;
}
