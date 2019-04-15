require('module-alias/register')

const User = require('./user.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('@root/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Auth-service integration test', () => {

  afterEach((done) => {
    User.deleteMany({}, (err) => { 
      done();
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST signup', () => {
    it('Should signup with valid fields', (done) => {
      let user = {
        username: "username",
        password: "password",
        email: "username@email.com",
        userType: "student",
        firstname: "firstname",
        lastname: "lastname",
        phoneNumber: "0801234567"
      };
      chai.request(server)
      .post('/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('user');
        done();
      });
    });
    it('Should not signup with invalid fields', (done) => {
      let user = {
        username: "username",
        password: "password",
        email: "username@email.com",
        userType: "student",
        firstname: "firstname",
        lastname: "lastname",
        // Phone number is blank
      };
      chai.request(server)
      .post('/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
  });

  describe('/POST signin', () => {
    it('Should signin with exists ID and corrected password', (done) => {
      let user = {
        username: 'usernamex123',
        password: 'password',
        email: 'username@email.com',
        userType: 'student',
        firstname: 'firstname',
        lastname: 'lastname',
        phoneNumber: '0801234567'
      };
      let loginInfo = {
        username: 'usernamex123',
        password: 'password'
      };
      chai.request(server).post('/signup').send(user).then(() => {
        chai.request(server)
        .post('/signin')
        .send(loginInfo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('payload');
          res.body.payload.should.have.property('username').eql('usernamex123');
          res.body.should.have.property('token');
          done();
        });
      });
    });
    it('Should not signin with non-exists ID or incorrected password', (done) => {
      // Login with non-exists ID
      let loginInfo = {
        username: 'usernamex123',
        password: 'password'
      };
      chai.request(server)
      .post('/signin')
      .send(loginInfo)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
  });
});