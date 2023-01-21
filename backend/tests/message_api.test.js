// This file is for testing the message and conversation APIs

const { default: mongoose } = require('mongoose');
const supertest = require('supertest');
const createApp = require('../app');
const { close, getLocalMongod } = require('./utils/db');

let api;
beforeAll(async () => {
    const app = await createApp();
    api = supertest(app);
});

let jwt;
beforeEach(async () => {
    await api.post('/api/testing/reset');
    await api.post('/testing/createDefaultUser').send({});
    const response = await api.post('/login').send({ // Logging in every time is not optimal, but it's the easiest way to get a valid JWT
        username: 'test',
        password: 'password',
        ignoreCrypt: true, // This is only for testing
    });
    jwt = response.body.token;
});

describe('Conversations', () => {
    test('GET /conversations', async () => {
        const response = await api.get('/conversations').set('Authorization', `Bearer ${jwt}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    });
});

afterAll(async () => {
    await close(await getLocalMongod()); // Stop the local MongoDB instance and close the connection
    await mongoose.connection.close(); // Double check that the connection is closed
    // Something is probably here because there seems to be a memory leak somewhere
});
