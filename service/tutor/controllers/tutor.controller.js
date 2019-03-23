var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Tutor = require('../models/tutor.model');
var mongoose = require('mongoose');
var Util = require('../utility/utility');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

exports.getByParam = (req, res) => {

    var tutorId = req.params.tutorid;
    var query = Util.checkNull(tutorId);

    Tutor.find(query, function (err, tutors) {
        if (err) {
            return res.status(400).json("There was a problem finding the tutor.");
        }else {
            res.status(201).json(tutors);
        }
    });
}