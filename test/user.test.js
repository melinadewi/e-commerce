const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const app = require('../app')
const should = chai.should()

describe('Register, Login, and Logout User', function(){
    describe('POST /user/register', function(){
        describe('POST /user/register success', function(){
            it('should send an object with 201 status code', function(done){
                chai.request(app)
                    .post('/user/register')
                    .send({ username: 'user1',
                            email: 'mail1@mail.com',
                            password: '123456',
                    })
                    .then((res)=>{
                        // localStorage.setItem('token', res.token)
                        res.status.should.equal(201)
                        res.body.should.be.an('object')
                        res.body.should.have.property('_id')
                        res.body.should.have.property('username')
                        res.body.username.should.be.a('string')
                        res.body.username.should.equal('')
                        res.body.should.have.property('email')
                        res.body.email.should.be.a('string')
                        res.body.email.should.equal('')
                        res.body.should.have.property('password')
                        res.body.password.should.be.a('string')
                        done()
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            })
        })

        describe('POST /user/register error', function(){
            describe('POST /user/register with empty username', function(){
                it('should throw an error when name is missing', function(done){
                    chai.request(app)
                        .post('/user/register')
                        .send({ email: 'mail1@mail.com',
                                password: '123456',
                        })
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('User mush input username')
                            done()
                        });
                })
            })            
            describe('POST /user/register with empty email', function(){
                it('should throw an error when email is missing', function(done){
                    chai.request(app)
                        .post('/user/register')
                        .send({ username: 'user1',
                                password: '123456',
                        })
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('Email may not left empty')
                            done()
                        });
                })
            })
            describe('POST /user/register with registered email', function(){
                it('should throw an error when email is already registered', function(done){
                    chai.request(app)
                        .post('/user/register')
                        .send({ username: 'user1',
                                email: 'mail1@mail.com',
                                password: '123456',
                        })
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('Email already registered')
                            done()
                        });
                })
            })
            describe('POST /user/register with invalid email format', function(){
                it('should throw an error when email is invalid', function(done){
                    chai.request(app)
                        .post('/user/register')
                        .send({ username: 'user1',
                                email: 'mail1@',
                                password: '123456',
                        })
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('Invalid email format')
                            done()
                        });
                })
            })            
            describe('POST /user/register with empty password', function(){
                it('should throw an error when password is missing', function(done){
                    chai.request(app)
                        .post('/user/register')
                        .send({ username: 'user1',
                                email: 'mail1@mail.com',
                        })
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('Password may not left empty')
                            done()
                        });
                })
            })
            describe('POST /user/register with password less than 6 characters', function(){
                it('should throw an error when password length is less than 6 characters', function(){
                    chai.request(app)
                        .post('/user/register')
                        .send({ username: 'user1',
                                email: 'mail1@mail.com',
                                password: '1',
                        })
                        .then((res)=>{})
                        .catch(err=>{
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('Password minimum 6 characters')
                            done()
                        })
                })
            })
        })
    })

    describe('POST /user/login', function(){
        describe('POST /user/login success', function(){
            it('should send an object with 200 status code', function(){
                chai.request(app)
                    .post('/user/login')
                    .send({ email: 'mail1@mail.com',
                            password: '123456',
                    })
                    .then((res)=>{
                        res.status.should.equal(200)
                        res.decode.should.be.an('object')
                        res.decode.should.have.property('_id')
                        done()
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            })
        })
        describe('POST /user/login error', function(){
            describe('POST /user/login email invalid', function(){
                it('should throw an error when email is missing or invalid', function(done){
                    chai.request(app)
                        .post('/user/login')
                        .send({ password: '123456',
                        })
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('Invalid email / passwird')
                            done()
                        });
                })
            })
            describe('POST /user/login password invalid', function(){
                it('should throw an error when password is missing or invalid', function(done){
                    chai.request(app)
                        .post('/user/login')
                        .send({ email: 'mail1@mail.com',
                                password: '123',
                        })
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('Invalid email / passwird')
                            done()
                        });
                })
            })
        })
    })
})