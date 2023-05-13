import CryptoJS from 'crypto-js';

const password = import.meta.env.VITE_DECRYPT

export function encrypt(input: any) {
    const cipher = CryptoJS.AES.encrypt(JSON.stringify({ input }), password).toString()
    return cipher;
}

export function decrypt(input: any) {
    const decipher = CryptoJS.AES.decrypt(input, password).toString(CryptoJS.enc.Utf8)
    return decipher;
}