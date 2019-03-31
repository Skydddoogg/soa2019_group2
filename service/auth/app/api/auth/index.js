const Router = require('express').Router;
const Controller = require('./user.controller');
const router = new Router();

// router.post('/signUp', Controller.validate('signUp'), Controller.signUp);
// router.post('/signIn', Controller.validate('signIn'), Controller.signIn);
router.post('/signUp', Controller.signUp);
// router.post('/signIn', Controller.signIn);
// router.get('/protected', Controller.protectedPage)

module.exports = router;