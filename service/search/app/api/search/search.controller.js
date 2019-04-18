// require('../../kafka/consumer');

const SearchPost = require('./search.post.model');
const Util = require('../../utility/util');

exports.searchPost = async (req, res) => {
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
  // const subject = req.query.subject;
  // const level = req.query.level;
  // const location = req.query.location;
  // const expectPrice = req.query.expectPrice; // Maximum of expect price
  // console.log(subject, level, location, expectPrice);
  // let result = await Post.find({
  //   subject: { '$regex' : subject, '$options' : 'i' },
  //   level: level,
  //   location: { '$regex' : location, '$options' : 'i' },
  //   expectPrice: expectPrice
  // });
  // return res.status(200).json(result);
}
