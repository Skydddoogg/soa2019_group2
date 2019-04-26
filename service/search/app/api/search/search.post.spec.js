require('module-alias/register')

const SearchPost = require('./search.post.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('@root/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Search-service integration test', () => {
  
  afterEach((done) => {
    SearchPost.deleteMany({}, (err) => { 
      done();
    });
  });

  describe('/GET a list of all post by specific username', () => {
    it('Should GET a empty list with non-exists username or exists username but doesn\'t have any post', (done) => {
      chai.request(server)
      .get('/5cc2a945af6c4bae5a6f228c/allposts')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.should.have.length(0);
        done();
      });
    });
    it('Should GET a post with exists post ID', (done) => {
      let post1 = new SearchPost({
        _id: '5cc2a945af6c4bae5a6f22fa',
        subject: 'science',
        level: 'upper-secondary',
        startTime: '9:00',
        endTime: '15:00',
        location: 'Seacon Square',
        expectPrice: 1200,
        detail: 'Mock up detail',
        creatorId: '5cc2a945af6c4bae5a6f228c',
        creatorUsername: 'ria123',
        creatorType: 'student'
      });
      let post2 = new SearchPost({
        _id: '5cc2a945af6c4bae5a6f22fb',
        subject: 'math',
        level: 'upper-secondary',
        startTime: '9:00',
        endTime: '15:00',
        location: 'Paradise',
        expectPrice: 1200,
        detail: 'Mock up detail',
        creatorId: '5cc2a945af6c4bae5a6f228c',
        creatorUsername: 'ria123',
        creatorType: 'student'
      });
      let post3 = new SearchPost({
        _id: '5cc2a945af6c4bae5a6f22fc',
        subject: 'biology',
        level: 'upper-secondary',
        startTime: '9:00',
        endTime: '15:00',
        location: 'Seacon Square',
        expectPrice: 1200,
        detail: 'Mock up detail',
        creatorId: '5cc2a945af6c4bae5a6f228c',
        creatorUsername: 'ria123',
        creatorType: 'student'
      });
      Promise.all([post1.save(), post2.save(), post3.save()])
      .then( () => {
        chai.request(server)
        .get('/5cc2a945af6c4bae5a6f228c/allposts')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(3);
          done();
        });
      });
    });
  });


});
