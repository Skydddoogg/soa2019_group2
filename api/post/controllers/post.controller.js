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
