// This file is for testing the user and login API
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

test('POST /users with invalid password', async () => {
    const newUser = {
        username: 'testuser',
        name: 'Test User',
        email: 'test@example.com',
        password: 'te',
        ignoreCrypt: true, // This is only for testing
    };
    const response = await api.post('/users').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'User validation failed: password: Path `password` is shorter than the minimum allowed length (3).');
});

test('POST /users with invalid email', async () => {
    const newUser = {
        username: 'testuser',
        name: 'Test User',
        email: 'test',
        password: 'testpassword',
        ignoreCrypt: true, // This is only for testing
    };
    const response = await api.post('/users').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'User validation failed: email: Path `email` is invalid.');
});

test('POST /users with invalid username', async () => {
    const newUser = {
        username: 'te',
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
        ignoreCrypt: true, // This is only for testing
    };
    const response = await api.post('/users').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'User validation failed: username: Path `username` (`te`) is shorter than the minimum allowed length (3).');
});

test('POST /users with invalid name', async () => {
    const newUser = {
        username: 'testuser',
        name: 'T',
        email: 'test@example.com',
        password: 'testpassword',
        ignoreCrypt: true, // This is only for testing
    };
    const response = await api.post('/users').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'User validation failed: name: Path `name` (`T`) is shorter than the minimum allowed length (3).');
});

test('POST /users with duplicate username', async () => {
    const newUser = {
        username: 'testuser',
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
        ignoreCrypt: true, // This is only for testing
    };
    await api.post('/users').send(newUser);
    const response = await api.post('/users').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'User validation failed: username: Error, expected `username` to be unique. Value: `testuser`');
});

afterAll(async () => {
    await close(await getLocalMongod());
});
