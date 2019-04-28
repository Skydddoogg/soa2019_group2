require('module-alias/register')

const Review = require('./review.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('@root/server');
const jwt = require('jsonwebtoken');
const should = chai.should();
const SECRET = process.env.SECRET_KEY;
const JWT_EXPIRATION_MS = 60*1000;

const TUTOR_PAYLOAD = {
  'userId': '5cb440108941028067e414bd',
  'username': 'tutor1234',
  'userType': 'tutor',
  'expires': Date.now() + parseInt(JWT_EXPIRATION_MS)
};

const STUDENT_PAYLOAD = {
  'userId': '5cb440108941028067e414be',
  'username': 'student1234',
  'userType': 'student',
  'expires': Date.now() + parseInt(JWT_EXPIRATION_MS)
};

chai.use(chaiHttp);

describe('Review-service integration test', () => {

  afterEach((done) => {
    Review.deleteMany({}, (err) => { 
      done();
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST create review by student', () => {
    it('Should not POST a review with invalid fields', (done) => {
      // POST with tutor account
      let review = {
        targetId: '5cb440108941028067e414ff',
        targetUsername: 'nishino',
        targetType: 'tutor',
        message: 'very good and cute tutor ever',
        profileImg: 'imageurl.com'
      };
      let token = jwt.sign(JSON.stringify(TUTOR_PAYLOAD), SECRET);
      chai.request(server)
      .post('/create')
      .set('Authorization', 'Bearer ' + token)
      .send(review)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Forbidden');
        done();
      });
    });
    it('Should POST a review with valid fields', (done) => {
      let review = {
        targetId: '5cb440108941028067e414ff',
        targetUsername: 'nishino',
        targetType: 'tutor',
        message: 'very good and cute tutor ever',
        profileImg: 'imageurl.com'
      };
      let token = jwt.sign(JSON.stringify(STUDENT_PAYLOAD), SECRET);
      chai.request(server)
      .post('/create')
      .set('Authorization', 'Bearer ' + token)
      .send(review)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('review');
        done();
      });
    });
  });

  /*
  * Test the /GET route
  */
  describe('/GET a list of review by specific target ID', () => {
    it('Should GET a list of review with exists target ID', (done) => {
      chai.request(server)
      .get('/reviews/5cb440108941028067e414ff')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.should.have.length(0);
        done();
      });
    });
    it('Should GET a list of review with exists target ID', (done) => {
      let review1 = new Review({
        ownerId: '5cb440108941028067e414be',
        ownerUsername: 'test1234',
        ownerType: 'student',
        targetId: '5cb440108941028067e414ff',
        targetUsername: 'nishino',
        targetType: 'tutor',
        message: 'very good and cute tutor ever',
        profileImg: 'imageurl.com'
      });
      let review2 = new Review({
        ownerId: '5cb440108941028067e414bf',
        ownerUsername: 'test12345',
        ownerType: 'student',
        targetId: '5cb440108941028067e414ff',
        targetUsername: 'nishino',
        targetType: 'tutor',
        message: 'Notice me senpai',
        profileImg: 'imageurl2.com'
      });
      Promise.all([review1.save(), review2.save()])
      .then( () => {
        chai.request(server)
        .get('/reviews/5cb440108941028067e414ff')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(2);
          done();
        });
      });
    });
  });


});