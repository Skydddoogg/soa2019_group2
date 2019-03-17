var mongoose = require('mongoose');

var SearchSchema = new mongoose.Schema({
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
mongoose.model('posts', SearchSchema);

module.exports = mongoose.model('posts');