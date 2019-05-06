const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProfileSchema = new mongoose.Schema({
  _id: {type: ObjectId, required: true},
  userType: {type: String, enum: ['student', 'tutor']},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  highSchool: {type: String},
  bachelor: {type: String},
  master: {type: String},
  doctoral: {type: String},
  majorInBachelor: {type: String},
  majorInMaster: {type: String},
  majorInDoctoral: {type: String},
  majorInHighSchool: {type: String}
});

module.exports = mongoose.model('Profile', ProfileSchema);