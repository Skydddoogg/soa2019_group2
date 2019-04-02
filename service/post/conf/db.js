const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URL || 'mongodb://localhost:27017/post-dev';

var connectWithRetry = function() {
  console.log('Post service is connecting database at: ' + connectionString);
  return mongoose.connect(connectionString, { useNewUrlParser: true, useFindAndModify: false }, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec ', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};
connectWithRetry();