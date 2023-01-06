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
    const newUser = {
        username: 'testuser',
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
        ignoreCrypt: true, // This is only for testing
    };
    const response = await api.post('/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', newUser.username);
    expect(response.body).toHaveProperty('name', newUser.name);
    expect(response.body).toHaveProperty('email', newUser.email);
    expect(response.body).not.toHaveProperty('password');
    expect(response.body).not.toHaveProperty('passwordHash');
});

afterAll(async () => {
    await close(await getLocalMongod());
});
