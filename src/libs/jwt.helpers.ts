import jwt from 'jsonwebtoken';
import config from '../config/config';
import { jwtPayload } from '../types/custom.types';

export const generateToken = (tokenPayload: jwtPayload) : string => {
    const token: string = jwt.sign(tokenPayload, config.jwtSecret);
    return token;
}
