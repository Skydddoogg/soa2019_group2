const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const ReviewSchema = new mongoose.Schema({
    ownerId: {type: String, required: true},
    ownerUsername: {type: String, required: true},
    ownerType: {type: String, enum: ['student', 'tutor']},
    targetId: {type: String, required: true},
    targetUsername: {type: String, required: true},
    targetType: {type: String, enum: ['student', 'tutor']},
    message: {type: String, required: true},
    profileImg: {type: String, required: true}
});
ReviewSchema.plugin(timestamps);

module.exports = mongoose.model('Review', ReviewSchema);