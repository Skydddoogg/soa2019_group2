var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Search = require('../models/search.model');
var mongoose = require('mongoose');
var Util = require('../utility/utility');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

exports.getByParam = (req, res) => {
    // var a = Util.checkNull(req.params.subject);
    // var b = Util.checkNull(req.params.level);
    // var c = Util.checkNull(req.params.startPrice);
    // var d = Util.checkNull(req.params.endPrice);

    Search.find({subject : {$exists: true}, level : req.params.level, expect_price : {$gte:parseInt(req.params.startPrice), $lte:parseInt(req.params.endPrice)}}, function (err, posts) {
        if (err) {
            return res.status(400).json("There was a problem finding the posts");
        }else {
            res.status(201).json(posts);
        }
    });
}