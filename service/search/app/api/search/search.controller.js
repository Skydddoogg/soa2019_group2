require('./kafka/consumer');

const SearchPost = require('./search.post.model');
const Util = require('./utility/util');
const Controller = {};

Controller.getByParam = (req, res) => {
  var arraySubject = req.params.subject.split('&');
  var arrayLevel = req.params.level.split('&');
  var startPrice = req.params.startPrice;
  var endPrice = req.params.endPrice;

  var query = Util.checkNull(arraySubject, arrayLevel, startPrice, endPrice);

  SearchPost.find(query, function (err, posts) {
    if (err) {
      return res.status(400).json("There was a problem finding the posts");
    } else {
      res.status(201).json({status: "success", data: posts});
    }
  });
}

module.exports = Controller;