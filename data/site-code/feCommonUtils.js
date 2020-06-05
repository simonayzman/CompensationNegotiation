"use strict";
function captureOutboundLink(e, t) {
    ga("send", "event", "sponsored", "click", e, {
        transport: "beacon",
        hitCallback: function() {
            storeBrowserData("ClickedOn_" + t, t, 300),
            window.open(e, "_blank")
        }
    })
}
var LEVELS_LOCATION_DATA_KEY = "levelsUserLocationPreference";
function getUserLocationDetails(e) {
    var t = getBrowserData(LEVELS_LOCATION_DATA_KEY);
    if (void 0 !== t)
        return e(t);
    $.ajax({
        url: "https://secure.geobytes.com/GetCityDetails?key=0614fb0718a6955cab713150de8a94d0",
        dataType: "jsonp",
        cache: !0,
        success: function(t) {
            storeBrowserData(LEVELS_LOCATION_DATA_KEY, t, 7),
            "function" == typeof ga && ga("send", "event", "Region", "country", t.geobytescountry ? t.geobytescountry : "Not Available"),
            e(t)
        },
        error: function(t, a, o) {
            "function" == typeof ga && ga("send", "event", "Error", "region", o),
            e()
        }
    })
}
function isLocalStorageNameSupported() {
    var e = window.localStorage;
    try {
        return e.setItem("test", "1"),
        e.removeItem("test"),
        !0
    } catch (e) {
        return !1
    }
}
function storeBrowserData(e, t, a) {
    if (isLocalStorageNameSupported()) {
        var o = {
            value: t,
            timestamp: (new Date).addDays(a).getTime()
        };
        window.localStorage.setItem(e, JSON.stringify(o))
    }
}
function getBrowserData(e) {
    if (isLocalStorageNameSupported()) {
        var t = window.localStorage.getItem(e);
        if (null !== t) {
            var a = (t = JSON.parse(t)).timestamp;
            if (!(new Date > new Date(a)))
                return t.value;
            window.localStorage.removeItem(e)
        }
    }
}
Date.prototype.addDays = function(e) {
    var t = new Date(this.valueOf());
    return t.setDate(t.getDate() + e),
    t
}
;
