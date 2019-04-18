const Router = require('express').Router;
const Controller = require('./search.controller');
const router = new Router();

router.get('/searchPost', Controller.searchPost);
// router.get('/searchTutor', Controller.searchTutor);

module.exports = router;