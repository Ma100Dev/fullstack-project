const testingRouter = require('express').Router();
const { clear } = require('../tests/utils/db');
const { generateDefaultUser, populateUsers } = require('../tests/utils/populateDb');

testingRouter.get('/ping', (request, response) => {
    response.status(200).send('pong');
});

testingRouter.post('/reset', async (request, response) => {
    await clear();
    response.status(204).end();
});

testingRouter.post('/createUsers', async (request, response) => {
    await populateUsers(request.body.count || 10);
    response.status(204).end();
});

testingRouter.post('/createDefaultUser', async (request, response) => {
    await generateDefaultUser(request.body.createConversations || false);
    response.status(204).end();
});

module.exports = testingRouter;
