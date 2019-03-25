module.exports = function (app) {
  app.use('/api/search', require('./api/search'));
};