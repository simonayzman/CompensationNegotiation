"use strict";
var salaryData, companyLevelingData, companyInformation, salaryRows, companiesWithInfo = [], popupOpened = !1, yoeRanges = {
    "New Grad": [0, 1],
    "Mid Level": [2, 5],
    "Senior Level": [5, 10]
};
function updateUrl(e, t) {
    if (history.pushState && 0 === $(".company-profile-charts").length && 0 === $(".region-dma-ids").length) {
        var a = "";
        t && "" !== t && (a = "&search=" + encodeURIComponent(t));
        var n = ""
          , r = $(".select-gender-radio:checked").parent().find("label").text();
        r && "" !== r && (n = "&gender=" + encodeURIComponent(r));
        var s = window.location.protocol + "//" + window.location.host + window.location.pathname + "?track=" + encodeURIComponent(e) + a + n;
        window.history.pushState({
            path: s
        }, "", s)
    }
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
function filterSalariesByRegion(e) {
    var t = $(".region-international") && "true" === $(".region-international").val()
      , a = $(".region-dma-ids") && $(".region-dma-ids").val() && $(".region-dma-ids").val().split(",")
      , n = $(".region-city-ids") && $(".region-city-ids").val() && "" !== $(".region-city-ids").val() ? $(".region-city-ids").val().split(",") : []
      , r = $(".region-country-name") && $(".region-country-name").val();
    return (a && a.length > 0 || n & n.length > 0 || r && "" !== r) && (e = t ? e.filter(function(e) {
        return "Software Engineer" === e.title && (!(n && n.length > 0 && -1 === n.indexOf(e.cityid)) && !(r && "" !== r && e.location && !e.location.endsWith(r)))
    }) : e.filter(function(e) {
        return a.indexOf(e.dmaid) > -1 && "Software Engineer" === e.title
    })),
    e
}
function showMedianOrAverageAggregate(e) {
    var t = $(".search-salaries").val();
    if (!e || e.length < 5 || "" === t || "/comp.html" !== window.location.pathname)
        $(".median-display-box").empty();
    else {
        $(".search-query-quote").text('"' + t + '"');
        var a = getMedianSalaryRow(e, !0);
        if (a && parseInt($(".median-box-row-number").val()) !== a.row.rowNumber) {
            var n = a.row.level.replace("software", "SW").replace("Software", "SW").replace(" Engineer", "E").replace(" engineer", "e").replace("Member of Technical Staff", "MTS");
            $(".median-display-box").html('\n            <p style="margin-top: 10px;"><small>Median Package for <span class="search-query-quote">"' + t + '"</span></small><span onClick=\'this.parentNode.parentNode.remove();\' style="color: #ccc; cursor: pointer; padding-top: 3px;" class="pull-right"><i class="fa fa-times"></i></span></p>\n            <div class="median lfont">\n              <table class="lfont" cellpadding="0" cellspacing="0" style="width:100%;">\n                <tbody>\n                  <tr>\n                    <td class="sm-w-full sm-inline-block" style="overflow:hidden;border-color:#edf2f7;border-style:solid;border-width:1px;width:100%;background-color: #fff;">\n                      <table cellpadding="0" cellspacing="0" style="width:100%;">\n                        <tbody>\n                          <tr style="padding-top:8px;padding-bottom:8px;">\n                            <td class="sm-pl-2" style="height:12px;padding-top:4px;padding-bottom: 4px;padding-left:8px;"><img alt="' + a.row.company + '" class="sm-pl-8" src="' + (companyInformation[a.row.company] ? companyInformation[a.row.company].iconLarge || companyInformation[a.row.company].icon : "https://logo.clearbit.com/https://" + a.row.company + ".com") + '" onError="this.onerror=null;this.src = \'https://i.imgur.com/nwWg68V.png\';" style="border:0;max-width:100%;line-height:100%;vertical-align:middle;width:50px;padding:12px;"></td>\n                            <td align="right" class="sm-pr-12" style="padding-right:20px;text-align:right;">\n                              <p class="total-compensation-text" style="white-space:nowrap;font-size:22px;padding-top:5px;margin:0;font-weight:300;">$' + (a.base + a.stock + a.bonus) / 1e3 + 'k</p>\n                              <p class="bottom-desc-label" style="font-size:10px;margin:0;color:#718096;text-transform:uppercase;font-weight:800;">Total / Year</p>\n                            </td>\n                            <td bgcolor="#edf2f7" class="sm-pl-4 sm-pr-0" colspan="2" style="font-weight:600;padding-right:8px;padding-left:16px;">\n                              <table cellpadding="0" cellspacing="0" style="width:100%;">\n                                <tbody>\n                                  <tr style="width:100%;">\n                                    <td style="padding-left:4px;padding-right:4px;padding-top:8px;">\n                                      <p class="breakdown-figures-text" style="white-space:nowrap;font-weight:600;margin:0;">$' + a.base / 1e3 + 'k</p>\n                                      <p class="bottom-desc-label" style="font-size:10px;margin:0;color:#718096;text-transform:uppercase;font-weight:800;">Base</p>\n                                    </td>\n                                    <td style="padding-bottom:7px;padding-left:4px;padding-right:4px;">\n                                      <p class="stock-detail-text" style="white-space:nowrap;font-size:10px;height:14px;color:#707070;font-weight:600;margin:0;"></p>\n                                      <p class="breakdown-figures-text" style="white-space:nowrap;font-weight:600;margin:0;">$' + a.stock / 1e3 + 'k</p>\n                                      <p class="bottom-desc-label" style="font-size:10px;white-space:nowrap;margin:0;color:#718096;text-transform:uppercase;font-weight:800;">Stock</p>\n                                    </td>\n                                    <td style="padding-left:4px;padding-right:4px;padding-top:8px;">\n                                      <p class="breakdown-figures-text" style="white-space:nowrap;font-weight:600;margin:0;">$' + a.bonus / 1e3 + 'k</p>\n                                      <p class="bottom-desc-label" style="font-size:10px;white-space:nowrap;margin:0;color:#718096;text-transform:uppercase;font-weight:800;">Bonus</p>\n                                    </td>\n                                  </tr>\n                                </tbody>\n                              </table>\n                            </td>\n                          </tr>\n                          <tr style="padding-top:8px;padding-bottom:8px;">\n                            <td class="sm-pl-10" style="max-width:8rem;padding-left:20px;">\n                              <p style="font-family:Nunito,-apple-system,\'Segoe UI\',sans-serif;margin:0;">' + a.row.company + '</p>\n                              <p class="sm-text-xs location-date-text" style="margin:0;padding-bottom:12px;color:#718096;font-size:14px;white-space: initial;">' + a.row.location + '\n                              </p>\n                            </td>\n                            <td align="right" class="sm-pr-12" style="padding-right:20px;text-align:right;">\n                              <p style="font-weight:600;margin:0;white-space:normal;">' + n + '</p>\n                              <p class="bottom-desc-label" style="font-size:10px;margin:0;padding-bottom:12px;color:#718096;text-transform:uppercase;font-weight:800;">Level</p>\n                            </td>\n                            <td align="left" bgcolor="#edf2f7" class="sm-pl-8" style="padding-right:4px;padding-left:20px;text-align:left;">\n                              <p style="font-weight:600;margin:0;">' + a.row.yearsatcompany + '</p>\n                              <p class="bottom-desc-label" style="font-size:10px;margin:0;padding-bottom:12px;color:#718096;text-transform:uppercase;font-weight:800;">Yrs At Comp.</p>\n                            </td>\n                            <td bgcolor="#edf2f7" style="padding-left:4px;padding-right:8px;">\n                              <p style="font-weight:600;margin:0;">' + a.row.yearsofexperience + '</p>\n                              <p class="bottom-desc-label" style="font-size:10px;margin:0;padding-bottom:12px;color:#718096;text-transform:uppercase;font-weight:800;">Yrs Exp.</p>\n                            </td>\n                          </tr>\n                        </tbody>\n                      </table>\n                    </td>\n                  </tr>\n                  <tr style="width:100%;">\n                    <td class="sm-w-full sm-inline-block" style="padding-bottom:0;width:100%;">\n                      <div style="line-height:24px;">‌</div>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n              <input type="hidden" class="median-box-row-number" value="' + a.row.rowNumber + '" />\n            </div>\n        ')
        }
    }
}
function getSearchHits(e, t) {
    return t && "" !== t ? e.filter(function(e) {
        var a = 0
          , n = t.split(" ")
          , r = "";
        if (1 === n.length && n[0].indexOf("#") > -1) {
            var s = n[0];
            return e.rowNumber.toString() === s.replace("#", "")
        }
        var o = 0;
        if ($(".company-profile-charts").length > 0) {
            if (e.company.trim().toLowerCase() !== $(".company-profile-charts").val().toLowerCase())
                return !1;
            o = $(".company-profile-charts").val().toLowerCase().split(" ").length
        }
        if ($(".company-profile-all-level-names").length > 0) {
            var i = $(".company-profile-all-level-names").val().trim().toLowerCase().split(",");
            if (!levelNameMatches(i, e.level.trim(), $(".company-profile-charts").val()))
                return !1;
            o = $(".company-profile-charts").val().toLowerCase().split(" ").length + $(".company-profile-level-name").val().toLowerCase().split(" ").length
        }
        for (var l = o; l < n.length; l++) {
            s = n[l];
            if (e.level.toLowerCase().indexOf(s.toLowerCase()) > -1) {
                if (e.level.toLowerCase() === s.toLowerCase()) {
                    a++,
                    r = s.toLowerCase();
                    continue
                }
                for (var c = !1, p = e.level.toLowerCase().split(" "), d = 0; d < p.length; d++) {
                    if (p[d] === s.toLowerCase()) {
                        c = !0;
                        break
                    }
                }
                if (c) {
                    a++,
                    r = s.toLowerCase();
                    continue
                }
            }
            if (["sde", "se", "mts", "ic", "l"].indexOf(r) > -1 && ["i", "ii", "iii", "1", "2", "3", "4", "5", "6", "7", "8", "9", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70"].indexOf(s.toLowerCase()) > -1)
                return !1;
            var f = s === s.toUpperCase() && !/\d/.test(s) && s.length < 3 && "ML" !== s && "AI" !== s ? s : s.toLowerCase();
            if (e.company.toLowerCase().indexOf(f) > -1)
                a++,
                r = s.toLowerCase();
            else if (e.title.toLowerCase().indexOf(f) > -1)
                a++,
                r = s.toLowerCase();
            else if (e.gender.toLowerCase().indexOf(f) > -1)
                a++,
                r = s.toLowerCase();
            else if (e.location.toLowerCase().indexOf(f) > -1)
                s && a++,
                r = s.toLowerCase();
            else if (s === s.toUpperCase() && e.location.indexOf(s) > -1)
                a++,
                r = s.toLowerCase();
            else if (e.tag.toLowerCase().indexOf(f) > -1)
                a++,
                r = s.toLowerCase();
            else
                dateParser(e.timestamp).toLowerCase().indexOf(f) > -1 ? (a++,
                r = s.toLowerCase()) : r = s.toLowerCase()
        }
        return a === n.length - o
    }) : e
}
function saveAndRenderSalaryInfo(e, t, a, n, r) {
    salaryRows = e.filter(function(e) {
        return e.title === t
    }).reverse(),
    a && $(window).scrollTop($(".compTableContainer").offset().top - 100),
    $(".compTableContainer").html('\n        <table id="compTable" class="table table-striped table-bordered text-center" style="font-family: \'Nunito\', sans-serif;">\n              <thead class="success" style="padding: 15px; font-family: \'Nunito\', sans-serif;">\n                  <tr>\n                      <th class="vcenter text-center otherWidth">\n                        Timestamp\n                      </th>\n                      <th class="vcenter text-left otherWidth" style="border: none;">\n                          <span class="hidden-xs" style="padding-left: 10px;"></span>\n                          <span class="th-header-title" style="font-family: \'Nunito\', sans-serif; color: #505050; font-size: 14px; font-weight: 700;">Company</span><br>\n                          <span class="hidden-xs" style="padding-left: 10px;"></span>\n                          <span class="dateDetails" style="color: #505050;">\n                            <span>Location | Date</span>\n                          </span>\n                      </th>\n                      \n                      \n                      <th class="vcenter text-left otherWidth level-name-tag-header" style="border: none;">\n                          <span class="th-header-title" style="font-family: \'Nunito\', sans-serif; color: #505050; font-size: 14px; font-weight: 700;">Level Name</span><br>\n                          <span class="dateDetails" style="color: #505050;">\n                            <span>Tag</span>\n                          </span>\n                      </th>\n\n                      <th class="vcenter text-left otherWidth level-yoe-header hidden-xs hidden-sm" style="border: none;">\n                          <span class="th-header-title" style="font-family: \'Nunito\', sans-serif; color: #505050; font-size: 14px; font-weight: 700;">Years of Experience</span><br>\n                          <span class="dateDetails" style="color: #505050;">\n                            <span>Years at Company / Years of Experience</span>\n                          </span>\n                      </th>\n\n                      <th class="vcenter text-right otherWidth level-header-total-comp" style="border: none;">\n                          <span class="hidden-xs" style="padding-right: 10px;"></span>\n                          <span class="th-header-title" style="font-family: \'Nunito\', sans-serif; color: #505050; font-size: 14px; font-weight: 700;">Total Comp<span class="hidden-xs">ensation</span></span><br>\n                          <span class="hidden-xs" style="padding-right: 10px;"></span>\n                          <span class="dateDetails" style="color: #505050;">\n                            <span>Base | Stock | Bonus</span>\n                          </span>\n                      </th>\n\n                      \x3c!--<th class="vcenter text-center otherWidth" style="border: none;">\n                          <i class="fa fa-signal"></i><span class="hidden-sm hidden-xs"> Level</span><br><span class="dateDetails">Tag</span>\n                      </th>\n                      <th class="vcenter text-center" style="border: none;">\n                          <i class="fa fa-money-bill-wave"></i><span class="hidden-sm hidden-xs"> Total Comp</span> (/yr)<br><span class="dateDetails">Salary | Stock Grant</span><br><span class="dateDetails">Bonus</span>\n                      </th>\n                      <th class="vcenter text-center hidden-xs hidden-sm">\n                          Experience (yrs)<br><span class="dateDetails">At-Company / Total</span>\n                      </th>\n                      <th class="vcenter text-center hidden-xs" style="border: none;">\n                          Gender\n                      </th>\n                      <th class="vcenter text-center otherWidth hidden-xs hidden-sm">\n                          Other Details\n                      </th>--\x3e\n                  </tr>\n              </thead>\n          </table>\n    '),
    $(".search-salaries").val(a ? decodeURIComponent(a) : ""),
    $(".company-profile-charts").length > 0 && (a = $(".company-profile-charts").val(),
    $(".company-profile-level-name").length > 0 && (a = $(".company-profile-charts").val() + " " + $(".company-profile-level-name").val())),
    $("#compTable").bootstrapTable({
        data: salaryRows,
        search: !0,
        searchText: a ? decodeURIComponent(a) : "",
        searchAlign: "center",
        onSearch: function(e) {
            updateUrl($(".track-selector :selected").text(), e)
        },
        customSearch: function(e, t) {
            "UK" === t && (t = "United Kingdom");
            var a = getSearchHits(e, t);
            return t.length > 3 ? showMedianOrAverageAggregate(a) : $(".median-display-box").empty(),
            a
        },
        trimOnSearch: !1,
        pagination: !0,
        pageSize: 10,
        striped: !0,
        sortName: "timestamp",
        sortOrder: "desc",
        searchTimeOut: 300,
        detailView: !0,
        showLoading: !0,
        classes: "table table-striped table-bordered table-condensed removeSidePadding",
        rowStyle: function(e, t) {
            return t % 2 == 0 ? {
                classes: "active"
            } : {}
        },
        detailFormatter: function(e, t) {
            var a = "";
            return t.level.length > 6 && (a = "font-size: 18px;"),
            '\n                <div class="detail-view-cell"">\n                    <div class="row vertical-align">\n                        <div class="col-sm-4" style="margin-bottom: 30px;">\n                            <div class="company-img-container" style="padding: 15px; margin-bottom: 0px;">\n                                <img src="' + (companyInformation[t.company] ? companyInformation[t.company].icon : "https://logo.clearbit.com/https://" + t.company + ".com") + '" onError="this.onerror=null;this.src=\'https://i.imgur.com/RgWimYb.png\';" width="60" />\n                            </div>\n                            <div class="company-details">\n                                <div>\n                                    <p>\n                                        ' + ("" === t.company ? "-" : t.company) + '\n                                    </p>\n                                    <p>\n                                        <span class="dateDetails">\n                                            <i class="fa fa-map-marker-alt"></i><span> ' + ("" === t.location ? "-" : t.location) + "</span>\n                                        </span>\n                                    </p>\n                                    " + ("" === t.tag ? "" : '<p style="padding-left: 40px; padding-right: 40px;">' + t.tag + "</p>") + '\n                                    <div class="outer-gender">\n                                        <p><span class="gender-info" style="background-color: #efefef; padding: 5px; border-radius: 5px; color: #424242">' + ("" === t.gender ? "No gender provided" : t.gender) + '</span></p>\n                                    </div>\n                                    <p style="padding-left: 40px; padding-right: 40px;">' + ("" === t.otherdetails ? "" : "Other Details: " + t.otherdetails) + '</p>\n                                    <p><a href="/offer.html?entry=' + t.rowNumber + '">Direct Link</a></p>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="col-sm-2" style="text-align: center;padding-left: 20px;margin-bottom: 25px;">\n                            <div class="level-name-container" style="display:inline-block;">\n                                <p>Level Name</p>\n                                <p style="font-size: 36px;"><span style="padding: 5px; border-radius: 5px; color: #424242; ' + a + '"><span style="background-color: #efefef; padding: 5px; border-radius: 5px; color: #424242">' + ("" === t.level ? "-" : t.level) + '</span></span></p>\n                            </div>\n                            \x3c!--<p style="font-size: 10px; margin-bottom:3px;">Level Name</p>\n                            <p style="font-size: 32px; margin-bottom: 5px;padding-left: 40px; padding-right: 40px; word-wrap: break-word;">' + ("" === t.level ? "-" : t.level) + '</p>--\x3e\n                        </div>\n                        <div class="col-sm-2" style="text-align: center;padding-left: 20px; margin-bottom: 25px;">\n                            <div class="years-display-container" style="display:inline-block;">\n                                <p>Years at Company</p>\n                                <p style="font-size: 36px;"><span style="background-color: #efefef; padding: 5px; border-radius: 5px; color: #424242">' + ("" === t.yearsatcompany ? "-" : t.yearsatcompany) + '</span></p>\n                            </div>\n                        </div>\n                        <div class="col-sm-2" style="text-align: center;padding-left: 20px; margin-bottom: 20px;">\n                            <div class="years-display-container" style="display:inline-block;">\n                                <p>Years of Experience</p>\n                                <p style="font-size: 36px;"><span class="gender-info" style="background-color: #efefef; padding: 5px; border-radius: 5px; color: #424242">' + ("" === t.yearsofexperience ? "-" : t.yearsofexperience) + "</span></p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            "
        },
        columns: [{
            field: "timestamp",
            sortable: !0,
            visible: !1,
            sorter: function(e, t) {
                return timestampComparator(e, t)
            }
        }, {
            field: "company",
            sortable: !1,
            sorter: function(e, t, a, n) {
                return timestampComparator(dateParser(a.timestamp), dateParser(n.timestamp))
            },
            formatter: function(e, a, n, r) {
                var s = dateParser(a.timestamp)
                  , o = '<a onClick="var event = arguments[0] || window.event; event.stopPropagation();" href="' + ("" === a.company ? "#" : "/company/" + encodeNameForUrl(a.company)) + '/salaries">' + a.company + "</a>";
                return ($(".company-profile-charts").length > 0 || "Software Engineer" !== t || -1 === companiesWithInfo.indexOf(a.company)) && (o = a.company),
                '<span class="hidden-xs" style="padding-left: 10px;"></span><span style="font-size: 16px;">' + o + '</span><br>\n                            <span class="hidden-xs" style="padding-left: 10px;"></span><span class="dateDetails">' + a.location + " | " + s + "</span>"
            }
        }, {
            field: "level",
            sortable: !1,
            cellStyle: function(e, t, a, n) {
                return {
                    classes: "text-left otherWidth"
                }
            },
            formatter: function(e, t, a, n) {
                return '<span style="font-size: 16px;">' + t.level + '</span><br>\n                            <span class="dateDetails">' + t.tag + "</span>"
            }
        }, {
            field: "yearsofexperience",
            visible: !0,
            cellStyle: function(e, t, a, n) {
                return {
                    classes: "text-left otherWidth hidden-xs hidden-sm"
                }
            },
            formatter: function(e, t, a, n) {
                return '<span style="font-size: 16px; margin-left: 15px;">' + t.yearsatcompany + " / " + t.yearsofexperience + "</span>"
            }
        }, {
            field: "totalyearlycompensation",
            cellStyle: function(e, t, a, n) {
                return {
                    classes: "text-right otherWidth"
                }
            },
            formatter: function(e, t, a, n) {
                t.basesalary = t.basesalary.toString(),
                t.stockgrantvalue = t.stockgrantvalue.toString(),
                t.bonus = t.bonus.toString();
                var r = "$" + (1e3 * t.totalyearlycompensation).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  , s = t.basesalary.endsWith("000") ? t.basesalary.slice(0, -3) + "k" : t.basesalary.length > 0 && t.basesalary.length <= 3 ? t.basesalary + "k" : t.basesalary.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  , o = parseInt(t.stockgrantvalue) <= 2e3 && parseInt(t.stockgrantvalue) >= 1e3 ? (parseInt(t.stockgrantvalue) / 1e3).toFixed(2) + "M" : t.stockgrantvalue.endsWith("000") ? t.stockgrantvalue.slice(0, -3) + "k" : t.stockgrantvalue < 1e3 && "" !== t.stockgrantvalue ? t.stockgrantvalue + "k" : t.stockgrantvalue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  , i = t.bonus.endsWith("000") ? t.bonus.slice(0, -3) + "k" : t.bonus < 1e3 && "" !== t.bonus ? t.bonus + "k" : t.bonus.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  , l = 0 === s.length && 0 === o.length && 0 === i.length ? "" : '<span class="dateDetails">' + s + " | " + (o || "N/A") + " | " + (i || "N/A") + '<span class="hidden-xs" style="padding-right: 10px;"></span></span>';
                return '<div style="display: flex; float: right;">\n                                ' + (("0" === t.yearsofexperience || "1" === t.yearsofexperience) && "0" === t.yearsatcompany ? '\x3c!-- <div style="display: flex; align-items: center;">\n                                        <div style="padding: 3px 7px 3px 7px; background-color: transparent; color: #beb3d1; margin-top: 0px; margin-left: 0px; margin-right: 10px; border-radius: 10px; border: 1px #beb3d1 solid;">\n                                            <span><i class="fa fa-graduation-cap"></i><span class="hidden-xs"> New Grad</span></span>\n                                        </div>\n                                    </div> --\x3e' : "") + '\n                                <div style="margin-top: 3px;">\n                                    <span style="font-size: 16px;">' + r + '<span class="hidden-xs" style="padding-right: 10px;"></span></span><br>' + l + "\n                                </div>\n                            </div>"
            },
            sortable: !0
        }, {
            field: "yearsatcompany",
            visible: !1,
            formatter: function(e, t, a, n) {
                return t.yearsatcompany + " / " + t.yearsofexperience
            },
            cellStyle: function(e, t, a, n) {
                return {
                    classes: "text-center hidden-xs hidden-sm"
                }
            },
            sortable: !0
        }, {
            field: "gender",
            visible: !1,
            cellStyle: function(e, t, a, n) {
                return {
                    classes: "text-center hidden-xs"
                }
            }
        }, {
            field: "otherdetails",
            visible: !1,
            formatter: function(e, t, a, n) {
                return '<div class="otherWidth">' + t.otherdetails + "</div>"
            },
            cellStyle: function(e, t, a, n) {
                return {
                    classes: "text-center hidden-xs hidden-sm otherWidth"
                }
            }
        }, {
            field: "rowNumber",
            visible: !1
        }, {
            field: "location",
            visible: !1
        }, {
            field: "basesalary",
            visible: !1
        }, {
            field: "stockgrantvalue",
            visible: !1
        }, {
            field: "bonus",
            visible: !1
        }, {
            field: "title",
            visible: !1
        }, {
            field: "tag",
            visible: !1
        }]
    });
    var s, o = $("#compTable");
    o.on("expand-row.bs.table", function(e, t, a, n) {
        var r = $("#desc" + t).html();
        $(window).width() <= 768 ? $("#compTable .detail-view td").attr("colspan", 3) : $("#compTable .detail-view td").attr("colspan", 4),
        n.html(r)
    }),
    o.on("click-row.bs.table", function(e, t, a) {
        a.next().is("tr.detail-view") ? o.bootstrapTable("collapseRow", a.data("index")) : o.bootstrapTable("expandRow", a.data("index"))
    }),
    $("th").css("border", "none"),
    $(".search-salaries").keyup(function() {
        clearTimeout(s);
        var e = this.value;
        s = setTimeout(function() {
            updateTableForSearch(),
            $("th").css("border", "none"),
            "" === e && (updateUrl($(".track-selector :selected").text(), e),
            showMedianOrAverageAggregate(null))
        }, 200)
    }),
    0 !== $(".region-dma-ids").length || a && "" !== a || n && "" !== n || r || getUserLocationDetails(function(e) {
        var t;
        void 0 !== e.geobytesdma && supportedDmaIds.has(e.geobytesdma) && (t = supportedRegionsbyDmas[e.geobytesdma]),
        void 0 !== e.geobytescountry && "United States" !== e.geobytescountry && supportedCountryRegions.has(e.geobytescountry) && (t = e.geobytescountry),
        void 0 !== t && ($(".search-filter-tags-container").append('\n                    <span class="search-filter-tag"><span class="search-filter-tag-text-span">' + t + '</span> <i style="margin-left: 7px; color: #92c1eb;" class="fas fa-times remove-search-filter-region-tag"></i></span>\n                '),
        $('input[value="' + t + '"].region-checkbox').attr("checked", "checked"),
        $(".remove-search-filter-region-tag").click(function(e) {
            var t = $(this).parent().find(".search-filter-tag-text-span").text();
            $('input[value="' + t + '"].region-checkbox').removeAttr("checked"),
            $(this).parent().remove(),
            updateTableForSearch(!0)
        }),
        updateTableForSearch(!0))
    }),
    updateTableForSearch(!0)
}
function dateParser(e) {
    var t = e.split(" ")[0];
    return t.substring(t, t.length - 4) + t.slice(-2)
}
function timestampComparator(e, t) {
    return e = e.split(" ")[0].split("/"),
    t = t.split(" ")[0].split("/"),
    e[2] - t[2] || e[0] - t[0] || e[1] - t[1]
}
function getQueryString() {
    return function() {
        var e = {}
          , t = window.location.search.substring(1);
        "/" == t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1));
        for (var a = t.split("&"), n = 0; n < a.length; n++) {
            var r = a[n].split("=");
            if (void 0 === e[r[0]])
                e[r[0]] = decodeURIComponent(r[1]);
            else if ("string" == typeof e[r[0]]) {
                var s = [e[r[0]], decodeURIComponent(r[1])];
                e[r[0]] = s
            } else
                e[r[0]].push(decodeURIComponent(r[1]))
        }
        return e
    }()
}
function submitEmailForTrackNotification() {
    var e = $(".track-notification-email").val();
    if ("" !== e.trim()) {
        var t = $("#track-selector").val();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "https://docs.google.com/forms/d/e/1FAIpQLSciE-B4JsosNkkTCJm3s_j3P66LI7VNLHCOtLd2C0au5jEIKQ/formResponse",
            data: {
                "entry.1743330144": e,
                "entry.1946321857": t
            },
            statusCode: {
                0: function() {
                    $(".get-notified-form").hide(),
                    $(".get-notified-thank-you").show()
                },
                200: function() {
                    $(".get-notified-form").hide(),
                    $(".get-notified-thank-you").show()
                }
            }
        })
    }
}
function updateTrackAndLink(e) {
    var t = getQueryString();
    updateUrl($(".track-selector :selected").text(), t.search);
    var a = $(".track-selector :selected").text();
    ["Software Engineer", "Product Manager", "Product Designer", "Software Engineering Manager", "Technical Program Manager", "Data Scientist", "Solution Architect", "Hardware Engineer"].indexOf(a) > -1 ? ("Software Engineer" === a ? $(".charts-container").show() : $(".company-salary-page").length > 0 ? $(".charts-container").show() : $(".charts-container").hide(),
    $(".spreadsheet").show(),
    $(".spreadsheet-link").show(),
    $(".educative-container").show(),
    $(".add-comp-by-select").show(),
    $(".triplebyte-container").show(),
    $(".ad-container").show(),
    $(".help-us-container").hide()) : (a = "Software Engineer",
    $(".charts").hide(),
    $(".spreadsheet").hide(),
    $(".spreadsheet-link").hide(),
    $(".educative-container").hide(),
    $(".charts-container").hide(),
    $(".add-comp-by-select").hide(),
    $(".triplebyte-container").hide(),
    $(".ad-container").hide(),
    $(".help-us-container").show());
    var n = {
        "Software Engineer": "d8c1f027-d0f2-4c08-a17f-64bbb46c3d70",
        "Product Manager": "5496889f-c6f6-4ba3-9103-ed2a2e3281fe",
        "Product Designer": "817811b0-6b52-4379-9276-fdb217633fd8",
        "Software Engineering Manager": "1f480875-cbf5-446e-89a4-90fbe5b96555",
        "Technical Program Manager": "eaf0e0e9-a889-4531-839f-725cea723d2e",
        "Data Scientist": "5737b466-ef4d-47fd-b525-e1fa67196174",
        "Solution Architect": "d8c1f027-d0f2-4c08-a17f-64bbb46c3d70",
        "Hardware Engineer": "babab316-970a-4d95-9964-d9345a3f3afb"
    };
    $(".verified-email-entry-form").attr("id", "form[" + n[a] + "]"),
    $(".verified-email-entry-form").attr("action", "https://app.bigmailer.io/t/f/" + n[a]),
    $(".verified-email-entry-button").attr("id", "button[" + n[a] + "]"),
    $(".verified-email-entry-success").attr("id", "success[" + n[a] + "]"),
    salaryData && saveAndRenderSalaryInfo(salaryData, $(".track-selector :selected").text(), t.search, t.gender, e)
}
function updateGenderFilter(e, t) {
    !t || "Male" !== t && "Female" !== t && "Other" !== t || ($(".remove-search-filter-gender-tag").parent().remove(),
    $(".select-gender-filter-container label").each(function() {
        $(this).text() === t && ($(this).parent().find("input").prop("checked", !0),
        handleGenderRadioButtonFilter(t))
    }),
    updateUrl($(".track-selector :selected").text(), e.search),
    updateTableForSearch(!0))
}
function registerEventsForSearchFilters() {
    $(document).on("click", ".search-salaries-input-group .dropdown-menu", function(e) {
        e.stopPropagation()
    }),
    $(document).on("change", ".region-checkbox", function(e) {
        $(this).prop("checked") ? ($(".search-filter-tags-container").append('\n                <span class="search-filter-tag"><span class="search-filter-tag-text-span">' + $(this).val() + '</span> <i style="margin-left: 7px; color: #92c1eb;" class="fas fa-times remove-search-filter-region-tag"></i></span>\n            '),
        $(".remove-search-filter-region-tag").click(function(e) {
            var t = $(this).parent().find(".search-filter-tag-text-span").text();
            $('input[value="' + t + '"].region-checkbox').removeAttr("checked"),
            $(this).parent().remove(),
            updateTableForSearch(!0)
        })) : $("span.search-filter-tag:contains('" + $(this).val() + "')").remove(),
        updateTableForSearch(!0)
    }),
    $(".quick-select-yoe-radio").click(function() {
        $(this).is(":checked") && handleYoERadioButtonFilter($(this).parent().find("label").text());
        updateTableForSearch(!0)
    }),
    $(".select-gender-radio").click(function() {
        ($(".remove-search-filter-gender-tag").parent().remove(),
        $(this).is(":checked")) && handleGenderRadioButtonFilter($(this).parent().find("label").text());
        updateUrl($(".track-selector :selected").text(), $(".search-salaries").val()),
        updateTableForSearch(!0)
    }),
    $(".yoe-range-filter-input").on("change keyup paste", throttle(function() {
        $(".remove-search-filter-yoe-tag").parent().remove(),
        $(".search-filter-tags-container").append('\n            <span class="search-filter-tag"><span class="search-filter-tag-text-span">' + ($(".start-yoe-range-filter-input").val() || 0) + " to " + ($(".end-yoe-range-filter-input").val() || 0) + ' YoE</span> <i style="margin-left: 7px; color: #92c1eb;" class="fas fa-times remove-search-filter-yoe-tag"></i></span>\n        '),
        $(".remove-search-filter-yoe-tag").click(function(e) {
            $(".start-yoe-range-filter-input").val(""),
            $(".end-yoe-range-filter-input").val(""),
            $(this).parent().remove(),
            updateTableForSearch(!0)
        }),
        $(".quick-select-yoe-radio:checked").prop("checked", !1),
        updateTableForSearch(!0)
    }, 350)),
    $(".yac-range-filter-input").on("change keyup paste", throttle(function() {
        $(".remove-search-filter-yac-tag").parent().remove(),
        $(".search-filter-tags-container").append('\n            <span class="search-filter-tag"><span class="search-filter-tag-text-span">' + ($(".start-yac-range-filter-input").val() || 0) + " to " + ($(".end-yac-range-filter-input").val() || 0) + ' YaC</span> <i style="margin-left: 7px; color: #92c1eb;" class="fas fa-times remove-search-filter-yac-tag"></i></span>\n        '),
        $(".remove-search-filter-yac-tag").click(function(e) {
            $(".start-yac-range-filter-input").val(""),
            $(".end-yac-range-filter-input").val(""),
            $(this).parent().remove(),
            updateTableForSearch(!0)
        }),
        updateTableForSearch(!0)
    }, 350))
}
function handleYoERadioButtonFilter(e) {
    $(".remove-search-filter-yoe-tag").parent().remove(),
    yoeRanges[e] ? ($(".start-yoe-range-filter-input").val(yoeRanges[e][0]),
    $(".end-yoe-range-filter-input").val(yoeRanges[e][1]),
    $(".search-filter-tags-container").append('\n            <span class="search-filter-tag"><span class="search-filter-tag-text-span">' + e + '</span> <i style="margin-left: 7px; color: #92c1eb;" class="fas fa-times remove-search-filter-yoe-tag"></i></span>\n        '),
    $(".remove-search-filter-yoe-tag").click(function(e) {
        $(".quick-select-yoe-radio:checked").prop("checked", !1),
        $(".start-yoe-range-filter-input").val(""),
        $(".end-yoe-range-filter-input").val(""),
        $(this).parent().remove(),
        updateTableForSearch(!0)
    })) : ($(".start-yoe-range-filter-input").val(""),
    $(".end-yoe-range-filter-input").val(""))
}
function handleGenderRadioButtonFilter(e) {
    $(".search-filter-tags-container").append('\n        <span class="search-filter-tag"><span class="search-filter-tag-text-span">' + e + ' Gender</span> <i style="margin-left: 7px; color: #92c1eb;" class="fas fa-times remove-search-filter-gender-tag"></i></span>\n    '),
    $(".remove-search-filter-gender-tag").click(function(e) {
        $(".select-gender-radio:checked").prop("checked", !1),
        $(this).parent().remove(),
        updateUrl($(".track-selector :selected").text(), $(".search-salaries").val()),
        updateTableForSearch(!0)
    })
}
function updateTableForSearch(e) {
    if (e) {
        $(".quick-select-yoe-radio:checked").parent().find("label").text();
        var t = salaryData.filter(function(e) {
            return e.title === $(".track-selector").val()
        }).reverse();
        t = filterSalariesByRegion(t),
        "" === $(".start-yoe-range-filter-input").val() && "" === $(".end-yoe-range-filter-input").val() || (t = t.filter(function(e) {
            return parseInt(e.yearsofexperience) >= parseInt($(".start-yoe-range-filter-input").val() || 0) && parseInt(e.yearsofexperience) <= parseInt($(".end-yoe-range-filter-input").val() || 0)
        })),
        "" === $(".start-yac-range-filter-input").val() && "" === $(".end-yac-range-filter-input").val() || (t = t.filter(function(e) {
            return parseInt(e.yearsatcompany) >= parseInt($(".start-yac-range-filter-input").val() || 0) && parseInt(e.yearsatcompany) <= parseInt($(".end-yac-range-filter-input").val() || 0)
        }));
        var a = $(".select-gender-radio:checked").parent().find("label").text();
        a && "" != a && (t = t.filter(function(e) {
            return e.gender === a
        }));
        for (var n = $("input.region-checkbox:checked").map(function() {
            return $(this).val()
        }).get(), r = getDMAsForRegions(n), s = [], o = 0; o < n.length; o++)
            supportedCountryRegions.has(n[o]) && s.push(n[o]);
        0 === r.size && 0 === s.length || (t = t.filter(function(e) {
            if (void 0 !== e.dmaid && 0 !== r.size && r.has(e.dmaid))
                return !0;
            if (void 0 !== e.location && 0 !== s.length)
                for (var t = 0; t < s.length; t++)
                    if (e.location.endsWith(s[t]))
                        return !0;
            return !1
        })),
        $("#compTable").bootstrapTable("load", t),
        showMedianOrAverageAggregate(getSearchHits(t, $(".search-salaries").val()))
    } else {
        var i = $(".search-salaries").val();
        $(".company-profile-charts").length > 0 && (i = $(".company-profile-charts").val() + " " + i),
        $(".company-profile-level-name").length > 0 && (i = $(".company-profile-charts").val() + " " + $(".company-profile-level-name").val() + " " + i),
        $("#compTable").bootstrapTable("refreshOptions", {
            search: !0,
            searchText: i
        })
    }
}
$(document).ready(function() {
    var e = getQueryString();
    $.getJSON("/js/recentSalaryData.json", function(t) {
        $.getJSON("/js/salaryData.json", function(a) {
            $.getJSON("/js/data.json", function(n) {
                $.getJSON("/js/companyInformation.json", function(r) {
                    var s = [];
                    companiesWithInfo = $(".company-list-with-info li").map(function() {
                        return $(this).html()
                    }).get(),
                    $(".company-list-with-info-container").remove();
                    for (var o = 0; o < t.length; o++) {
                        for (var i = !1, l = a.length - t.length; l < a.length; l++)
                            l < 0 || a[l].rowNumber == t[o].rowNumber && (i = !0);
                        i || s.push(t[o])
                    }
                    salaryData = a.concat(s),
                    companyInformation = r,
                    companyLevelingData = n,
                    e.track && "" !== e.track && $(".track-selector").val(e.track),
                    e.gender && updateGenderFilter(e, e.gender),
                    e.showAll ? updateTrackAndLink(!0) : updateTrackAndLink()
                })
            })
        })
    }),
    $(".hide-charts").click(function() {
        $("#charts-view-wrapper").remove()
    }),
    $(".hide-regions").click(function() {
        $("#regions-view-wrapper").remove()
    });
    var t = $("#bottom").tabSlideOut({
        tabLocation: "bottom",
        offset: "40px",
        otherOffset: "40px"
    });
    registerEventsForSearchFilters(),
    setTimeout(function() {
        t.tabSlideOut("bounce")
    }, 1500),
    setTimeout(function() {
        !isLocalStorageNameSupported() || localStorage.getItem("hasSeenCompensationPopUp") || popupOpened || 0 !== $(".company-profile-charts").length || e.submitted || ($("[data-remodal-id=submit-compensation-modal]").remodal().open(),
        localStorage.setItem("hasSeenCompensationPopUp", !0))
    }, 15e3),
    $(".submit-compensation-modal-button").click(function(e) {
        var t = $("#total-compensation-submission").val();
        t = (t = t.replace(/[\D\s\._\-]+/g, "")) ? Math.floor(parseInt(t, 10) / 1e3) : "";
        var a = $("#company-name-submission").val();
        window.location = "/addcomp_manual.html?companyName=" + a + "&totalSalary=" + t
    }),
    $("#total-compensation-submission").keyup(function(e) {
        if ("" === window.getSelection().toString() && -1 === $.inArray(e.keyCode, [38, 40, 37, 39])) {
            var t, a = $(this);
            t = (t = (t = a.val()).replace(/[\D\s\._\-]+/g, "")) ? parseInt(t, 10) : 0,
            a.val(function() {
                return 0 === t ? "" : "$" + t.toLocaleString("en-US")
            })
        }
    }),
    e.thanks && $("[data-remodal-id=thank-you-submission]").remodal().open(),
    $(".export-data-btn").click(function() {
        ga("send", "event", "Export_Data", "click"),
        window.open("/offerings")
    }),
    $(".submitComp").click(function() {
        var e = encodeURIComponent($("#companyNameInput").val())
          , t = encodeURIComponent($("#levelNameInput").val())
          , a = $("#compInput").val();
        if ("" === a)
            return !0;
        var n = parseInt(a);
        n > 1e5 && (n /= 1e3,
        n = Math.round(n));
        var r = encodeURIComponent(n);
        return window.location = "/addcomp.html?companyName=" + e + "&levelName=" + t + "&totalSalary=" + r,
        !1
    }),
    $(".get-notified-submit").click(function(e) {
        submitEmailForTrackNotification()
    }),
    $(".help-us-container").hide(),
    $(".track-selector").change(function() {
        updateTrackAndLink(!0)
    })
});
