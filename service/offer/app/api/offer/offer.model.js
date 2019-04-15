const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  postId: {type: String, required: true},
  tutorId: {type: String, required: true},
  tutorUsername: {type: String, required: true},
  mark:{type: String, enum: ['readed', 'unread'], default: 'unread'},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Offer', OfferSchema);