import CryptoJS from "crypto-js";

const key = process.env.SECRET_KEY || "secret";

function encryptMessage(message) {
  //,key
  return CryptoJS.AES.encrypt(message, key).toString();
}

console.log(key);

 function decryptMessage(ciphertext)   {
  //,key
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export default  encryptMessage;