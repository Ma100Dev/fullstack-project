const cryptoRouter = require('express').Router();
const { getPublicKey } = require('../utils/cryptography');

cryptoRouter.get('/', (request, response) => {
    response.send(getPublicKey());
});

module.exports = cryptoRouter;
