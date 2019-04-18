require('module-alias/register');

const Router = require('express').Router;
const Controller = require('./review.controller');
const passport = require('passport')
const router = new Router();

require('@conf/passport')(passport)

router.post('/create', passport.authenticate('jwt', {session: false}), Controller.reviewCreate);
router.get('/reviews/:targetid', Controller.getReviews);

module.exports = router;