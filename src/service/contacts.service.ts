//import { HydratedDocument } from 'mongoose';
import {UserModel, IUser} from '../models/user.model';

interface contactDetail {
    email: string;
    firstname: string;
    lastname: string;
  }

export const getListContactsDetails = async (contacts: string[]): Promise<void> => {
    console.log(`call getListContactsDetails`);
    console.log(contacts);
    const listContactsDetails = await Promise.all(
        contacts.map(contact => {
            return UserModel.findOne({email: contact}).exec()
        })
    );
    
    console.log(`-- Results: ---`);
    console.log(listContactsDetails);
    console.log(`-- Results: ---`);
}