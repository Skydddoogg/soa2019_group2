const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/post'

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false });