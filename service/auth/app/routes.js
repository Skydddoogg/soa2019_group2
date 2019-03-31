module.exports = function (app) {
  app.use('/api/auth', require('./api/auth'));
};