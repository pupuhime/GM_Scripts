###
// ==UserScript==
// @name           Silent B
// @namespace      https://github.com/hentaiPanda
// @description    隐藏指定的超展开列表项目，等等
// @author         niR
// @version        4672.20 pre Bismark
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @grant          GM_getValue
// @grant          GM_setValue
// @include        http://bgm.tv/rakuen/topiclist
// @include        http://bangumi.tv/rakuen/topiclist
// @include        http://chii.in/rakuen/topiclist
// @include        http://bgm.tv/
// @include        http://bangumi.tv/
// @include        http://chii.in/
// @include        /^http://bgm\.tv/subject/[0-9]+/
// @include        /^http://bangumi\.tv/subject/[0-9]+/
// @include        /^http://chii\.in/subject/[0-9]+/
// @include        http://bgm.tv/subject_search/*
// @include        http://bangumi.tv/subject_search/*
// @include        http://chii.in/subject_search/*
// @include        /^http://bgm\.tv/(anime|book|music|real)/browser/
// @include        /^http://bangumi\.tv/(anime|book|music|real)/browser/
// @include        /^http://chii\.in/(anime|book|music|real)/browser/
// @include        /^http://bgm\.tv/group/(?!topic).+/
// @include        /^http://bangumi.tv/group/(?!topic).+/
// @include        /^http://chii.in/group/(?!topic).+/
// @include        http://bgm.tv/settings*
// @include        http://bangumi.tv/settings*
// @include        http://chii.in/settings*
// ==/UserScript==
###


getParentNode = (node, level) ->
  i = level - 1
  pn = node.parentNode
  if level is 0
    return node
  while i > 0
    pn = pn.parentNode
    i -= 1
  return pn


# +++++ rakuen topiclist +++++ START +++++ #
addBtn = ->
  $('li.item_list > div.inner > span.row').each ->
    x_btn = '<span class="xlihil"><a href="javascript:;">[X]</a></span>'
    @.innerHTML = @.innerHTML + x_btn
  $('body').on 'click.removeli', '.xlihil', (evt) -> removeItem(evt.target)


removeItem = (node) ->
  item = getParentNode(node, 4)
  GM_setValue(item.id, true)
  # 联动
  tpcid = item.id.split("item_group_")[1]
  console.log tpcid
  GM_setValue("/group/topic/" + tpcid, true)
  item.outerHTML = ''


initItemList = ->
  flag = false
  $('li.item_list').each ->
    if GM_getValue(@.id, false)
      @.outerHTML = ''
      flag = true
  return flag

# +++++ rakuen topiclist +++++ END +++++ #


# +++++ home page +++++ START +++++ #
addBtnHome = ->
  $('div#home_subject_tpc a.l, div#home_grp_tpc a.l:not(.rr)').each ->
    return if $(@).attr("href").startsWith("/group/my")
    x_btn = '<a class="xlihil" href="javascript:;">[X]</a>'
    # console.log $(@).attr("href")
    $(@).next().html (i, old) ->
      return old + x_btn
  $('body').on 'click.removeli', '.xlihil', (evt) -> removeItemHome(evt.target)


removeItemHome = (node) ->
  itemhref = $(node).parents().eq(0).prev().attr("href")
  # console.log itemhref
  GM_setValue(itemhref, true)
  # 联动
  tpcid = itemhref.split("/group/topic/")[1]
  console.log tpcid
  GM_setValue("item_group_" + tpcid, true)
  $(node).parents().eq(2).remove()


initItemListHome = ->
  flag = false
  $('div#home_subject_tpc a.l, div#home_grp_tpc a.l').each ->
    href = $(@).attr("href")
    # console.log href
    if GM_getValue(href, false)
      $(@).parents().eq(1).remove()
      flag = true
  return flag

# +++++ home page +++++ END +++++ #



# +++++ group page +++++ START +++++ #
addBtnGroup = ->
  $('table.topic_list td.subject').each ->
    # return if $(@).attr("href").startsWith("/group/my")
    x_btn = '<small class="grey">\
             <a class="xlihil" href="javascript:;">[X]  </a></small>'
    $(@).html (i, old) ->
      return x_btn + old
  $('body').on 'click.removeli', '.xlihil', (evt) -> removeItemGroup(evt.target)


removeItemGroup = (node) ->
  itemhref = $(node).parent().next().attr("href")
  console.log itemhref
  GM_setValue(itemhref, true)
  # 联动
  tpcid = itemhref.split("/group/topic/")[1]
  console.log tpcid
  GM_setValue("item_group_" + tpcid, true)
  $(node).parents().eq(2).remove()


initItemListGroup = ->
  flag = false
  $('table.topic_list td.subject a.l').each ->
    href = $(@).attr("href")
    # console.log href
    if GM_getValue(href, false)
      $(@).parents().eq(1).remove()
      flag = true
  return flag

# +++++ group page +++++ END +++++ #



# rakuen/topiclist
refreshList = ->
  i = true
  $('li.item_list').each ->
    return if @.style.display
    if i
      @.className = 'line_odd item_list'
    else
      @.className = 'line_even item_list'
    i = not i
    console.log @.id


# homepage
refreshIndexList = (klasslist, klass, subklass) ->
  $(klass).each ->
    swch = true
    sub_item = $(@).find(subklass)
    return if not sub_item.length
    sub_item.each ->
      if swch
        @.className = klasslist[0]
      else
        @.className = klasslist[1]
      swch = not swch 
      return 1
    return 1
  return true


# group
refreshTopicList = (klasslist, klass) ->
  swch = true
  $(klass).each ->
    return if @.style.display
    if swch
      @.className = klasslist[0]
    else
      @.className = klasslist[1]
    swch = not swch 
    return 1
  return true


# +++++ subject page +++++ START +++++ #
# Hide Tsukkomi @Bangumi
hideTsukkomi = (swch) ->
  return unless swch
  $("#comment_box").remove()
# +++++ subject page +++++ END +++++ #


# +++++ ratings +++++ START +++++ #
# Hide Ratings @Bangumi
hideRating = (swch) ->
  return unless swch
  $("#ChartWarpper, #columnSubjectInHomeB .global_rating").remove()

hideRank = (swch) ->
  return unless swch
  $("#browserItemList span.rank, #browserItemList p.rateInfo").remove()
# +++++ ratings +++++ END +++++ #


# setting
addSettingBtn = ->
  $(".secTab").html (i, old) ->
    return '''<li><a href="javascript:;" id="sb_setting">\
              <span>STB设置</span></a></li>''' + old
  $('body').off 'click.sb_setting'       
  $('body').on 'click.sb_setting', '#sb_setting', ->
    sbsetting()

updateTsuRtg = (node) ->
  switch node.id
    when "rtg_yes" then GM_setValue("hiderating", true)
    when "rtg_no" then GM_setValue("hiderating", false)
    when "tsu_yes" then GM_setValue("hidetsukkomi", true)
    when "tsu_no" then GM_setValue("hidetsukkomi", false)
    else return false

checkTsuRtg = ->
  defaultval = true
  flagtsu = GM_getValue("hidetsukkomi", defaultval)
  flagrtg = GM_getValue("hiderating", defaultval)
  if flagrtg
    $("#rtg_yes")[0].checked = true
  else
    $("#rtg_no")[0].checked = true
  if flagtsu
    $("#tsu_yes")[0].checked = true
  else
    $("#tsu_no")[0].checked = true

sbsetting = ->
  $("#columnB").css("display", "none")
  $("#header > h1").html (i, old) -> return "STB设置"
  $(".secTab > li > a").removeClass("selected")
  $("#sb_setting").addClass("selected")
  newcolumn = '<span class="text">\
               <table class="settings" cellpadding="5" cellspacing="0" \
               align="center" width="98%">\
               <tbody>\
               <tr><td valign="top" width="12%">\
               <h2 class="subtitle">隐藏评分信息</h2></td>\
               <td valign="top"></td></tr>\
               <tr><td valign="top" width="20%">是</td>\
               <td valign="top"><input name="rtg_radio" class="stb" \
               id="rtg_yes" type="radio"></td></tr>\
               <tr><td valign="top" width="20%">否</td>\
               <td valign="top"><input name="rtg_radio"  class="stb" \
               id="rtg_no" type="radio"></td></tr>\
               <tr><td valign="top" width="12%">\
               <h2 class="subtitle">隐藏概览页吐槽箱</h2></td>\
               <td valign="top"></td></tr>\
               <tr><td valign="top" width="20%">是</td>\
               <td valign="top"><input name="tsu_radio"  class="stb" \
               id="tsu_yes" type="radio"></td></tr>\
               <tr><td valign="top" width="20%">否</td>\
               <td valign="top"><input name="tsu_radio"  class="stb" \
               id="tsu_no" type="radio"></td></tr>\
               </tbody></span>'
  $("#columnA").html(newcolumn)
  checkTsuRtg()
  $('body').off 'click.sb_input'
  $('body').on 'click.sb_input', 'input.stb', (evt) ->
    updateTsuRtg(evt.target)


main = ->
  defaultval = true
  path = location.pathname
  regPatt =
    "/$" : ->
      # 首页
      console.log "http://bangumi.tv"
      # 首页热门讨论和小组话题
      flag = initItemListHome()
      addBtnHome()
      if flag
        refreshIndexList(
          ['line_odd clearit', 'line_even clearit'],'.sideTpcList', 'li')
    "/rakuen/topiclist" : ->
      console.log "/rakuen"
      flag = initItemList()
      refreshList() if flag
      addBtn()
    "/subject/[0-9]+$" : ->
      flagtsu = GM_getValue("hidetsukkomi", defaultval)
      flagrtg = GM_getValue("hiderating", defaultval)
      hideTsukkomi(flagtsu)
      hideRating(flagrtg)
    "/subject_search/.*" : ->
      flagrtg = GM_getValue("hiderating", defaultval)
      hideRank(flagrtg)
    "/(anime|book|music|real)/browser" : ->
      flagrtg = GM_getValue("hiderating", defaultval)
      hideRank(flagrtg)
    "/group/(?!topic).+" : ->
      flag = initItemListGroup()
      addBtnGroup()
      if flag
        refreshTopicList(['topic odd', 'topic even'],
                         '.topic')
    "/settings" : ->
      console.log "/settings"
      addSettingBtn();
  for i in Object.keys(regPatt)
    if RegExp(i).test(path)
      regPatt[i]()

main()