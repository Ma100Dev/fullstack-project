// This file is for testing the user and login API
const { default: mongoose } = require('mongoose');
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

const newUser = Object.freeze({
    username: 'testuser',
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword',
    ignoreCrypt: true, // This is only for testing
}); // Default user for testing

describe('User creation', () => {
    test('POST /users', async () => {
        const response = await api.post('/users').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('name', newUser.name);
        expect(response.body).toHaveProperty('email', newUser.email);
        expect(response.body).not.toHaveProperty('password');
        expect(response.body).not.toHaveProperty('passwordHash');
    });

    test('POST /users with invalid password', async () => {
        const invalidUser = { ...newUser, password: 'te' };
        const response = await api.post('/users').send(invalidUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User validation failed: password: Path `password` is shorter than the minimum allowed length (3).');
    });

    test('POST /users without username', async () => {
        const invalidUser = { ...newUser, username: undefined };
        const response = await api.post('/users').send(invalidUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User validation failed: username: Path `username` is required.');
    });

    test('POST /users with invalid email', async () => {
        const invalidUser = { ...newUser, email: 'invalidemail' };
        const response = await api.post('/users').send(invalidUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User validation failed: email: Path `email` is invalid.');
    });

    test('POST /users without email', async () => {
        const invalidUser = { ...newUser, email: undefined };
        const response = await api.post('/users').send(invalidUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User validation failed: email: Path `email` is required.');
    });

    test('POST /users with invalid username', async () => {
        const invalidUser = { ...newUser, username: 'te' };
        const response = await api.post('/users').send(invalidUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User validation failed: username: Path `username` (`te`) is shorter than the minimum allowed length (3).');
    });

    test('POST /users without username', async () => {
        const invalidUser = { ...newUser, username: undefined };
        const response = await api.post('/users').send(invalidUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User validation failed: username: Path `username` is required.');
    });

    test('POST /users with invalid name', async () => {
        const invalidUser = { ...newUser, name: 'TE' };
        const response = await api.post('/users').send(invalidUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User validation failed: name: Path `name` (`TE`) is shorter than the minimum allowed length (3).');
    });

    test('POST /users without name', async () => {
        const invalidUser = { ...newUser, name: undefined };
        const response = await api.post('/users').send(invalidUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User validation failed: name: Path `name` is required.');
    });

    test('POST /users with duplicate username', async () => {
        await api.post('/users').send(newUser);
        const anotherUser = { ...newUser, email: 'another@example.com' };
        const response = await api.post('/users').send(anotherUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User validation failed: username: Error, expected `username` to be unique. Value: `testuser`');
    });

    test('POST /users with duplicate email', async () => {
        await api.post('/users').send(newUser);
        const anotherUser = { ...newUser, username: 'anotherUser' };
        const response = await api.post('/users').send(anotherUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User validation failed: email: Error, expected `email` to be unique. Value: `test@example.com`');
    });
});

describe('User login', () => {
    test('POST /login', async () => {
        await api.post('/users').send(newUser);
        const response = await api.post('/login').send({
            username: newUser.username,
            password: newUser.password,
            ignoreCrypt: true, // This is only for testing
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toMatch(/^[a-f\d]{24}$/i); // Check if it is a valid MongoDB ObjectId
        expect(response.body).toHaveProperty('token');
        expect(response.body.token).toMatch(/(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/); // Check if it is a valid JWT
        expect(response.body).not.toHaveProperty('password');
        expect(response.body).not.toHaveProperty('passwordHash');
    });

    test('POST /login with invalid username', async () => {
        await api.post('/users').send(newUser);
        const response = await api.post('/login').send({
            username: 'invaliduser',
            password: newUser.password,
            ignoreCrypt: true, // This is only for testing
        });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'invalid username or password');
    });

    test('POST /login with invalid password', async () => {
        await api.post('/users').send(newUser);
        const response = await api.post('/login').send({
            username: newUser.username,
            password: 'invalidpassword',
            ignoreCrypt: true, // This is only for testing
        });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'invalid username or password');
    });

    test('POST /login without username', async () => {
        await api.post('/users').send(newUser);
        const response = await api.post('/login').send({
            password: newUser.password,
            ignoreCrypt: true, // This is only for testing
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'username and password required');
    });

    test('POST /login without password', async () => {
        await api.post('/users').send(newUser);
        const response = await api.post('/login').send({
            username: newUser.username,
            ignoreCrypt: true, // This is only for testing
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'username and password required');
    });
});

describe('User getting', () => {
    test('GET /users', async () => { // Getting all users is not allowed because it is unnecessary
        const response = await api.get('/users');
        expect(response.status).toBe(405); // Method Not Allowed
        expect(response.body).toHaveProperty('error', 'Method not allowed');
    });

    test('GET /users/:id', async () => {
        const user = await api.post('/users').send(newUser);
        const response = await api.get(`/users/${user.body.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', user.body.id);
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('name', newUser.name);
        expect(response.body).toHaveProperty('email', newUser.email);
        expect(response.body).toHaveProperty('properties', []);
        expect(response.body).not.toHaveProperty('password');
        expect(response.body).not.toHaveProperty('passwordHash');
    });

    test('GET /users/:id with invalid id', async () => {
        const response = await api.get('/users/invalidid');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Malformatted id');
    });

    test('GET /users/:id with non-existent id', async () => {
    // This is a random valid MongoDB ObjectId.
    // Since the database is empty, this id should absolutely not exist.
        const response = await api.get('/users/63b96d59686054b5d7f48329');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });
});

describe('User updating', () => {
    test('PUT /users/:id', async () => {
        await api.post('/users').send(newUser);
        const user = await api.post('/login').send({
            username: newUser.username,
            password: newUser.password,
            ignoreCrypt: true, // This is only for testing
        });
        const response = await api.put(`/users/${user.body.id}`).send({
            name: 'New Name',
            email: 'another@example.com',
            password: 'testpassword', // Password confirmation. Changing the password is not yet supported.
            ignoreCrypt: true, // This is only for testing
        }).set('Authorization', `Bearer ${user.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', user.body.id);
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('name', 'New Name');
        expect(response.body).toHaveProperty('email', 'another@example.com');
        expect(response.body).toHaveProperty('properties', []);
        expect(response.body).not.toHaveProperty('password');
        expect(response.body).not.toHaveProperty('passwordHash');
    });

    test('PUT /users/:id with another id', async () => {
        await api.post('/users').send(newUser);
        const user = await api.post('/login').send({
            username: newUser.username,
            password: newUser.password,
            ignoreCrypt: true, // This is only for testing
        });
        const response = await api.put('/users/invalidId').send({
            name: 'New Name',
            email: 'another@example.com',
            password: 'testpassword', // Password confirmation. Changing the password is not yet supported.
            ignoreCrypt: true, // This is only for testing
        }).set('Authorization', `Bearer ${user.body.token}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Not authorized');
    });
});

describe('User deletion', () => {
    test('DELETE /users/:id', async () => {
        await api.post('/users').send(newUser);
        const user = await api.post('/login').send({
            username: newUser.username,
            password: newUser.password,
            ignoreCrypt: true, // This is only for testing
        });
        const response = await api.delete(`/users/${user.body.id}`).set('Authorization', `Bearer ${user.body.token}`);
        expect(response.status).toBe(204);
        const userGet = await api.get(`/users/${user.body.id}`);
        expect(userGet.status).toBe(404);
    });

    test('DELETE /users/:id with another id', async () => {
        await api.post('/users').send(newUser);
        const user = await api.post('/login').send({
            username: newUser.username,
            password: newUser.password,
            ignoreCrypt: true, // This is only for testing
        });
        const response = await api.delete('/users/invalidId').set('Authorization', `Bearer ${user.body.token}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Not authorized');
    });
});

afterAll(async () => {
    await close(await getLocalMongod()); // Stop the local MongoDB instance and close the connection
    await mongoose.connection.close(); // Double check that the connection is closed
    // Something is probably here because there seems to be a memory leak somewhere
});
