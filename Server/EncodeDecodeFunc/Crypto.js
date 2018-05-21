const CryptoJS = require("crypto-js");

exports.encodePassword = (password) => {
    let encryptedPassword = CryptoJS.AES.encrypt(password, "Secret");
    return encryptedPassword;
}

 exports.decodePassword = (password) => {
    let decrypted = CryptoJS.AES.decrypt(password, "Secret");
    return decrypted;
}