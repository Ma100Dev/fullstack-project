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

// This is a seriously ugly hack but it does make testing file uploads easier.
// It also breaks a lot of eslint rules.
const postFormData = async (url, data) => {
    let executed = 'return await api.post(url)';
    Object.keys(data).forEach((key) => {
        if (key !== 'image') {
          executed += `.field('${key}', data.${key})`;
        } else if (data[key] === true) {
          executed += '.attach(\'image\', path.join(__dirname, \'/utils/test.png\'))';
        }
    });
    executed += `.set('Authorization', \`Bearer ${jwt}\`)`;
    // eslint-disable-next-line no-new-func, func-names, prefer-arrow-callback, no-empty-function
    const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
    const func = new AsyncFunction('url', 'api', 'data', 'path', '__dirname', executed);
    const response = await func(url, api, data, path, __dirname);
    return response;
};

describe('Property creation', () => {
    test('POST /properties', async () => {
        const response = await postFormData('/properties', newProperty);
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

    test('POST /properties without image', async () => {
        const response = await postFormData('/properties', { ...newProperty, image: false }, api);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', newProperty.title);
        expect(response.body).toHaveProperty('address', newProperty.address);
        expect(response.body).toHaveProperty('price', newProperty.price);
        expect(response.body).toHaveProperty('pricePer', newProperty.pricePer);
        expect(response.body).toHaveProperty('description', newProperty.description);
        expect(response.body).toHaveProperty('beds', newProperty.beds);
        expect(response.body).toHaveProperty('petsAllowed', newProperty.petsAllowed);
        expect(response.body).not.toHaveProperty('image');
        expect(response.body).toHaveProperty('allowCalendarBooking', newProperty.allowCalendarBooking);
    });

    test('POST /properties without price', async () => {
        const response = await postFormData('/properties', { ...newProperty, price: '' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Property validation failed: price: Path `price` (0) is less than minimum allowed value (1).');
    });
    test('POST /properties with invalid price', async () => {
        const response = await postFormData('/properties', { ...newProperty, price: 'invalid' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Property validation failed: price: Cast to Number failed for value "NaN" (type number) at path "price"');
    });

    test('POST /properties without pricePer', async () => {
        const response = await postFormData('/properties', { ...newProperty, pricePer: '' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Property validation failed: pricePer: Path `pricePer` is required.');
    });
    test('POST /properties with invalid pricePer', async () => {
        const response = await postFormData('/properties', { ...newProperty, pricePer: 'invalid' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Property validation failed: pricePer: `invalid` is not a valid enum value for path `pricePer`.');
    });

    test('POST /properties without beds', async () => {
        const response = await postFormData('/properties', { ...newProperty, beds: '' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Property validation failed: beds: Path `beds` (0) is less than minimum allowed value (1).');
    });
    test('POST /properties with invalid beds', async () => {
        const response = await postFormData('/properties', { ...newProperty, beds: 'invalid' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Property validation failed: beds: Cast to Number failed for value "NaN" (type number) at path "beds"');
    });

    test('POST /properties without address', async () => {
        const response = await postFormData('/properties', { ...newProperty, address: '' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Property validation failed: address: Path `address` is required.');
    });
    test('POST /properties without title', async () => {
        const response = await postFormData('/properties', { ...newProperty, title: '' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Property validation failed: title: Path `title` is required.');
    });

    test('POST /properties without description', async () => {
        const response = await postFormData('/properties', { ...newProperty, description: '' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Property validation failed: description: Path `description` is required.');
    });
    test('POST /properties with invalid description', async () => {
        const response = await postFormData('/properties', { ...newProperty, description: 'a'.repeat(48) });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Property validation failed: description: Path `description` (`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`) is shorter than the minimum allowed length (50).');
    });

    test('POST /properties without petsAllowed', async () => { // Invalid values should be ignored and it should default to false
        const response = await postFormData('/properties', { ...newProperty, petsAllowed: '' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('petsAllowed', false);
    });
    test('POST /properties with invalid petsAllowed', async () => {
        const response = await postFormData('/properties', { ...newProperty, petsAllowed: 'invalid' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('petsAllowed', false);
    });

    test('POST /properties without allowCalendarBooking', async () => { // Invalid values should be ignored and it should default to false
        const response = await postFormData('/properties', { ...newProperty, allowCalendarBooking: '' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('allowCalendarBooking', false);
    });
    test('POST /properties with invalid allowCalendarBooking', async () => {
        const response = await postFormData('/properties', { ...newProperty, allowCalendarBooking: 'invalid' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('allowCalendarBooking', false);
    });
});

afterAll(async () => {
    await close(getLocalMongod()); // Stop the local MongoDB instance and close the connection
    await mongoose.connection.close(); // Double check that the connection is closed
    // Something is probably here because there seems to be a memory leak somewhere
});
