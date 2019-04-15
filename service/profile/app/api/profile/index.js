const Router = require('express').Router;
const Controller = require('./profile.controller');
const router = new Router();

router.get('/:userid', Controller.getProfile);
// router.put('/:userid/edit', Controller.editProfile);

module.exports = router;