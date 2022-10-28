import jwt, { JwtPayload } from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import config from '../config/config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {  
    const tokenRequest = req.header('Authorization') || ''; 
    // Validate invalid request
    if(!tokenRequest) {
      res.status(401).send({"message": 'Invalid request. Token is needed'});
      return;  // Stop flow
    }
  
    // Validate Token
    console.log("token Validation");
    let payload: JwtPayload | string;
    try {
        // Validate token autenticity and get decoded info
        console.log(tokenRequest);
        console.log(config.jwtSecret);
        const payload = jwt.verify(tokenRequest, config.jwtSecret);
        console.log(payload);
        // Create userId attribute in HTTP Request
        //req.email = payload.email;
        // Go to original destination resource
        next();
    } catch (err) {
      console.log("Catch error jwt.verify()");
      res.status(401).json({"message": "Not authorized"});
      console.log(err);
      return; // Stop flow
    }
  }