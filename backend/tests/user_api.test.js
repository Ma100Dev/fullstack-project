const supertest = require('supertest');
const createApp = require('../app');
const { close, getLocalMongod } = require('./utils/db');

let api;
beforeAll(async () => {
    const app = await createApp();
    api = supertest(app);
});

beforeEach(async () => {
    await api.post('/testing/reset');
});

test('POST /users', async () => {
    const newUser = {};
    const response = await api.post('/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', newUser.username);
});

afterAll(async () => {
    await close(await getLocalMongod());
});
