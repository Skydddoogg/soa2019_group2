require('module-alias/register');

const Router = require('express').Router;
const Controller = require('./inbox.controller');
const passport = require('passport')
const router = new Router();

require('@conf/passport')(passport)

router.get('/:studentid', passport.authenticate('jwt', {session: false}), Controller.getOfferInbox);
router.get('/:studentid/:offerindex/', passport.authenticate('jwt', {session: false}), Controller.markAsReadedOffer);
router.post('/create', passport.authenticate('jwt', {session: false}), Controller.createOffer);

module.exports = router;