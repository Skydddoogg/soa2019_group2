const Review = require('./review.model');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

exports.reviewCreate = async (req, res) => {
  const reviewObj = new Review({
    ownerId: req.user.userId,
    ownerUsername: req.user.username,
    ownerType: req.user.userType,
    targetId: req.body.targetId,
    targetUsername: req.body.targetUsername,
    targetType: req.body.targetType,
    message: req.body.message,
    profileImg: req.body.profileImg
  });
  try {
    if (req.user.userType !== 'student') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const review = await reviewObj.save();
    return res.status(201).json({ review });
  } catch(error) {
    return res.status(500).json({ error });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ targetId: req.params.targetid});
    return res.status(200).json(reviews);
  } catch(error) {
    return res.status(500).json({ error });
  }
};