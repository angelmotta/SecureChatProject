import {UserModel } from '../models/user.model';

interface IContactDetail {
    email: string;
    firstname: string;
    lastname: string;
    publickey: string;
    registerdate: Date;
  }

export const getListContactsDetails = async (contacts: string[]): Promise<IContactDetail[]> => {
    const contactsDetailsDocuments = await Promise.all(
        contacts.map(contact => {
            return UserModel.findOne({email: contact}).exec()
        })
    );
        
    
    // Prepare and Send response
    let listContactDetail : IContactDetail[] = [];
    for (const contactDetail of contactsDetailsDocuments) {
        if (!contactDetail) continue;
        const contact : IContactDetail = {
            email: contactDetail.email,
            firstname: contactDetail.firstname,
            lastname: contactDetail.lastname,
            publickey: contactDetail.publickey,
            registerdate: contactDetail.registerdate
        };
        listContactDetail.push(contact); 
    }
    
    
    return listContactDetail;
}