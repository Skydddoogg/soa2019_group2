const Post = require('../models/post.model');
const { check, validationResult } = require('express-validator/check');

exports.postCreate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ result: 'post not created', errors: errors.mapped() });
  }
  Post.create(req.body)
  .then(post => res.status(201).json({ result: 'post created', detail: post }));
}

exports.postEdit = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ result: 'post not updated', errors: errors.mapped() });
  }
  Post.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
  .then(post => res.status(200).json({ result: 'post updated', detail: post }));
}

exports.postDelete = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
  .then((post) => res.status(200).json({ result: 'post deleted' }))
  .catch(err => res.status(400).json({ result: "post not deleted", errors: err }));
}

exports.validate = (method) => {
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
