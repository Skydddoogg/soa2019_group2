const Router = require('express').Router;
const Controller = require('./review.controller');
const router = new Router();

router.post('/create', Controller.reviewCreate);
router.get('/reviews/:targetid', Controller.getReviews);

module.exports = router;