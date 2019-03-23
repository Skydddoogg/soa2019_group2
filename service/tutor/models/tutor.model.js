var mongoose = require('mongoose');

var TutorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    posts: {type: Number, required: true},
    education: {type: String, required: true},
    profile_img_url: {type: String, required: true},
});
mongoose.model('tutors', TutorSchema);

module.exports = mongoose.model('tutors');