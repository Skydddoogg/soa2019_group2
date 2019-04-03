require('module-alias/register')

const Post = require('./post.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('@root/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Post-service', () => {
  
  beforeEach((done) => {
    Post.deleteMany({}, (err) => { 
      done();
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST post', () => {
    it('Should not POST a post with invalid fields', (done) => {
      let post = {
        // No subject
        level: "upper-secondary",
        startTime: "9:00",
        endTime: "15:00",
        location: "Seacon Square",
        // Incorrect format of expectPrice
        expectPrice: '100xyz',
        detail: "Mock up detail",
        creatorId: "xyz321",
        creatorUsername: "lieselottezz",
        // Incorrect format of creatorType
        creatorType: "studentxyz"
      };
      chai.request(server)
      .post('/api/post/create')
      .send(post)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('err');
        done();
      });
    });
    it('Should POST a post with valid fields', (done) => {
      let post = {
        subject: "science",
        level: "upper-secondary",
        startTime: "9:00",
        endTime: "15:00",
        location: "Seacon Square",
        expectPrice: 1200,
        detail: "Mock up detail",
        creatorId: "xyz321",
        creatorUsername: "ria123",
        creatorType: "student"
      };
      chai.request(server)
      .post('/api/post/create')
      .send(post)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('post');
        done();
      });
    });
  });

  /*
  * Test the /PUT route
  */
  describe('/PUT post', () => {
    it('Should not UPDATE a post given non-exist ID', (done) => {
      let editedPost = {
        subject: "math",
        level: "upper-secondary",
        startTime: "10:00",
        endTime: "17:00",
        location: "Seacon Square",
        expectPrice: 1200,
        detail: "Mock up detail",
        creatorId: "xyz321",
        creatorUsername: "ria123",
        creatorType: "student"
      };
      chai.request(server)
      .put('/api/post/update/nonexist1234')
      .send(editedPost)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Not found');
        done();
      });
    });
    it('Should UPDATE a post given exist ID', (done) => {
      let post = new Post({
        subject: "science",
        level: "upper-secondary",
        startTime: "9:00",
        endTime: "15:00",
        location: "Seacon Square",
        expectPrice: 1200,
        detail: "Mock up detail",
        creatorId: "xyz321",
        creatorUsername: "ria123",
        creatorType: "student"
      });
      let editedPost = {
        subject: "math",
        level: "upper-secondary",
        startTime: "10:00",
        endTime: "17:00",
        location: "Seacon Square",
        expectPrice: 1200,
        detail: "Mock up detail",
        creatorId: "xyz321",
        creatorUsername: "ria123",
        creatorType: "student"
      }
      post.save((err, post) => {
        chai.request(server)
        .put('/api/post/update/'+post.id)
        .send(editedPost)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('post');
          res.body.post.should.have.property('subject').eql('math');
          res.body.post.should.have.property('startTime').eql('10:00');
          res.body.post.should.have.property('endTime').eql('17:00');
          done();
        });
      });
      
    });
  });

  /*
  * Test the /DELETE route
  */
  describe('/DELETE post', () => {
    it('Should not DELETE a post given non-exist ID', (done) => {
      chai.request(server)
      .delete('/api/post/delete/nonexistid!!')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Not found');
        done();
      });
    });
    it('Should DELETE a post given ID', (done) => {
      let post = new Post({
        subject: "science",
        level: "upper-secondary",
        startTime: "9:00",
        endTime: "15:00",
        location: "Seacon Square",
        expectPrice: 1200,
        detail: "Mock up detail",
        creatorId: "xyz321",
        creatorUsername: "ria123",
        creatorType: "student"
      });
      post.save((err, post) => {
        chai.request(server)
        .delete('/api/post/delete/'+post.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('post');
          done();
        });
      });
      
    });
  });

});
