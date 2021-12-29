import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

const user = {
    email: 'taaniel@gmail.com',
    password: 'taaniel'
};

let token: string;
let courseID: number;

describe('Courses controller', () => {
    describe('GET /courses', () => {
        // getting all courses without logging in
        it('responds with an error message and status 401 because no token provided', async () => {
            const response = await request(app)
                .get('/courses');
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(401);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('No token provided');
        });
        // getting all courses with invalid token
        it('responds with an error message and status 401 because invalid token', async () => {
            const response = await request(app)
                .get('/courses')
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
        // getting all courses while logged in
        it('responds with code 200 and an array of courses', async () => {
            const response = await request(app)
                .get('/courses')
                .set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('courses');
            expect(response.body.courses).to.be.a('array');
            expect(response.body.courses.length).to.be.greaterThan(0);
        });
        // getting course by id while logged in
        it('responds with code 200 and a course by id', async () => {
            const response = await request(app)
                .get('/courses/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('course');
            expect(response.body.course).to.be.a('object');
        });
        // getting a course but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .get('/courses/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
        // getting a course but course doesn't exist
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .get('/courses/999999')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No course found with id: 999999');
        });
    });
    describe('POST /courses', () => {
        // posting a new course without a name
        it('responds with code 400 and error message because of missing name', async () => {
            const response = await request(app)
                .post('/courses')
                .set('Authorization', `Bearer ${token}`)
                .send({name: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('e');
            expect(response.body.e).to.be.a('object');
            expect(response.body.e.message).to.equal('name is a required field');
        });
        // posting a new course with a name and receiving ID
        it('responds with code 201 and ID of a new course', async () => {
            const response = await request(app)
                .post('/courses')
                .set('Authorization', `Bearer ${token}`)
                .send({name: "asd"});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(201);
            expect(response.body).to.have.key('id');
            expect(response.body.id).to.be.a('number');
            courseID = response.body.id;            
        });
    });
    describe('PATCH /courses/:id', () => {
        // updating a course but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .patch('/courses/999999')
                .set('Authorization', `Bearer ${token}`)
                .send({name: "patchpatch"});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No course found with id: 999999');
        });
        // updating a course with exising id
        it('responds with code 204 and empty object', async () => {
            const response = await request(app)
                .patch(`/courses/${courseID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({name: "patchpatch"});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(200);
        });
        // updating a course but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .patch('/courses/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
            // updating a course without a name
        it('responds with code 400 and error message because name is missing', async () => {
            const response = await request(app)
                .patch(`/courses/${courseID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({name: ""});
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Nothing to update');
        });
    });
    describe('DELETE /courses/:id', () => {
        // delete a course with exising id
        it('responds with code 204 and empty object', async () => {
            const response = await request(app)
                .delete(`/courses/${courseID}`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;
            expect(response.status).to.equal(204);
        });
        // deleting a course but id is invalid
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .delete('/courses/9999999')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.a('string');
            expect(response.body.message).to.equal('Course not found with id: 9999999');
        });
        it('responds with code 400 and error message because of no valid id', async () => {
            const response = await request(app)
                .delete('/courses/0')
                .set('Authorization', `Bearer ${token}`)
            expect(response.body).to.be.a('object');
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid id provided');
        });
    });
});

