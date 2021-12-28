import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

const user = {
    email: 'taaniel@gmail.com',
    password: 'taaniel'
};

let token: string;
let teacherID: number;

describe('Teachers controller', () => {
    describe('GET /teachers', () => {
        // getting all teachers without logging in
        it('responds with an error message and status 401 because no token provided', async () => {
            const response = await request(app)
                .get('/teachers');
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(401);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('No token provided');
        });
        // getting all teachers with invalid token
        it('responds with an error message and status 401 because invalid token', async () => {
            const response = await request(app)
                .get('/teachers')
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
        // getting all teachers while logged in
        it('responds with code 200 and an array of teachers', async () => {
            const response = await request(app)
                .get('/teachers')
                .set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('teachers');
            expect(response.body.teachers).to.be.a('array');
            expect(response.body.teachers.length).to.be.greaterThan(0);
        });
        // getting teacher by id while logged in
        it('responds with code 200 and a teacher by id', async () => {
            const response = await request(app)
                .get('/teachers/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('teacher');
            expect(response.body.teacher).to.be.a('object');
        });
        // getting a teacher but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .get('/teachers/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
    });
    describe('POST /teachers', () => {
        // posting a new teacher without a first name
        it('responds with code 400 and error message because of missing name', async () => {
            const response = await request(app)
                .post('/teachers')
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('First name is required');
        });
        // posting a new teacher without a last name
        it('responds with code 400 and error message because of missing name', async () => {
            const response = await request(app)
                .post('/teachers')
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: "asd", lastName: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Last name is required');
        });
        // posting a new teacher with a name and receiving ID
        it('responds with code 201 and ID of a new teacher', async () => {
            const response = await request(app)
                .post('/teachers')
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: "asd", lastName: "asd"});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(201);
            expect(response.body).to.have.key('id');
            expect(response.body.id).to.be.a('number');
            teacherID = response.body.id;            
        });
    });
    describe('PATCH /teachers/:id', () => {
        // updating a teacher with exising id
        it('responds with code 204 and empty object', async () => {
            const response = await request(app)
                .patch(`/teachers/${teacherID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: "patch", lastName: "patch"});
            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;
            expect(response.status).to.equal(204);
        });
        // updating a teacher but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .patch('/teachers/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
            // updating a teacher without a first name
        it('responds with code 400 and error message because name is missing', async () => {
            const response = await request(app)
                .patch(`/teachers/${teacherID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({firstName: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Nothing to update');
        });
            // updating a teacher without a last name
        it('responds with code 400 and error message because name is missing', async () => {
            const response = await request(app)
                .patch(`/teachers/${teacherID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({lastName: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Nothing to update');
        });
    });
    describe('DELETE /teachers/:id', () => {
        // delete a teacher with exising id
        it('responds with code 204 and empty object', async () => {
            const response = await request(app)
                .delete(`/teachers/${teacherID}`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;
            expect(response.status).to.equal(204);
        });
        // deleting a teacher but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .delete('/teachers/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
    });
});

