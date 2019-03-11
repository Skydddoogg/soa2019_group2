var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// var expressValidator = require('express-validator');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var PostController = require('../controllers/post.controller');

// Create new post
router.post('/create', PostController.validate('postCreate'), PostController.postCreate);

router.put('/:postid/update', PostController.post_update);
router.delete('/:postid/delete', PostController.post_delete);

router.get('/', function (req, res) {
  res.status(200).json({ message:'hello world' });
});

module.exports = router;