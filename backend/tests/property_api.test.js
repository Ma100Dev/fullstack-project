// This file is for testing the property API
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
    await api.post('/testing/reset');
    /*
    Generate default user for testing:
    {
        username: 'test',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        properties: [],
    */
    await api.post('/testing/createDefaultUser');
    const response = await api.post('/login').send({ // Logging in every time is not optimal, but it's the easiest way to get a valid JWT
        username: 'test',
        password: 'password',
        ignoreCrypt: true, // This is only for testing
    });
    jwt = response.body.token;
});

const newProperty = Object.freeze({
    title: 'Test Property',
    address: 'Test Address',
    price: 100000,
    pricePer: 'day',
    description: // >=50 characters lorem ipsum
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl sed ultricies lacinia, nisl nisl aliquam nisl, et aliquam nunc nisl eu nisl. Sed euismod, nisl sed ultricies lacinia, nisl nisl aliquam nisl, et aliquam nunc nisl eu nisl.',
    beds: 1,
    petsAllowed: true,
    allowCalendarBooking: true,
});

test('POST /properties', async () => {
    const response = await api.post('/properties').send(newProperty).set('Authorization', `Bearer ${jwt}`);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', newProperty.title);
    expect(response.body).toHaveProperty('address', newProperty.address);
    expect(response.body).toHaveProperty('price', newProperty.price);
    expect(response.body).toHaveProperty('pricePer', newProperty.pricePer);
    expect(response.body).toHaveProperty('description', newProperty.description);
    expect(response.body).toHaveProperty('beds', newProperty.beds);
    expect(response.body).toHaveProperty('petsAllowed', newProperty.petsAllowed);
    expect(response.body).toHaveProperty('image', newProperty.image);
    expect(response.body).toHaveProperty('allowCalendarBooking', newProperty.allowCalendarBooking);
});

afterAll(async () => {
    await close(await getLocalMongod()); // Stop the local MongoDB instance and close the connection
    await mongoose.connection.close(); // Double check that the connection is closed
});
