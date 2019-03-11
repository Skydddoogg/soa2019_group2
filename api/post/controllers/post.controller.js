var Post = require('../models/post.model');
const { body } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
      case 'postCreate': {
       return [
          body('id', "id doesn't exists").exists({ checkFalsy: true }),
          body('subject', "id doesn't exists").exists({ checkFalsy: true }),
          body('level', "id doesn't exists").exists({ checkFalsy: true }),
          body('start_time', "id doesn't exists").exists({ checkFalsy: true }),
          body('end_time', "id doesn't exists").exists({ checkFalsy: true }),
          body('location', "id doesn't exists").exists({ checkFalsy: true }),
          body('expect_price', "id doesn't exists").exists({ checkFalsy: true }),
          body('detail', "id doesn't exists").exists({ checkFalsy: true }),
          body('timestamp', "id doesn't exists").exists({ checkFalsy: true }),
          body('creator_id', "id doesn't exists").exists({ checkFalsy: true }),
          body('creator_username', "id doesn't exists").exists({ checkFalsy: true }),
          body('creator_type', "id doesn't exists").exists({ checkFalsy: true })
         ]   
      }
    }
  }

exports.postCreate = (req, res, next) => {
  req.getValidationResult().then(validationHandler(res)).then(() => {
    const { id
      , subject
      , level
      , start_time
      , end_time
      , location
      , expect_price
      , detail
      , timestamp
      , creator_id
      , creator_username
      , creator_type } = req.body

      Post.create({
        id,
        subject,
        level,
        start_time,
        end_time,
        location,
        expect_price,
        detail,
        timestamp,
        creator_id,
        creator_username,
        creator_type
      }).then(post => res.status(201).json('post created'))
    }).catch(next => res.status(400).json('post not created'))
  }

const validationHandler = (res, next) => result => {
  if (result.isEmpty()) return;
  if (!next)
    throw new Error(result.array().map(i => `'${i.param}' has ${i.msg}`).join(' '))
  else
    return next(new Error(result.array().map(i => `'${i.param}' has ${i.msg}`).join('')))
}

exports.postEdit = function (req, res) {
    Post.findByIdAndUpdate(req.params.postid, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).json("There was a problem updating the post.");
        res.status(200).json('Post updated');
    });
}

exports.postDelete = function (req, res) {
    Post.findByIdAndRemove(req.params.postid, function (err, user) {
        if (err) return res.status(500).json("There was a problem deleting the post.");
        res.status(200).json('Post deleted');
    });
}