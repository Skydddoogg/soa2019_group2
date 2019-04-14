const Router = require('express').Router;
const Controller = require('./post.controller');
const router = new Router();

router.get('/:postid', Controller.getPostByPostId);
router.get('/:username/allpost', Controller.getAllPostByUsername);
router.post('/create', Controller.createPost);
router.put('/update/:id', Controller.updatePost);
router.delete('/delete/:id', Controller.deletePost);

module.exports = router;