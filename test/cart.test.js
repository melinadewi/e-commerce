const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const app = require('../app')
let id
let token
const should = chai.should()


describe('Login user', function(){
    it('User login', function(){
        chai.request(app)
            .post('/user/login')
            .send({ email: '',
                    password: '',
            })
            .then((res)=>{
                token = res.token
            })
            .catch(err=>{
                console.log(err)
            })
    })
})

describe('Cart CRUD', function() {
    describe('POST /cart new cart', function() {
        describe('POST /cart success', function(){
            it('should send an object with 201 status code', function(done){
                chai.request(app)
                    .post('/cart')
                    .set('token', token)
                    .send({ item: 'laptop' })
                    .then(function(res){
                        res.status.should.equal(201)
                        res.body.should.be.an('object')
                        res.body.should.have.property('_id')
                        id = res.body._id
                        res.body.should.have.property('user')
                        res.body.user.should.be.a('string')
                        res.body.should.have.property('items')
                        res.body.items.should.be.an('array')
                        res.body.items.length.should.equal(1)
                        done()
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            })
        })
        describe('POST /cart error', function(){
            describe('POST /cart not by authorized user', function() {
                it('should throw an error of unauthorized user', function(done){
                    chai.request(app)
                        .post('/cart')
                        .send({ item: 'laptop' })
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(401)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('User not logged in')
                            done()
                        });
                })
            })
        })
    })

    describe('GET /cart', function() {
        it('should send an array of object(s) with 200 status code', function(done){
            chai.request(app)
                .get('/cart')
                .set('token', token)
                .then(function(res){
                    res.body.should.be.an('array')
                    done()
                })
                .catch(function(err) {
                    console.log(err);
                });
        })
        describe('GET /cart error', function() {
            describe('GET /cart not by authorized user', function() {
                it('should throw an error of unauthorized user', function(done){
                    chai.request(app)
                        .get('/cart')
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(401)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('User not logged in')
                            done()
                        });
                })
            })
        })
    })
    
    describe('PATCH /cart', function() {
        describe('PATCH /cart success', function() {
            it('should update an object with 200 status code', function(done){
                chai.request(app)
                    .patch(`/cart`)
                    .set('token', token)
                    .send({ status: true })
                    .then(function(res){
                        res.body.should.be.an('array')
                        done()
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            })
        })
        describe('PATCH /cart error', function() {
            describe('PATCH /cart not by authorized user', function() {
                it('should throw an error of unauthorized user', function(done){
                    chai.request(app)
                        .patch('/cart')
                        .send({ items: [] })
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(401)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('Cart not found')
                            done()
                        });
                })
            })
        })
    })
})