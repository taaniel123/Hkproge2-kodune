import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

const user = {
    email: 'taaniel@gmail.com',
    password: 'taaniel'
};

let token: string;
let roomID: number;

describe('Rooms controller', () => {
    describe('GET /rooms', () => {
        // getting all rooms without logging in
        it('responds with an error message and status 401 because no token provided', async () => {
            const response = await request(app)
                .get('/rooms');
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(401);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('No token provided');
        });
        // getting all rooms with invalid token
        it('responds with an error message and status 401 because invalid token', async () => {
            const response = await request(app)
                .get('/rooms')
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
        // getting all rooms while logged in
        it('responds with code 200 and an array of rooms', async () => {
            const response = await request(app)
                .get('/rooms')
                .set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('rooms');
            expect(response.body.rooms).to.be.a('array');
            expect(response.body.rooms.length).to.be.greaterThan(0);
        });
        // getting room by id while logged in
        it('responds with code 200 and a room by id', async () => {
            const response = await request(app)
                .get('/rooms/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('room');
            expect(response.body.room).to.be.a('object');
        });
        // getting a room but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .get('/rooms/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
    });
    describe('POST /rooms', () => {
        // posting a new room without a number
        it('responds with code 400 and error message because of missing number', async () => {
            const response = await request(app)
                .post('/rooms')
                .set('Authorization', `Bearer ${token}`)
                .send({number: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('e');
            expect(response.body.e).to.be.a('object');
            expect(response.body.e.message).to.equal('number must be a `number` type, but the final value was: `NaN` (cast from the value `\"\"`).');
        });
        // posting a new room with a number and receiving ID
        it('responds with code 201 and ID of a new room', async () => {
            const response = await request(app)
                .post('/rooms')
                .set('Authorization', `Bearer ${token}`)
                .send({number: "123"});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(201);
            expect(response.body).to.have.key('id');
            expect(response.body.id).to.be.a('number');
            roomID = response.body.id;            
        });
    });
    describe('PATCH /rooms/:id', () => {
        // updating a room with exising id
        it('responds with code 204 and empty object', async () => {
            const response = await request(app)
                .patch(`/rooms/${roomID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({number: "666"});
            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;
            expect(response.status).to.equal(204);
        });
        // updating a room but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .patch('/rooms/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
            // updating a room without a number
        it('responds with code 400 and error message because number is missing', async () => {
            const response = await request(app)
                .patch(`/rooms/${roomID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({number: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.eq('Nothing to update');
        });
    });
    describe('DELETE /rooms/:id', () => {
        // delete a room with exising id
        it('responds with code 204 and empty object', async () => {
            const response = await request(app)
                .delete(`/rooms/${roomID}`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;
            expect(response.status).to.equal(204);
        });
        // deleting a room but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .delete('/rooms/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
    });
});

