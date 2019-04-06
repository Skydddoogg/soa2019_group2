module.exports = function (app) {
  app.use('/', require('./api/post'));
};