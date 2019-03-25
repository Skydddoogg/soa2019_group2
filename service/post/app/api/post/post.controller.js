const Post = require('./post.model');
const produce = require('./kafka/producer');
const { check, validationResult } = require('express-validator/check');
const Controller = {};

Controller.postCreate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  Post.create(req.body)
  .then( post => {
    produce.send(post);
    return post;
  })
  .then( post => res.status(201).json({ status: 'success', data: post }))
}

Controller.postUpdate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  Post.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
  .then( (post, err) => {
    if (err) {
      return res.status(404).json({ status: 'error' , errors: 'Post doesn\'t exist' });
    } else {
      produce.send(post);
      return post;
    }
  })
  .then( post => res.status(200).json({ status: 'success', data: post }));
}

Controller.postDelete = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
  .then( (post, err) => {
    if (err) {
      return res.status(404).json({ status: 'error' , errors: 'Post doesn\'t exist' });
    } else {
      produce.send(post);
      return post;
    }
  })
  .then( post => res.status(200).json({ status: 'success', data: post }));
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