module.exports = {
  checkNull: function (arraySubject, arrayLevel, startPrice, endPrice) {
    if (arraySubject.includes('default') && arrayLevel.includes('default')){
      return {expectPrice : {$gte:parseInt(startPrice), $lte:parseInt(endPrice)}};
    }
    else if (arraySubject.includes('default') && !arrayLevel.includes('default')){
      return {level : arrayLevel, expectPrice : {$gte:parseInt(startPrice), $lte:parseInt(endPrice)}};
    }
    else if (!arraySubject.includes('default') && arrayLevel.includes('default')){
      return {subject : arraySubject, expectPrice : {$gte:parseInt(startPrice), $lte:parseInt(endPrice)}};
    }
    else {
      return {subject : arraySubject, level : arrayLevel, expectPrice : {$gte:parseInt(startPrice), $lte:parseInt(endPrice)}};
    }
  }
};
  
var utility = function () {}