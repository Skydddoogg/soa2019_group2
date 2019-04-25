const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProfileSchema = new mongoose.Schema({
  _id: {type: ObjectId, required: true},
  userType: {type: String, enum: ['student', 'tutor']},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  nickname: {type: String, required: true},
  profileImg: {type: String, required: true},
  highSchool: {type: String, required: true},
  bachelor: {type: String, required: true},
  master: {type: String, required: true},
  doctoral: {type: String, required: true},
  majorInBachelor: {type: String, required: true},
  majorInMaster: {type: String, required: true},
  majorInDoctoral: {type: String, required: true},
  majorInHighSchool: {type: String, required: true}
});

module.exports = mongoose.model('Profile', ProfileSchema);