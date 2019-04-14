const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  hashedPassword: {type: String, required: true},
  userType: {type: String, enum: ['student', 'tutor']}
});

module.exports = mongoose.model('User', UserSchema);