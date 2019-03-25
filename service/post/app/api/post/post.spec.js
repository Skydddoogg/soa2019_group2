const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const should = chai.should();
const posts = require('./fixtures/posts.json');

describe('post service', () => {

  describe('when stubbed', () => {

    beforeEach(() => {
      this.post = sinon.stub(request, 'post');
      this.put = sinon.stub(request, 'put');
      this.delete = sinon.stub(request, 'delete');
    });
    
    afterEach(() => {
      request.post.restore();
      request.put.restore();
      request.delete.restore();
    });

    describe('POST /api/post/create', () => {

      it('should return the post that was added', (done) => {
        const options = {
          body: {
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
          },
          json: true,
          url: '/api/post/create'
        };
        const obj = posts.add.success;
        this.post.yields(null, obj.res, JSON.stringify(obj.body));
        request.post(options, (err, res, body) => {
          res.statusCode.should.equal(201);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.eql('success');
          body.data[0].should.include.keys(
            '_id',
            'subject',
            'level',
            'startTime',
            'endTime',
            'location',
            'expectPrice',
            'detail', 
            'creatorId',
            'creatorUsername',
            'creatorType',
            'updatedAt',
            'createdAt',
            '__v'
          );
          body.data[0].subject.should.eql('science');
          body.data[0].level.should.eql('upper-secondary');
          body.data[0].startTime.should.eql('9:00');
          body.data[0].endTime.should.eql('15:00');
          body.data[0].location.should.eql('Seacon Square');
          body.data[0].expectPrice.should.eql(1200);
          body.data[0].detail.should.eql('Mock up detail');
          body.data[0].creatorId.should.eql('xyz321');
          body.data[0].creatorUsername.should.eql('ria123');
          body.data[0].creatorType.should.eql('student');
          done();
        });
      });

      it('should throw an error if the payload is malformed', (done) => {
        const options = {
          body: { 
            // No subject
            level: "upper-secondary",
            startTime: "9:00",
            endTime: "15:00",
            location: "Seacon Square",
            // Incorrect format of expectPrice
            expectPrice: '100xyz',
            detail: "Mock up detail WITH EDITED",
            creatorId: "xyz321",
            creatorUsername: "lieselottezz",
            // Incorrect format of creatorType
            creatorType: "studentxyz"
          },
          json: true,
          url: '/api/post/create'
        };
        const obj = posts.add.failure;
        this.post.yields(null, obj.res, JSON.stringify(obj.body));
        request.post(options, (err, res, body) => {
          res.statusCode.should.equal(400);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.eql('error');
          should.exist(body.errors);
          done();
        });
      });

    });

    describe('PUT /api/post/update/:id', () => {

      it('should return the post that was updated', (done) => {
        const options = {
          body: { 
            "subject": "thai",
            "level": "lower-secondary",
            "startTime": "10:00",
            "endTime": "15:00",
            "location": "Paradise Park",
            "expectPrice": 1000,
            "detail": "Mock up detail WITH EDITED",
            "creatorId": "xyz321",
            "creatorUsername": "lieze",
            "creatorType": "student"
           },
          json: true,
          url: '/api/post/update/5c922f172ec40cb013893fc8'
        };
        const obj = posts.update.success;
        this.put.yields(null, obj.res, JSON.stringify(obj.body));
        request.put(options, (err, res, body) => {
          res.statusCode.should.equal(200);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.eql('success');
          body.data[0].should.include.keys(
            '_id',
            'subject',
            'level',
            'startTime',
            'endTime',
            'location',
            'expectPrice',
            'detail', 
            'creatorId',
            'creatorUsername',
            'creatorType',
            'updatedAt',
            'createdAt',
            '__v'
          );
          body.data[0].subject.should.eql('thai');
          body.data[0].level.should.eql('lower-secondary');
          body.data[0].startTime.should.eql('10:00');
          body.data[0].endTime.should.eql('15:00');
          body.data[0].location.should.eql('Paradise Park');
          body.data[0].expectPrice.should.eql(1000);
          body.data[0].detail.should.eql('Mock up detail WITH EDITED');
          body.data[0].creatorId.should.eql('xyz321');
          body.data[0].creatorUsername.should.eql('lieze');
          body.data[0].creatorType.should.eql('student');
          done();
        });
      });

      it('should throw an error if the post doesn\'t exist', (done) => {
        const options = {
          body: { 
            "subject": "thai",
            "level": "lower-secondary",
            "startTime": "10:00",
            "endTime": "15:00",
            "location": "Paradise Park",
            "expectPrice": 1000,
            "detail": "Mock up detail WITH EDITED",
            "creatorId": "xyz321",
            "creatorUsername": "lieze",
            "creatorType": "student"
           },
          json: true,
          url: '/api/post/update/xyz99h'
        };
        const obj = posts.update.failureNotFound;
        this.put.yields(null, obj.res, JSON.stringify(obj.body));
        request.put(options, (err, res, body) => {
          res.statusCode.should.equal(404);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.eql('error');
          body.errors.should.eql('Post doesn\'t exist');
          done();
        });
      });

      it('should throw an error if the payload is malformed', (done) => {
        const options = {
          body: { 
            // No subject
            "level": "lower-secondary",
            "startTime": "10:00",
            "endTime": "15:00",
            "location": "Paradise Park",
            // Incorrect format of expectPrice
            "expectPrice": '100xyz',
            "detail": "Mock up detail WITH EDITED",
            "creatorId": "xyz321",
            "creatorUsername": "lieze",
            // Incorrect format of creatorType
            "creatorType": "studentxyz"
           },
          json: true,
          url: '/api/post/update/5c922f172ec40cb013893fc8'
        };
        const obj = posts.update.failureIncorrectFormat;
        this.put.yields(null, obj.res, JSON.stringify(obj.body));
        request.put(options, (err, res, body) => {
          res.statusCode.should.equal(400);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.eql('error');
          should.exist(body.errors);
          done();
        });
      });

    });

    describe('DELETE /api/post/delete/:id', () => {

      it('should return the movie that was deleted', (done) => {
        const obj = posts.delete.success;
        this.delete.yields(null, obj.res, JSON.stringify(obj.body));
        request.delete('/api/v1/movies/5c922f172ec40cb013893fc8', (err, res, body) => {
          res.statusCode.should.equal(200);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.eql('success');
          body.data[0].should.include.keys(
            '_id',
            'subject',
            'level',
            'startTime',
            'endTime',
            'location',
            'expectPrice',
            'detail', 
            'creatorId',
            'creatorUsername',
            'creatorType',
            'updatedAt',
            'createdAt',
            '__v'
          );
          body.data[0]._id.should.eql('5c922f172ec40cb013893fc8');
          done();
        });
      });

      it('should throw an error if the post doesn\'t exist', (done) => {
        const obj = posts.delete.failureNotFound;
        this.delete.yields(null, obj.res, JSON.stringify(obj.body));
        request.delete('/api/v1/movies/xyz99h', (err, res, body) => {
          res.statusCode.should.equal(404);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.eql('error');
          body.errors.should.eql('Post doesn\'t exist');
          done();
        });
      });

    });

  });

});