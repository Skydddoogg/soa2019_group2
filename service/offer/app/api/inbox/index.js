const Router = require('express').Router;
const Controller = require('./inbox.controller');
const router = new Router();

// router.get('/:userid', Controller.getOffer);
router.post('/create', Controller.createOffer);

module.exports = router;