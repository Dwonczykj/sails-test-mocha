// test/integration/controllers/UserController.test.js
var request = require('supertest');

describe('UserController.login', function () {

    describe('#login()', function () {
        it('/api/v1/entrance/login should redirect to /welcome', function (done) {
            request(sails.hooks.http.app)
                .put('/api/v1/entrance/login')
                .send({ emailAddress: 'admin@example.com', password: 'abc123', rememberMe: false })
                .expect(302)
                .expect('location', '/welcome', done);
        });
    });

});

describe('Signup GET', function () {

    describe('#SignUp View', function () {
        it('/signup should return 200', function (done) {
            request(sails.hooks.http.app)
                .get('/signup')
                .expect(200, done);
        });
    });

    describe('#SignUp POST', function () {
        it('can POST to /signup and register Joey D', function (done) {
            request(sails.hooks.http.app)
                .post('/api/v1/entrance/signup')
                .send({ emailAddress: 'joeyd@example.com', password: 'abc123', fullName: 'Joey D' })
                .expect(200, done);
        });
    });

});

const assert = require('assert');
const express = require('express');

const app = express();

app.get('/user', function (req, res) {
    res.status(200).json({ name: 'john' });
});

request(app)
    .get('/user')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '15')
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
    });

describe('GET /user', function () {
    it('responds with json', function (done) {
        request(app)
            .get('/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /user', function () {
    it('responds with json', function (done) {
        request(app)
            .get('/user')
            .auth('username', 'password')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});