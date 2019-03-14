var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var PostController = require('../controllers/post.controller');

// Create new post
router.post('/create', PostController.validate('createAndUpdate'), PostController.postCreate);
console.log(PostController.postEdit)
router.put('/edit/:id', PostController.validate('createAndUpdate'), PostController.postEdit);
router.delete('/delete/:id', PostController.postDelete);

module.exports = router;