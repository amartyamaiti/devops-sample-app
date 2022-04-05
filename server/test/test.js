var chai = require('chai')
let chaiHttp = require('chai-http')
let index = require("../index")

chai.should();
chai.use(chaiHttp);

describe('Task user logging', ()=>{
    describe("POST/login",()=>{
        it("should log in if credential is correct.",(done) =>{
            chai.request(index)
            .post('/login')
            .set('Accept','application/json')
            .send({"user_name":"Samina","user_email":"rimi1@test.com","password":"123456"})
            .end((err,res)=>{
                res.should.have.status(200)
                done();
            }) 
        })
    })
})