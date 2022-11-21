const { RSA, Crypt } = require('hybrid-crypto-js');
const fs = require('fs');
const crypto = require('crypto');

const entropy = crypto.randomBytes(32).toString('hex');
const crypt = new Crypt({ entropy });
const rsa = new RSA({ entropy });

if (process.env.GENERATE_KEY_PAIR === 'true') {
  rsa.generateKeyPairAsync().then((keyPair) => {
      fs.writeFileSync('id_rsa.pub', keyPair.publicKey);
      fs.writeFileSync('id_rsa', keyPair.privateKey);
  });
}

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
