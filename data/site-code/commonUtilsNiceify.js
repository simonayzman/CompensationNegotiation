'use strict';
/**
 * @param {!Object} metapakModulesSequence
 * @return {?}
 */
function findShortestTitleName(metapakModulesSequence) {
  return metapakModulesSequence.reduce(function(lyricsLine, chordLine) {
    return lyricsLine.length < chordLine.length ? lyricsLine : chordLine;
  });
}
/**
 * @param {string} originalBaseURL
 * @return {?}
 */
function encodeNameForUrl(originalBaseURL) {
  var value = originalBaseURL.replace("&", " and ").replace(/\W+/g, "-").replace(/-+/g, "-");
  return value.startsWith("-") && (value = value.slice(1, value.length)), value.endsWith("-") && (value = value.slice(0, value.length - 1)), "" === value && console.log("ERROR: Encoded Name has no valid characters"), value;
}
/**
 * @param {?} el1
 * @param {?} el2
 * @param {string} paper
 * @return {?}
 */
function yearComparison(el1, el2, paper) {
  return "=" === paper ? parseInt(el1) === parseInt(el2) : "<" === paper ? parseInt(el1) < parseInt(el2) : ">" === paper ? parseInt(el1) > parseInt(el2) : "<=" === paper ? parseInt(el1) <= parseInt(el2) : ">=" === paper && parseInt(el1) >= parseInt(el2);
}
/**
 * @param {?} canCreateDiscussions
 * @return {?}
 */
function isElementFalse(canCreateDiscussions) {
  return !canCreateDiscussions;
}
/**
 * @return {?}
 */
function getQueryStringMap() {
  return function() {
    var d = {};
    /** @type {string} */
    var n = window.location.search.substring(1);
    if ("/" == n.charAt(n.length - 1)) {
      /** @type {string} */
      n = n.substr(0, n.length - 1);
    }
    /** @type {!Array<string>} */
    var paramsSplit = n.split("&");
    /** @type {number} */
    var i = 0;
    for (; i < paramsSplit.length; i++) {
      /** @type {!Array<string>} */
      var parts = paramsSplit[i].split("=");
      if (void 0 === d[parts[0]]) {
        /** @type {string} */
        d[parts[0]] = decodeURIComponent(parts[1]);
      } else {
        if ("string" == typeof d[parts[0]]) {
          /** @type {!Array} */
          var newMouse = [d[parts[0]], decodeURIComponent(parts[1])];
          /** @type {!Array} */
          d[parts[0]] = newMouse;
        } else {
          d[parts[0]].push(decodeURIComponent(parts[1]));
        }
      }
    }
    return d;
  }();
}
/**
 * @param {string} value
 * @return {?}
 */
function numberWithCommas(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
/**
 * @param {!Function} ctx
 * @param {number} timeout
 * @return {?}
 */
function throttle(ctx, timeout) {
  /** @type {null} */
  var _takingTooLongTimeout = null;
  return function() {
    var r = this;
    /** @type {!Arguments} */
    var arg = arguments;
    clearTimeout(_takingTooLongTimeout);
    _takingTooLongTimeout = window.setTimeout(function() {
      ctx.apply(r, arg);
    }, timeout || 500);
  };
}
/**
 * @param {!NodeList} result
 * @param {!Function} dir
 * @return {?}
 */
function getNormalizedSalaryRows(result, dir) {
  /** @type {!Array} */
  var b = [];
  /** @type {number} */
  var i = 0;
  for (; i < result.length; i++) {
    b.push(result[i]);
    /** @type {number} */
    b[i].totalyearlycompensation = parseInt(result[i].totalyearlycompensation);
    /** @type {number} */
    b[i].basesalary = parseInt(result[i].basesalary);
    /** @type {number} */
    b[i].stockgrantvalue = parseInt(result[i].stockgrantvalue);
    /** @type {number} */
    b[i].bonus = parseInt(result[i].bonus);
    if (b[i].totalyearlycompensation > 5e3) {
      /** @type {number} */
      b[i].totalyearlycompensation = b[i].totalyearlycompensation / 1e3;
    }
    if (b[i].basesalary > 5e3) {
      /** @type {number} */
      b[i].basesalary = b[i].basesalary / 1e3;
    }
    if (b[i].stockgrantvalue > 5e3) {
      /** @type {number} */
      b[i].stockgrantvalue = b[i].stockgrantvalue / 1e3;
    }
    if (b[i].bonus > 5e3) {
      /** @type {number} */
      b[i].bonus = b[i].bonus / 1e3;
    }
  }
  return dir ? b.filter(function(previousMessage) {
    /** @type {!Date} */
    var expected_date2 = new Date(previousMessage.timestamp);
    /** @type {!Date} */
    var playdate = new Date;
    return !(expected_date2 < playdate.setMonth(playdate.getMonth() - 12));
  }) : b;
}
/**
 * @param {!Array} uvx1
 * @param {string} uvy1
 * @param {string} a
 * @param {!Object} b
 * @return {?}
 */
function levelNameMatches(uvx1, uvy1, a, b) {
  return b || (b = "Software Engineer"), uvx1.some(function(e) {
    return levelNameMatch(e, uvy1, a, b);
  });
}
/**
 * @param {string} sVal
 * @param {string} uvy1
 * @param {string} a
 * @param {!Object} lst
 * @return {?}
 */
function levelNameMatch(sVal, uvy1, a, lst) {
  var b = sVal.toLowerCase().trim();
  var path = uvy1.toLowerCase().trim();
  if ("" === path) {
    return false;
  }
  if ("vmware" === a.toLowerCase().trim() && "Software Engineer" === lst) {
    return "member of technical staff (mts 1)" === b ? path === b || "mts1" === path || "mts 1" === path : b === path || b.replace(/ /g, "") === path.replace(/ /g, "");
  }
  if ("ebay" === a.toLowerCase().trim() && "Software Engineer" === lst) {
    return "senior mts" === b && ("senior member of technical staff" === path || "sr. mts" === path) || (b === path || b.replace(/ /g, "") === path.replace(/ /g, ""));
  }
  if (("electronic arts" === a.toLowerCase().trim() || "ea" === a.toLowerCase().trim()) && "Software Engineer" === lst) {
    return b === path;
  }
  if ("cisco" === a.toLowerCase().trim() && "Software Engineer" === lst) {
    return b === path;
  }
  if ("paypal" === a.toLowerCase().trim() && "Software Engineer" === lst) {
    return b === path;
  }
  if ("autodesk" === a.toLowerCase().trim() && "Software Engineer" === lst) {
    if (("senior software engineer 1" === b || "senior software engineer 2" === b) && -1 === path.indexOf("senior")) {
      return false;
    }
    if (("software engineer 1" === b || "software engineer 2" === b) && path.indexOf("senior") > -1) {
      return false;
    }
  }
  if ("twilio" === a.toLowerCase().trim() && "Software Engineer" === lst) {
    if (("senior software engineer 1" === b || "senior software engineer 2" === b) && -1 === path.indexOf("senior")) {
      return false;
    }
    if (("software engineer 1" === b || "software engineer 2" === b) && path.indexOf("senior") > -1) {
      return false;
    }
  }
  if ("oyo" === a.toLowerCase().trim() && "Software Engineer" === lst) {
    return b === path;
  }
  if ("squarespace" === a.toLowerCase().trim() && "Software Engineer" === lst) {
    if (b.indexOf("software engineer") > -1 || b.indexOf("senior engineer") > -1) {
      return false;
    }
    if ("se1" === b && "senior 1" === path) {
      return true;
    }
    if (2 === b.length) {
      return b === path;
    }
  }
  if ("uber" === a.toLowerCase().trim() && ("5a" === b || "5b" === b)) {
    return -1 !== path.indexOf(b);
  }
  if ("Software Engineering Manager" === lst && "google" === a.toLowerCase()) {
    return b === path;
  }
  if ("Product Manager" === lst && "google" === a.toLowerCase()) {
    return b === path;
  }
  if ("Software Engineering Manager" === lst && "facebook" === a.toLowerCase()) {
    if ("m1" === b) {
      return path.indexOf("m1") > -1 || path.indexOf("m 1") > -1 || path.indexOf("manager1") > -1 || path.indexOf("manager 1") > -1 || path === b;
    }
    if ("d1" === b) {
      return path.indexOf("d1") > -1 || path.indexOf("d 1") > -1 || path.indexOf("director1") > -1 || path.indexOf("director 1") > -1 || path.indexOf("dir1") > -1 || path.indexOf("dir 1") > -1 || path === b;
    }
    if ("vp1" === b) {
      return path.indexOf("vp1") > -1 || path.indexOf("vp 1") > -1 || path.indexOf("vice president 1") > -1 || path.indexOf("vicepresident1") > -1 || path.indexOf("vicepresident 1") > -1 || path.indexOf("vice president1") > -1 || path === b;
    }
    if ("m2" === b) {
      return path.indexOf("m2") > -1 || path.indexOf("m 2") > -1 || path.indexOf("manager2") > -1 || path.indexOf("manager 2") > -1 || path === b;
    }
    if ("d2" === b) {
      return path.indexOf("d2") > -1 || path.indexOf("d 2") > -1 || path.indexOf("director2") > -1 || path.indexOf("director 2") > -1 || path.indexOf("dir2") > -1 || path.indexOf("dir 2") > -1 || path === b;
    }
    if ("vp2" === b) {
      return path.indexOf("vp2") > -1 || path.indexOf("vp 2") > -1 || path.indexOf("vice president 2") > -1 || path.indexOf("vicepresident2") > -1 || path.indexOf("vicepresident 2") > -1 || path.indexOf("vice president2") > -1 || path === b;
    }
  }
  if ("Product Manager" === lst && "google" === a.toLowerCase()) {
    if ("apm1" === b || "associate product manager 1" === b) {
      return path.indexOf("apm1") > -1 || path.indexOf("apm 1") > -1 || path === b;
    }
    if ("apm2" === b || "associate product manager 2" === b) {
      return path.indexOf("apm2") > -1 || path.indexOf("apm 2") > -1 || path === b;
    }
  }
  return b === path || null !== b.match(/\d/g) && null !== path.match(/\d/g) && b.match(/\d/g).join("") === path.match(/\d/g).join("") || b.replace(/ /g, "") === path.replace(/ /g, "");
}
/**
 * @param {!Array} ar
 * @param {!HTMLDocument} index
 * @param {!Object} id
 * @param {string} prop
 * @param {?} value
 * @return {?}
 */
function getFilteredSalaryRows(ar, index, id, prop, value) {
  var clippedX = index[id][prop].map(function(tmp) {
    return tmp.titles;
  }).filter(function(e) {
    return e.includes(value);
  })[0];
  var successRates = ar.filter(function($scope) {
    return $scope.title === id && ($scope.company.toLowerCase().trim() === prop.toLowerCase().trim() && (!!levelNameMatches(clippedX, $scope.level, prop, id) && !(!$scope.basesalary || "" === $scope.basesalary)));
  });
  return successRates.length > 20 ? successRates.filter(function(previousMessage) {
    /** @type {!Date} */
    var expected_date2 = new Date(previousMessage.timestamp);
    /** @type {!Date} */
    var playdate = new Date;
    return !(expected_date2 < playdate.setMonth(playdate.getMonth() - 12));
  }) : successRates;
}
/**
 * @param {?} e
 * @param {!HTMLDocument} f
 * @param {!Object} v
 * @param {string} c
 * @param {?} raw
 * @return {?}
 */
function getAverageSalaryInfo(e, f, v, c, raw) {
  if (null == e) {
    return "";
  }
  var ret = getFilteredSalaryRows(e, f, v, c, raw);
  if ((ret = ret.sort(function(tweet, download) {
    return -1 * ((Date.parse(tweet.timestamp) > Date.parse(download.timestamp)) - (Date.parse(tweet.timestamp) < Date.parse(download.timestamp)));
  })).length < 4) {
    return "";
  }
  /** @type {number} */
  var sumY = 0;
  /** @type {number} */
  var res = 0;
  /** @type {number} */
  var sum = 0;
  /** @type {number} */
  var n = 0;
  /** @type {number} */
  var i = 0;
  for (; i < ret.length; i++) {
    var str = ret[i];
    if (str && str.basesalary) {
      /** @type {number} */
      var b = parseInt(str.basesalary);
      /** @type {number} */
      var value = parseInt(str.stockgrantvalue || "0");
      /** @type {number} */
      var t = parseInt(str.bonus || "0");
      /** @type {number} */
      var p = parseInt(str.totalyearlycompensation || "0");
      /** @type {number} */
      var y = b < 1e3 ? 1e3 * b : b;
      /** @type {number} */
      var h = value < 1e3 ? 1e3 * value : value;
      /** @type {number} */
      var d = t < 1e3 ? 1e3 * t : t;
      /** @type {number} */
      var g = p < 1e3 ? 1e3 * p : p;
      if (Math.abs(g - (y + h + d)) > 2e4) {
        if (Math.abs(g - (y + h / 4 + d)) > 2e4) {
          continue;
        }
        /** @type {number} */
        h = h / 4;
      }
      /** @type {number} */
      sumY = sumY + y;
      /** @type {number} */
      res = res + h;
      /** @type {number} */
      sum = sum + d;
      n++;
    }
  }
  return [sumY = Math.round(sumY / n), res = Math.round(res / n), sum = Math.round(sum / n)];
}
/**
 * @param {?} e
 * @param {!HTMLDocument} f
 * @param {!Object} v
 * @param {string} c
 * @param {?} raw
 * @return {?}
 */
function getNumRowsForCompanyAndLevel(e, f, v, c, raw) {
  if (null == e) {
    return 0;
  }
  var ret = getFilteredSalaryRows(e, f, v, c, raw);
  if ((ret = ret.sort(function(tweet, download) {
    return -1 * ((Date.parse(tweet.timestamp) > Date.parse(download.timestamp)) - (Date.parse(tweet.timestamp) < Date.parse(download.timestamp)));
  })).length < 4) {
    return 0;
  }
  /** @type {number} */
  var j = 0;
  /** @type {number} */
  var i = 0;
  for (; i < ret.length; i++) {
    var str = ret[i];
    if (str && str.basesalary) {
      /** @type {number} */
      var b = parseInt(str.basesalary);
      /** @type {number} */
      var k = parseInt(str.stockgrantvalue || "0");
      /** @type {number} */
      var t = parseInt(str.bonus || "0");
      /** @type {number} */
      var max = parseInt(str.totalyearlycompensation || "0");
      /** @type {number} */
      var _ = b < 1e3 ? 1e3 * b : b;
      /** @type {number} */
      var c = k < 1e3 ? 1e3 * k : k;
      /** @type {number} */
      var m = t < 1e3 ? 1e3 * t : t;
      /** @type {number} */
      var bottom = max < 1e3 ? 1e3 * max : max;
      if (Math.abs(bottom - (_ + c + m)) > 2e4) {
        if (Math.abs(bottom - (_ + c / 4 + m)) > 2e4) {
          continue;
        }
        /** @type {number} */
        c = c / 4;
      }
      _;
      c;
      m;
      j++;
    }
  }
  return j;
}
/**
 * @param {?} data
 * @param {!HTMLDocument} fn
 * @param {!Object} count
 * @param {string} options
 * @param {?} childCompute
 * @return {?}
 */
function getMedianSalaryInfo(data, fn, count, options, childCompute) {
  if (null == data) {
    return "";
  }
  var values = getFilteredSalaryRows(data, fn, count, options, childCompute).map(function(stat) {
    parseInt(stat.basesalary);
    parseInt(stat.stockgrantvalue || "0");
    parseInt(stat.bonus || "0");
    parseInt(stat.totalyearlycompensation || "0");
    return stat;
  }).filter(function(stat) {
    /** @type {number} */
    var n = parseInt(stat.basesalary);
    /** @type {number} */
    var b = parseInt(stat.stockgrantvalue || "0");
    /** @type {number} */
    var l = parseInt(stat.bonus || "0");
    /** @type {number} */
    var t = parseInt(stat.totalyearlycompensation || "0");
    /** @type {number} */
    var Ytitle = n < 1e3 ? 1e3 * n : n;
    /** @type {number} */
    var Ymain = b < 1e3 ? 1e3 * b : b;
    /** @type {number} */
    var Yxlabel = l < 1e3 ? 1e3 * l : l;
    /** @type {number} */
    var from = t < 1e3 ? 1e3 * t : t;
    return !(Math.abs(from - (Ytitle + Ymain + Yxlabel)) > 2e4 && Math.abs(from - (Ytitle + Ymain / 4 + Yxlabel)) > 2e4);
  });
  if (values.sort(function(canCreateDiscussions, n) {
    return parseInt(canCreateDiscussions.totalyearlycompensation || "0") - parseInt(n.totalyearlycompensation || "0");
  }), 0 === values.length) {
    return [0, 0, 0];
  }
  var ret = values[parseInt(values.length / 2)];
  /** @type {number} */
  var day = parseInt(ret.basesalary || "0");
  /** @type {number} */
  var time = parseInt(ret.stockgrantvalue || "0");
  /** @type {number} */
  var b = parseInt(ret.bonus || "0");
  return [day = day < 1e3 ? 1e3 * day : day, time = time < 1e3 ? 1e3 * time : time, b = b < 1e3 ? 1e3 * b : b];
}
/**
 * @param {!Array} e
 * @param {?} islongclick
 * @return {?}
 */
function getMedianSalaryRow(e, islongclick) {
  if (null === e || 0 === e.length) {
    return null;
  }
  if (islongclick) {
    e = e.filter(function(header) {
      return !(!header.basesalary || "" === header.basesalary || 0 === header.basesalary);
    });
  }
  var s = e.filter(function(previousMessage) {
    /** @type {!Date} */
    var expected_date2 = new Date(previousMessage.timestamp);
    /** @type {!Date} */
    var playdate = new Date;
    return !(expected_date2 < playdate.setMonth(playdate.getMonth() - 12));
  });
  if (s.length >= 30) {
    e = s;
  }
  var options = e.map(function(stat) {
    parseInt(stat.basesalary);
    parseInt(stat.stockgrantvalue || "0");
    parseInt(stat.bonus || "0");
    parseInt(stat.totalyearlycompensation || "0");
    return stat;
  });
  if (options.sort(function(canCreateDiscussions, n) {
    return parseInt(canCreateDiscussions.totalyearlycompensation || "0") - parseInt(n.totalyearlycompensation || "0");
  }), 0 === options.length) {
    return null;
  }
  var data = options[parseInt(options.length / 2)];
  /** @type {number} */
  var b = parseInt(data.basesalary || "0");
  /** @type {number} */
  var time = parseInt(data.stockgrantvalue || "0");
  /** @type {number} */
  var day = parseInt(data.bonus || "0");
  return {
    row : data,
    base : b = b < 1e3 ? 1e3 * b : b,
    stock : time = time < 1e3 ? 1e3 * time : time,
    bonus : day = day < 1e3 ? 1e3 * day : day
  };
}
/**
 * @return {?}
 */
function getCompanyLevelingDetails() {
  return {
    invalidRows : {
      632 : 1,
      815 : 1,
      1199 : 1,
      131 : 1,
      1238 : 1
    },
    colors : {
      Google : "60, 186, 84",
      Facebook : "59, 89, 152",
      Microsoft : "0, 161, 241",
      Amazon : "255, 153, 0",
      LinkedIn : "0, 119, 181",
      Uber : "0, 0, 0",
      eBay : "255, 211, 0",
      Netflix : "185, 9, 11",
      Apple : "153, 153, 153",
      Salesforce : "117, 170, 255",
      Symantec : "255,215,0",
      Palantir : "31,35,39",
      Oracle : "248,0,0",
      NetApp : "0,103,197",
      Intuit : "16,128,0",
      Yahoo : "123,0,153",
      VMware : "113,112,116",
      Dell : "0,125,184",
      Spotify : "29,185,84",
      Dropbox : "0,126,229",
      Twitter : "0,132,180",
      "Morgan Stanley" : "33,108,166",
      Citi : "216,28,28",
      "Bank of America Merrill Lynch" : "4,37,100",
      UBS : "255,0,0",
      "Goldman Sachs" : "120,153,194",
      "Jefferies and Co" : "41,57,82",
      Snap : "232,229,2",
      Lyft : "231,11,129",
      "JPMorgan Chase" : "88,14,235",
      IBM : "0, 102, 153",
      Airbnb : "241, 102, 100",
      "Tableau Software" : "232, 119, 46",
      Qualcomm : "50, 83, 220",
      "T-Mobile" : "226, 0, 116",
      Barclays : "0,174,239",
      Cisco : "27, 160, 215",
      Square : "108, 121, 128",
      "HBC Digital" : "0, 0, 0",
      Intel : "0, 113, 197",
      Workday : "240, 137, 35",
      "GE Digital" : "58, 115, 184",
      Tesla : "220, 20, 60",
      Pinterest : "189, 8, 28",
      "Capital One" : "0, 73, 119",
      SquareSpace : "0, 0, 0",
      GoDaddy : "0, 73, 119",
      Yandex : "255, 0, 0",
      "Veritas Technologies" : "169, 44, 36",
      Quora : "170, 34, 0",
      SmartThings : "69, 190, 250",
      Splunk : "0, 0, 0",
      Reddit : "255, 86, 0",
      Groupon : "83, 163, 24",
      "General Motors" : "7, 57, 128",
      Coursera : "83, 138, 214",
      PayPal : "0, 112, 186",
      "Citrix Systems Inc" : "0, 0, 0",
      Udacity : "78, 179, 189",
      USAA : "21, 41, 62",
      Indeed : "44, 105, 235",
      "Kimley Horn" : "144, 37, 55",
      "Johnson and Johnson" : "187, 47, 27",
      Medtronic : "29, 74, 131",
      SAP : "0, 185, 242",
      Stripe : "94, 115, 224",
      Yelp : "196, 18, 0",
      Autodesk : "6, 150, 215",
      Nextdoor : "25, 151, 93",
      Adobe : "255, 0, 0",
      Intercom : "0, 92, 255",
      Comcast : "217, 0, 58",
      SoFi : "76, 167, 203",
      Careem : "96, 178, 91",
      Flipkart : "62, 115, 232",
      Broadcom : "188, 52, 55",
      Pivotal : "81, 178, 63",
      Visa : "221, 153, 6",
      "Jedi Order" : "47, 103, 248",
      "Sith Order" : "179, 0, 0",
      "Just Eat" : "242, 77, 77",
      DoorDash : "254, 47, 7",
      Instacart : "96, 171, 89",
      Zillow : "18, 119, 225",
      OYO : "239, 37, 31",
      Arm : "0, 143, 190",
      Atlassian : "0, 82, 204",
      "Argo AI" : "243, 160, 85",
      WeWork : "200, 200, 200",
      Standard : "180, 180, 180",
      "Walmart Labs" : "0, 114, 206",
      Slack : "74, 21, 75",
      Nvidia : "122, 181, 71",
      "BCG Digital Ventures" : "70, 70, 70",
      Cerner : "0, 126, 185",
      McKinsey : "5, 28, 44",
      Accenture : "0, 137, 255",
      "Oliver Wyman" : "0, 168, 200",
      Bain : "238, 50, 36",
      BCG : "38, 106, 46",
      "AT Kearney" : "137, 48, 36",
      Deloitte : "134, 188, 36",
      "Ernst and Young" : "255, 219, 0",
      KPMG : "0, 51, 141",
      LEK : "0, 92, 66",
      "Strategy by PWC" : "0, 0, 0",
      "PWC Advisory" : "216, 86, 4",
      Expedia : "0, 53, 95",
      MongoDB : "77, 179, 61",
      Bloomberg : "40, 0, 215",
      Cloudera : "249, 103, 2",
      Disney : "17, 60, 207",
      GitHub : "0, 0, 0",
      Wayfair : "107, 0, 107",
      Box : "9, 72, 203",
      Qualtrics : "28, 164, 235",
      Rubrik : "30, 140, 155",
      "Two Sigma" : "30, 137, 149",
      Opendoor : "28, 133, 232",
      ServiceNow : "249, 80, 80",
      Okta : "0, 125, 193",
      Glassdoor : "12, 170, 65",
      "Epic Systems" : "188, 1, 58",
      ByteDance : "50, 90, 180",
      Mozilla : "226, 88, 33",
      Etsy : "235, 109, 32",
      DocuSign : "56, 123, 235",
      Robinhood : "33, 206, 153",
      Cruise : "255, 77, 55",
      Roblox : "164, 166, 171",
      Shopify : "149, 191, 71",
      Twilio : "242, 47, 70",
      Affirm : "15, 114, 229",
      "Electronic Arts" : "92, 92, 92",
      Coinbase : "22, 82, 240"
    },
    skillSpectrumPercent : {
      Google : {
        "Software Engineer" : 100,
        "Software Engineering Manager" : 100,
        "Product Manager" : 100,
        "Product Designer" : 90.9
      },
      Microsoft : 100,
      LinkedIn : {
        "Software Engineer" : 90,
        "Software Engineering Manager" : 90,
        "Product Manager" : 90,
        "Product Designer" : 86.4
      },
      Uber : {
        "Software Engineer" : 90,
        "Software Engineering Manager" : 90,
        "Product Manager" : 90,
        "Product Designer" : 85.8
      },
      Facebook : {
        "Software Engineer" : 95,
        "Software Engineering Manager" : 95,
        "Product Manager" : 95,
        "Product Designer" : 87.6
      },
      Amazon : {
        "Software Engineer" : 95,
        "Software Engineering Manager" : 95,
        "Product Manager" : 100,
        "Product Designer" : 87
      },
      IBM : {
        "Product Manager" : 95
      },
      Salesforce : {
        "Software Engineer" : 89,
        "Software Engineering Manager" : 94
      },
      "Argo AI" : {
        "Software Engineer" : 92,
        "Software Engineering Manager" : 92
      },
      Airbnb : {
        "Software Engineer" : 85,
        "Product Manager" : 94
      },
      Tesla : {
        "Software Engineer" : 93,
        "Software Engineering Manager" : 77
      },
      Opendoor : {
        "Software Engineer" : 85,
        "Software Engineering Manager" : 92
      },
      WeWork : {
        "Software Engineer" : 95,
        "Product Manager" : 97
      },
      "BCG Digital Ventures" : {
        "Software Engineer" : 90,
        "Product Manager" : 100
      },
      Accenture : {
        "Software Engineer" : 90,
        "Management Consultant" : 90
      },
      McKinsey : {
        "Management Consultant" : 90
      },
      Bain : {
        "Management Consultant" : 90
      },
      BCG : {
        "Management Consultant" : 90
      },
      Disney : 86,
      Spotify : 94,
      Cloudera : 87,
      Bloomberg : 73,
      MongoDB : 90,
      Expedia : 84,
      Cerner : 82,
      Nvidia : 89,
      eBay : 82,
      Slack : 85,
      "Walmart Labs" : 88,
      Standard : 91,
      Intel : 94,
      SAP : 80,
      Yahoo : 95,
      Pinterest : 80,
      Qualcomm : 80,
      Broadcom : 88,
      Quora : 85,
      SmartThings : 75,
      "General Motors" : 75,
      Udacity : 70,
      USAA : 80,
      Indeed : 88.2,
      "Veritas Technologies" : 82,
      Stripe : 93,
      Yelp : 88,
      VMware : 88,
      Autodesk : 93,
      Nextdoor : 81,
      Adobe : 91,
      Intercom : 88,
      Instacart : 90,
      SoFi : 88,
      Careem : 88,
      Pivotal : 80,
      "Jedi Order" : 96,
      "Just Eat" : 93,
      DoorDash : 85,
      Zillow : 86,
      OYO : 89,
      Arm : 92,
      Atlassian : 87,
      Square : 83,
      GitHub : 80,
      ServiceNow : 95,
      "Goldman Sachs" : {
        "Software Engineer" : 88
      },
      Wayfair : {
        "Software Engineer" : 88,
        "Product Manager" : 95
      },
      Rubrik : 80,
      Okta : 92,
      Glassdoor : 95,
      "Epic Systems" : 85,
      ByteDance : 86,
      Mozilla : 97,
      Etsy : 95,
      DocuSign : {
        "Software Engineer" : 89,
        "Software Engineering Manager" : 84
      },
      Robinhood : 93,
      Cruise : {
        "Software Engineer" : 87,
        "Software Engineering Manager" : 91
      },
      Roblox : 97,
      Shopify : 95,
      Twilio : 91,
      Affirm : 88,
      "Electronic Arts" : 83,
      Coinbase : 80
    },
    companyButtons : {
      "Software Engineer" : ["Google", "Facebook", "Microsoft", "Amazon", "Apple"],
      "Product Manager" : ["Google", "Facebook", "Microsoft", "Amazon", "LinkedIn"],
      "Product Designer" : ["Google", "Facebook", "Amazon", "LinkedIn"],
      "Management Consultant" : ["McKinsey", "BCG", "Bain"],
      "Investment Banker" : ["Goldman Sachs", "Morgan Stanley", "Citi", "JPMorgan Chase"],
      "Software Engineering Manager" : ["Google", "Facebook", "Microsoft", "Amazon", "Oracle"],
      "Civil Engineer" : ["Kimley Horn"],
      "Biomedical Engineer" : ["Johnson and Johnson", "Medtronic"]
    },
    pathnameMapping : {
      "/googlevsfacebook.html" : {
        track : "Software Engineer",
        companiesToRender : ["Google", "Facebook"]
      },
      "/facebookvsamazon.html" : {
        track : "Software Engineer",
        companiesToRender : ["Facebook", "Amazon"]
      }
    }
  };
}
/** @type {!Set} */
var supportedCountryRegions = new Set(["Australia", "Canada", "Germany", "India", "Ireland", "Israel", "Japan", "Netherlands", "Russia", "Singapore", "Switzerland", "United Kingdom"]);
var supportedDmasByRegion = {
  "Greater SF Bay Area" : "807",
  "Greater Seattle Area" : "819",
  "Greater NYC Area" : "501",
  "Greater LA Area" : "803",
  "Greater Boston Area" : "506",
  "Greater Chicago Area" : "602",
  "Greater Austin Area" : "635",
  "Greater Boulder Area" : "751"
};
/** @type {!Set} */
var supportedDmaIds = new Set(Object.values(supportedDmasByRegion));
var supportedRegionsbyDmas = reverseObject(supportedDmasByRegion);
/**
 * @param {!NodeList} serverElements
 * @return {?}
 */
function getDMAsForRegions(serverElements) {
  /** @type {!Set} */
  var o = new Set;
  /** @type {number} */
  var i = 0;
  for (; i < serverElements.length; i++) {
    var e = supportedDmasByRegion[serverElements[i]];
    if (void 0 !== e) {
      /** @type {!Set} */
      o = o.add(e);
    }
  }
  return o;
}
/**
 * @param {!NodeList} keys
 * @return {?}
 */
function getCitiesByRegions(keys) {
  var n = {
    "Greater SF Bay Area" : ["San Francisco, CA", "Silicon Valley", "SF Bay Area", "Bay Area", "San Francisco", "San Francisco Bay Area", "San Mateo, CA", "Redwood City, CA", "Menlo Park, CA", "Fremont, CA", "Palo Alto, CA", "Santa Clara, CA", "Sunnyvale, CA", "San Jose, CA", "Berkeley, CA", "Oakland, CA", "Mountain View, CA", "Burlingame, CA", "Marin, CA", "Union City, CA", "Pleasanton, CA", "Cupertino, CA"],
    807 : ["San Francisco, CA", "San Mateo, CA", "Redwood City, CA", "Menlo Park, CA", "Fremont, CA", "Palo Alto, CA", "Santa Clara, CA", "Sunnyvale, CA", "San Jose, CA", "Berkeley, CA", "Oakland, CA", "Mountain View, CA", "Burlingame, CA", "Marin, CA", "Union City, CA", "Pleasanton, CA", "Cupertino, CA"],
    "Greater Seattle Area" : ["Seattle", "Seattle, WA", "Kirkland, WA", "Redmond, WA", "Bellevue, WA"],
    819 : ["Seattle, WA", "Kirkland, WA", "Redmond, WA", "Bellevue, WA"],
    "Greater NYC Area" : ["New York", "New York, NY", "NYC", "NYC, NY", "Manhattan, NY", "Brooklyn, NY"],
    501 : ["New York, NY", "Manhattan, NY", "Brooklyn, NY"],
    "Greater LA Area" : ["Los Angeles", "Los Angeles, CA", "Santa Monica, CA", "Santa Monica", "Pasadena, CA", "Pasadena", "Irvine, CA", "Orange County, CA", "Anaheim, CA", "Venice, CA", "Burbank, CA", "Long Beach, CA", "Malibu, CA", "Culver City, CA"],
    "Greater Boston Area" : ["Boston", "Boston, MA", "Cambridge", "Cambridge, MA", "Somerville, MA", "Newton, MA", "Quincy, MA", "Brookline, MA", "Malden, MA", "Waltham, MA", "Medford, MA", "Revere, MA", "Watertown, MA", "Lexington, MA"],
    "Greater Chicago Area" : ["Chicago", "Chicago, IL", "Joliet, IL", "Naperville, IL", "Schaumburg, IL", "Evanston, IL"],
    "Greater Austin Area" : ["Austin, TX"],
    "Greater Boulder Area" : ["Boulder", "Boulder, CO", "Denver, CO"]
  };
  /** @type {!Array} */
  var chars = [];
  /** @type {number} */
  var i = 0;
  for (; i < keys.length; i++) {
    keys[i] = keys[i].toString();
    var last = n[keys[i]];
    /** @type {!Array<?>} */
    chars = chars.concat(last);
  }
  return chars.filter(function(canCreateDiscussions) {
    return null != canCreateDiscussions;
  });
}
/**
 * @param {string} ballNumber
 * @return {?}
 */
function levelingStandardResponsibilities(ballNumber) {
  return {
    "Software Engineer" : "Develop and maintain low to moderately complex components working on a team. Typically receives guidance and support from more experienced team members.",
    "Senior Engineer" : "Develop and own moderate to complex components. Possibly lead a small team / project. Ability to mentor engineers, provide technical guidance, code reviews, design and deliver on small projects end-to-end. Impact is typically at the immediate-team scope. This is typically considered a 'career-level', as in you can spend the rest of your career operating at this level.",
    "Staff Engineer" : "This level is much more coveted than the previous and typically 10% or less of the entire company. Expected to lead and own complex technical initiatives. Begin setting the vision / future direction of team. Impact across multiple related teams within an org. Role shifts more towards design rather than implementation depending on size / expectations at company. ",
    "Principal Engineer" : "Impact spans across organizations. Entrusted with business-critical projects and for setting technical vision for an org or multiple orgs. Responsible for reviewing and providing feedback on technical designs across an org. Little to no day-to-day coding. Role depends highly on organizational / company needs and becomes loosely defined. Expected to operate fully autonomously.",
    "Distinguished Engineer" : "Impact spans across the company and sometimes industry."
  }[ballNumber];
}
/**
 * @param {!Object} data
 * @return {?}
 */
function reverseObject(data) {
  var n = {};
  /** @type {!Array<string>} */
  var d = Object.keys(data);
  /** @type {number} */
  var i = 0;
  for (; i < d.length; i++) {
    /** @type {string} */
    n[data[d[i]]] = d[i];
  }
  return n;
}
if ("undefined" != typeof exports) {
  /** @type {function(!Object): ?} */
  exports.findShortestTitleName = findShortestTitleName;
  /** @type {function(string): ?} */
  exports.encodeNameForUrl = encodeNameForUrl;
  /** @type {function(!Array, string, string, !Object): ?} */
  exports.levelNameMatches = levelNameMatches;
  /** @type {function(?, !HTMLDocument, !Object, string, ?): ?} */
  exports.getAverageSalaryInfo = getAverageSalaryInfo;
  /** @type {function(?, !HTMLDocument, !Object, string, ?): ?} */
  exports.getMedianSalaryInfo = getMedianSalaryInfo;
  /** @type {function(!Array, ?): ?} */
  exports.getMedianSalaryRow = getMedianSalaryRow;
  /** @type {function(?, !HTMLDocument, !Object, string, ?): ?} */
  exports.getNumRowsForCompanyAndLevel = getNumRowsForCompanyAndLevel;
  /** @type {function(!NodeList, !Function): ?} */
  exports.getNormalizedSalaryRows = getNormalizedSalaryRows;
  /** @type {function(!NodeList): ?} */
  exports.getCitiesByRegions = getCitiesByRegions;
}
;