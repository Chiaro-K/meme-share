import * as CryptoJS from 'crypto-js';

require('dotenv').config();

// if (process.env['NODE_ENV'] !== 'production') {
//   require('dotenv').config();
// }

export const Encrypt = (txt: string) => {
    console.log("key:", process.env['ENCRYPTION_KEY']!);
  //return CryptoJS.AES.encrypt(txt, process.env['ENCRYPTION_KEY']!).toString();
};

export const Decrypt = (txtToDecrypt: string) => {
  return CryptoJS.AES.decrypt(
    txtToDecrypt,
    process.env['ENCRYPTION_KEY']!
  ).toString(CryptoJS.enc.Utf8);
};
