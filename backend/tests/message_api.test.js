// This file is for testing the message and conversation APIs

const { default: mongoose } = require('mongoose');
const supertest = require('supertest');
const createApp = require('../app');
const User = require('../models/user');
const { close, getLocalMongod } = require('./utils/db');

let api;
beforeAll(async () => {
    const app = await createApp();
    api = supertest(app);
});

let jwt;
let id;
beforeEach(async () => {
    await api.post('/api/testing/reset');
    await User.deleteMany({}); // This is probably not necessary, but it's here just in case
    await api.post('/testing/createUsers').send({ count: 10 });
    await api.post('/testing/createProperties').send({ count: 10 });
    // Default user is used for testing purposes. It should be created after everything else.
    await api.post('/testing/createDefaultUser').send({ createConversations: true });
    const response = await api.post('/login').send({ // Logging in every time is not optimal, but it's the easiest way to get a valid JWT
        username: 'test',
        password: 'password',
        ignoreCrypt: true, // This is only for testing
    });
    jwt = response.body.token;
    id = response.body.id;
});

describe('Conversations', () => {
    test('GET /conversations', async () => {
        const response = await api.get('/conversations').set('Authorization', `Bearer ${jwt}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(10); // The test generates 10 conversations.
    });
    test('GET /conversations/:id', async () => { // This test is not very good, but it's probably good enough for now
        const { body } = await api.get('/conversations').set('Authorization', `Bearer ${jwt}`);
        const response = await api.get(`/conversations/${body[0].property.id}`).set('Authorization', `Bearer ${jwt}`);
        console.log(response.body, response.status); // This is here for debugging purposes
        expect(response.status).toBe(200);
        expect(response.body.property).toEqual(body[0].property);
        expect(response.body.messages).not.toBeUndefined();
        expect(response.body.starter.id).toBe(id);
        expect(response.body.starter.username).toBe('test');
        expect(response.body.receiver.id).not.toBe(id);
    });
});

afterAll(async () => {
    await close(await getLocalMongod()); // Stop the local MongoDB instance and close the connection
    await mongoose.connection.close(); // Double check that the connection is closed
    // Something is probably here because there seems to be a memory leak somewhere
});
