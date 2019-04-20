require('module-alias/register');

const Post = require('./post.model');
// const kafkaProducer = require('@kafka/producer');
const kafkaMethods = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete'
};

exports.getPostByPostId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);
    if (!post) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ post });
  } catch(error) {
    return res.status(500).json({ error });
  }
};

exports.getAllPostByUsername = async (req, res) => {
  try {
    const postlist = await Post.find({ creatorUsername: req.params.username });
    return res.status(200).json(postlist);
  } catch(error) {
    return res.status(500).json({ error });
  }
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
    creatorId: req.user.userId,
    creatorUsername: req.user.username,
    creatorType: req.user.userType
  });
  try {
    const post = await postObj.save();
    // kafkaProducer.send(kafkaMethods.CREATE, post)
    return res.status(201).json({ post });
  } catch(error) {
    return res.status(500).json({ error });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!post) {
      return res.status(404).json({ message: 'Not found' });
    }
    if (req.user.userId !== post.creatorId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    // kafkaProducer.send(kafkaMethods.UPDATE, post);
    return res.status(200).json({ post });
  } catch(error) {
    return res.status(500).json({ error });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Not found' });
    }
    if (req.user.userId !== post.creatorId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    // kafkaProducer.send(kafkaMethods.DELETE, post);
    return res.status(200).json({ post });
  } catch(error) {
    res.status(500).json({ error });
  }
};
