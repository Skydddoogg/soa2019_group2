const Post = require('../models/post.model');
const { body } = require('express-validator/check')

exports.postCreate = (req, res) => {
  req.getValidationResult()
  .then(validationHandler(res))
  .then(() => Post.create(req.body))
  .then((post) => res.status(201).json({result: 'post created'}))
  .catch(() => res.status(400).json({result: 'post not created'}))
}

exports.postEdit = (req, res) => {
  req.getValidationResult()
  .then(validationHandler(res))
  .then(() => Post.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec())
  .then((post) => res.status(200).json({result: 'post updated'}))
  .catch(() => res.status(400).json({result: 'post not updated'}))
}

exports.postDelete = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
  .then((post) => res.status(200).json({result: 'post deleted'}))
  .catch(() => res.status(400).json({result: "post not deleted"}))
}

exports.validate = (method) => {
  switch (method) {
    case 'createAndUpdate': {
      return [
        body('subject', "subject doesn't exists").exists({ checkFalsy: true }),
        body('level', "level doesn't exists").exists({ checkFalsy: true }),
        body('startTime', "startTime doesn't exists").exists({ checkFalsy: true }),
        body('endTime', "endTime doesn't exists").exists({ checkFalsy: true }),
        body('location', "location doesn't exists").exists({ checkFalsy: true }),
        body('expectPrice', "expectPrice doesn't exists").exists({ checkFalsy: true }),
        body('detail', "detail doesn't exists").exists({ checkFalsy: true }),
        body('creatorId', "creatorId doesn't exists").exists({ checkFalsy: true }),
        body('creatorUsername', "creatorUsername doesn't exists").exists({ checkFalsy: true }),
        body('creatorType', "creatorType doesn't exists").exists({ checkFalsy: true })
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
