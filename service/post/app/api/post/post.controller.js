const Post = require('./post.model');
const { check, validationResult } = require('express-validator/check');
const Controller = {};

// const kafka = require('kafka-node');
// const client = new kafka.KafkaClient({kafkaHost: '35.187.249.119:9092'});
// const Producer = kafka.Producer
// const producer = new Producer(client);

// producer.on('ready', function () {
//   console.log('Producer is ready');
// });

// producer.on('error', function (err) {
//   console.log('Producer is in error state');
//   console.log(err);
// })

// function send(sentMessage) {
//   var msg = JSON.stringify(sentMessage)
//   payloads = [
//     { topic: "post", messages: msg, partition: 0 }
//   ];
//   producer.send(payloads, function (err, data) {
//      console.log("send data ", sentMessage)
//   });
// } 

Controller.postCreate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  Post.create(req.body)
  .then( post => res.status(201).json({ status: 'success', data: post }));
  // .then( () => send(req.body));
}

Controller.postUpdate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  Post.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
  .then( (post) => res.status(200).json({ status: 'success', data: post }))
  .catch( (err) => res.status(404).json({ status: 'error' , errors: 'Post doesn\'t exist' }));
  // .then( () => send(req.body));
}

Controller.postDelete = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
  .then( (post) => res.status(200).json({ status: 'success', data: post }))
  .catch( (err) => res.status(404).json({ status: 'error', errors: 'Post doesn\'t exist' }));
  // .then( () => send(req.body));
}

Controller.validate = (method) => {
  switch (method) {
    case 'createAndUpdate': {
      return [
        check('subject', "subject doesn't exists").exists({ checkFalsy: true }),
        check('level', "level is wrong format or doesn't exist").isIn(['elementary', 'lower-secondary', 'upper-secondary']),
        check('startTime', "startTime doesn't exists").exists({ checkFalsy: true }),
        check('endTime', "endTime doesn't exists").exists({ checkFalsy: true }),
        check('location', "location doesn't exists").exists({ checkFalsy: true }),
        check('expectPrice', "expectPrice is wrong format or doesn't exist").exists({ checkFalsy: true }).isNumeric(),
        check('creatorId', "creatorId doesn't exists").exists({ checkFalsy: true }),
        check('creatorUsername', "creatorUsername doesn't exists").exists({ checkFalsy: true }),
        check('creatorType', "creatorType is wrong format or doesn't exist").isIn(['student', 'tutor'])
      ]
    }
  }
}

module.exports = Controller;