const { Crypt } = require('hybrid-crypto-js');
const fs = require('fs');
const crypto = require('crypto');

const entropy = crypto.randomBytes(32).toString('hex');
const crypt = new Crypt({ entropy });

const publicKey = fs.readFileSync('id_rsa.pub', 'utf8');
const privateKey = fs.readFileSync('id_rsa', 'utf8');

const encrypt = (data) => crypt.encrypt(publicKey, data);

const decrypt = (data) => crypt.decrypt(privateKey, data);

const getPublicKey = () => publicKey;

module.exports = {
    encrypt,
    decrypt,
    getPublicKey,
};
