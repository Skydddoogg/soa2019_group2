const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SearchPostSchema = new mongoose.Schema({
  _id: {type: ObjectId, required: true},
  subject: {type: String, required: true},
  level: {type: String, required: true},
  startTime: {type: String, required: true},
  endTime: {type: String, required: true},
  location: {type: String, required: true},
  expectPrice: {type: Number, required: true},
  detail: {type: String, required: false},
  creatorId: {type: String, required: true},
  creatorUsername: {type: String, required: true},
  creatorType: {type: String, required: true},
  updatedAt: {type: Date},
  createdAt: {type: Date}
});

module.exports = mongoose.model('SearchPost', SearchPostSchema);