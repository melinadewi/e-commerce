const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const app = require('../app')
let id
let notfoundId
let token
let unauthorizedToken
chai.should()

const testProduct = {
    name: 'A412FN',
    description: `laptop`,
    price: 14200000,
    stock: 5
}
const { name, description, price, stock } = testProduct

describe('Login admin', function(){
    it('Admin login', function(done){
        chai.request(app)
            .post('/user/login')
            .send({ 
                email: 'admin@mail.com',
                password: 'adminSuper'
            })
            .then(res=>{
                token = res.body.token
                done()
            })
            .catch(err=>{
                console.log(err)
            })
    })
})
describe('Login user', function(){
    it('User login', function(done){
        chai.request(app)
            .post('/user/login')
            .send({ 
                email: 'mail1@mail.com',
                password: '123456'
            })
            .then(res=>{
                unauthorizedToken = res.body.token
                done()
            })
            .catch(err=>{
                console.log(err)
            })
    })
})

describe('Product CRUD', function() {
    this.timeout(5000)
    describe('POST /product', function() {
        describe('POST /product success', function(){
            it('should send an object with 201 status code', function(done){
                chai.request(app)
                    .post('/product')
                    .set('token', token)
                    .send(testProduct)
                    .then(function(res){
                        res.status.should.equal(201)
                        res.body.should.be.an('object')
                        res.body.should.have.property('_id')
                        id = res.body._id
                        notfoundId = 'aaaa' + res.body._id.slice(4)
                        res.body.should.have.property('name')
                        res.body.name.should.be.a('string')
                        res.body.name.should.equal(name)
                        res.body.should.have.property('description')
                        res.body.description.should.be.a('string')
                        res.body.description.should.equal(description)
                        res.body.should.have.property('price')
                        res.body.price.should.be.a('number')
                        res.body.price.should.equal(price)
                        res.body.should.have.property('stock')
                        res.body.stock.should.be.a('number')
                        res.body.stock.should.equal(stock)
                        done()
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            })
        })
        describe('POST /product error', function(){
            describe('POST /product without name', function() {
                it('should throw an error when name is missing', function(done){
                    chai.request(app)
                        .post('/product')
                        .set('token', token)
                        .send({ 
                            description,
                            price,
                            stock
                        })
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('Product validation failed: name: Product must have name')
                            done()
                        })                    
                        .catch(function(err) {
                            console.log(err);
                        });
                })
            })
            describe('POST /product without description', function() {
                it('should throw an error when description is missing', function(done){
                    chai.request(app)
                        .post('/product')
                        .set('token', token)
                        .send({ 
                            name: name + '1',
                            price,
                            stock
                        })
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('Product validation failed: description: Product must have description')
                            done()
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                })
            })
            describe('POST /product without price', function() {
                it('should throw an error when price is missing', function(done){
                    chai.request(app)
                        .post('/product')
                        .set('token', token)
                        .send({ 
                            name: name+'1',
                            description,
                            stock
                        })
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('Product validation failed: price: Product must have price')
                            done()
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                })
            })
            describe('POST /product without stock', function() {
                it('should throw an error when stock is missing', function(done){
                    chai.request(app)
                        .post('/product')
                        .set('token', token)
                        .send({ name: name + '1',
                                description,
                                price})
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(400)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('Product validation failed: stock: Product must have stock')
                            done()
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                })
            })
            describe('POST /product not by authorized user', function() {
                it('should throw an error of unauthorized user', function(done){
                    chai.request(app)
                        .post('/product')
                        .send({ name: name + '1',
                                description,
                                price,
                                stock})
                        .set('token', unauthorizedToken)
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(401)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('User not authorized')
                            done()
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                })
            })
        })
    })

    describe('GET /product', function() {
        it('should send an array of object(s) with 200 status code', function(done){
            chai.request(app)
                .get('/product')
                .then(function(res){
                    res.body.should.be.an('array')
                    res.body[res.body.length - 1].should.have.property('_id')
                    res.body[res.body.length - 1]._id.should.equal(id)
                    res.body[res.body.length - 1].should.have.property('name')
                    res.body[res.body.length - 1].name.should.be.a('string')
                    res.body[res.body.length - 1].name.should.equal(name)
                    res.body[res.body.length - 1].should.have.property('description')
                    res.body[res.body.length - 1].description.should.be.a('string')
                    res.body[res.body.length - 1].description.should.equal(description)
                    res.body[res.body.length - 1].should.have.property('price')
                    res.body[res.body.length - 1].price.should.be.a('number')
                    res.body[res.body.length - 1].price.should.equal(price)
                    res.body[res.body.length - 1].should.have.property('stock')
                    res.body[res.body.length - 1].stock.should.be.a('number')
                    res.body[res.body.length - 1].stock.should.equal(stock)
                    done()
                })
                .catch(function(err) {
                    console.log(err);
                });
        })
    })

    describe('GET /product/:productId', function() {
        describe('GET /product/:productId success', function() {
            it('should send an object with 200 status code', function(done){
                chai.request(app)
                    .get(`/product/${id}`)
                    .then(function(res){
                        res.body.should.be.an('object')
                        res.body.should.have.property('_id')
                        res.body._id.should.equal(id)
                        res.body.should.have.property('name')
                        res.body.name.should.be.a('string')
                        res.body.name.should.equal(name)
                        res.body.should.have.property('description')
                        res.body.description.should.be.a('string')
                        res.body.description.should.equal(description)
                        res.body.should.have.property('price')
                        res.body.price.should.be.a('number')
                        res.body.price.should.equal(price)
                        res.body.should.have.property('stock')
                        res.body.stock.should.be.a('number')
                        res.body.stock.should.equal(stock)
                        done()
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            })
        })
        describe('GET /product/:productId error', function() {
            it('should throw an error when product id is not in the list', function(done){
                chai.request(app)
                    .get(`/product/${notfoundId}`)
                    .then(function(err) {
                        err.should.have.property('status')
                        err.status.should.be.a('number')
                        err.status.should.equal(404)
                        err.body.should.have.property('message')
                        err.body.message.should.be.a('string')
                        err.body.message.should.equal('Product not found')
                        done()
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            })
        })
    })
    
    describe('PATCH /product/:productId', function() {
        describe('PATCH /product/:productId success', function() {
            it('should update an object with 200 status code', function(done){
                chai.request(app)
                    .patch(`/product/${id}`)
                    .set('token', token)
                    .send({ description: `laptop baru`,
                            price: 1000})
                    .then(function(res){
                        res.body.should.be.an('object')
                        res.body.should.have.property('n')
                        res.body.n.should.be.a('number')
                        res.body.n.should.equal(1)
                        res.body.should.have.property('nModified')
                        res.body.nModified.should.be.a('number')
                        res.body.nModified.should.equal(1)
                        res.body.should.have.property('ok')
                        res.body.ok.should.be.a('number')
                        res.body.ok.should.equal(1)
                        done()
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            })
        })
        describe('PATCH /product/:productId error', function() {
            describe('PATCH /product/:productId not found', function() {
                it('should throw an error when product id is not in the list', function(done){
                    chai.request(app)
                        .patch(`/product/${notfoundId}`)
                        .set('token', token)
                        .send({ description: `laptop aja`,
                                price: 1000})
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(404)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('Product not found')
                            done()
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                })
            })
            describe('PATCH /product not by authorized user', function() {
                it('should throw an error of unauthorized user', function(done){
                    chai.request(app)
                        .patch(`/product/1`)
                        .set('token', unauthorizedToken)
                        .send({ description: `laptop aja`,
                                price: 1000})
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(401)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('User not authorized')
                            done()
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                })
            })
        })
    })

    describe('DELETE /product/:productId', function() {
        describe('DELETE /product/:productId success', function() {
            it('should delete an object with 200 status code', function(done){
                chai.request(app)
                    .delete(`/product/${id}`)
                    .set('token', token)
                    .then(function(res){
                        done()
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            })
        })
        describe('DELETE /product/:productId error', function() {
            describe('DELETE /product/:productId not found', function() {
                it('should throw an error when product id is not in the list', function(done){
                    chai.request(app)
                        .delete(`/product/${id}`)
                        .set('token', token)
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(404)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('Product not found')
                            done()
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                })
            })
            describe('DELETE /product/:productId not by authorized user', function() {
                it('should throw an error of unauthorized user', function(done){
                    chai.request(app)
                        .delete(`/product/${id}`)
                        .set('token', unauthorizedToken)
                        .then(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(401)
                            err.body.should.have.property('message')
                            err.body.message.should.be.a('string')
                            err.body.message.should.equal('User not authorized')
                            done()
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                })
            })
        })
    })
})