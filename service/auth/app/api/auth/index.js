const Router = require('express').Router;
const Controller = require('./user.controller');
const passport = require('passport');
const router = new Router();

// router.post('/signup', Controller.validate('signup'), Controller.signup);
// router.post('/signin', Controller.validate('signin'), Controller.signin);
router.post('/signup', Controller.signup);
router.post('/signin', Controller.signin);
router.get('/protected', passport.authenticate('jwt', {session: false}), Controller.protectedPage)

module.exports = router;