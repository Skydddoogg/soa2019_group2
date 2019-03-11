const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/post.controller');

router.get('/test', post_controller.test);

module.exports = router;