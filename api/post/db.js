const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/post', { useNewUrlParser: true, useFindAndModify: false });