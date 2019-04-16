require('module-alias/register');

const Post = require('./post.model');
// const kafkaProducer = require('@kafka/producer');
const kafkaMethods = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete'
}

exports.getPostByPostId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);
    if (!post) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ post });
  } catch(error) {
    return res.status(404).json({ message: 'Not found', error: error });
  }
};

exports.getAllPostByUsername = async (req, res) => {
  const postlist = await Post.find({ creatorUsername: req.params.username });
  return res.status(200).json(postlist);
};

exports.createPost = async (req, res) => {
  const postObj = new Post({
    subject: req.body.subject,
    level: req.body.level,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    expectPrice: req.body.expectPrice,
    detail: req.body.detail,
    creatorId: req.body.creatorId,
    creatorUsername: req.body.creatorUsername,
    creatorType: req.body.creatorType
  });
  try {
    const post = await postObj.save();
    // kafkaProducer.send(kafkaMethods.CREATE, post)
    return res.status(201).json({ post });
  } catch(err) {
    return res.status(401).json({ err });
  }
};

exports.updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
  if (!post) {
    return res.status(404).json({ message: 'Not found' });
  }
  // kafkaProducer.send(kafkaMethods.UPDATE, post);
  return res.status(200).json({ post });
};

exports.deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Not found' });
  }
  // kafkaProducer.send(kafkaMethods.DELETE, post);
  return res.status(200).json({ post });
};
