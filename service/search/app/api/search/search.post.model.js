const mongoose = require('mongoose');
const mongooseAlgolia = require('mongoose-algolia');
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
  creatorType: {type: String, enum: ['student', 'tutor']},
  updatedAt: {type: Date},
  createdAt: {type: Date}
});

SearchPostSchema.plugin(mongooseAlgolia,{
  appId: 'P8OW22R5NQ',
  apiKey: 'a985170bc1483d2b8ba621bf8d5be32a',
  indexName: 'dev_posts',
  filter: function(doc) {
    return !doc.softdelete
  },
  debug: true // Default: false -> If true operations are logged out in your console
});

module.exports = mongoose.model('SearchPost', SearchPostSchema);