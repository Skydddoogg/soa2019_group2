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
 * Testing POST Method
 */
describe('POST with several data format', () => {

  let data1 = {
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

  let data2 = {
    // No subject
    "level": "lower-secondary",
    "startTime": "13.00",
    "endTime": "17.00",
    "location": "Seacon Square",
    // No expectPrice
    "detail": "detail for student post",
    "creatorId": "0123456789",
    "creatorUsername": "riariaria",
    "creatorType": "student"
  }

  let data3 = {
    "subject": "data-structure",
    // Wrong type of level
    "level": "super-secondary",
    "startTime": "13.00",
    "endTime": "17.00",
    "location": "Seacon Square",
    // Wrong type of expectPrice
    "expectPrice": "xyz",
    "detail": "detail for student post",
    "creatorId": "0123456789",
    "creatorUsername": "riariaria",
    // Wrong type of creatorType
    "creatorType": "student"
  }

  // Testing with correct data format
  it('should respond with 201 Created for correct data format', () => {
    request(server).post('/post/create').send(data1).set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .then((res) => {
      const { result, detail } = res.body;
      expect(result).toBe('post created');
    })
    .catch(err => console.log(err));
  });

  // Testing with incorrect data format (Missing required property)
  it('should respond with 400 Bad Request for incorrect data format (Missing required property)', () => {
    request(server).post('/post/create').send(data2).set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)
    .then((res) => {
      const { result, errors } = res.body;
      expect(result).toBe('post not created');
      expect(errors.subject.msg).toBe('subject doesn\'t exists');
      expect(errors.expectPrice.msg).toBe('expectPrice is wrong format or doesn\'t exist');
    })
    .catch(err => console.log(err));
  });

  // Testing with incorrect data format (Incorrected property)
  it('should respond with 400 Bad Request for incorrect data format (Incorrected property)', () => {
    request(server).post('/post/create').send(data2).set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)
    .then((res) => {
      const { result, errors } = res.body;
      expect(result).toBe('post not created');
      expect(errors.subject.msg).toBe('subject doesn\'t exists');
      expect(errors.expectPrice.msg).toBe('expectPrice is wrong format or doesn\'t exist');
      expect(errors.creatorType.msg).toBe('creatorType is wrong format or doesn\'t exist');
    })
    .catch(err => console.log(err));
  });
  
});

/**
 * Testing PUT Method
 */
// describe('PUT with correct data format', () => {

//   let data = {
//     "subject": "science",
//     "level": "lower-secondary",
//     "startTime": "13.00",
//     "endTime": "17.00",
//     "location": "Seacon Square",
//     "expectPrice": "500",
//     "detail": "detail for student post",
//     "creatorId": "0123456789",
//     "creatorUsername": "riariaria",
//     "creatorType": "student"
//   }

//   it('should respond with 400 not created', (done) => {
//     request(server)
//     .post('/post/create')
//     .send(data)
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(400)
//     .end((err) => {
//       if (err) return done(err);
//       done();
//     });
//   });
// });