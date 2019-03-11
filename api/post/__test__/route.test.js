const request = require('supertest');
const server = require('../app.js');

beforeAll(async () => {
  // do something before anything else runs
  console.log('Jest starting!');
});

// close the server after each test
afterAll(() => {
  server.close;
  console.log('server closed!');
});

// describe('Test GET Method /post', () => {
//   test('get post route GET /', async () => {
//   const response = await request(server).get('/');
//   expect(response.status).toEqual(200);
//   expect(response.text).toContain('Hello World!');
//   });
// });

/**
 * Testing POST Method with correct data format to add post
 */
describe('POST /post with correct data format', function () {
  let data = {
    "id": "1234567890",
    "subject": "math",
    "level": "lower-secondary",
    "start_time": "13.00",
    "end_time": "17.00",
    "location": "Seacon Square",
    "expect_price": "500",
    "detail": "Mock detail for student post",
    "timestamp": "1552302524479",
    "creator_id": "0123456789",
    "creator_username": "riariaria",
    "creator_type": "student"
  }
  it('respond with 201 created', function (done) {
    request(server)
      .post('post')
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
describe('POST /post with wrong data format', function () {
  let data = {
    // no id
    "subject": "math",
    "level": "lower-secondary",
    "start_time": "13.00",
    "end_time": "17.00",
    "location": "Seacon Square",
    "expect_price": "500",
    "detail": "Mock detail for student post",
    "timestamp": "1552302524479",
    "creator_id": "0123456789",
    "creator_username": "riariaria",
    "creator_type": "student"
  }
  it('respond with 400 not created', function (done) {
    request(server)
      .post('/post')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect('"user not created"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});