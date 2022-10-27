import bcrypt from 'bcrypt';

export const encryptionPassword = async (plainPassword: string): Promise<string> => {
    console.log(`-- call function: encryptionPassword --`);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedpassword = await bcrypt.hash(plainPassword, salt);
    console.log(`show hashed password: ${hashedpassword}`);
    return hashedpassword;
}
