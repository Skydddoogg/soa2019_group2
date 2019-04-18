require('module-alias/register');

const Router = require('express').Router;
const Controller = require('./profile.controller');
const passport = require('passport')
const router = new Router();

require('@conf/passport')(passport)

router.get('/:userid', Controller.getProfile);
router.put('/:userid/edit', passport.authenticate('jwt', {session: false}), Controller.editProfile);

module.exports = router;