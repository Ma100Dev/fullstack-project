const supertest = require('supertest');
const mongoose = require('mongoose');
const createApp = require('../app');

let api;
beforeAll(async () => {
    const app = await createApp();
    api = supertest(app);
});

test('GET /testing/ping', async () => {
    await api.get('/testing/ping').expect(200);
});

afterAll(() => {
    mongoose.connection.close();
});
