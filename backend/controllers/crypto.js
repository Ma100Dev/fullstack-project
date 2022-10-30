const cryptoRouter = require('express').Router();
const { getPublicKey } = require('../utils/cryptography');

cryptoRouter.get('/', (request, response) => {
    response.json({ publicKey: getPublicKey() });
});

module.exports = cryptoRouter;
