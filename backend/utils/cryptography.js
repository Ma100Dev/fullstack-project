const { RSA, Crypt } = require('hybrid-crypto-js');
const { Entropy } = require('entropy-string');
const fs = require('fs');

const entropy = new Entropy();
const crypt = new Crypt({ entropy: entropy.string() });
const rsa = new RSA({ entropy: entropy.string() });

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
