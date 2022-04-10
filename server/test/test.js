var chai = require('chai')
let chaiHttp = require('chai-http')
let index = require("../index")
const user = require("../database/models/register")
const assert = require('assert')
const { v4: uuidv4 } = require('uuid')

chai.should();
chai.use(chaiHttp);

describe('Task user log in', () => {
    describe("POST /login", () => {
        it("should log in if credential is correct.", (done) => {
            chai.request(index)
                .post('/login')
                .set('Accept', 'application/json')
                .send({ "user_email": "rimi1@test.com", "password": "123456" })
                .end((err, res) => {
                    res.should.have.status(200)
                    done();
                })
        })

        it("should not log in if credential is incorrect.", (done) => {
            chai.request(index)
                .post('/login')
                .set('Accept', 'application/json')
                .send({ "user_email": "rimi1@gmail.com", "password": "1234576" })
                .end((err, res) => {
                    res.should.have.status(400)
                    done();
                })
        })

        it("should give message if email is wrong.", (done) => {
            chai.request(index)
                .post('/login')
                .set('Accept', 'application/json')
                .send({ "user_email": "rimi1@gmail.com", "password": "123456" })
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('message').eql("User email doesn't exist")
                    done();
                })
        })

        it("should give message if password is wrong.", (done) => {
            chai.request(index)
                .post('/login')
                .set('Accept', 'application/json')
                .send({ "user_email": "test2@gmail.com", "password": "1234567" })
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('message').eql("Please enter the correct password")
                    done();
                })
        })
    })
})

describe('Task user register', () => {
    describe("POST /register", () => {
        it("should register if credential is correct.", (done) => {
            const user_name = uuidv4().replace(/-/g, '')
            const body = {
                "user_name": user_name,
                "user_email": `${user_name}@gmail.com`,
                "password": "123456"
            }
            chai.request(index)
                .post('/register')
                .set('Accept', 'application/json')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('message').eql('Registered Successfully')
                    done();
                })
        })


        it("should not register if email already exists.", (done) => {
            const body = {
                "user_name": "Samina",
                "user_email": "rimi1@test.com",
                "password": "123456"
            }
            chai.request(index)
                .post('/register')
                .set('Accept', 'application/json')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('message').eql("User email already exists.")
                    done();
                })
        })
    })
})


describe('Creating documents in MongoDB', () => {
    it('Creates a new user', (done) => {
        const user_name = uuidv4().replace(/-/g, '')
        const newUser = new user({
            "user_name": user_name,
            "user_email": `${user_name}@gmail.com`,
            "password": "123456"
        })
        newUser.save() //returns a promise after some time
            .then(() => {
                //if the newUser is saved in db and it is not new 
                assert(!newUser.isNew);
                done();
            })
    })
})