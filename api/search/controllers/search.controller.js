var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Search = require('../models/search.model');
var mongoose = require('mongoose');

exports.getAllPosts = (req, res) => {
    Search.find({}, function (err, posts) {
        if (err) return res.status(400).send("There was a problem finding the posts");
        res.status(201).send(posts);
    });
}

exports.getBySubject = (req, res) => {
    Search.find({"subject" : req.params.subject}, function (err, posts) {
        if (err) return res.status(400).send("There was a problem finding the user.");
        res.status(201).send(posts);
    });
}