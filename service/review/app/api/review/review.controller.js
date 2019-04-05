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
      const review = await reviewObj.save();
      return res.status(201).json({ review });
    } catch(err) {
      return res.status(401).json({ err });
    }
  }

exports.getReviews = async (req, res) => {

    var _targetId = req.params.targetid;

    Review.find({ targetId: _targetId }, function (err, reviews) {
        if (err) {
            return res.status(401).json("There was a problem finding the reviews.");
        } else {
            res.status(201).json(reviews);
        }
    });

}