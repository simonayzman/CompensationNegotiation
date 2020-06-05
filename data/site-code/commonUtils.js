"use strict";
function findShortestTitleName(e) {
    return e.reduce(function(e, n) {
        return e.length < n.length ? e : n
    })
}
function encodeNameForUrl(e) {
    var n = e.replace("&", " and ").replace(/\W+/g, "-").replace(/-+/g, "-");
    return n.startsWith("-") && (n = n.slice(1, n.length)),
    n.endsWith("-") && (n = n.slice(0, n.length - 1)),
    "" === n && console.log("ERROR: Encoded Name has no valid characters"),
    n
}
function yearComparison(e, n, a) {
    return "=" === a ? parseInt(e) === parseInt(n) : "<" === a ? parseInt(e) < parseInt(n) : ">" === a ? parseInt(e) > parseInt(n) : "<=" === a ? parseInt(e) <= parseInt(n) : ">=" === a && parseInt(e) >= parseInt(n)
}
function isElementFalse(e) {
    return !e
}
function getQueryStringMap() {
    return function() {
        var e = {}
          , n = window.location.search.substring(1);
        "/" == n.charAt(n.length - 1) && (n = n.substr(0, n.length - 1));
        for (var a = n.split("&"), r = 0; r < a.length; r++) {
            var t = a[r].split("=");
            if (void 0 === e[t[0]])
                e[t[0]] = decodeURIComponent(t[1]);
            else if ("string" == typeof e[t[0]]) {
                var o = [e[t[0]], decodeURIComponent(t[1])];
                e[t[0]] = o
            } else
                e[t[0]].push(decodeURIComponent(t[1]))
        }
        return e
    }()
}
function numberWithCommas(e) {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function throttle(e, n) {
    var a = null;
    return function() {
        var r = this
          , t = arguments;
        clearTimeout(a),
        a = window.setTimeout(function() {
            e.apply(r, t)
        }, n || 500)
    }
}
function getNormalizedSalaryRows(e, n) {
    for (var a = [], r = 0; r < e.length; r++)
        a.push(e[r]),
        a[r].totalyearlycompensation = parseInt(e[r].totalyearlycompensation),
        a[r].basesalary = parseInt(e[r].basesalary),
        a[r].stockgrantvalue = parseInt(e[r].stockgrantvalue),
        a[r].bonus = parseInt(e[r].bonus),
        a[r].totalyearlycompensation > 5e3 && (a[r].totalyearlycompensation = a[r].totalyearlycompensation / 1e3),
        a[r].basesalary > 5e3 && (a[r].basesalary = a[r].basesalary / 1e3),
        a[r].stockgrantvalue > 5e3 && (a[r].stockgrantvalue = a[r].stockgrantvalue / 1e3),
        a[r].bonus > 5e3 && (a[r].bonus = a[r].bonus / 1e3);
    return n ? a.filter(function(e) {
        var n = new Date(e.timestamp)
          , a = new Date;
        return !(n < a.setMonth(a.getMonth() - 12))
    }) : a
}
function levelNameMatches(e, n, a, r) {
    return r || (r = "Software Engineer"),
    e.some(function(e) {
        return levelNameMatch(e, n, a, r)
    })
}
function levelNameMatch(e, n, a, r) {
    var t = e.toLowerCase().trim()
      , o = n.toLowerCase().trim();
    if ("" === o)
        return !1;
    if ("vmware" === a.toLowerCase().trim() && "Software Engineer" === r)
        return "member of technical staff (mts 1)" === t ? o === t || "mts1" === o || "mts 1" === o : t === o || t.replace(/ /g, "") === o.replace(/ /g, "");
    if ("ebay" === a.toLowerCase().trim() && "Software Engineer" === r)
        return "senior mts" === t && ("senior member of technical staff" === o || "sr. mts" === o) || (t === o || t.replace(/ /g, "") === o.replace(/ /g, ""));
    if (("electronic arts" === a.toLowerCase().trim() || "ea" === a.toLowerCase().trim()) && "Software Engineer" === r)
        return t === o;
    if ("cisco" === a.toLowerCase().trim() && "Software Engineer" === r)
        return t === o;
    if ("paypal" === a.toLowerCase().trim() && "Software Engineer" === r)
        return t === o;
    if ("autodesk" === a.toLowerCase().trim() && "Software Engineer" === r) {
        if (("senior software engineer 1" === t || "senior software engineer 2" === t) && -1 === o.indexOf("senior"))
            return !1;
        if (("software engineer 1" === t || "software engineer 2" === t) && o.indexOf("senior") > -1)
            return !1
    }
    if ("twilio" === a.toLowerCase().trim() && "Software Engineer" === r) {
        if (("senior software engineer 1" === t || "senior software engineer 2" === t) && -1 === o.indexOf("senior"))
            return !1;
        if (("software engineer 1" === t || "software engineer 2" === t) && o.indexOf("senior") > -1)
            return !1
    }
    if ("oyo" === a.toLowerCase().trim() && "Software Engineer" === r)
        return t === o;
    if ("squarespace" === a.toLowerCase().trim() && "Software Engineer" === r) {
        if (t.indexOf("software engineer") > -1 || t.indexOf("senior engineer") > -1)
            return !1;
        if ("se1" === t && "senior 1" === o)
            return !0;
        if (2 === t.length)
            return t === o
    }
    if ("uber" === a.toLowerCase().trim() && ("5a" === t || "5b" === t))
        return -1 !== o.indexOf(t);
    if ("Software Engineering Manager" === r && "google" === a.toLowerCase())
        return t === o;
    if ("Product Manager" === r && "google" === a.toLowerCase())
        return t === o;
    if ("Software Engineering Manager" === r && "facebook" === a.toLowerCase()) {
        if ("m1" === t)
            return o.indexOf("m1") > -1 || o.indexOf("m 1") > -1 || o.indexOf("manager1") > -1 || o.indexOf("manager 1") > -1 || o === t;
        if ("d1" === t)
            return o.indexOf("d1") > -1 || o.indexOf("d 1") > -1 || o.indexOf("director1") > -1 || o.indexOf("director 1") > -1 || o.indexOf("dir1") > -1 || o.indexOf("dir 1") > -1 || o === t;
        if ("vp1" === t)
            return o.indexOf("vp1") > -1 || o.indexOf("vp 1") > -1 || o.indexOf("vice president 1") > -1 || o.indexOf("vicepresident1") > -1 || o.indexOf("vicepresident 1") > -1 || o.indexOf("vice president1") > -1 || o === t;
        if ("m2" === t)
            return o.indexOf("m2") > -1 || o.indexOf("m 2") > -1 || o.indexOf("manager2") > -1 || o.indexOf("manager 2") > -1 || o === t;
        if ("d2" === t)
            return o.indexOf("d2") > -1 || o.indexOf("d 2") > -1 || o.indexOf("director2") > -1 || o.indexOf("director 2") > -1 || o.indexOf("dir2") > -1 || o.indexOf("dir 2") > -1 || o === t;
        if ("vp2" === t)
            return o.indexOf("vp2") > -1 || o.indexOf("vp 2") > -1 || o.indexOf("vice president 2") > -1 || o.indexOf("vicepresident2") > -1 || o.indexOf("vicepresident 2") > -1 || o.indexOf("vice president2") > -1 || o === t
    }
    if ("Product Manager" === r && "google" === a.toLowerCase()) {
        if ("apm1" === t || "associate product manager 1" === t)
            return o.indexOf("apm1") > -1 || o.indexOf("apm 1") > -1 || o === t;
        if ("apm2" === t || "associate product manager 2" === t)
            return o.indexOf("apm2") > -1 || o.indexOf("apm 2") > -1 || o === t
    }
    return t === o || null !== t.match(/\d/g) && null !== o.match(/\d/g) && t.match(/\d/g).join("") === o.match(/\d/g).join("") || t.replace(/ /g, "") === o.replace(/ /g, "")
}
function getFilteredSalaryRows(e, n, a, r, t) {
    var o = n[a][r].map(function(e) {
        return e.titles
    }).filter(function(e) {
        return e.includes(t)
    })[0]
      , i = e.filter(function(e) {
        return e.title === a && (e.company.toLowerCase().trim() === r.toLowerCase().trim() && (!!levelNameMatches(o, e.level, r, a) && !(!e.basesalary || "" === e.basesalary)))
    });
    return i.length > 20 ? i.filter(function(e) {
        var n = new Date(e.timestamp)
          , a = new Date;
        return !(n < a.setMonth(a.getMonth() - 12))
    }) : i
}
function getAverageSalaryInfo(e, n, a, r, t) {
    if (null == e)
        return "";
    var o = getFilteredSalaryRows(e, n, a, r, t);
    if ((o = o.sort(function(e, n) {
        return -1 * ((Date.parse(e.timestamp) > Date.parse(n.timestamp)) - (Date.parse(e.timestamp) < Date.parse(n.timestamp)))
    })).length < 4)
        return "";
    for (var i = 0, s = 0, l = 0, c = 0, g = 0; g < o.length; g++) {
        var d = o[g];
        if (d && d.basesalary) {
            var u = parseInt(d.basesalary)
              , f = parseInt(d.stockgrantvalue || "0")
              , p = parseInt(d.bonus || "0")
              , m = parseInt(d.totalyearlycompensation || "0")
              , y = u < 1e3 ? 1e3 * u : u
              , S = f < 1e3 ? 1e3 * f : f
              , A = p < 1e3 ? 1e3 * p : p
              , C = m < 1e3 ? 1e3 * m : m;
            if (Math.abs(C - (y + S + A)) > 2e4) {
                if (Math.abs(C - (y + S / 4 + A)) > 2e4)
                    continue;
                S /= 4
            }
            i += y,
            s += S,
            l += A,
            c++
        }
    }
    return [i = Math.round(i / c), s = Math.round(s / c), l = Math.round(l / c)]
}
function getNumRowsForCompanyAndLevel(e, n, a, r, t) {
    if (null == e)
        return 0;
    var o = getFilteredSalaryRows(e, n, a, r, t);
    if ((o = o.sort(function(e, n) {
        return -1 * ((Date.parse(e.timestamp) > Date.parse(n.timestamp)) - (Date.parse(e.timestamp) < Date.parse(n.timestamp)))
    })).length < 4)
        return 0;
    for (var i = 0, s = 0; s < o.length; s++) {
        var l = o[s];
        if (l && l.basesalary) {
            var c = parseInt(l.basesalary)
              , g = parseInt(l.stockgrantvalue || "0")
              , d = parseInt(l.bonus || "0")
              , u = parseInt(l.totalyearlycompensation || "0")
              , f = c < 1e3 ? 1e3 * c : c
              , p = g < 1e3 ? 1e3 * g : g
              , m = d < 1e3 ? 1e3 * d : d
              , y = u < 1e3 ? 1e3 * u : u;
            if (Math.abs(y - (f + p + m)) > 2e4) {
                if (Math.abs(y - (f + p / 4 + m)) > 2e4)
                    continue;
                p /= 4
            }
            f,
            p,
            m,
            i++
        }
    }
    return i
}
function getMedianSalaryInfo(e, n, a, r, t) {
    if (null == e)
        return "";
    var o = getFilteredSalaryRows(e, n, a, r, t).map(function(e) {
        parseInt(e.basesalary),
        parseInt(e.stockgrantvalue || "0"),
        parseInt(e.bonus || "0"),
        parseInt(e.totalyearlycompensation || "0");
        return e
    }).filter(function(e) {
        var n = parseInt(e.basesalary)
          , a = parseInt(e.stockgrantvalue || "0")
          , r = parseInt(e.bonus || "0")
          , t = parseInt(e.totalyearlycompensation || "0")
          , o = n < 1e3 ? 1e3 * n : n
          , i = a < 1e3 ? 1e3 * a : a
          , s = r < 1e3 ? 1e3 * r : r
          , l = t < 1e3 ? 1e3 * t : t;
        return !(Math.abs(l - (o + i + s)) > 2e4 && Math.abs(l - (o + i / 4 + s)) > 2e4)
    });
    if (o.sort(function(e, n) {
        return parseInt(e.totalyearlycompensation || "0") - parseInt(n.totalyearlycompensation || "0")
    }),
    0 === o.length)
        return [0, 0, 0];
    var i = o[parseInt(o.length / 2)]
      , s = parseInt(i.basesalary || "0")
      , l = parseInt(i.stockgrantvalue || "0")
      , c = parseInt(i.bonus || "0");
    return [s = s < 1e3 ? 1e3 * s : s, l = l < 1e3 ? 1e3 * l : l, c = c < 1e3 ? 1e3 * c : c]
}
function getMedianSalaryRow(e, n) {
    if (null === e || 0 === e.length)
        return null;
    n && (e = e.filter(function(e) {
        return !(!e.basesalary || "" === e.basesalary || 0 === e.basesalary)
    }));
    var a = e.filter(function(e) {
        var n = new Date(e.timestamp)
          , a = new Date;
        return !(n < a.setMonth(a.getMonth() - 12))
    });
    a.length >= 30 && (e = a);
    var r = e.map(function(e) {
        parseInt(e.basesalary),
        parseInt(e.stockgrantvalue || "0"),
        parseInt(e.bonus || "0"),
        parseInt(e.totalyearlycompensation || "0");
        return e
    });
    if (r.sort(function(e, n) {
        return parseInt(e.totalyearlycompensation || "0") - parseInt(n.totalyearlycompensation || "0")
    }),
    0 === r.length)
        return null;
    var t = r[parseInt(r.length / 2)]
      , o = parseInt(t.basesalary || "0")
      , i = parseInt(t.stockgrantvalue || "0")
      , s = parseInt(t.bonus || "0");
    return {
        row: t,
        base: o = o < 1e3 ? 1e3 * o : o,
        stock: i = i < 1e3 ? 1e3 * i : i,
        bonus: s = s < 1e3 ? 1e3 * s : s
    }
}
function getCompanyLevelingDetails() {
    return {
        invalidRows: {
            632: 1,
            815: 1,
            1199: 1,
            131: 1,
            1238: 1
        },
        colors: {
            Google: "60, 186, 84",
            Facebook: "59, 89, 152",
            Microsoft: "0, 161, 241",
            Amazon: "255, 153, 0",
            LinkedIn: "0, 119, 181",
            Uber: "0, 0, 0",
            eBay: "255, 211, 0",
            Netflix: "185, 9, 11",
            Apple: "153, 153, 153",
            Salesforce: "117, 170, 255",
            Symantec: "255,215,0",
            Palantir: "31,35,39",
            Oracle: "248,0,0",
            NetApp: "0,103,197",
            Intuit: "16,128,0",
            Yahoo: "123,0,153",
            VMware: "113,112,116",
            Dell: "0,125,184",
            Spotify: "29,185,84",
            Dropbox: "0,126,229",
            Twitter: "0,132,180",
            "Morgan Stanley": "33,108,166",
            Citi: "216,28,28",
            "Bank of America Merrill Lynch": "4,37,100",
            UBS: "255,0,0",
            "Goldman Sachs": "120,153,194",
            "Jefferies and Co": "41,57,82",
            Snap: "232,229,2",
            Lyft: "231,11,129",
            "JPMorgan Chase": "88,14,235",
            IBM: "0, 102, 153",
            Airbnb: "241, 102, 100",
            "Tableau Software": "232, 119, 46",
            Qualcomm: "50, 83, 220",
            "T-Mobile": "226, 0, 116",
            Barclays: "0,174,239",
            Cisco: "27, 160, 215",
            Square: "108, 121, 128",
            "HBC Digital": "0, 0, 0",
            Intel: "0, 113, 197",
            Workday: "240, 137, 35",
            "GE Digital": "58, 115, 184",
            Tesla: "220, 20, 60",
            Pinterest: "189, 8, 28",
            "Capital One": "0, 73, 119",
            SquareSpace: "0, 0, 0",
            GoDaddy: "0, 73, 119",
            Yandex: "255, 0, 0",
            "Veritas Technologies": "169, 44, 36",
            Quora: "170, 34, 0",
            SmartThings: "69, 190, 250",
            Splunk: "0, 0, 0",
            Reddit: "255, 86, 0",
            Groupon: "83, 163, 24",
            "General Motors": "7, 57, 128",
            Coursera: "83, 138, 214",
            PayPal: "0, 112, 186",
            "Citrix Systems Inc": "0, 0, 0",
            Udacity: "78, 179, 189",
            USAA: "21, 41, 62",
            Indeed: "44, 105, 235",
            "Kimley Horn": "144, 37, 55",
            "Johnson and Johnson": "187, 47, 27",
            Medtronic: "29, 74, 131",
            SAP: "0, 185, 242",
            Stripe: "94, 115, 224",
            Yelp: "196, 18, 0",
            Autodesk: "6, 150, 215",
            Nextdoor: "25, 151, 93",
            Adobe: "255, 0, 0",
            Intercom: "0, 92, 255",
            Comcast: "217, 0, 58",
            SoFi: "76, 167, 203",
            Careem: "96, 178, 91",
            Flipkart: "62, 115, 232",
            Broadcom: "188, 52, 55",
            Pivotal: "81, 178, 63",
            Visa: "221, 153, 6",
            "Jedi Order": "47, 103, 248",
            "Sith Order": "179, 0, 0",
            "Just Eat": "242, 77, 77",
            DoorDash: "254, 47, 7",
            Instacart: "96, 171, 89",
            Zillow: "18, 119, 225",
            OYO: "239, 37, 31",
            Arm: "0, 143, 190",
            Atlassian: "0, 82, 204",
            "Argo AI": "243, 160, 85",
            WeWork: "200, 200, 200",
            Standard: "180, 180, 180",
            "Walmart Labs": "0, 114, 206",
            Slack: "74, 21, 75",
            Nvidia: "122, 181, 71",
            "BCG Digital Ventures": "70, 70, 70",
            Cerner: "0, 126, 185",
            McKinsey: "5, 28, 44",
            Accenture: "0, 137, 255",
            "Oliver Wyman": "0, 168, 200",
            Bain: "238, 50, 36",
            BCG: "38, 106, 46",
            "AT Kearney": "137, 48, 36",
            Deloitte: "134, 188, 36",
            "Ernst and Young": "255, 219, 0",
            KPMG: "0, 51, 141",
            LEK: "0, 92, 66",
            "Strategy by PWC": "0, 0, 0",
            "PWC Advisory": "216, 86, 4",
            Expedia: "0, 53, 95",
            MongoDB: "77, 179, 61",
            Bloomberg: "40, 0, 215",
            Cloudera: "249, 103, 2",
            Disney: "17, 60, 207",
            GitHub: "0, 0, 0",
            Wayfair: "107, 0, 107",
            Box: "9, 72, 203",
            Qualtrics: "28, 164, 235",
            Rubrik: "30, 140, 155",
            "Two Sigma": "30, 137, 149",
            Opendoor: "28, 133, 232",
            ServiceNow: "249, 80, 80",
            Okta: "0, 125, 193",
            Glassdoor: "12, 170, 65",
            "Epic Systems": "188, 1, 58",
            ByteDance: "50, 90, 180",
            Mozilla: "226, 88, 33",
            Etsy: "235, 109, 32",
            DocuSign: "56, 123, 235",
            Robinhood: "33, 206, 153",
            Cruise: "255, 77, 55",
            Roblox: "164, 166, 171",
            Shopify: "149, 191, 71",
            Twilio: "242, 47, 70",
            Affirm: "15, 114, 229",
            "Electronic Arts": "92, 92, 92",
            Coinbase: "22, 82, 240"
        },
        skillSpectrumPercent: {
            Google: {
                "Software Engineer": 100,
                "Software Engineering Manager": 100,
                "Product Manager": 100,
                "Product Designer": 90.9
            },
            Microsoft: 100,
            LinkedIn: {
                "Software Engineer": 90,
                "Software Engineering Manager": 90,
                "Product Manager": 90,
                "Product Designer": 86.4
            },
            Uber: {
                "Software Engineer": 90,
                "Software Engineering Manager": 90,
                "Product Manager": 90,
                "Product Designer": 85.8
            },
            Facebook: {
                "Software Engineer": 95,
                "Software Engineering Manager": 95,
                "Product Manager": 95,
                "Product Designer": 87.6
            },
            Amazon: {
                "Software Engineer": 95,
                "Software Engineering Manager": 95,
                "Product Manager": 100,
                "Product Designer": 87
            },
            IBM: {
                "Product Manager": 95
            },
            Salesforce: {
                "Software Engineer": 89,
                "Software Engineering Manager": 94
            },
            "Argo AI": {
                "Software Engineer": 92,
                "Software Engineering Manager": 92
            },
            Airbnb: {
                "Software Engineer": 85,
                "Product Manager": 94
            },
            Tesla: {
                "Software Engineer": 93,
                "Software Engineering Manager": 77
            },
            Opendoor: {
                "Software Engineer": 85,
                "Software Engineering Manager": 92
            },
            WeWork: {
                "Software Engineer": 95,
                "Product Manager": 97
            },
            "BCG Digital Ventures": {
                "Software Engineer": 90,
                "Product Manager": 100
            },
            Accenture: {
                "Software Engineer": 90,
                "Management Consultant": 90
            },
            McKinsey: {
                "Management Consultant": 90
            },
            Bain: {
                "Management Consultant": 90
            },
            BCG: {
                "Management Consultant": 90
            },
            Disney: 86,
            Spotify: 94,
            Cloudera: 87,
            Bloomberg: 73,
            MongoDB: 90,
            Expedia: 84,
            Cerner: 82,
            Nvidia: 89,
            eBay: 82,
            Slack: 85,
            "Walmart Labs": 88,
            Standard: 91,
            Intel: 94,
            SAP: 80,
            Yahoo: 95,
            Pinterest: 80,
            Qualcomm: 80,
            Broadcom: 88,
            Quora: 85,
            SmartThings: 75,
            "General Motors": 75,
            Udacity: 70,
            USAA: 80,
            Indeed: 88.2,
            "Veritas Technologies": 82,
            Stripe: 93,
            Yelp: 88,
            VMware: 88,
            Autodesk: 93,
            Nextdoor: 81,
            Adobe: 91,
            Intercom: 88,
            Instacart: 90,
            SoFi: 88,
            Careem: 88,
            Pivotal: 80,
            "Jedi Order": 96,
            "Just Eat": 93,
            DoorDash: 85,
            Zillow: 86,
            OYO: 89,
            Arm: 92,
            Atlassian: 87,
            Square: 83,
            GitHub: 80,
            ServiceNow: 95,
            "Goldman Sachs": {
                "Software Engineer": 88
            },
            Wayfair: {
                "Software Engineer": 88,
                "Product Manager": 95
            },
            Rubrik: 80,
            Okta: 92,
            Glassdoor: 95,
            "Epic Systems": 85,
            ByteDance: 86,
            Mozilla: 97,
            Etsy: 95,
            DocuSign: {
                "Software Engineer": 89,
                "Software Engineering Manager": 84
            },
            Robinhood: 93,
            Cruise: {
                "Software Engineer": 87,
                "Software Engineering Manager": 91
            },
            Roblox: 97,
            Shopify: 95,
            Twilio: 91,
            Affirm: 88,
            "Electronic Arts": 83,
            Coinbase: 80
        },
        companyButtons: {
            "Software Engineer": ["Google", "Facebook", "Microsoft", "Amazon", "Apple"],
            "Product Manager": ["Google", "Facebook", "Microsoft", "Amazon", "LinkedIn"],
            "Product Designer": ["Google", "Facebook", "Amazon", "LinkedIn"],
            "Management Consultant": ["McKinsey", "BCG", "Bain"],
            "Investment Banker": ["Goldman Sachs", "Morgan Stanley", "Citi", "JPMorgan Chase"],
            "Software Engineering Manager": ["Google", "Facebook", "Microsoft", "Amazon", "Oracle"],
            "Civil Engineer": ["Kimley Horn"],
            "Biomedical Engineer": ["Johnson and Johnson", "Medtronic"]
        },
        pathnameMapping: {
            "/googlevsfacebook.html": {
                track: "Software Engineer",
                companiesToRender: ["Google", "Facebook"]
            },
            "/facebookvsamazon.html": {
                track: "Software Engineer",
                companiesToRender: ["Facebook", "Amazon"]
            }
        }
    }
}
var supportedCountryRegions = new Set(["Australia", "Canada", "Germany", "India", "Ireland", "Israel", "Japan", "Netherlands", "Russia", "Singapore", "Switzerland", "United Kingdom"])
  , supportedDmasByRegion = {
    "Greater SF Bay Area": "807",
    "Greater Seattle Area": "819",
    "Greater NYC Area": "501",
    "Greater LA Area": "803",
    "Greater Boston Area": "506",
    "Greater Chicago Area": "602",
    "Greater Austin Area": "635",
    "Greater Boulder Area": "751"
}
  , supportedDmaIds = new Set(Object.values(supportedDmasByRegion))
  , supportedRegionsbyDmas = reverseObject(supportedDmasByRegion);
function getDMAsForRegions(e) {
    for (var n = new Set, a = 0; a < e.length; a++) {
        var r = supportedDmasByRegion[e[a]];
        void 0 !== r && (n = n.add(r))
    }
    return n
}
function getCitiesByRegions(e) {
    for (var n = {
        "Greater SF Bay Area": ["San Francisco, CA", "Silicon Valley", "SF Bay Area", "Bay Area", "San Francisco", "San Francisco Bay Area", "San Mateo, CA", "Redwood City, CA", "Menlo Park, CA", "Fremont, CA", "Palo Alto, CA", "Santa Clara, CA", "Sunnyvale, CA", "San Jose, CA", "Berkeley, CA", "Oakland, CA", "Mountain View, CA", "Burlingame, CA", "Marin, CA", "Union City, CA", "Pleasanton, CA", "Cupertino, CA"],
        807: ["San Francisco, CA", "San Mateo, CA", "Redwood City, CA", "Menlo Park, CA", "Fremont, CA", "Palo Alto, CA", "Santa Clara, CA", "Sunnyvale, CA", "San Jose, CA", "Berkeley, CA", "Oakland, CA", "Mountain View, CA", "Burlingame, CA", "Marin, CA", "Union City, CA", "Pleasanton, CA", "Cupertino, CA"],
        "Greater Seattle Area": ["Seattle", "Seattle, WA", "Kirkland, WA", "Redmond, WA", "Bellevue, WA"],
        819: ["Seattle, WA", "Kirkland, WA", "Redmond, WA", "Bellevue, WA"],
        "Greater NYC Area": ["New York", "New York, NY", "NYC", "NYC, NY", "Manhattan, NY", "Brooklyn, NY"],
        501: ["New York, NY", "Manhattan, NY", "Brooklyn, NY"],
        "Greater LA Area": ["Los Angeles", "Los Angeles, CA", "Santa Monica, CA", "Santa Monica", "Pasadena, CA", "Pasadena", "Irvine, CA", "Orange County, CA", "Anaheim, CA", "Venice, CA", "Burbank, CA", "Long Beach, CA", "Malibu, CA", "Culver City, CA"],
        "Greater Boston Area": ["Boston", "Boston, MA", "Cambridge", "Cambridge, MA", "Somerville, MA", "Newton, MA", "Quincy, MA", "Brookline, MA", "Malden, MA", "Waltham, MA", "Medford, MA", "Revere, MA", "Watertown, MA", "Lexington, MA"],
        "Greater Chicago Area": ["Chicago", "Chicago, IL", "Joliet, IL", "Naperville, IL", "Schaumburg, IL", "Evanston, IL"],
        "Greater Austin Area": ["Austin, TX"],
        "Greater Boulder Area": ["Boulder", "Boulder, CO", "Denver, CO"]
    }, a = [], r = 0; r < e.length; r++) {
        e[r] = e[r].toString();
        var t = n[e[r]];
        a = a.concat(t)
    }
    return a.filter(function(e) {
        return null != e
    })
}
function levelingStandardResponsibilities(e) {
    return {
        "Software Engineer": "Develop and maintain low to moderately complex components working on a team. Typically receives guidance and support from more experienced team members.",
        "Senior Engineer": "Develop and own moderate to complex components. Possibly lead a small team / project. Ability to mentor engineers, provide technical guidance, code reviews, design and deliver on small projects end-to-end. Impact is typically at the immediate-team scope. This is typically considered a 'career-level', as in you can spend the rest of your career operating at this level.",
        "Staff Engineer": "This level is much more coveted than the previous and typically 10% or less of the entire company. Expected to lead and own complex technical initiatives. Begin setting the vision / future direction of team. Impact across multiple related teams within an org. Role shifts more towards design rather than implementation depending on size / expectations at company. ",
        "Principal Engineer": "Impact spans across organizations. Entrusted with business-critical projects and for setting technical vision for an org or multiple orgs. Responsible for reviewing and providing feedback on technical designs across an org. Little to no day-to-day coding. Role depends highly on organizational / company needs and becomes loosely defined. Expected to operate fully autonomously.",
        "Distinguished Engineer": "Impact spans across the company and sometimes industry."
    }[e]
}
function reverseObject(e) {
    for (var n = {}, a = Object.keys(e), r = 0; r < a.length; r++)
        n[e[a[r]]] = a[r];
    return n
}
"undefined" != typeof exports && (exports.findShortestTitleName = findShortestTitleName,
exports.encodeNameForUrl = encodeNameForUrl,
exports.levelNameMatches = levelNameMatches,
exports.getAverageSalaryInfo = getAverageSalaryInfo,
exports.getMedianSalaryInfo = getMedianSalaryInfo,
exports.getMedianSalaryRow = getMedianSalaryRow,
exports.getNumRowsForCompanyAndLevel = getNumRowsForCompanyAndLevel,
exports.getNormalizedSalaryRows = getNormalizedSalaryRows,
exports.getCitiesByRegions = getCitiesByRegions);
