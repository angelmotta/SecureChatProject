import {Request, Response} from 'express';
import { IMessage } from '../models/message.model';
import { sendMessageService, getChatService} from '../service/message.service';
import Joi  from 'joi';

export const sendMessageController = async (req: Request, res: Response) => {
    const loggedUser = req.email;
    if (!loggedUser) {
        res.status(400).json({"status": 0, "message": "User not authorized"});
        return;
    }
    // Request Validation
    const {error, value} = schemaRequest.validate(req.body);
    if (error) {
        console.log(error.message);
        res.status(404).json({"status": 0, "message": error.message});
        return;
    }
    
    // Send Message
    const payloadRequest: IMessage = {
        sender: loggedUser,
        receiver: value.receiver,
        message: value.message
    }

    try {
        sendMessageService(payloadRequest);
    } catch (err) {
        res.status(500).json({"status": 0, "message": err});
    }

    // Make and Send Response
    const response = {
        "status": "sent"
    }
    res.status(200).json(response);
}

export const getChatController = async (req: Request, res: Response) => {
    const loggedUser = req.email;
    if (!loggedUser) {
        res.status(400).json({"status": 0, "message": "User not authorized"});
        return;
    }

    // Request Validation
    const {error, value} = schemaChatRequest.validate(req.body);
    if (error) {
        console.log(error.message);
        res.status(404).json({"status": 0, "message": error.message});
        return;
    }

    // Get Data from Request
    const otherUser = value.email;

    const messages = await getChatService(loggedUser, otherUser);
    res.status(200).json({"messages": messages});
}

// Joi Schema Definition
const schemaRequest = Joi.object({
    receiver: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .trim(),
    message: Joi.string()
        .required()
        .trim(),
});


const schemaChatRequest = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .trim()
});