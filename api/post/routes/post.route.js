const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const PostController = require('../controllers/post.controller');

router.post('/create', PostController.validate('createAndUpdate'), PostController.postCreate);

router.put('/edit/:id', PostController.validate('createAndUpdate'), PostController.postEdit);

router.delete('/delete/:id', PostController.postDelete);

module.exports = router;
