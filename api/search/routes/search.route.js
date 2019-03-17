var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var SearchController = require('../controllers/search.controller');

router.get('/', SearchController.getAllPosts);

router.get('/:subject/:level/:startPrice/:endPrice', SearchController.getByParam);

module.exports = router;
