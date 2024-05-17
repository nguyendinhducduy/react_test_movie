
import { MD5 } from 'crypto-js';

const hashedPasswords = (passwords: string) => {
    const hashed = MD5(passwords).toString();
    return hashed;
};

export default hashedPasswords;
