const Router = require('express').Router;
const Controller = require('./post.controller');
const router = new Router();

router.post('/create', Controller.validate('createAndUpdate'), Controller.postCreate);
router.put('/update/:id', Controller.validate('createAndUpdate'), Controller.postUpdate);
router.delete('/delete/:id', Controller.postDelete);

module.exports = router;