import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

const user = {
    email: 'taaniel@gmail.com',
    password: 'taaniel'
};

let token: string;
let userID: number;

describe('Users controller', () => {
    describe('GET /users', () => {
        // getting all users without logging in
        it('responds with an error message and status 401 because no token provided', async () => {
            const response = await request(app)
                .get('/users');
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(401);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('No token provided');
        });
        // getting all users with invalid token
        it('responds with an error message and status 401 because invalid token', async () => {
            const response = await request(app)
                .get('/users')
                .set('Authorization', 'Bearer asdasdasdasdasd');
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(401);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('Invalid token');
        });
        // logging in and receiving token
        it('responds with code 200 and token after login', async () => {
            const response = await request(app)
                .post('/login')
                .send(user);
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('token');
            expect(response.body.token).to.be.a('string');
            token = response.body.token;
        });
        // getting all users while logged in
        it('responds with code 200 and an array of users', async () => {
            const response = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('users');
            expect(response.body.users).to.be.a('array');
            expect(response.body.users.length).to.be.greaterThan(0);
        });
        // getting user by id while logged in
        it('responds with code 200 and a user by id', async () => {
            const response = await request(app)
                .get('/users/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('user');
            expect(response.body.user).to.be.a('object');
        });
        // getting a user but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .get('/users/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
    });
    describe('POST /users', () => {
        // posting a new user without a first name
        it('responds with code 400 and error message because of missing name', async () => {
            const response = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('First name is required');
        });
        // posting a new user without a last name
        it('responds with code 400 and error message because of missing name', async () => {
            const response = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: "asd", lastName: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Last name is required');
        });
        // posting a new user without an email
        it('responds with code 400 and error message because of missing name', async () => {
            const response = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: "asd", lastName: "asd", email: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Email is required');
        });
        // posting a new user without a password
        it('responds with code 400 and error message because of missing name', async () => {
            const response = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: "asd", lastName: "asd", email: "asd@asd.ee", password: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Password is required');
        });
        // posting a new user with a name and receiving ID
        it('responds with code 201 and ID of a new user', async () => {
            const response = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: "asd", lastName: "asd", email: "asd@asd.ee", password: "asd"});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(201);
            expect(response.body).to.have.key('id');
            expect(response.body.id).to.be.a('number');
            userID = response.body.id;            
        });
    });
    describe('PATCH /users/:id', () => {
        // updating a user with exising id
        it('responds with code 204 and empty object', async () => {
            const response = await request(app)
                .patch(`/users/${userID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: "patch", lastName: "patch", email: "patch@asd.ee", password: "patch"});
            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;
            expect(response.status).to.equal(204);
        });
        // updating a user but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .patch('/users/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
            // updating a user without a first name
        it('responds with code 400 and error message because details are missing', async () => {
            const response = await request(app)
                .patch(`/users/${userID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: "", lastName: "", email: "", password: "", role: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Nothing to update');
        });
    });
    describe('DELETE /users/:id', () => {
        // delete a user with exising id
        it('responds with code 204 and empty object', async () => {
            const response = await request(app)
                .delete(`/users/${userID}`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;
            expect(response.status).to.equal(204);
        });
        // deleting a user but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .delete('/users/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
    });
});

