var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Search = require('../models/search.model');
var mongoose = require('mongoose');
var Util = require('../utility/utility');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

exports.getByParam = (req, res) => {
    var arraySubject = req.params.subject.split('&');
    var arrayLevel = req.params.level.split('&');
    var startPrice = req.params.startPrice;
    var endPrice = req.params.endPrice;

    var query = Util.checkNull(arraySubject, arrayLevel, startPrice, endPrice);

    Search.find(query, function (err, posts) {
        if (err) {
            return res.status(400).json("There was a problem finding the posts");
        }else {
            res.status(201).json(posts);
        }
    });
}