const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const ReviewSchema = new mongoose.Schema({
    message: {type: String, required: true},
    ownerId: {type: String, required: true},
    targetId: {type: String, required: true},
    ownerUsername: {type: String, required: true},
    targetUsername: {type: String, required: true},
    ownerType: {type: String, required: true},
    targetType: {type: String, enum: ['student', 'tutor']}
});
ReviewSchema.plugin(timestamps);

module.exports = mongoose.model('Review', ReviewSchema);