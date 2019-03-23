var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Search = require('../model/offer.model');
var mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());