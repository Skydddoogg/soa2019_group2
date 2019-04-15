const Router = require('express').Router;
const Controller = require('./inbox.controller');
const router = new Router();

router.get('/:studentid', Controller.getOfferInbox);
router.get('/:studentid/:offerindex/', Controller.markAsReadedOffer);
router.post('/create', Controller.createOffer);

module.exports = router;