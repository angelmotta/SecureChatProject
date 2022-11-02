import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import config from '../config/config';

interface tokenPayload {
  email: string;
  iat: Date;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {  
    const tokenRequest = req.header('Authorization') || ''; 
    // Validate invalid request
    if(!tokenRequest) {
      res.status(401).send({"message": 'Invalid request. Token is needed'});
      return;  // Stop flow
    }
  
    // Validate Token
    let payload: tokenPayload;
    try {
        // Validate token autenticity and get decoded info
        payload = jwt.verify(tokenRequest, config.jwtSecret) as unknown as tokenPayload;
        // Make email attribute available in next() function
        req.email = payload.email;
        next();
    } catch (err) {
      res.status(401).json({"message": "Not authorized"});
      console.log(err);
      return; // Stop flow
    }
  }