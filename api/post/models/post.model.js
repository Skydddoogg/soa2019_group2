const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const shortUid = require('short-unique-id');
const uid = new shortUid();

const PostSchema = new mongoose.Schema({
  subject: {type: String, required: true},
  level: {type: String, required: true},
  startTime: {type: String, required: true},
  endTime: {type: String, required: true},
  location: {type: String, required: true},
  expectPrice: {type: Number, required: true},
  detail: {type: String, required: false},
  creatorId: {type: String, required: true},
  creatorUsername: {type: String, required: true},
  creatorType: {type: String, required: true}
});
PostSchema.plugin(timestamps);
mongoose.model('Post', PostSchema);

module.exports = mongoose.model('Post');