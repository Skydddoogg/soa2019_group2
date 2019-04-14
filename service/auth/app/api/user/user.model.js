const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  hashedPassword: {type: String, required: true},
  // firstname: {type: String, required: true},
  // lastname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  userType: {type: String, enum: ['student', 'tutor']}
});

module.exports = mongoose.model('User', UserSchema);