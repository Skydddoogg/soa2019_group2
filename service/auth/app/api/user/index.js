const Router = require('express').Router;
const Controller = require('./user.controller');
const router = new Router();

router.post('/signup', Controller.signup);
router.post('/signin', Controller.signin);

module.exports = router;