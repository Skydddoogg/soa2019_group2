require('module-alias/register')

const OfferInbox = require('./inbox.model');
const Offer = require('../offer/offer.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('@root/server');
const should = chai.should();

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
      offerInbox.save((err, offerInbox) => {
        chai.request(server)
        .get('/5cb440108941028067e414be')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('offerInbox');
          done();
        });
      })
    });
    it('Should not get inbox with non-exists user ID', (done) => {
      chai.request(server)
      .get('/5cb440108941028067e414be')
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
      offerInbox.save((err, offerInbox) => {
        chai.request(server)
        .get('/5cb440108941028067e414be/0')
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
      offerInbox.save((err, offerInbox) => {
        chai.request(server)
        .get('/5cb440108941028067e414be/99')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
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
        tutorUsername: 'paruru'
      };
      chai.request(server)
      .post('/create')
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
        tutorUsername: 'paruru'
      };
      let offerInbox = new OfferInbox({
        _id: '5cb440108941028067e414bf'
      });
      offerInbox.save((err, offerInbox) => {
        chai.request(server)
        .post('/create')
        .send(offer)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('offer');
          res.body.offer.should.have.property('tutorUsername').eql('paruru');
          done();
        });
      });
    });
  });

});