require('module-alias/register')

const Post = require('./post.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('@root/server');
const jwt = require('jsonwebtoken');
const should = chai.should();
const SECRET = process.env.SECRET_KEY;
const JWT_EXPIRATION_MS = 60*1000;

const PAYLOAD = {
  'userId': '5cb440108941028067e414be',
  'username': 'test1234',
  'userType': 'student',
  'expires': Date.now() + parseInt(JWT_EXPIRATION_MS)
};

chai.use(chaiHttp);

describe('Post-service integration test', () => {
  
  afterEach((done) => {
    Post.deleteMany({}, (err) => { 
      done();
    });
  });

  /*
  * Test the /GET route
  */
  describe('/GET specific post by post ID', () => {
    it('Should not GET a post with non-exists post ID', (done) => {
      chai.request(server)
      .get('/nonexistid!!')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Not found');
        done();
      });
    });
    it('Should GET a post with exists post ID', (done) => {
      let post = new Post({
        subject: 'science',
        level: 'upper-secondary',
        startTime: '9:00',
        endTime: '15:00',
        location: 'Seacon Square',
        expectPrice: 1200,
        detail: 'Mock up detail',
        creatorId: 'xyz321',
        creatorUsername: 'ria123',
        creatorType: 'student'
      });
      post.save((err, post) => {
        chai.request(server)
        .get('/'+post.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('post');
          done();
        });
      });
    });
  });

  // describe('/GET a list of all post by specific username', () => {
  //   it('Should GET a empty list with non-exists username or exists username but doesn\'t have any post', (done) => {
  //     chai.request(server)
  //     .get('/nonexistid!!/allpost')
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a('array');
  //       res.body.should.have.length(0);
  //       done();
  //     });
  //   });
  //   it('Should GET a post with exists post ID', (done) => {
  //     let post1 = new Post({
  //       subject: 'science',
  //       level: 'upper-secondary',
  //       startTime: '9:00',
  //       endTime: '15:00',
  //       location: 'Seacon Square',
  //       expectPrice: 1200,
  //       detail: 'Mock up detail',
  //       creatorId: 'xyz321',
  //       creatorUsername: 'ria123',
  //       creatorType: 'student'
  //     });
  //     let post2 = new Post({
  //       subject: 'math',
  //       level: 'upper-secondary',
  //       startTime: '9:00',
  //       endTime: '15:00',
  //       location: 'Paradise',
  //       expectPrice: 1200,
  //       detail: 'Mock up detail',
  //       creatorId: 'xyz321',
  //       creatorUsername: 'ria123',
  //       creatorType: 'student'
  //     });
  //     let post3 = new Post({
  //       subject: 'biology',
  //       level: 'upper-secondary',
  //       startTime: '9:00',
  //       endTime: '15:00',
  //       location: 'Seacon Square',
  //       expectPrice: 1200,
  //       detail: 'Mock up detail',
  //       creatorId: 'xyz321',
  //       creatorUsername: 'ria123',
  //       creatorType: 'student'
  //     });
  //     Promise.all([post1.save(), post2.save(), post3.save()])
  //     .then( () => {
  //       chai.request(server)
  //       .get('/ria123/allpost')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('array');
  //         res.body.should.have.length(3);
  //         done();
  //       });
  //     });
  //   });
  // });

  /*
  * Test the /POST route
  */
  describe('/POST create post', () => {
    it('Should not POST a post with invalid fields', (done) => {
      let post = {
        // No subject
        level: 'upper-secondary',
        startTime: '9:00',
        endTime: '15:00',
        location: 'Seacon Square',
        // Incorrect format of expectPrice
        expectPrice: '100xyz',
        detail: 'Mock up detail'
      };
      let token = jwt.sign(JSON.stringify(PAYLOAD), SECRET);
      chai.request(server)
      .post('/create')
      .set('Authorization', 'Bearer ' + token)
      .send(post)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
    it('Should POST a post with valid fields', (done) => {
      let post = {
        subject: 'science',
        level: 'upper-secondary',
        startTime: '9:00',
        endTime: '15:00',
        location: 'Seacon Square',
        expectPrice: 1200,
        detail: 'Mock up detail',
      };
      let token = jwt.sign(JSON.stringify(PAYLOAD), SECRET);
      chai.request(server)
      .post('/create')
      .set('Authorization', 'Bearer ' + token)
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
  describe('/PUT update post', () => {
    it('Should not UPDATE a post given non-exist ID', (done) => {
      let editedPost = {
        subject: 'math',
        level: 'upper-secondary',
        startTime: '10:00',
        endTime: '17:00',
        location: 'Seacon Square',
        expectPrice: 1200,
        detail: 'Mock up detail',
      };
      let token = jwt.sign(JSON.stringify(PAYLOAD), SECRET);
      chai.request(server)
      .put('/update/nonexist1234')
      .set('Authorization', 'Bearer ' + token)
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
        subject: 'science',
        level: 'upper-secondary',
        startTime: '9:00',
        endTime: '15:00',
        location: 'Seacon Square',
        expectPrice: 1200,
        detail: 'Mock up detail',
        creatorId: '5cb440108941028067e414be',
        creatorUsername: 'test1234',
        creatorType: 'student'
      });
      let editedPost = {
        subject: 'math',
        level: 'upper-secondary',
        startTime: '10:00',
        endTime: '17:00',
        location: 'Seacon Square',
        expectPrice: 1200,
        detail: 'Mock up detail',
      }
      let token = jwt.sign(JSON.stringify(PAYLOAD), SECRET);
      post.save((err, post) => {
        chai.request(server)
        .put('/update/'+post.id)
        .set('Authorization', 'Bearer ' + token)
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
  describe('/DELETE delete post', () => {
    it('Should not DELETE a post given non-exist ID', (done) => {
      let token = jwt.sign(JSON.stringify(PAYLOAD), SECRET);
      chai.request(server)
      .delete('/delete/nonexistid!!')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Not found');
        done();
      });
    });
    it('Should DELETE a post given ID', (done) => {
      let post = new Post({
        subject: 'science',
        level: 'upper-secondary',
        startTime: '9:00',
        endTime: '15:00',
        location: 'Seacon Square',
        expectPrice: 1200,
        detail: 'Mock up detail',
        creatorId: '5cb440108941028067e414be',
        creatorUsername: 'test1234',
        creatorType: 'student'
      });
      let token = jwt.sign(JSON.stringify(PAYLOAD), SECRET);
      post.save((err, post) => {
        chai.request(server)
        .delete('/delete/'+post.id)
        .set('Authorization', 'Bearer ' + token)
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
