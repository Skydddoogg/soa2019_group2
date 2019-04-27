require('module-alias/register');

const Router = require('express').Router;
const Controller = require('./post.controller');
const passport = require('passport')
const router = new Router();

require('@conf/passport')(passport)

router.get('/:postid', Controller.getPostByPostId);
// router.get('/:username/allpost', Controller.getAllPostByUsername);
router.post('/create', passport.authenticate('jwt', {session: false}), Controller.createPost);
router.put('/update/:postid', passport.authenticate('jwt', {session: false}), Controller.updatePost);
router.delete('/delete/:postid', passport.authenticate('jwt', {session: false}), Controller.deletePost);

module.exports = router;