const Review = require('./review.model');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

exports.reviewCreate = async (req, res) => {
  const reviewObj = new Review({
    message: req.body.message,
    ownerId: req.body.ownerId,
    targetId: req.body.targetId,
    ownerUsername: req.body.ownerUsername,
    targetUsername: req.body.targetUsername,
    ownerType: req.body.ownerType,
    targetType: req.body.targetType
  });
  try {
    // if (req.user.userType !== 'student') {
    //   return res.status(403).json({ message: Forbidden });
    // }
    const review = await reviewObj.save();
    return res.status(201).json({ review });
  } catch(error) {
    return res.status(500).json({ error });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Post.find({ targetId: req.params.targetid});
    return res.status(200).json(reviews);
  } catch(error) {
    return res.status(500).json({ error });
  }
};