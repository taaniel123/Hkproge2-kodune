import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

const user = {
    email: 'taaniel@gmail.com',
    password: 'taaniel'
};

let token: string;
let subjectID: number;

describe('Subjects controller', () => {
    describe('GET /subjects', () => {
        // getting all subjects without logging in
        it('responds with an error message and status 401 because no token provided', async () => {
            const response = await request(app)
                .get('/subjects');
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(401);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('No token provided');
        });
        // getting all subjects with invalid token
        it('responds with an error message and status 401 because invalid token', async () => {
            const response = await request(app)
                .get('/subjects')
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
        // getting all subjects while logged in
        it('responds with code 200 and an array of subjects', async () => {
            const response = await request(app)
                .get('/subjects')
                .set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('subjects');
            expect(response.body.subjects).to.be.a('array');
            expect(response.body.subjects.length).to.be.greaterThan(0);
        });
        // getting subject by id while logged in
        it('responds with code 200 and a subject by id', async () => {
            const response = await request(app)
                .get('/subjects/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('subject');
            expect(response.body.subject).to.be.a('object');
        });
        // getting a subject but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .get('/subjects/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
    });
    describe('POST /subjects', () => {
        // posting a new subject without a name
        it('responds with code 400 and error message because of missing name', async () => {
            const response = await request(app)
                .post('/subjects')
                .set('Authorization', `Bearer ${token}`)
                .send({name: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('e');
            expect(response.body.e).to.be.a('object');
            expect(response.body.e.message).to.equal('name is a required field');
        });
        // posting a new subject with a name and receiving ID
        it('responds with code 201 and ID of a new subject', async () => {
            const response = await request(app)
                .post('/subjects')
                .set('Authorization', `Bearer ${token}`)
                .send({name: "asd"});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(201);
            expect(response.body).to.have.key('id');
            expect(response.body.id).to.be.a('number');
            subjectID = response.body.id;            
        });
    });
    describe('PATCH /subjects/:id', () => {
        // updating a subject with exising id
        it('responds with code 204 and empty object', async () => {
            const response = await request(app)
                .patch(`/subjects/${subjectID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({name: "patchpatch"});
            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;
            expect(response.status).to.equal(204);
        });
        // updating a subject but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .patch('/subjects/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
            // updating a subject without a name
        it('responds with code 400 and error message because name is missing', async () => {
            const response = await request(app)
                .patch(`/subjects/${subjectID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({name: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Nothing to update');
        });
    });
    describe('DELETE /subjects/:id', () => {
        // delete a subject with exising id
        it('responds with code 204 and empty object', async () => {
            const response = await request(app)
                .delete(`/subjects/${subjectID}`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;
            expect(response.status).to.equal(204);
        });
        // deleting a subject but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .delete('/subjects/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
    });
});

