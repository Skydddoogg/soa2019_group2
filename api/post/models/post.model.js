var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  subject: {type: String, required: true},
  level: {type: String, required: true},
  start_time: {type: String, required: true, max: 50},
  end_time: {type: String, required: true, max: 50},
  location: {type: String, required: true},
  expect_price: {type: Number, required: true},
  detail: {type: String, required: false, max: 300},
  timestamp: {type: Number, required: true},
  creator_id: {type: String, required: true},
  creator_username: {type: String, required: true},
  creator_type: {type: String, required: true}
});
mongoose.model('Post', PostSchema);

module.exports = mongoose.model('Post', PostSchema);