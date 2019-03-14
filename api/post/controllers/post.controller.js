var Post = require('../models/post.model');
var { body } = require('express-validator/check')

exports.postCreate = (req, res) => {
  req.getValidationResult()
  .then(validationHandler(res))
  .then(() => Post.create(req.body))
  .then(() => res.status(201).json('post created'))
  .catch(() => res.status(400).json('post not created'))
}

exports.postEdit = (req, res) => {
  req.getValidationResult()
  .then(validationHandler(res))
  .then(() => Post.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec())
  .then((post) => res.status(201).json('post updated'))
  .catch(() => res.status(400).json('post not updated'))
}

exports.postDelete = (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return res.status(400).json("post not deleted");
    }
    res.status(200).json('post deleted');
  });
}

exports.validate = (method) => {
  switch (method) {
    case 'createAndUpdate': {
      return [
        body('subject', "subject doesn't exists").exists({ checkFalsy: true }),
        body('level', "level doesn't exists").exists({ checkFalsy: true }),
        body('start_time', "start_time doesn't exists").exists({ checkFalsy: true }),
        body('end_time', "end_time doesn't exists").exists({ checkFalsy: true }),
        body('location', "location doesn't exists").exists({ checkFalsy: true }),
        body('expect_price', "expect_price doesn't exists").exists({ checkFalsy: true }),
        body('detail', "detail doesn't exists").exists({ checkFalsy: true }),
        body('creator_id', "creator_id doesn't exists").exists({ checkFalsy: true }),
        body('creator_username', "creator_username doesn't exists").exists({ checkFalsy: true }),
        body('creator_type', "creator_type doesn't exists").exists({ checkFalsy: true })
      ]
    }
  }
}

const validationHandler = next => result => {
  if (result.isEmpty()) {
    return;
  }
  if (!next) {
    throw new Error(result.array().map(i => `'${i.param}' has ${i.msg}`).join(' '));
  } else {
    return next(new Error(result.array().map(i => `'${i.param}' has ${i.msg}`).join('')));
  }
}
