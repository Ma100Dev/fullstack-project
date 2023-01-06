const supertest = require('supertest');
const app = require('../app');

it('Testing', () => {
    expect(1).toBe(1);
});

const api = supertest(app);

test('GET /test/ping', async () => {
    await api.get('/test/ping').expect(200);
});
