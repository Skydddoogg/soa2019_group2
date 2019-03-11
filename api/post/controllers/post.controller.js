var Post = require('../models/post.model');

exports.post_create = function (req, res) {
  Post.create({
    id: req.body.id,
    subject: req.body.subject,
    level: req.body.level,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    location: req.body.location,
    expect_price: req.body.expect_price,
    detail: req.body.detail,
    timestamp: req.body.timestamp,
    creator_id: req.body.creator_id,
    creator_username: req.body.creator_name,
    creator_type: req.body.creator_type
  }, 
  function (err, post) {
    let content = req.body;
    if (content.id) { //just to demo
      return res.status(201).json("user created");
    }
    return res.status(400).json('user not created');
  });
}

exports.post_update = function (req, res) {
    Post.findByIdAndUpdate(req.params.postid, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).json("There was a problem updating the post.");
        res.status(200).json('Post updated');
    });
}

exports.post_delete = function (req, res) {
    Post.findByIdAndRemove(req.params.postid, function (err, user) {
        if (err) return res.status(500).json("There was a problem deleting the post.");
        res.status(200).json('Post deleted');
    });
}
