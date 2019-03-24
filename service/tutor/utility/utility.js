var ObjectID = require('mongodb').ObjectID;

module.exports = {
    checkNull: function (tutorId) {
      if (tutorId == 'any'){
        return {};
      }else {
        return {_id: new ObjectID(tutorId)};
      }
    }
  };
    
  var utility = function () {}