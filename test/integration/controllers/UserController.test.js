// test/integration/controllers/UserController.test.js
var request = require('supertest');
const assert = require('assert');

describe('UserController.login', () => {

    describe('#login()', () => {
        it('/api/v1/entrance/login should redirect to /welcome', function (done) {
            // console.log(sails);
            request(sails.hooks.http.app)
                .get('/csrfToken')
                .set('Accept', 'application/json')
                // .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    this._csrf = response.body._csrf;
                    request(sails.hooks.http.app)
                        .put('/api/v1/entrance/login')
                        // .set('X-CSRF-Token', response.body._csrf)
                        .send({
                            emailAddress: 'admin@example.com',
                            password: 'abc123',
                            rememberMe: false,
                            _csrf: response.body._csrf
                        })
                        .expect(302)
                        .expect('location', '/welcome', done);
                })
                .catch(err => done(err));
        });
    });

});

describe('Signup GET', () => {

    describe('#SignUp View', () => {
        it('/signup should return 200', function (done) {
            request(sails.hooks.http.app)
                .get('/signup')
                .expect(200, done);
        });
    });

    describe('#SignUp POST', () => {
        it('can POST to /signup and register Joey D', function (done) {
            request(sails.hooks.http.app)
                .post('/api/v1/entrance/signup')
                .send({
                    emailAddress: 'joeyd@example.com',
                    password: 'abc123',
                    fullName: 'Joey D',
                    _csrf: this._csrf
                })
                .expect(200, done);
        });
    });

});

const express = require('express');

const app = express();

app.get('/user', (req, res) => {
    res.status(200).json({ name: 'john' });
});

request(app)
    .get('/user')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '15')
    .expect(200)
    .end((err, res) => {
        if (err) throw err;
    });

describe('GET /user', () => {
    it('responds with json', (done) => {
        request(app)
            .get('/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /user', () => {
    it('responds with json', (done) => {
        request(app)
            .get('/user')
            .auth('username', 'password')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});