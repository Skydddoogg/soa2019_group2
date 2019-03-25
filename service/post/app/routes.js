module.exports = function (app) {
  app.use('/api/post', require('./api/post'));
};