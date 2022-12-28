const { RSA } = require('hybrid-crypto-js');
const fs = require('fs');
const crypto = require('crypto');

const entropy = crypto.randomBytes(32).toString('hex');
const rsa = new RSA({ entropy });

rsa.generateKeyPairAsync().then((keyPair) => {
    fs.writeFileSync('id_rsa.pub', keyPair.publicKey);
    fs.writeFileSync('id_rsa', keyPair.privateKey);
});
