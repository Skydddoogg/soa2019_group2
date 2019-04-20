// require('module-alias/register');

const Router = require('express').Router;
const Controller = require('./search.controller');
const router = new Router();

router.get('/:userid/allposts', Controller.getAllPostsByUserId);

module.exports = router;