require('module-alias/register')

const OfferInbox = require('./inbox.model');
const Offer = require('../offer/offer.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('@root/server');
const jwt = require('jsonwebtoken');
const should = chai.should();
const SECRET = process.env.SECRET_KEY;
const JWT_EXPIRATION_MS = 60*1000;

const STUDENTPAYLOAD = {
  'userId': '5cb440108941028067e414be',
  'username': 'student1234',
  'userType': 'student',
  'expires': Date.now() + parseInt(JWT_EXPIRATION_MS)
};

const TUTORPAYLOAD = {
  'userId': '5cb440108941028067e414bf',
  'username': 'tutor1234',
  'userType': 'tutor',
  'expires': Date.now() + parseInt(JWT_EXPIRATION_MS)
};

chai.use(chaiHttp);

describe('Offer-service integration test', () => {

  afterEach((done) => {
    OfferInbox.deleteMany({}, (err) => { 
      done();
    });
  });

  /*
  * Test the /GET route
  */
  describe('/GET student inbox by user ID (Student only)', () => {
    it('Should get inbox with exists user ID', (done) => {
      let offerInbox = new OfferInbox({
        _id: '5cb440108941028067e414be'
      });
      let token = jwt.sign(JSON.stringify(STUDENTPAYLOAD), SECRET);
      offerInbox.save((err, offerInbox) => {
        chai.request(server)
        .get('/5cb440108941028067e414be')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('offerInbox');
          done();
        });
      })
    });
    it('Should not get inbox with non-exists user ID', (done) => {
      let token = jwt.sign(JSON.stringify(STUDENTPAYLOAD), SECRET);
      chai.request(server)
      .get('/5cb440108941028067e414be')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Not found');
        done();
      });
    });
  });

  describe('/GET offer in student inbox and mark as readed', () => {
    it('Should get exists offer', (done) => {
      let offerInbox = new OfferInbox({
        _id: '5cb440108941028067e414be',
        offerlist: [{
            postId : '5c99b60908aa5a2eb7c2f196',
            tutorId : '5cb365b5fb61c836316035fe',
            tutorUsername : 'nishino_nanase',
          }]
      });
      let token = jwt.sign(JSON.stringify(STUDENTPAYLOAD), SECRET);
      offerInbox.save((err, offerInbox) => {
        chai.request(server)
        .get('/5cb440108941028067e414be/0')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('offer');
          res.body.offer.should.have.property('mark').eql('readed');
          res.body.offer.should.have.property('tutorUsername').eql('nishino_nanase');
          done();
        });
      });


    });
    it('Should not get non-exists offer', (done) => {
      let offerInbox = new OfferInbox({
        _id: '5cb440108941028067e414be',
      });
      let token = jwt.sign(JSON.stringify(STUDENTPAYLOAD), SECRET);
      offerInbox.save((err, offerInbox) => {
        chai.request(server)
        .get('/5cb440108941028067e414be/99')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Not found');
          done();
        });
      })
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST create offer', () => {
    it('Should not create an offer in non-exists student inbox', (done) => {
      let offer = {
        studentId: '5cb440108941028067e414bf',
        postId: '5c99b60908aa5a2eb7c2f196',
        tutorId: '5cb365b5fb61c836316035ff',
      };
      let token = jwt.sign(JSON.stringify(TUTORPAYLOAD), SECRET);
      chai.request(server)
      .post('/create')
      .set('Authorization', 'Bearer ' + token)
      .send(offer)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Not found');
        done();
      });
    });
    it('Should create an offer in exists student inbox', (done) => {
      let offer = {
        studentId: '5cb440108941028067e414bf',
        postId: '5c99b60908aa5a2eb7c2f196',
        tutorId: '5cb365b5fb61c836316035ff',
      };
      let offerInbox = new OfferInbox({
        _id: '5cb440108941028067e414bf'
      });
      let token = jwt.sign(JSON.stringify(TUTORPAYLOAD), SECRET);
      offerInbox.save((err, offerInbox) => {
        chai.request(server)
        .post('/create')
        .set('Authorization', 'Bearer ' + token)
        .send(offer)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('offer');
          res.body.offer.should.have.property('tutorUsername').eql('tutor1234');
          done();
        });
      });
    });
  });

});