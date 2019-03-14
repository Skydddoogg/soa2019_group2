var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var PostSchema = new mongoose.Schema({
  subject: {type: String, required: true},
  level: {type: String, required: true},
  start_time: {type: String, required: true},
  end_time: {type: String, required: true},
  location: {type: String, required: true},
  expect_price: {type: Number, required: true},
  detail: {type: String, required: false},
  creator_id: {type: String, required: true},
  creator_username: {type: String, required: true},
  creator_type: {type: String, required: true}
});
PostSchema.plugin(timestamps, {
  createdAt: 'created_at',
  updatedAt: 'last_updated_at'
});
mongoose.model('Post', PostSchema);

module.exports = mongoose.model('Post');