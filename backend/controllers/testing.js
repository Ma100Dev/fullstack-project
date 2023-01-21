const testingRouter = require('express').Router();
const { clear } = require('../tests/utils/db');
const { generateDefaultUser, populateUsers, populateProperties } = require('../tests/utils/populateDb');

testingRouter.get('/ping', (request, response) => {
    response.status(200).send('pong');
});

testingRouter.post('/reset', async (request, response) => {
    await clear();
    response.status(204).end();
});

testingRouter.post('/createUsers', async (request, response) => {
    const users = await populateUsers(request.body.count || 10);
    response.status(201).json(users);
});

testingRouter.post('/createProperties', async (request, response) => {
    const properties = await populateProperties(request.body.count || 10);
    response.status(201).json(properties);
});

testingRouter.post('/createDefaultUser', async (request, response) => {
    const user = await generateDefaultUser(request.body.createConversations || false);
    response.status(201).json(user);
});

module.exports = testingRouter;
