var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var TutorController = require('../controllers/tutor.controller');

router.get('/:tutorid', TutorController.getByParam);

module.exports = router;
