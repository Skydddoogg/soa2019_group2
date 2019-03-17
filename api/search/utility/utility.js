module.exports = {
  checkNull: function (arraySubject, arrayLevel, startPrice, endPrice) {
    if (arraySubject.includes('default') && arrayLevel.includes('default')){
      return {expect_price : {$gte:parseInt(startPrice), $lte:parseInt(endPrice)}};
    }
    else if (arraySubject.includes('default') && !arrayLevel.includes('default')){
      return {level : arrayLevel, expect_price : {$gte:parseInt(startPrice), $lte:parseInt(endPrice)}};
    }
    else if (!arraySubject.includes('default') && arrayLevel.includes('default')){
      return {subject : arraySubject, expect_price : {$gte:parseInt(startPrice), $lte:parseInt(endPrice)}};
    }
    else {
      return {subject : arraySubject, level : arrayLevel, expect_price : {$gte:parseInt(startPrice), $lte:parseInt(endPrice)}};
    }
  }
};
  
var utility = function () {}