# wrap a text node
wrapTextNode = (node, tagname, klass) ->
  wrapper = document.createElement(tagname)
  node.parentNode.insertBefore(wrapper, node)
  wrapper.appendChild(node)
  if klass
    wrapper.className = klass
  return wrapper


# get first child
getFirstChild = (node) ->
  fc = node.firstChild
  while (fc isnt null and fc.nodeType isnt 1)
    fc = fc.nextSibling
  return fc


# inject css style
injectStyle = (engine) ->
  css = {
    google : '<style type="text/css">
    .ui-progressbar-value {
      background-color: #0084B4 !important;
    }
    h3.r{
      font-weight: 100;
      font-size: 13px !important;
      padding: 5px 0px 0px;
    }
    h3 a:link {
      color: #0084B4;
    }
    h3 a:hover {
      color: #0187C5;
      text-decoration: underline;
    }
    h3 a:visited, h3 a:active {
      color: #0187C5;
    }
    div.f.kv._Kz {
      padding: 10px 0px 2px;
      font-size: 10px;
      color: #999;
    }
    span.st {
      color: #666;
    }
    li.g{
      line-height: 1.2;
      list-style-type: none;
      border-bottom: 1px solid #EAEAEA;
      padding: 10px 5px 8px;
      position: relative;
    }
    em {
      font-weight: bold;
      /* em font color : red */
      /*color: #DD4B39;*/
      font-style: normal;
    }
    #divnav {
      padding: 10px 0px 0px;
    }
    #divnav a.fl:hover {
      color: #FFF;
      background: none repeat scroll 0% 0% #0084B4;
    }
    #divnav a.fl, #divnav a.fl:active, #divnav a.fl:visited {
      padding: 4px 8px;
      margin-right: 4px;
      font-size: 12px;
      color: #555;
      background: none repeat scroll 0% 0% #EEE;
      text-decoration: none;
      font-weight: normal;
      border-radius: 5px;
    }
    </style>',
    bing : '<style type="text/css">
    .ui-progressbar-value {
      background-color: #0084B4 !important;
    }
    .b_caption {
      color: #666;
      padding: 5px 0px 0px;
    }
    .b_title h2 {
      font-weight: normal;
      font-size: 13px !important;
      padding: 5px 0px 0px;
    }
    .b_title h2 a:link {
      color: #0084B4;
    }
    .b_title h2 a:hover {
      color: #0187C5;
      text-decoration: underline;
    }
    .b_title h2 a:visited, .b_title h2 a:active {
      color: #0187C5;
    }
    .b_attribution, cite {
      font-weight: normal;
      padding: 5px 0px 2px;
      font-size: 10px;
      color: #999;
    }
    li.b_pag {
      list-style-type: none;
      /*padding: 5px 5px 8px;*/
      border-bottom: none !important;
    }
    .b_pag li {
      float: left;
    }
    li.b_algo {
      line-height: 1.2;
      list-style-type: none;
      border-bottom: 1px solid #EAEAEA;
      padding: 10px 5px 8px;
      position: relative;
    }
    a.sb_pagS {
      margin-right: 4px;
      font-size: 12px;
      color: #FFF;
      font-weight: normal;
      padding: 4px 8px;
      display: inline;
      background: none repeat scroll 0% 0% #F09199;
      border-radius: 5px;
    }
    em {
      font-style: normal;
    }
    nav {
      padding: 10px 0px 0px;
    }
    nav ul li a:hover {
      color: #FFF;
      background: none repeat scroll 0% 0% #0084B4;
    }
    nav ul li a, nav ul li a:active, nav ul li a:visited {
      padding: 4px 8px;
      margin-right: 4px;
      font-size: 12px;
      color: #555;
      background: none repeat scroll 0% 0% #EEE;
      text-decoration: none;
      font-weight: normal;
      border-radius: 5px;
    }
    </style>',
    aol : '<style type="text/css">
    .ui-progressbar-value {
      background-color: #0084B4 !important;
    }
    .b_caption {
      padding: 5px 0px 0px;
    }
    .hac {
      font-weight: normal;
      font-size: 13px !important;
      padding: 5px 0px 0px;
    }
    .hac a:link {
      color: #0084B4;
    }
    .hac a:hover {
      color: #0187C5;
      text-decoration: underline;
    }
    .hac a:visited, .hac a:active {
      color: #0187C5;
    }
    .durl.find {
      padding: 10px 0px 2px;
      font-weight: normal;
      font-size: 10px !important;
      color: #999;
    }
    li p {
      color: #666;
    }
    #columnSearchB li[about] {
      line-height: 1.2;
      list-style-type: none;
      padding: 5px 5px 8px;
      border-bottom: 1px solid #EAEAEA;
      padding: 10px 5px 8px;
      position: relative;
    }
    em {
      font-style: normal;
    }
    #divnav {
      padding: 10px 0px 0px;
    }
    span.p_cur {
      margin-right: 4px;
      font-size: 12px;
      color: #FFF;
      font-weight: normal;
      padding: 4px 8px;
      display: inline;
      background: none repeat scroll 0% 0% #F09199;
      border-radius: 5px;
    }
    </style>',
    hotbot : '<style type="text/css">
    .ui-progressbar-value {
      background-color: #0084B4 !important;
    }
    h3.web-url.resultTitle {
      font-weight: normal;
      font-size: 13px !important;
      padding: 5px 0px 0px;
    }
    h3.web-url.resultTitle a:link {
      color: #0084B4;
    }
    h3.web-url.resultTitle h2 a:hover {
      color: #0187C5;
      text-decoration: underline;
    }
    h3.web-url.resultTitle a:visited, h3.web-url.resultTitle a:active {
      color: #0187C5;
    }
    .web-description {
      color: #666;
      padding: 5px 0px 0px;
    }
    span.web-baseuri {
      display: inherit;
      font-weight: normal;
      padding: 5px 0px 2px;
      font-size: 10px;
      color: #999;
    }
    li.result {
      line-height: 1.2;
      list-style-type: none;
      border-bottom: 1px solid #EAEAEA;
      padding: 10px 5px 8px;
      position: relative;
    }
    #divnav {
      padding: 10px 0px 0px;
    }
    span.p_cur {
      margin-right: 4px;
      font-size: 12px;
      color: #FFF;
      font-weight: normal;
      padding: 4px 8px;
      display: inline;
      background: none repeat scroll 0% 0% #F09199;
      border-radius: 5px;
    }
    </style>',
    goo : '<style type="text/css">
    .ui-progressbar-value {
      background-color: #0084B4 !important;
    }
    p.title.fsL1 {
      font-weight: normal;
      font-size: 13px !important;
      padding: 5px 0px 0px;
    }
    p.title.fsL1 a:link {
      color: #0084B4;
    }
    p.title.fsL1 a:hover {
      color: #0187C5;
      text-decoration: underline;
    }
    p.title.fsL1 a:visited, p.title.fsL1 a:active {
      color: #0187C5;
    }
    p.url.fsM.cH {
      display: inherit;
      font-weight: normal;
      padding: 10px 0px 2px;
      font-size: 10px;
      color: #999;
    }
    p.txt.fsM {
      color: #666;
    }
    div.result {
      line-height: 1.2;
      list-style-type: none;
      border-bottom: 1px solid #EAEAEA;
      padding: 10px 5px 8px;
      position: relative;
    }
    #divnav {
      padding: 10px 0px 0px;
    }
    #divnav li, #divnav .fsM {
      float: left;
    }
    span.p_cur {
      margin-right: 4px;
      font-size: 12px;
      color: #FFF;
      font-weight: normal;
      padding: 4px 8px;
      display: inline;
      background: none repeat scroll 0% 0% #F09199;
      border-radius: 5px;
    }
    </style>'
  }
  $("head").append(css[engine])
  console.log "style injected"


googleSearch = (response) ->
  responseHTML = $(response.responseText).find(".srg").html()
  return unless responseHTML
  nav = $(response.responseText).find("#nav").html()
  nav = "" unless nav
  nav = '<div id="divnav">' + nav + '</div>'
  $("#columnSearchB").html(responseHTML + nav)
  $(".f.slp").remove()
  $("div.f.kv._Kz cite._be").each ->
    this.parentNode.innerHTML = this.innerHTML
  # $("#columnSearchB").css("display", "block")
  $("#divnav").contents().each ->
    if this.nodeType is 3
      wrapTextNode(this, "strong", "p_cur")
  $("#pnnext").text("››").removeClass("pn").addClass("fl")
  $("#pnprev").text("‹‹").removeClass("pn").addClass("fl")
  $("#columnSearchB li div h3 a").each ->
    this.removeAttribute("onmousedown")
    href = this.getAttribute("href").split("http://bangumi.tv")
    this.setAttribute("href", href[1]) if href[1]
  $("#divnav a.fl").each ->
    this.setAttribute("data-src", this.getAttribute("href"))
    this.setAttribute("onclick",
                      "console.log(this.textContent)")
    this.setAttribute("href", "javascript:")
  $("html").scrollTop(0)


bingSearch = (response) ->
  return if $(response.responseText).find("li.b_no").html()?
  responseHTML = $(response.responseText).find("ol#b_results").html()
  $("#columnSearchB").html(responseHTML)
  $(".b_title h2").siblings().remove()
  $("li.b_ans, li.b_pag:first, nav h4.b_hide").remove()
  $(".b_caption").each ->
    for i in this.childNodes
      if i.nodeType isnt 3
        return this.appendChild(i)
  $(".b_attribution cite").each ->
    this.parentNode.removeAttribute("u")
    this.parentNode.innerHTML = this.textContent
  $(".sw_prev").parent().html("‹‹").removeClass("sb_pagP").addClass("p")
  $(".sw_next").parent().html("››").removeClass("sb_pagN").addClass("p")
  $(".b_title a").each ->
    this.removeAttribute("h")
    href = this.getAttribute("href").split("http://bangumi.tv")
    this.setAttribute("href", href[1]) if href[1]
  $("nav ul li a").each ->
    this.setAttribute("data-src", this.getAttribute("href"))
    this.setAttribute("onclick",
                      "console.log(this.textContent)")
    this.setAttribute("href", "javascript:")
    this.removeAttribute("h")
  $("html").scrollTop(0)


aolSearch = (response) ->
  responseHTML = $(response.responseText).find(".MSL ul").html()
  return unless responseHTML
  for i in [".MSL.MSL2 ul", ".MSL.MSL3 ul"]
    res2 = $(response.responseText).find(i).html()
    break unless res2
    responseHTML += res2
  nav = $(response.responseText).find("#pagination ul").html()
  nav = "" unless nav
  nav = '<div id="divnav">' + nav + '</div>'
  $("#columnSearchB").html(responseHTML + nav)
  $(".moreResults").remove()
  $(".gspPageNext a:first-child").text("››")
  $(".gspPagePrev a:first-child").text("‹‹")
  $(".durl.find span:first-child").each ->
    this.parentNode.innerHTML = this.innerHTML
  $(".hac a").each ->
    this.removeAttribute("onclick")
    href = this.getAttribute("href").split("http://bangumi.tv")
    this.setAttribute("href", href[1]) if href[1]
  $("#divnav a").each ->
    this.setAttribute("data-src", this.getAttribute("href"))
    this.setAttribute("onclick",
                      "console.log(this.textContent)")
    this.setAttribute("href", "javascript:")
    this.setAttribute("class", "p")
  $("#divnav span").each ->
    unless this.className
      this.setAttribute("class", "p_cur")
  $("html").scrollTop(0)


hotbotSearch = (response) ->
  responseHTML = $(response.responseText).find("#web-results ol").html()
  return unless responseHTML
  nav = $(response.responseText).find(".pagination.pagBottom").html()
  nav = "" unless nav
  nav = '<div id="divnav">' + nav + '</div>'
  $("#columnSearchB").html(responseHTML + nav)
  # .web-baseuri倒序, 并删除<br />
  $(".web-description").each ->
    for i in this.childNodes
      continue if i.tagName is "BR"
      this.insertBefore(i, this.firstChild)
  # .web-baseuri里hotbot只给domain不给完整url
  $(".web-baseuri").each ->
    href = getFirstChild(getFirstChild(this.parentNode.parentNode))
    this.textContent = href.getAttribute("href").split("http://")[1]
  $("li.result a").each ->
    this.setAttribute("target", "_blank")
    href = this.getAttribute("href").split("http://bangumi.tv")
    this.setAttribute("href", href[1]) if href[1]
  $("#divnav a.next").text("››")
  $("#divnav a.previous").text("‹‹")
  $("#divnav a").each ->
    this.setAttribute("data-src", this.getAttribute("href"))
    this.setAttribute("onclick",
                      "console.log(this.textContent)")
    this.setAttribute("href", "javascript:")
    this.setAttribute("class", "p")
  $("#divnav span.current").addClass("p_cur")
  $("html").scrollTop(0)


hotbotGetKey = (resText) ->
  return resText.split("$('#keyvol').val('")[1].split("'")[0]


gooSearch = (response) ->
  responseHTML = $(response.responseText).find(".sec4").html()
  return unless responseHTML
  nav = $(response.responseText).find(".nav").html()
  nav = "" unless nav
  nav = '<div id="divnav">' + nav + '</div>'
  $("#columnSearchB").html(responseHTML + nav)
  # 无结果时删除 div.error 显示的文字
  $("#columnSearchB div.error").remove()
  $("p.num.fsM.cH").remove()
  $(".url.fsM.cH span.cM").each ->
    # this.parentNode.innerHTML = this.textContent
    this.parentNode.innerHTML = $.trim(this.textContent)
  $("p.title.fsL1 a").each ->
    this.removeAttribute("id")
    this.removeAttribute("class")
    this.removeAttribute("onclick")
    this.setAttribute("target", "_blank")
    href = this.getAttribute("href").split("http://bangumi.tv")
    this.setAttribute("href", href[1]) if href[1]
  $("#divnav .next").text("››")
  $("#divnav .prev").text("‹‹")
  $("#divnav .nextMax, #divnav .prevMax").parentsUntil("li").remove()
  # $("#divnav .nextMax").text("››")
  # $("#divnav .prevMax").text("‹‹")
  $("#divnav a").each ->
    this.removeAttribute("id")
    this.removeAttribute("class")
    href = this.getAttribute("href").split("http://search.goo.ne.jp")[1]
    this.setAttribute("data-src", href)
    this.setAttribute("onclick",
                      "console.log(this.textContent)")
    this.setAttribute("href", "javascript:")
    this.setAttribute("class", "p")
    this.parentNode.outerHTML = this.outerHTML
  $("#divnav span").addClass("p_cur")
  $("#divnav a, #divnav span").appendTo("#divnav")
  $("#divnav .fsM, #divnav .num").remove()
  $("html").scrollTop(0)


transAni = (flag) ->
  # legacy code
  # if flag
  #   console.log "doSearch start"
  #   $("#columnSearchB").progressbar({value: false})
  # else
  #   console.log "onload success"
  #   $("#columnSearchB").progressbar("destroy")
  func = {}
  func["start"] = ->
    console.log "doSearch start"
    # $("#columnSearchB").progressbar({value: false})
    pgsbarDiv()
    $("#pgsbarwrapper").progressbar({value: false})
  func["onload"] = ->
    console.log "onload success"
    # $("#columnSearchB").progressbar("destroy")
    # $("#pgsbarwrapper").animate({"opacity" : "0"}, 1000)
    $("#pgsbarwrapper").progressbar("destroy")
    $("#pgsbarwrapper").remove()
  func["onerror"] = ->
    console.log "onerror no response"
    # $("#columnSearchB").progressbar("destroy")
    $("#pgsbarwrapper").progressbar("destroy")
    $("#pgsbarwrapper").remove()
  func[flag]()


doSearchKai = (domain, sekw, func, key, kyfunc) ->
  # console.log "start"
  $("#columnSearchB").html("")
  # $("#columnSearchB").progressbar({value: false})
  transAni "start"
  console.log domain
  unless key
    console.log domain + sekw
    GM_xmlhttpRequest(
      method: "GET"
      url: domain + sekw
      onload: (response) ->
        # $("#columnSearchB").progressbar("destroy")
        # console.log "success"
        transAni "onload"
        func response
      onerror: ->
        # $("#columnSearchB").progressbar("destroy")
        # console.log "no response"
        transAni "onerror"
    )
  else
    GM_xmlhttpRequest(
      method: "GET"
      url: domain
      onload: (response) ->
        console.log "get keyvol"
        keyvol = kyfunc(response.responseText)
        console.log keyvol
        console.log domain + sekw + keyvol
        GM_xmlhttpRequest(
          method: "GET"
          url: domain + sekw + keyvol
          onload: (response) ->
            # $("#columnSearchB").progressbar("destroy")
            # console.log "success"
            transAni "onload"
            func response
          onerror: ->
            # $("#columnSearchB").progressbar("destroy")
            # console.log "no response"
            transAni "onerror"
        )
      onerror: ->
        # $("#columnSearchB").progressbar("destroy")
        # console.log "homepage no response"
        transAni "onerror"
    )


# legacy func
doSearch = (domain, sekw, func) ->
  console.log "start"
  $("#columnSearchB").html("")
  $("#columnSearchB").progressbar({value: false})
  console.log(domain + sekw)
  GM_xmlhttpRequest(
    method: "GET"
    url: domain + sekw
    onload: (response) ->
      $("#columnSearchB").progressbar("destroy")
      console.log "success"
      func response
    onerror: ->
      $("#columnSearchB").progressbar("destroy")
      console.log "no response"
  )


# legcy func
searchEngine = (se) ->
  engine = 
    google : {}
    bing   : {}
    aol    : {}
  engine["google"] =
    domain : "https://www.google.com"
    sq     : "/search?q="
    params : ["+-site:doujin.bangumi.tv"
              "+site:bangumi.tv/subject"
              "+-inurl:topic"
              "+-inurl:reviews"
              "+-inurl:comments"
              "+-inurl:characters"
              "+-inurl:persons"
              "+-inurl:collections"
              "+-inurl:wishes"
              "+-inurl:doings"
              "+-inurl:on_hold"
              "+-inurl:dropped"
              "+-inurl:board"
              "+-inurl:ep"
              "+-inurl:index"
              "&filter=0"]
    func   : googleSearch
  engine["bing"] =
    domain : "http://cn.bing.com"
    sq     : "/search?q="
    params : ["+site:bangumi.tv/subject"
              "+-site:doujin.bangumi.tv"
              "+-site:bangumi.tv/subject/*/*"
              "+-inurl:topic"
              "&intlF=&upl=zh-chs&FORM=TIPCN1"]
    func   : bingSearch
  engine["aol"] =
    domain : "http://search.aol.com/aol/"
    sq     : "search?s_it=topsearchbox.search&v_t=na&q="
    params : ["+-site%3Abangumi.tv%2Fsubject%2F*%2F*"
              "+-site%3Adoujin.bangumi.tv%2F*"
              "+site%3Abangumi.tv%2Fsubject"
              "&filter=false"]
    func   : aolSearch
  engine["hotbot"] =
    domain : "http://www.hotbot.com"
    sq     : "/search/web?q="
    params : ["+-site:doujin.bangumi.tv"
              "+site:bangumi.tv/subject"
              "+-inurl:topic"
              "&keyvol=01e1195423b8ee7e4598"]
    func   : hotbotSearch
  #--start searching--#
  injectStyle(se)
  console.log "css injected"
  $("head").append(
    '<link rel="stylesheet" type="text/css" href=' + 
    '"http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">')
  kw = $("#columnSearch > div > form > .searchInputL").val()
  doSearch(engine[se]["domain"],
           engine[se]["sq"] + kw + engine[se]["params"].join(""),
           engine[se]["func"])
  console.log "keyword: ", kw
  window.addEventListener("click", (evt) ->
    href = evt.target.getAttribute("data-src")
    return unless href
    console.log href
    doSearch(engine[se]["domain"], href, engine[se]["func"]))


# searchEngine("google")
# searchEngine("bing")
# searchEngine("aol")
# hotbot的搜索结果还可以，但是需要一个由服务器产生的keyvol参数
# 或许是出于安全考虑，keyvol有时间（或者是次数）限制
# searchEngine("hotbot")
# 增加一个engine[se]["key"] === true / false 来控制是否需要实现提取一个参数
# 同时增加一个kyfunc( key func ) 来取得key
# 目前只有hotbot需要 key : true



searchEngineKai = (se) ->
  engine = {}
  engine["google"] =
    domain : "https://www.google.com"
    sq     : "/search?q="
    params : ["+-site:doujin.bangumi.tv"
              "+site:bangumi.tv/subject"
              "+-inurl:topic"
              "+-inurl:reviews"
              "+-inurl:comments"
              "+-inurl:characters"
              "+-inurl:persons"
              "+-inurl:collections"
              "+-inurl:wishes"
              "+-inurl:doings"
              "+-inurl:on_hold"
              "+-inurl:dropped"
              "+-inurl:board"
              "+-inurl:ep"
              "+-inurl:index"
              "&filter=0"]
    func   : googleSearch
    key    : false
    kyfunc : ""
  engine["bing"] =
    domain : "http://cn.bing.com"
    sq     : "/search?q="
    params : ["+site:bangumi.tv/subject"
              "+-site:doujin.bangumi.tv"
              "+-site:bangumi.tv/subject/*/*"
              "+-inurl:topic"
              "&intlF=&upl=zh-chs&FORM=TIPCN1"]
    func   : bingSearch
    key    : false
    kyfunc : ""
  engine["aol"] =
    domain : "http://search.aol.com/aol/"
    sq     : "search?s_it=topsearchbox.search&v_t=na&q="
    params : ["+-site%3Abangumi.tv%2Fsubject%2F*%2F*"
              "+-site%3Adoujin.bangumi.tv%2F*"
              "+site%3Abangumi.tv%2Fsubject"
              "&filter=false"]
    func   : aolSearch
    key    : false
    kyfunc : ""
  engine["hotbot"] =
    domain : "http://www.hotbot.com"
    sq     : "/search/web?q="
    params : ["+-site:doujin.bangumi.tv"
              "+site:bangumi.tv/subject"
              "+-inurl:topic"
              "&keyvol="]
    func   : hotbotSearch
    key    : true
    kyfunc : hotbotGetKey
  engine["goo"] =
    domain : "http://search.goo.ne.jp"
    sq     : "/web.jsp?MT="
    params : ["+site:bangumi.tv/subject"
              "+-inurl:topic"
              "+-inurl:doujin"
              "+-inurl:ep"
              "&mode=0&IE=UTF-8&OE=UTF-8&from=s_b_top_web&PT="]
    func   : gooSearch
    key    : false
    kyfunc : ""
  #--start searching--#
  injectStyle(se)
  # legacy code
  # $("head").append(
  #   '<link rel="stylesheet" type="text/css" href=' + 
  #   '"http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">')
  kw = $("#columnSearch > div > form > .searchInputL").val()
  doSearchKai(engine[se]["domain"],
              engine[se]["sq"] + kw + engine[se]["params"].join(""),
              engine[se]["func"],
              engine[se]["key"],
              engine[se]["kyfunc"])
  console.log "keyword: ", kw
  # legacy code
  # 如果只使用一个引擎可以直接addEvtListener
  # 但是多引擎会导致重复绑定，一旦点击，多个引擎一起搜索引起混乱
  # window.addEventListener("click", (evt) ->
  #   href = evt.target.getAttribute("data-src")
  #   return unless href
  #   console.log href
  #   doSearchKai(engine[se]["domain"],
  #               href,
  #               engine[se]["func"],
  #               false,
  #               engine[se]["kyfunc"]))
  $("#columnSearchB").off()
  $("#columnSearchB").on "click", "a", (evt) ->
    href = evt.target.getAttribute("data-src")
    return unless href
    doSearchKai(engine[se]["domain"],
                href,
                engine[se]["func"],
                false,
                engine[se]["kyfunc"])



# searchEngineKai("google")
# searchEngineKai("bing")
# searchEngineKai("aol")
# searchEngineKai("hotbot")
# searchEngineKai("goo")


$(document).ready ->
  $("head").append('<style type="text/css">
    #engine {
      width: 100px;
    }
    #engine-menu {
      width: 98px !important;
    }
    #sewrapper {
      padding: 15px 0px 0px;
    }
    </style>')
  $("head").append(
    '<link rel="stylesheet" type="text/css" href=' + 
    '"http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">')
  enghtml =
    zh : '<div id="sewrapper">
          <select name="engine" id="engine">
          <option value="default">默认</option>
          <option value="google">谷歌</option>
          <option value="bing">必应</option>
          <option value="aol">奥尔</option>
          <option value="hotbot">哈霸</option>
          <option value="goo">古屋</option>
          </select>
          </div>'
    en : '<div id="sewrapper">
          <select name="engine" id="engine">
          <option value="default">default</option>
          <option value="google">Google</option>
          <option value="bing">Bing</option>
          <option value="aol">AOL</option>
          <option value="hotbot">HotBot</option>
          <option value="goo">goo</option>
          </select>
          </div>'
  $("#columnSearchA").append(enghtml[getLang()])
  # $("#columnSearchA").append('<div id="sewrapper">
  #   <select name="engine" id="engine">
  #   <option value="default">默认</option>
  #   <option value="google">谷歌</option>
  #   <option value="bing">必应</option>
  #   <option value="aol">奥尔</option>
  #   <option value="hotbot">哈霸</option>
  #   <option value="goo">古屋</option>
  #   </select>
  #   </div>')
  engine = GM_getValue("searchEngineName", "default")
  # menu显示所选择设定的搜索引擎
  # 默认样式 用以下方法
  # $("#engine option").filter((i, elem) ->
  #   elem.getAttribute("value") is engine
  # .prop("selected", true)
  # jQuery UI用以下方法
  $("#engine").val(engine)
  # init selectmenu
  $("#engine").selectmenu
    change: (evt, ui) ->
      console.log "engine changed"
      GM_setValue("searchEngineName", ui.item.value)
      location.reload() if ui.item.value is "default"
      searchEngineKai(ui.item.value)
  return if engine is "default"
  searchEngineKai(engine)


getLang = ->
  try
    lang = window.navigator.language.split("-")[0]
    return "zh" if lang isnt "en"
  catch err
    console.log "cant find window.navigator.language"
    console.log err
    lang = "zh"
  return lang

pgsbarDiv = ->
  $("body").append('<div id="pgsbarwrapper"></div>')
  left = Math.floor($(window).width() / 2) - 312
  top = Math.floor($(window).height() * 3 / 8) - 12
  left = Math.max(left, 110)
  # top = Math.max(top, 150)
  $("#pgsbarwrapper").css
    "position" : "fixed"
    "left" : left
    "top" : top
    "opacity" : "0.7"
    "width" : "500px"