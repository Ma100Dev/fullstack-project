const testingRouter = require('express').Router();
const { clear } = require('../tests/utils/db');
const { generateDefaultUser } = require('../tests/utils/populateDb');

testingRouter.post('/reset', async (request, response) => {
    await clear();
    response.status(204).end();
});

testingRouter.post('/createDefaultUser', async (request, response) => {
    generateDefaultUser();
    response.status(204).end();
});

module.exports = testingRouter;
