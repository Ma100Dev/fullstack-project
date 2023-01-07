// This file is for testing the property API
const { default: mongoose } = require('mongoose');
const supertest = require('supertest');
// eslint-disable-next-line no-unused-vars
const path = require('path');
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
    price: 100,
    pricePer: 'day',
    description: // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    beds: 1,
    petsAllowed: true,
    allowCalendarBooking: true,
    image: true,
});

// This is a seriously ugly insecure hack
const postFormData = async (url, data) => {
    let executed = 'async () => { return await api.post(url)';
    Object.keys(data).forEach((key) => {
        if (key !== 'image') {
          executed += `.field('${key}', data.${key})`;
        } else {
          executed += '.attach(\'image\', path.join(__dirname, \'/utils/test.png\'))';
        }
    });
    executed += `.set('Authorization', \`Bearer ${jwt}\`)}`;
    // eslint-disable-next-line no-eval
    const response = eval(executed);
    return response;
};

test('POST /properties', async () => {
    const func = await postFormData('/properties', newProperty);
    const response = await func();
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', newProperty.title);
    expect(response.body).toHaveProperty('address', newProperty.address);
    expect(response.body).toHaveProperty('price', newProperty.price);
    expect(response.body).toHaveProperty('pricePer', newProperty.pricePer);
    expect(response.body).toHaveProperty('description', newProperty.description);
    expect(response.body).toHaveProperty('beds', newProperty.beds);
    expect(response.body).toHaveProperty('petsAllowed', newProperty.petsAllowed);
    expect(response.body).toHaveProperty('image', expect.any(Object));
    expect(response.body).toHaveProperty('allowCalendarBooking', newProperty.allowCalendarBooking);
});

afterAll(async () => {
    await close(getLocalMongod()); // Stop the local MongoDB instance and close the connection
    await mongoose.connection.close(); // Double check that the connection is closed
});
