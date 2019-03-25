const Router = require('express').Router;
const Controller = require('./search.controller');
const router = new Router();

router.get('/:subject/:level/:startPrice/:endPrice', Controller.getByParam);

module.exports = router;