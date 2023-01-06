const supertest = require('supertest');
const app = require('../app');

jest.setTimeout(50000);
const api = supertest(app);

test('GET /test/ping', async () => {
    await api.get('/test/ping').expect(200);
});
