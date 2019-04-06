module.exports = function (app) {
  app.use('/', require('./api/search'));
};