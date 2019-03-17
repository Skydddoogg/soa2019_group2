const request = require('supertest');
const server = require('../app.js');

beforeAll(async () => {
  console.log('Start testing with Jest');
});

afterAll(() => {
  server.close;
  console.log('Server closed');
});

/**
 * Testing POST Method with correct data format to add post
 */
describe('POST with correct data format', () => {

  let data = {
    "subject": "math",
    "level": "lower-secondary",
    "startTime": "13.00",
    "endTime": "17.00",
    "location": "Seacon Square",
    "expectPrice": "500",
    "detail": "detail for student post",
    "creatorId": "0123456789",
    "creatorUsername": "riariaria",
    "creatorType": "student"
  }

  it('should respond with 201 created', (done) => {
    request(server)
    .post('/post/create')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err) => {
      if (err) return done(err);
      done();
    });
  });
});

/**
 * Testing POST Method with wrong data format to add post
 */
describe('POST with wrong data format', () => {

  let data = {
    // Request with no subject
    "level": "lower-secondary",
    "startTime": "13.00",
    "endTime": "17.00",
    "location": "Seacon Square",
    "expectPrice": "500",
    "detail": "detail for student post",
    "creatorId": "0123456789",
    "creatorUsername": "riariaria",
    "creatorType": "student"
  }

  it('should respond with 400 not created', (done) => {
    request(server)
    .post('/post/create')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err) => {
      if (err) return done(err);
      done();
    });
  });
});