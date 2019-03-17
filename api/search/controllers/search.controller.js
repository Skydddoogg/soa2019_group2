var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Post = require('../models/search.model');
var mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

exports.getAllPosts = (req, res) => {
    Post.find({}, function (err, posts) {
        if (err) {
            console.log("Error");
            return res.status(400).json("There was a problem finding the posts");
        }else {
            console.log("Success");
            res.status(201).json(posts);
        }
    });
}

// exports.getBySubject = (req, res) => {
//     Search.find({"subject" : req.params.subject}, function (err, posts) {
//         if (err) return res.status(400).send("There was a problem finding the user.");
//         res.status(201).send(posts);
//     });
// }