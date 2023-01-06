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

test('GET /testing/ping', async () => {
    await api.get('/testing/ping').expect(200);
});

afterAll(async () => {
    await close(await getLocalMongod());
});
