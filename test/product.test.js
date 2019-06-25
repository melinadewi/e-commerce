const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const app = require('../app')
let id
let token
chai.should()

const testProduct = {
    name: 'S430FN',
    description: `laptop`,
    price: 14200000,
    stock: 5
}

const { clearProduct } = require('../helpers/clearMocha')
after(function(done){
    clearProduct(testProduct, done)
})

describe.only('Login admin', function(){
    it('Admin login', function(done){
        chai.request(app)
            .post('/user/login')
            .send({ 
                email: 'admin@mail.com',
                password: 'adminSuper'
            })
            .then((res)=>{
                token = res.token
                done()
            })
            .catch(err=>{
                console.log(err)
            })
    })
})

describe('Product CRUD', function() {
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
                        res.body.should.have.property('name')
                        res.body.name.should.be.a('string')
                        res.body.name.should.equal('S430FN')
                        res.body.should.have.property('description')
                        res.body.description.should.be.a('string')
                        res.body.description.should.equal('laptop')
                        res.body.should.have.property('price')
                        res.body.price.should.be.a('number')
                        res.body.price.should.equal(14200000)
                        res.body.should.have.property('stock')
                        res.body.stock.should.be.a('number')
                        res.body.stock.should.equal(5)
                        done()
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            })
        })
    })
    describe('POST /product error', function(){
        describe('POST /product without name', function() {
            it('should throw an error when name is missing', function(done){
                chai.request(app)
                    .post('/product')
                    .set('token', token)
                    .send({ description: `laptop`,
                            price: 14200000,
                            stock: 5})
                    .then(function(res){})
                    .catch(function(err) {
                        err.should.have.property('status')
                        err.status.should.be.a('number')
                        err.status.should.equal(400)
                        err.should.have.property('message')
                        err.message.should.be.a('string')
                        err.message.should.equal('Product must have name')
                        done()
                    });
            })
        })
        describe('POST /product without description', function() {
            it('should throw an error when description is missing', function(done){
                chai.request(app)
                    .post('/product')
                    .set('token', token)
                    .send({ name: 'S430FN',
                            price: 14200000,
                            stock: 5})
                    .then(function(res){})
                    .catch(function(err) {
                        err.should.have.property('status')
                        err.status.should.be.a('number')
                        err.status.should.equal(400)
                        err.should.have.property('message')
                        err.message.should.be.a('string')
                        err.message.should.equal('Product must have description')
                        done()
                    });
            })
        })
        describe('POST /product without price', function() {
            it('should throw an error when price is missing', function(done){
                chai.request(app)
                    .post('/product')
                    .set('token', token)
                    .send({ name: 'S430FN',
                            description: `laptop`,
                            stock: 5})
                    .then(function(res){})
                    .catch(function(err) {
                        err.should.have.property('status')
                        err.status.should.be.a('number')
                        err.status.should.equal(400)
                        err.should.have.property('message')
                        err.message.should.be.a('string')
                        err.message.should.equal('Product must have price')
                        done()
                    });
            })
        })
        describe('POST /product without stock', function() {
            it('should throw an error when stock is missing', function(done){
                chai.request(app)
                    .post('/product')
                    .set('token', token)
                    .send({ name: 'S430FN',
                            description: `laptop`,
                            price: 14200000})
                    .then(function(res){})
                    .catch(function(err) {
                        err.should.have.property('status')
                        err.status.should.be.a('number')
                        err.status.should.equal(400)
                        err.should.have.property('message')
                        err.message.should.be.a('string')
                        err.message.should.equal('Product must have stock')
                        done()
                    });
            })
        })
        describe('POST /product not by authorized user', function() {
            it('should throw an error of unauthorized user', function(done){
                chai.request(app)
                    .post('/product')
                    .send({ name: 'S430FN',
                            description: `laptop`,
                            price: 14200000,
                            stock: 5})
                    .then(function(res){})
                    .catch(function(err) {
                        err.should.have.property('status')
                        err.status.should.be.a('number')
                        err.status.should.equal(401)
                        err.should.have.property('message')
                        err.message.should.be.a('string')
                        err.message.should.equal('User not authorized')
                        done()
                    });
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
                    res.body[res.body.length - 1].name.should.equal('S430FN')
                    res.body[res.body.length - 1].should.have.property('description')
                    res.body[res.body.length - 1].description.should.be.a('string')
                    res.body[res.body.length - 1].description.should.equal('laptop')
                    res.body[res.body.length - 1].should.have.property('price')
                    res.body[res.body.length - 1].price.should.be.a('number')
                    res.body[res.body.length - 1].price.should.equal(14200000)
                    res.body[res.body.length - 1].should.have.property('stock')
                    res.body[res.body.length - 1].stock.should.be.a('number')
                    res.body[res.body.length - 1].stock.should.equal(5)
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
                        res.body.name.should.equal('S430FN')
                        res.body.should.have.property('description')
                        res.body.description.should.be.a('string')
                        res.body.description.should.equal('laptop')
                        res.body.should.have.property('price')
                        res.body.price.should.be.a('number')
                        res.body.price.should.equal(14200000)
                        res.body.should.have.property('stock')
                        res.body.stock.should.be.a('number')
                        res.body.stock.should.equal(5)
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
                    .get(`/product/1`)
                    .then(function(res){})
                    .catch(function(err) {
                        err.should.have.property('status')
                        err.status.should.be.a('number')
                        err.status.should.equal(404)
                        err.should.have.property('message')
                        err.message.should.be.a('string')
                        err.message.should.equal('Product not found')
                        done()
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
                        res.body.should.have.property('_id')
                        res.body._id.should.equal(id)
                        res.body.should.have.property('name')
                        res.body.name.should.be.a('string')
                        res.body.name.should.equal('S430FN')
                        res.body.should.have.property('description')
                        res.body.description.should.be.a('string')
                        res.body.description.should.equal('laptop baru')
                        res.body.should.have.property('price')
                        res.body.price.should.be.a('number')
                        res.body.price.should.equal(1000)
                        res.body.should.have.property('stock')
                        res.body.stock.should.be.a('number')
                        res.body.stock.should.equal(5)
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
                        .patch(`/product/1`)
                        .set('token', token)
                        .send({ description: `laptop baru`,
                                price: 1000})
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(404)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('Product not found')
                            done()
                        });
                })
            })
            describe('PATCH /product not by authorized user', function() {
                it('should throw an error of unauthorized user', function(done){
                    chai.request(app)
                        .patch(`/product/1`)
                        .send({ description: `laptop baru`,
                                price: 1000})
                        .then(function(res){})
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(401)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('User not authorized')
                            done()
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
                        .then(function(res){
                            done()
                        })
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(404)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('Product not found')
                            done()
                        });
                })
            })
            describe('DELETE /product/:productId not by authorized user', function() {
                it('should throw an error of unauthorized user', function(done){
                    localStorage.removeItem('token')
                    chai.request(app)
                        .delete(`/product/${id}`)
                        .then(function(res){
                            done()
                        })
                        .catch(function(err) {
                            err.should.have.property('status')
                            err.status.should.be.a('number')
                            err.status.should.equal(401)
                            err.should.have.property('message')
                            err.message.should.be.a('string')
                            err.message.should.equal('User not authorized')
                            localStorage.setItem('token', token)
                            done()
                        });
                })
            })
        })
    })
})