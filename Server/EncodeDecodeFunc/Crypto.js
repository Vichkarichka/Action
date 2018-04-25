var CryptoJS = require("crypto-js");

exports.encodePassword = function encodePassword(password) {
    let encryptedPassword = CryptoJS.AES.encrypt(password, "Secret");
    return encryptedPassword;
}

 exports.decodePassword = function decodePassword(password) {
    let decrypted = CryptoJS.AES.decrypt(password, "Secret");
    return decrypted;
}