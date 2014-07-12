// ==UserScript==
// @name           ChangeSearch
// @namespace      https://github.com/hentaiPanda
// @description    替换bangumi『全部』一栏的搜索结果为搜索引擎结果
// @author         niR
// @version        0.0.2
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @require        http://code.jquery.com/ui/1.11.0/jquery-ui.js
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue
// @include        http://bangumi.tv/subject_search/*?cat=all*
// @include        http://bgm.tv/subject_search/*?cat=all*
// @include        http://chii.in/subject_search/*?cat=all*
// ==/UserScript==


var aolSearch, bingSearch, doSearch, doSearchKai, getFirstChild, getLang, gooSearch, googleSearch, hotbotGetKey, hotbotSearch, injectStyle, pgsbarDiv, searchEngine, searchEngineKai, transAni, wrapTextNode;

wrapTextNode = function(node, tagname, klass) {
  var wrapper;
  wrapper = document.createElement(tagname);
  node.parentNode.insertBefore(wrapper, node);
  wrapper.appendChild(node);
  if (klass) {
    wrapper.className = klass;
  }
  return wrapper;
};

getFirstChild = function(node) {
  var fc;
  fc = node.firstChild;
  while (fc !== null && fc.nodeType !== 1) {
    fc = fc.nextSibling;
  }
  return fc;
};

injectStyle = function(engine) {
  var css;
  css = {
    google: '<style type="text/css"> .ui-progressbar-value { background-color: #0084B4 !important; } h3.r{ font-weight: 100; font-size: 13px !important; padding: 5px 0px 0px; } h3 a:link { color: #0084B4; } h3 a:hover { color: #0187C5; text-decoration: underline; } h3 a:visited, h3 a:active { color: #0187C5; } div.f.kv { padding: 10px 0px 2px; font-size: 10px; color: #999; } span.st { color: #666; } li.g{ line-height: 1.2; list-style-type: none; border-bottom: 1px solid #EAEAEA; padding: 10px 5px 8px; position: relative; } em { font-weight: bold; /* em font color : red */ /*color: #DD4B39;*/ font-style: normal; } #divnav { padding: 10px 0px 0px; } #divnav a.fl:hover { color: #FFF; background: none repeat scroll 0% 0% #0084B4; } #divnav a.fl, #divnav a.fl:active, #divnav a.fl:visited { padding: 4px 8px; margin-right: 4px; font-size: 12px; color: #555; background: none repeat scroll 0% 0% #EEE; text-decoration: none; font-weight: normal; border-radius: 5px; } </style>',
    bing: '<style type="text/css"> .ui-progressbar-value { background-color: #0084B4 !important; } .b_caption { color: #666; padding: 5px 0px 0px; } .b_title h2 { font-weight: normal; font-size: 13px !important; padding: 5px 0px 0px; } .b_title h2 a:link { color: #0084B4; } .b_title h2 a:hover { color: #0187C5; text-decoration: underline; } .b_title h2 a:visited, .b_title h2 a:active { color: #0187C5; } .b_attribution, cite { font-weight: normal; padding: 5px 0px 2px; font-size: 10px; color: #999; } li.b_pag { list-style-type: none; /*padding: 5px 5px 8px;*/ border-bottom: none !important; } .b_pag li { float: left; } li.b_algo { line-height: 1.2; list-style-type: none; border-bottom: 1px solid #EAEAEA; padding: 10px 5px 8px; position: relative; } a.sb_pagS { margin-right: 4px; font-size: 12px; color: #FFF; font-weight: normal; padding: 4px 8px; display: inline; background: none repeat scroll 0% 0% #F09199; border-radius: 5px; } em { font-style: normal; } nav { padding: 10px 0px 0px; } nav ul li a:hover { color: #FFF; background: none repeat scroll 0% 0% #0084B4; } nav ul li a, nav ul li a:active, nav ul li a:visited { padding: 4px 8px; margin-right: 4px; font-size: 12px; color: #555; background: none repeat scroll 0% 0% #EEE; text-decoration: none; font-weight: normal; border-radius: 5px; } </style>',
    aol: '<style type="text/css"> .ui-progressbar-value { background-color: #0084B4 !important; } .b_caption { padding: 5px 0px 0px; } .hac { font-weight: normal; font-size: 13px !important; padding: 5px 0px 0px; } .hac a:link { color: #0084B4; } .hac a:hover { color: #0187C5; text-decoration: underline; } .hac a:visited, .hac a:active { color: #0187C5; } .durl.find { padding: 10px 0px 2px; font-weight: normal; font-size: 10px !important; color: #999; } li p { color: #666; } #columnSearchB li[about] { line-height: 1.2; list-style-type: none; padding: 5px 5px 8px; border-bottom: 1px solid #EAEAEA; padding: 10px 5px 8px; position: relative; } em { font-style: normal; } #divnav { padding: 10px 0px 0px; } span.p_cur { margin-right: 4px; font-size: 12px; color: #FFF; font-weight: normal; padding: 4px 8px; display: inline; background: none repeat scroll 0% 0% #F09199; border-radius: 5px; } </style>',
    hotbot: '<style type="text/css"> .ui-progressbar-value { background-color: #0084B4 !important; } h3.web-url.resultTitle { font-weight: normal; font-size: 13px !important; padding: 5px 0px 0px; } h3.web-url.resultTitle a:link { color: #0084B4; } h3.web-url.resultTitle h2 a:hover { color: #0187C5; text-decoration: underline; } h3.web-url.resultTitle a:visited, h3.web-url.resultTitle a:active { color: #0187C5; } .web-description { color: #666; padding: 5px 0px 0px; } span.web-baseuri { display: inherit; font-weight: normal; padding: 5px 0px 2px; font-size: 10px; color: #999; } li.result { line-height: 1.2; list-style-type: none; border-bottom: 1px solid #EAEAEA; padding: 10px 5px 8px; position: relative; } #divnav { padding: 10px 0px 0px; } span.p_cur { margin-right: 4px; font-size: 12px; color: #FFF; font-weight: normal; padding: 4px 8px; display: inline; background: none repeat scroll 0% 0% #F09199; border-radius: 5px; } </style>',
    goo: '<style type="text/css"> .ui-progressbar-value { background-color: #0084B4 !important; } p.title.fsL1 { font-weight: normal; font-size: 13px !important; padding: 5px 0px 0px; } p.title.fsL1 a:link { color: #0084B4; } p.title.fsL1 a:hover { color: #0187C5; text-decoration: underline; } p.title.fsL1 a:visited, p.title.fsL1 a:active { color: #0187C5; } p.url.fsM.cH { display: inherit; font-weight: normal; padding: 10px 0px 2px; font-size: 10px; color: #999; } p.txt.fsM { color: #666; } div.result { line-height: 1.2; list-style-type: none; border-bottom: 1px solid #EAEAEA; padding: 10px 5px 8px; position: relative; } #divnav { padding: 10px 0px 0px; } #divnav li, #divnav .fsM { float: left; } span.p_cur { margin-right: 4px; font-size: 12px; color: #FFF; font-weight: normal; padding: 4px 8px; display: inline; background: none repeat scroll 0% 0% #F09199; border-radius: 5px; } </style>'
  };
  $("head").append(css[engine]);
  return console.log("style injected");
};

googleSearch = function(response) {
  var nav, responseHTML;
  responseHTML = $(response.responseText).find(".srg").html();
  if (!responseHTML) {
    return;
  }
  nav = $(response.responseText).find("#nav").html();
  if (!nav) {
    nav = "";
  }
  nav = '<div id="divnav">' + nav + '</div>';
  $("#columnSearchB").html(responseHTML + nav);
  $(".f.slp").remove();
  $("div.f.kv cite").each(function() {
    return this.parentNode.innerHTML = this.innerHTML;
  });
  $("#divnav").contents().each(function() {
    if (this.nodeType === 3) {
      return wrapTextNode(this, "strong", "p_cur");
    }
  });
  $("#pnnext").text("››").removeClass("pn").addClass("fl");
  $("#pnprev").text("‹‹").removeClass("pn").addClass("fl");
  $("#columnSearchB li div h3 a").each(function() {
    var href;
    this.removeAttribute("onmousedown");
    href = this.getAttribute("href").split("http://bangumi.tv");
    if (href[1]) {
      return this.setAttribute("href", href[1]);
    }
  });
  $("#divnav a.fl").each(function() {
    this.setAttribute("data-src", this.getAttribute("href"));
    this.setAttribute("onclick", "console.log(this.textContent)");
    return this.setAttribute("href", "javascript:");
  });
  return $("html").scrollTop(0);
};

bingSearch = function(response) {
  var responseHTML;
  if ($(response.responseText).find("li.b_no").html() != null) {
    return;
  }
  responseHTML = $(response.responseText).find("ol#b_results").html();
  $("#columnSearchB").html(responseHTML);
  $(".b_title h2").siblings().remove();
  $("li.b_ans, li.b_pag:first, nav h4.b_hide").remove();
  $(".b_caption").each(function() {
    var i, _i, _len, _ref;
    _ref = this.childNodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if (i.nodeType !== 3) {
        return this.appendChild(i);
      }
    }
  });
  $(".b_attribution cite").each(function() {
    this.parentNode.removeAttribute("u");
    return this.parentNode.innerHTML = this.textContent;
  });
  $(".sw_prev").parent().html("‹‹").removeClass("sb_pagP").addClass("p");
  $(".sw_next").parent().html("››").removeClass("sb_pagN").addClass("p");
  $(".b_title a").each(function() {
    var href;
    this.removeAttribute("h");
    href = this.getAttribute("href").split("http://bangumi.tv");
    if (href[1]) {
      return this.setAttribute("href", href[1]);
    }
  });
  $("nav ul li a").each(function() {
    this.setAttribute("data-src", this.getAttribute("href"));
    this.setAttribute("onclick", "console.log(this.textContent)");
    this.setAttribute("href", "javascript:");
    return this.removeAttribute("h");
  });
  return $("html").scrollTop(0);
};

aolSearch = function(response) {
  var i, nav, res2, responseHTML, _i, _len, _ref;
  responseHTML = $(response.responseText).find(".MSL ul").html();
  if (!responseHTML) {
    return;
  }
  _ref = [".MSL.MSL2 ul", ".MSL.MSL3 ul"];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    i = _ref[_i];
    res2 = $(response.responseText).find(i).html();
    if (!res2) {
      break;
    }
    responseHTML += res2;
  }
  nav = $(response.responseText).find("#pagination ul").html();
  if (!nav) {
    nav = "";
  }
  nav = '<div id="divnav">' + nav + '</div>';
  $("#columnSearchB").html(responseHTML + nav);
  $(".moreResults").remove();
  $(".gspPageNext a:first-child").text("››");
  $(".gspPagePrev a:first-child").text("‹‹");
  $(".durl.find span:first-child").each(function() {
    return this.parentNode.innerHTML = this.innerHTML;
  });
  $(".hac a").each(function() {
    var href;
    this.removeAttribute("onclick");
    href = this.getAttribute("href").split("http://bangumi.tv");
    if (href[1]) {
      return this.setAttribute("href", href[1]);
    }
  });
  $("#divnav a").each(function() {
    this.setAttribute("data-src", this.getAttribute("href"));
    this.setAttribute("onclick", "console.log(this.textContent)");
    this.setAttribute("href", "javascript:");
    return this.setAttribute("class", "p");
  });
  $("#divnav span").each(function() {
    if (!this.className) {
      return this.setAttribute("class", "p_cur");
    }
  });
  return $("html").scrollTop(0);
};

hotbotSearch = function(response) {
  var nav, responseHTML;
  responseHTML = $(response.responseText).find("#web-results ol").html();
  if (!responseHTML) {
    return;
  }
  nav = $(response.responseText).find(".pagination.pagBottom").html();
  if (!nav) {
    nav = "";
  }
  nav = '<div id="divnav">' + nav + '</div>';
  $("#columnSearchB").html(responseHTML + nav);
  $(".web-description").each(function() {
    var i, _i, _len, _ref, _results;
    _ref = this.childNodes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if (i.tagName === "BR") {
        continue;
      }
      _results.push(this.insertBefore(i, this.firstChild));
    }
    return _results;
  });
  $(".web-baseuri").each(function() {
    var href;
    href = getFirstChild(getFirstChild(this.parentNode.parentNode));
    return this.textContent = href.getAttribute("href").split("http://")[1];
  });
  $("li.result a").each(function() {
    var href;
    this.setAttribute("target", "_blank");
    href = this.getAttribute("href").split("http://bangumi.tv");
    if (href[1]) {
      return this.setAttribute("href", href[1]);
    }
  });
  $("#divnav a.next").text("››");
  $("#divnav a.previous").text("‹‹");
  $("#divnav a").each(function() {
    this.setAttribute("data-src", this.getAttribute("href"));
    this.setAttribute("onclick", "console.log(this.textContent)");
    this.setAttribute("href", "javascript:");
    return this.setAttribute("class", "p");
  });
  $("#divnav span.current").addClass("p_cur");
  return $("html").scrollTop(0);
};

hotbotGetKey = function(resText) {
  return resText.split("$('#keyvol').val('")[1].split("'")[0];
};

gooSearch = function(response) {
  var nav, responseHTML;
  responseHTML = $(response.responseText).find(".sec4").html();
  if (!responseHTML) {
    return;
  }
  nav = $(response.responseText).find(".nav").html();
  if (!nav) {
    nav = "";
  }
  nav = '<div id="divnav">' + nav + '</div>';
  $("#columnSearchB").html(responseHTML + nav);
  $("#columnSearchB div.error").remove();
  $("p.num.fsM.cH").remove();
  $(".url.fsM.cH span.cM").each(function() {
    return this.parentNode.innerHTML = $.trim(this.textContent);
  });
  $("p.title.fsL1 a").each(function() {
    var href;
    this.removeAttribute("id");
    this.removeAttribute("class");
    this.removeAttribute("onclick");
    this.setAttribute("target", "_blank");
    href = this.getAttribute("href").split("http://bangumi.tv");
    if (href[1]) {
      return this.setAttribute("href", href[1]);
    }
  });
  $("#divnav .next").text("››");
  $("#divnav .prev").text("‹‹");
  $("#divnav .nextMax, #divnav .prevMax").parentsUntil("li").remove();
  $("#divnav a").each(function() {
    var href;
    this.removeAttribute("id");
    this.removeAttribute("class");
    href = this.getAttribute("href").split("http://search.goo.ne.jp")[1];
    this.setAttribute("data-src", href);
    this.setAttribute("onclick", "console.log(this.textContent)");
    this.setAttribute("href", "javascript:");
    this.setAttribute("class", "p");
    return this.parentNode.outerHTML = this.outerHTML;
  });
  $("#divnav span").addClass("p_cur");
  $("#divnav a, #divnav span").appendTo("#divnav");
  $("#divnav .fsM, #divnav .num").remove();
  return $("html").scrollTop(0);
};

transAni = function(flag) {
  var func;
  func = {};
  func["start"] = function() {
    console.log("doSearch start");
    pgsbarDiv();
    return $("#pgsbarwrapper").progressbar({
      value: false
    });
  };
  func["onload"] = function() {
    console.log("onload success");
    $("#pgsbarwrapper").progressbar("destroy");
    return $("#pgsbarwrapper").remove();
  };
  func["onerror"] = function() {
    console.log("onerror no response");
    $("#pgsbarwrapper").progressbar("destroy");
    return $("#pgsbarwrapper").remove();
  };
  return func[flag]();
};

doSearchKai = function(domain, sekw, func, key, kyfunc) {
  $("#columnSearchB").html("");
  transAni("start");
  console.log(domain);
  if (!key) {
    console.log(domain + sekw);
    return GM_xmlhttpRequest({
      method: "GET",
      url: domain + sekw,
      onload: function(response) {
        transAni("onload");
        return func(response);
      },
      onerror: function() {
        return transAni("onerror");
      }
    });
  } else {
    return GM_xmlhttpRequest({
      method: "GET",
      url: domain,
      onload: function(response) {
        var keyvol;
        console.log("get keyvol");
        keyvol = kyfunc(response.responseText);
        console.log(keyvol);
        console.log(domain + sekw + keyvol);
        return GM_xmlhttpRequest({
          method: "GET",
          url: domain + sekw + keyvol,
          onload: function(response) {
            transAni("onload");
            return func(response);
          },
          onerror: function() {
            return transAni("onerror");
          }
        });
      },
      onerror: function() {
        return transAni("onerror");
      }
    });
  }
};

doSearch = function(domain, sekw, func) {
  console.log("start");
  $("#columnSearchB").html("");
  $("#columnSearchB").progressbar({
    value: false
  });
  console.log(domain + sekw);
  return GM_xmlhttpRequest({
    method: "GET",
    url: domain + sekw,
    onload: function(response) {
      $("#columnSearchB").progressbar("destroy");
      console.log("success");
      return func(response);
    },
    onerror: function() {
      $("#columnSearchB").progressbar("destroy");
      return console.log("no response");
    }
  });
};

searchEngine = function(se) {
  var engine, kw;
  engine = {
    google: {},
    bing: {},
    aol: {}
  };
  engine["google"] = {
    domain: "https://www.google.com",
    sq: "/search?q=",
    params: ["+-site:doujin.bangumi.tv", "+site:bangumi.tv/subject", "+-inurl:topic", "+-inurl:reviews", "+-inurl:comments", "+-inurl:characters", "+-inurl:persons", "+-inurl:collections", "+-inurl:wishes", "+-inurl:doings", "+-inurl:on_hold", "+-inurl:dropped", "+-inurl:board", "+-inurl:ep", "+-inurl:index", "&filter=0"],
    func: googleSearch
  };
  engine["bing"] = {
    domain: "http://cn.bing.com",
    sq: "/search?q=",
    params: ["+site:bangumi.tv/subject", "+-site:doujin.bangumi.tv", "+-site:bangumi.tv/subject/*/*", "+-inurl:topic", "&intlF=&upl=zh-chs&FORM=TIPCN1"],
    func: bingSearch
  };
  engine["aol"] = {
    domain: "http://search.aol.com/aol/",
    sq: "search?s_it=topsearchbox.search&v_t=na&q=",
    params: ["+-site%3Abangumi.tv%2Fsubject%2F*%2F*", "+-site%3Adoujin.bangumi.tv%2F*", "+site%3Abangumi.tv%2Fsubject", "&filter=false"],
    func: aolSearch
  };
  engine["hotbot"] = {
    domain: "http://www.hotbot.com",
    sq: "/search/web?q=",
    params: ["+-site:doujin.bangumi.tv", "+site:bangumi.tv/subject", "+-inurl:topic", "&keyvol=01e1195423b8ee7e4598"],
    func: hotbotSearch
  };
  injectStyle(se);
  console.log("css injected");
  $("head").append('<link rel="stylesheet" type="text/css" href=' + '"http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">');
  kw = $("#columnSearch > div > form > .searchInputL").val();
  doSearch(engine[se]["domain"], engine[se]["sq"] + kw + engine[se]["params"].join(""), engine[se]["func"]);
  console.log("keyword: ", kw);
  return window.addEventListener("click", function(evt) {
    var href;
    href = evt.target.getAttribute("data-src");
    if (!href) {
      return;
    }
    console.log(href);
    return doSearch(engine[se]["domain"], href, engine[se]["func"]);
  });
};

searchEngineKai = function(se) {
  var engine, kw;
  engine = {};
  engine["google"] = {
    domain: "https://www.google.com",
    sq: "/search?q=",
    params: ["+-site:doujin.bangumi.tv", "+site:bangumi.tv/subject", "+-inurl:topic", "+-inurl:reviews", "+-inurl:comments", "+-inurl:characters", "+-inurl:persons", "+-inurl:collections", "+-inurl:wishes", "+-inurl:doings", "+-inurl:on_hold", "+-inurl:dropped", "+-inurl:board", "+-inurl:ep", "+-inurl:index", "&filter=0"],
    func: googleSearch,
    key: false,
    kyfunc: ""
  };
  engine["bing"] = {
    domain: "http://cn.bing.com",
    sq: "/search?q=",
    params: ["+site:bangumi.tv/subject", "+-site:doujin.bangumi.tv", "+-site:bangumi.tv/subject/*/*", "+-inurl:topic", "&intlF=&upl=zh-chs&FORM=TIPCN1"],
    func: bingSearch,
    key: false,
    kyfunc: ""
  };
  engine["aol"] = {
    domain: "http://search.aol.com/aol/",
    sq: "search?s_it=topsearchbox.search&v_t=na&q=",
    params: ["+-site%3Abangumi.tv%2Fsubject%2F*%2F*", "+-site%3Adoujin.bangumi.tv%2F*", "+site%3Abangumi.tv%2Fsubject", "&filter=false"],
    func: aolSearch,
    key: false,
    kyfunc: ""
  };
  engine["hotbot"] = {
    domain: "http://www.hotbot.com",
    sq: "/search/web?q=",
    params: ["+-site:doujin.bangumi.tv", "+site:bangumi.tv/subject", "+-inurl:topic", "&keyvol="],
    func: hotbotSearch,
    key: true,
    kyfunc: hotbotGetKey
  };
  engine["goo"] = {
    domain: "http://search.goo.ne.jp",
    sq: "/web.jsp?MT=",
    params: ["+site:bangumi.tv/subject", "+-inurl:topic", "+-inurl:doujin", "+-inurl:ep", "&mode=0&IE=UTF-8&OE=UTF-8&from=s_b_top_web&PT="],
    func: gooSearch,
    key: false,
    kyfunc: ""
  };
  injectStyle(se);
  kw = $("#columnSearch > div > form > .searchInputL").val();
  doSearchKai(engine[se]["domain"], engine[se]["sq"] + kw + engine[se]["params"].join(""), engine[se]["func"], engine[se]["key"], engine[se]["kyfunc"]);
  console.log("keyword: ", kw);
  $("#columnSearchB").off();
  return $("#columnSearchB").on("click", "a", function(evt) {
    var href;
    href = evt.target.getAttribute("data-src");
    if (!href) {
      return;
    }
    return doSearchKai(engine[se]["domain"], href, engine[se]["func"], false, engine[se]["kyfunc"]);
  });
};

$(document).ready(function() {
  var enghtml, engine;
  $("head").append('<style type="text/css"> #engine { width: 100px; } #engine-menu { width: 98px !important; } #sewrapper { padding: 15px 0px 0px; } </style>');
  $("head").append('<link rel="stylesheet" type="text/css" href=' + '"http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">');
  enghtml = {
    zh: '<div id="sewrapper"> <select name="engine" id="engine"> <option value="default">默认</option> <option value="google">谷歌</option> <option value="bing">必应</option> <option value="aol">奥尔</option> <option value="hotbot">哈霸</option> <option value="goo">古屋</option> </select> </div>',
    en: '<div id="sewrapper"> <select name="engine" id="engine"> <option value="default">default</option> <option value="google">Google</option> <option value="bing">Bing</option> <option value="aol">AOL</option> <option value="hotbot">HotBot</option> <option value="goo">goo</option> </select> </div>'
  };
  $("#columnSearchA").append(enghtml[getLang()]);
  engine = GM_getValue("searchEngineName", "default");
  $("#engine").val(engine);
  $("#engine").selectmenu({
    change: function(evt, ui) {
      console.log("engine changed");
      GM_setValue("searchEngineName", ui.item.value);
      if (ui.item.value === "default") {
        location.reload();
      }
      return searchEngineKai(ui.item.value);
    }
  });
  if (engine === "default") {
    return;
  }
  return searchEngineKai(engine);
});

getLang = function() {
  var err, lang;
  try {
    lang = window.navigator.language.split("-")[0];
    if (lang !== "en") {
      return "zh";
    }
  } catch (_error) {
    err = _error;
    console.log("cant find window.navigator.language");
    console.log(err);
    lang = "zh";
  }
  return lang;
};

pgsbarDiv = function() {
  var left, top;
  $("body").append('<div id="pgsbarwrapper"></div>');
  left = Math.floor($(window).width() / 2) - 312;
  top = Math.floor($(window).height() * 3 / 8) - 12;
  left = Math.max(left, 110);
  return $("#pgsbarwrapper").css({
    "position": "fixed",
    "left": left,
    "top": top,
    "opacity": "0.7",
    "width": "500px"
  });
};
