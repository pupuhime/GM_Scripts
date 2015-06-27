###
// ==UserScript==
// @name           Black
// @description    bangumi用户屏蔽
// @author         niR
// @version        4.7.13.20
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==
###


getData = (name = "shikabane") ->
  # users = [ id1-id2-avts1-avts2, id1-id2-avts1-avts2]
  # avatar = 00-24 or dft-dft
  # name is "shikabane"
  users = GM_getValue(name, "none")
  return [] if users is "none"
  return ( i.split("-") for i in users.split(",") )


setData = (value) ->
  db = getData()
  db.push( value.join("-") )
  GM_setValue("shikabane", db)


delData = (id) ->
  db = getData()
  newdb = []
  for i in db
    newdb.push(i) if (i[0] isnt id and i[1] isnt id)
  GM_setValue("shikabane", newdb)


# old func name:
# testBlockedOrNot(id)
searchData = (id) ->
  db = getData()
  for i in db
    return true if (i[0] is id or i[1] is id)
  return false


# old func name:
# getAvatar
setAvatar = (id1) ->
  # do sth


searchAvatar = (id1) ->
  # do sth


delAvatar = (id1) ->
  # do sth


block = (id1, id2, avts1, avts2) ->
  setData([id1, id2, avts1, avts2])
  if searchData(id1)
    switchUserIntro("none")
    $("#bkmbtn > span").text("解除屏蔽")
    cmd = 'javascript:unblock("' + id1 + '","' + id2 + '","' +
          avts1 + '","' + avts2 + '")'
    $("#bkmbtn").attr("href", cmd)


unblock = (id1, id2 = id1, avts1, avts2) ->
  delData(id1)
  unless searchData(id1)
    switchUserIntro("block")
    $("#bkmbtn > span").text("屏蔽")
    cmd = 'javascript:block("' + id1 + '","' + id2 + '","' +
          avts1 + '","' + avts2 + '")'
    $("#bkmbtn").attr("href", cmd)


# old func name:
# userintro(swch)
switchUserIntro = (swch) ->
  areaklass = ["SidePanel", "menu_inner", "intro", "site",
               "userSynchronize"]
  areaid = ["columnB","friend", "index", "mono", "game", "real",
            "anime", "music", "book", "group", "blog"];
  # 隐藏class区块
  for i in areaklass
    $(i).css("display", swch)
  # 隐藏id区块
  for i in areaid
    $(i).css("display", swch)
  return swch


userpage = ->
  id1 = $(".user_box > .rr > .chiiBtn")[1]
        .getAttribute("href").split("/")[3].split(".")[0]
  id2 = $(".user_box > .avatar").attr("href").split("/")[2]
  avts = $(".avatarNeue.avatarSize75.ll").attr("style").split("/")
  if avts[6] is "000"
    avts1 = avts[7]
    avts2 = avts[8]
  else
    avts1 = avts2 = "dft"
  console.log id1,id2,avts1,avts2
  # 『xxxx的朋友』
  # listItems('avatar', 2, 'side_port', 2)
  # 加按钮
  if searchData(id1)
    switchUserIntro("none")
    $(".user_box > .rr").html (i, old) ->
      cmd = "javascript:unblock('" + id1 + "','" + id2 + "','" +
            avts1 + "','" + avts2 + "')"
      return old + '<a href="' + cmd +
             '" class="chiiBtn" id="bkmbtn"><span>解除屏蔽</span></a>'
  else
    switchUserIntro("block")
    $(".user_box > .rr").html (i, old) ->
      cmd = "javascript:block('" + id1 + "','" + id2 + "','" +
            avts1 + "','" + avts2 + "')"
      return old + '<a href="' + cmd +
             '" class="chiiBtn" id="bkmbtn"><span>屏蔽</span></a>'







hidePost = ->
  path = location.pathname
  regPatt =
    "/user/([0-9]+|[A-Za-z][A-Za-z_0-9]*)$" : ->
      console.log "/user/fubugongtengai"
      userpage()
    "/user/([0-9]+|[A-Za-z][A-Za-z_0-9]*)/friends$" : ->
      console.log "/user/fubugongtengai/friends"
      flag = listItems('avatar', 3, 'userContainer', 2)
      if flag
        refreshCollections('user', 'user')
    "/user/([0-9]+|[A-Za-z][A-Za-z_0-9]*)/timeline$" : ->
      console.log "/user/fubugongtengai/timeline"
      setInterval( ->
        listItems('l', 2, 'clearit tml_item', 2)
        listItems('l', 3, 'clearit tml_item', 3)
      ,500)
    "/rakuen" : ->
      console.log "/rakuen"
      flag = topic()
      if flag
        refreshTopicList({
          '1' : 'line_odd item_list',
          '-1' : 'line_even item_list'
        }, 'item_list')
    "/group/topic/[0-9]+$" : ->
      console.log "/group/topic/33349"
      flag = topic();
      if flag
        refreshTopicList({
          '1' : 'light_even row_reply clearit',
          '-1' : 'light_odd row_reply clearit'
        }, 'row_reply')
    "/(blog|ep)/[0-9]+$" : ->
      console.log "/blog/51604"
      flag = topic()
      if flag
        refreshTopicList({
          '1' : 'light_odd row_reply clearit',
          '-1' : 'light_even row_reply clearit'
        }, 'row_reply')
      blog()
    "/group" : ->
      # http://bangumi.tv/group
      console.log "/group"
      indexTopic('avatar ll', 3)
    "/group/discover" : ->
      console.log "/group/discover"
      flag = subSection('a', 2, 'td', 1)
      if flag
        refreshSubSection({'1' : 'odd', '-1' : 'even'}, 1)
    "/group/my_reply" : ->
      # http://bangumi.tv/group/my_reply
      console.log "/group/my_reply"
      flag = listItems('tip_j', 3, 'subject', 2)
      if flag
        refreshTopicList({
          '1' : 'topic odd',
          '-1' : 'topic even'
        }, 'topic')
    "/group/[A-Za-z][A-Za-z_0-9]*/members" : ->
      # http://bangumi.tv/group/xiami/members
      console.log "http://bangumi.tv/group/xiami/members"
      flag = subSection('a', 3, 'li', 3)
      if flag
        refreshCollections('user', 'user')
    "/group/[A-Za-z][A-Za-z_0-9]*$" : ->
      # http://bangumi.tv/group/boring
      console.log "http://bangumi.tv/group/boring"
      flag = listItems('l', 2, 'author', 1)
      if flag
        refreshTopicList({
          '1' : 'topic odd',
          '-1' : 'topic even'}, 'topic')
      # 右上角的最近加入
      listItems('l', 2, 'side_port', 2)
    "/subject/[0-9]+$" : ->
      # http://bangumi.tv/subject/100449
      console.log "http://bangumi.tv/subject/100449"
      listItems('avatar', 1, 'groupsLine', 2)
      subject()
    "/subject/[0-9]+/index" : ->
      console.log "http://bangumi.tv/subject/40339/index"
      listItems('avatar', 2, 'clearit tml_item', 2)
    "/subject/[0-9]+/reviews" : ->
      console.log "http://bangumi.tv/subject/18462/reviews"
      listItems('l', 4, 'item clearit', 4)
    "/subject/[0-9]+/comments" : ->
      console.log "http://bangumi.tv/subject/18462/comments"
      flag = listItems('avatar', 1, 'item clearit', 1)
      if flag
        refreshTsukkomi()
    "/subject/[0-9]+/board" : ->
      console.log "http://bangumi.tv/subject/18462/board"
      flag = subSection('a', 2, 'td', 1)
      if flag
        refreshSubSection({'1' : 'odd', '-1' : 'even'}, 0)
    "/subject/[0-9]+/edit" : ->
      # wiki page
      console.log "http://bangumi.tv/subject/18462/edit"
      flag = listItems('l', 1, 'columns clearit', 4)
      if flag
        refreshEditPage({
          '1' : 'line_even',
          '-1' : 'line_odd'
        }, 'pagehistory')
    "/subject/[0-9]+/[A-Za-z]+" : ->
      # 其他 看过、听过、玩过
      console.log "http://bangumi.tv/subject/102695/wishes"
      flag = listItems('avatar', 3, 'userContainer', 2)
      if flag
        refreshCollections('user', 'user')
    "/(person|character)/[0-9]+$" : ->
      # 人物首页
      console.log "http://bangumi.tv/person/12568"
      listItems('avatar', 1, 'groupsLine', 2)
      flag = topic()
      if flag
        refreshTopicList({
          '1' : 'light_odd row_reply clearit',
          '-1' : 'light_even row_reply clearit'
        }, 'row_reply')
    "/(person|character)/[0-9]+/collections" : ->
      # 人物收藏页面
      console.log "http://bangumi.tv/person/12568/collections"
      flag = listItems('port', 3, 'userContainer', 2)
      if flag
        refreshCollections('user', 'user')
    "(/index|/index/browser)$" : ->
      # 总目录界面
      console.log "http://bangumi.tv/index or /index/browser"
      listItems('avatar', 2, 'clearit tml_item', 2)
    "/index/[0-9]+$" : ->
      # 个人目录首页
      console.log "http://bangumi.tv/index/18"
      listItems('avatar', 2, 'timeline_img clearit', 3)
    "/index/[0-9]+/comments" : ->
      # 个人目录讨论
      console.log "http://bangumi.tv/index/18/comments"
      flag = topic()
      if flag
        refreshTopicList({
          '1' : 'light_odd row_reply clearit',
          '-1' : 'light_even row_reply clearit'
        }, 'row_reply')
      # 是否使用blog()存疑，使用地方忘记了
      blog()
    "(/pm|/pm/inbox.chii)$" : ->
      console.log "/pm/inbox.chii"
      mailbox("inbox")
    "/pm/outbox.chii$" : ->
      console.log "/pm/outbox.chii"
      mailbox("outbox")
    "/pm/compose.chii$" : ->
      console.log "/pm/compose.chii"
      pmcompose()
    "/pm/view/[0-9]+.chii" : ->
      console.log "http://bangumi.tv/pm/view/130345.chii"
      pmview()
    "(/blog$|/anime$|/anime/blog|/book$|/book/blog|\
    /music$|/music/blog|/game$|/game/blog)" : ->
      console.log "/blog or /anime or /anime/blog, etc."
      # 上区域 (/blog or /anime/blog, etc.)
      flag = listItems('blue', 4, 'entry', 3)
      if flag
        refreshTopicList({
          '1' : 'item odd', '-1' : 'item clearit'
        }, 'item');
      # 下区域 (最新讨论)
      flag = subSection('a', 2, 'td', 1)
      if flag
        refreshSubSection({'1' : 'odd', '-1' : 'even'}, 0)
      # 中区域 (xxx的好友最近关注的xxx)
      # 如果加了好友，用户界面的屏蔽按钮其实是出不来的
      listItems('l', 2, 'coversSmall', 3)
    "/$" : ->
      # 首页
      console.log "http://bangumi.tv"
      # 首页时间线
      listItems('l', 2, 'clearit tml_item', 2)
      listItems('l', 3, 'clearit tml_item', 3)
      # 首页热门讨论和小组话题
      flag = indexTopic('avatar_mn ll', 2)
      if flag
        refreshIndexTpcList({
          '1' : 'line_odd clearit',
          '-1' : 'line_even clearit'}, 'sideTpcList')
    "/timeline$" : ->
      console.log "http://bangumi.tv/timeline"
      setInterval( ->
        listItems('l', 2, 'clearit tml_item', 2)
        listItems('l', 3, 'clearit tml_item', 3)
      ,500)
    "/user/([0-9]+|[A-Za-z][A-Za-z_0-9]*)/timeline/status/[0-9]+" : ->
      # 电波提醒 有人提到你
      console.log "/user/1231231/timeline/status/123123"
      # 发布者 / 多个保险，即时电波提醒失效也能隐藏
      listItems('avatar', 2, 'columnsApp statusSingle clearit', 2)
      # 下面的回复
      listItems('l', 1, 'statusContent', 2)
      flag = listItems('l', 1, 'statusContent', 3)
      if flag
        refreshTopicList({
          '1' : 'even reply_item',
          '-1' : 'odd reply_item'
        }, 'reply_item')
    "/dollars" : ->
      console.log "/dollars"
      setInterval(dollars,30)
    "/wiki" : ->
      console.log "/wiki"
      listItems('avatar', 2, 'groupsLine', 3)
      subSection('a', 2, 'small', 1)
    "/magi" : ->
      console.log "/magi"
      listItems('avatar', 2, 'quizInfo clearit', 2)
      listItems('avatar', 1, 'magiRank', 2)
    "/notify" : ->
      console.log "/notify"
      notify()
    "/settings" : ->
      # 设置
      console.log "/settings"
      addSettingBtn();
  # ------------------------- #
  for i in Object.keys(regPatt)
    if RegExp(i).test(path)
      regPatt[i]()


hidePost()