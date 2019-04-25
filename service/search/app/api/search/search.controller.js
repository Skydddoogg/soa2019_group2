require('@kafka/consumer');

const SearchPost = require('./search.post.model');

SearchPost.SyncToAlgolia();

exports.getAllPostsByUserId = async (req, res) => {
  try {
    const posts = await SearchPost.find({ creatorId: req.params.userid });
    return res.status(200).json(posts);
  } catch(error) {
    return res.status(500).json({ error });
  }
};
