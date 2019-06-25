const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const app = require('../app')
chai.should()

const newUser = {
    username: 'user4',
    email: 'mail4@mail.com',
    password: '123456'
}

describe('Register, Login, and Logout User', function(){
    this.timeout(10000)
    describe('POST /user/register', function(){
        describe('POST /user/register success', function(){
            it('should send an object with 201 status code', function(done){
                chai.request(app)
                    .post('/user/register')
                    .send(newUser)
                    .then((res)=>{
                        res.status.should.equal(201)
                        res.body.should.be.an('object')
                        res.body.should.have.property('_id')
                        res.body.should.have.property('username')
                        res.body.username.should.be.a('string')
                        res.body.username.should.equal(newUser.username)
                        res.body.should.have.property('email')
                        res.body.email.should.be.a('string')
                        res.body.email.should.equal(newUser.email)
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
                        .send({ email: 'fortestpurpose@mail.com',
                                password: newUser.password,
                        })
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')                            
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('User validation failed: username: User must input username')
                            done()
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                })
            })            
            describe('POST /user/register with empty email', function(){
                it('should throw an error when email is missing', function(done){
                    chai.request(app)
                        .post('/user/register')
                        .send({ username: newUser.username,
                                password: newUser.password,
                        })
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('User validation failed: email: Email is required!')
                            done()
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                })
            })
            describe('POST /user/register with registered email', function(){
                it('should throw an error when email is already registered', function(done){
                    chai.request(app)
                        .post('/user/register')
                        .send({ username: newUser.username,
                                email: newUser.email,
                                password: newUser.password,
                        })
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('User validation failed: email: Email has been registered!')
                            done()
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                })
            })
            describe('POST /user/register with invalid email format', function(){
                it('should throw an error when email is invalid', function(done){
                    chai.request(app)
                        .post('/user/register')
                        .send({ username: newUser.username,
                                email: 'mail1@',
                                password: newUser.password,
                        })
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('User validation failed: email: Email not valid!')
                            done()
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                })
            })            
            describe('POST /user/register with empty password', function(){
                it('should throw an error when password is missing', function(done){
                    chai.request(app)
                        .post('/user/register')
                        .send({ username: newUser.username,
                                email: 'fortestpurpose@mail.com',
                        })
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('User validation failed: password: Password is required')
                            done()
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                })
            })
            describe('POST /user/register with password less than 6 characters', function(){
                it('should throw an error when password length is less than 6 characters', function(done){
                    chai.request(app)
                        .post('/user/register')
                        .send({ username: newUser.username,
                                email: 'fortestpurpose@mail.com',
                                password: '1',
                        })
                        // .then((res)=>{})
                        .then(err=>{
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('User validation failed: password: Password minimum 6 characters!')
                            done()
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                })
            })
        })        
    })

    describe('POST /user/login', function(){
        describe('POST /user/login success', function(){
            it('should send an object with 200 status code', function(done){
                chai.request(app)
                    .post('/user/login')
                    .send({ email: newUser.email,
                            password: newUser.password,
                    })
                    .then((res)=>{
                        res.should.be.an('object')
                        res.status.should.equal(200)
                        res.body.should.have.property('token')
                        res.body.should.have.property('username')
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
                        .send({ password: newUser.password })
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('Email/Password invalid!')
                            done()
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                })
            })
            describe('POST /user/login password invalid', function(){
                it('should throw an error when password is missing or invalid', function(done){
                    chai.request(app)
                        .post('/user/login')
                        .send({ email: newUser.email,
                                password: '123',
                        })
                        // .then(function(res){})
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('Email/Password invalid!')
                            done()
                        })
                        .catch(err=>{
                            console.log("ERROR")
                        })
                })
            })
        })
    })
})