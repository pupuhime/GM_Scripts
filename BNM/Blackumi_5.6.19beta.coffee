###
// ==UserScript==
// @name           Blackumi
// @description    bangumi用户屏蔽
// @author         niR
// @version        5.6.19 beta 榛名
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @require        https://greasyfork.org/scripts/4274-filesaver-js/code/FileSaverjs.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==
###


getData = (name = "shikabane") ->
  ###
  users = [ id1-id2-avts1-avts2, id1-id2-avts1-avts2]
  avatar = 00-24 or dft-dft
  name is "shikabane"
  ###

  # users = GM_getValue(name, "none")
  # return [] if users is "none"
  # return ( i.split("-") for i in users)#.split(",") )
  users = GM_getValue(name, [])
  # console.log 'getData', users
  return users


setData = (value) ->
  db = getData()
  # db.push( value.join("-") )
  db.push( value )
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
  console.log '屏蔽'
  setData([id1, id2, avts1, avts2])
  if searchData(id1)
    switchUserIntro("none")
    $("#bkmbtn > span").text("解除屏蔽")
    $('body').off 'click.bkmbtn'
    $('body').on 'click.bkmbtn', '#bkmbtn', ->
      unblock(id1, id2, avts1, avts2)


unblock = (id1, id2 = id1, avts1, avts2) ->
  console.log '解除屏蔽'
  delData(id1)
  unless searchData(id1)
    switchUserIntro("block")
    $("#bkmbtn > span").text("屏蔽")
    $('body').off 'click.bkmbtn'
    $('body').on 'click.bkmbtn', '#bkmbtn', ->
      block(id1, id2, avts1, avts2)


# old func name:
# userintro(swch)
# block状态下隐藏对方页面
switchUserIntro = (swch) ->
  areaklass = ["SidePanel", "menu_inner", "intro", "site",
               "userSynchronize", "network_service"]
  areaid = ["columnA", "columnB", "friend", "index", "mono", "game",
            "real", "anime", "music", "book", "group", "blog"];
  # 隐藏class区块
  for i in areaklass
    $('.' + i).css("display", swch)
  # 隐藏id区块
  for i in areaid
    $('#' + i).css("display", swch)
  return swch


userpage = ->
  # id1 = $(".user_box > .rr > .chiiBtn")[1] #legacy code#
  # id1 初始数字id
  id1 = $(" .nameSingle > .rr > .chiiBtn")[1]
        .getAttribute("href").split("/")[3].split(".")[0]
  # id2 = $(".user_box > .avatar").attr("href").split("/")[2] #legacy code#
  # id2 自设id
  id2 = $(".headerAvatar > .avatar").attr("href").split("/")[2]
  # avts 头像地址
  avts = $(".avatarNeue.avatarSize75").attr("style").split("/")
  # 默认头像和修改过的头像地址不同
  if avts[6] is "000"
    avts1 = avts[7]
    avts2 = avts[8]
  else
    avts1 = avts2 = "dft"
  console.log id1,id2,avts1,avts2
  # 加按钮
  console.log 'searchData(id1)', searchData(id1)
  if searchData(id1)
    switchUserIntro("none")
    $(" .nameSingle > .rr").html (i, old) ->
      return old + '''<a href="javascript:;" class="chiiBtn" \
        id="bkmbtn"><span>解除屏蔽</span></a>'''
    $('body').on 'click.bkmbtn', '#bkmbtn', ->
      unblock(id1, id2, avts1, avts2)
  else
    switchUserIntro("block")
    $(" .nameSingle > .rr").html (i, old) ->
      return old + '''<a href="javascript:;" class="chiiBtn" \
        id="bkmbtn"><span>屏蔽</span></a>'''
    $('body').on 'click.bkmbtn', '#bkmbtn', ->
      block(id1, id2, avts1, avts2)


# refreshCollections
refreshListItems = (old_klass, new_klass) ->
  $(old_klass).removeClass().addClass(new_klass)


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


# refreshSubSection
refreshTbodyList = (klasslist, klass, subklass) ->
  swch = true
  $(klass).each ->
    sub_item = $(@).find(subklass)
    return if not sub_item.length
    sub_item.each ->
      if swch
        @.className = klasslist[0]
      else
        @.className = klasslist[1]
      return 1
    swch = not swch 
    return 1
  return true


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


refreshTsukkomi = (klasslist = [ ['ll', 'text_main_even'],
                                 ['rr', 'text_main_odd'] ],
                   klass = '#comment_box > div.item',
                   subklass = ['a', 'div'] ) ->
  swch = true
  $(klass).each ->
    if swch
      $(@).find(subklass[0])[0].className = klasslist[0][0]
      $(@).find(subklass[1])[0].className = klasslist[0][1]
    else
      $(@).find(subklass[0])[0].className = klasslist[1][0]
      $(@).find(subklass[1])[0].className = klasslist[1][1]
    swch = not swch
    return 1
  return true


cleanUp = ->
  $('h4.Header').each ->
    header = $(@)
    next_ul = header.next('ul')
    if next_ul.text().trim() is ''
      next_ul.remove()
      header.remove()


getUidFromAvat = (node) ->
  bgurl = node.getAttribute('src').split('/') 
  if bgurl[4] is 'user' && bgurl.length > 7
    return bgurl[9].split('.')[0]
  else
    return '-1'


# listItems/subSection subSection即根据tag选择
# 如果klass为img，即根据 img 的 src 获取uid
listItems = (klass, t, paklass, pat) ->
  flag = false
  nv_pak = paklass
  for i in [0...pat-1]
    nv_pak += ' > *'
  nv_pak += ' > ' + klass
  $(nv_pak).each ->
    if klass.indexOf('img') is 0
      uid = getUidFromAvat(@)
    else
      uid = @.href.split("/")[4]
    if searchData(uid)
      $(@).parents().eq(t-1).remove()
      flag = true
  return flag


topic = ->
  flag = false
  $('.avatarNeue').each ->
    bgurl = @.style.backgroundImage.split('/')
    if (bgurl[4] is 'user' && bgurl.length > 7)
      uid = bgurl[9].split('.')[0]
      if searchData(uid)
        $(@).parents().eq(1).remove()
        flag = true
    else if bgurl[4] is 'user'
      uid = @.parentNode.href.split("/")[4]
      if searchData(uid)
        $(@).parents().eq(1).remove()
        flag = true
  return flag


# subject() 不再使用，直接分解成原本的单个函数后用lambda调用


# blog()
hideOP = ->
  $('a.avatar').each ->
    uid = @.href.split("/")[4]
    if searchData(uid)
      console.log "It's a blog"
      $(@.parentNode).remove()
      $('#viewEntry').remove()
      reinfo = $('.re_info')[0]
      $(reinfo).remove()


# pm界面
# 撰写
pmcompose = ->
  $('#pm_sidebar > a.l').each ->
    uid = @.getAttribute('onclick').split("'")[1]
    if searchData(uid)
      elem = $(@)
      elem.next('br').remove()
      elem.remove()


pmAutoDel = (mbox) ->
  pmmain = $('#pm_main')
  pmmain.css('display', 'none')
  action = $('form#pmForm').attr('action')
  pms =
    'folder'     : mbox
    'submit'     : '删除'
    'erase_pm[]' : []
  erase_pm = []
  $('img.avatar.ll').each ->
    try
      uid = @.src.split("/")[9].split(".")[0]
    catch error
      console.log error
      return 2
    if searchData(uid)
      es = @.parentNode.href.split("/")[5].split(".")[0]
      erase_pm.push( es )
    return 1
  if erase_pm.length isnt 0
    for i in erase_pm
      pms['erase_pm[]'].push( i )
    $.post( action, pms, -> location.href = location.href)
  else
    pmmain.removeAttr('style')




# 删除提醒
erasentf = (url, ghstr) ->
  $.get(url, {"gh" : ghstr})


notify = ->
  ghstr = $("#del_all").attr("href").split("gh=")[1]
  console.log ghstr
  $(".inner.tip > strong > a.l").each ->
    # get id
    uid = $(@).attr("href").split("/")[4]
    console.log uid
    # check
    if searchData(uid)
      # notify_xxxxxx
      ntfid = $(@).parents().eq(2).attr("id").split("_")[1]
      url = "/erase/notify/" + ntfid
      console.log ntfid, url
      erasentf(url, ghstr)
      $(@).parents().eq(2).remove()




# 设置界面添加批量删除、导入导出


checkAll = ->
  console.log "chkall"
  inputbox = $(".selectable")
  for i in inputbox
    i.checked = true


uncheckAll = ->
  inputbox = $(".selectable")
  for i in inputbox
    i.checked = false


addSettingBtn = ->
  $(".secTab").html (i, old) ->
    return '''<li><a href="javascript:;" id="bkm_setting">\
              <span>屏蔽设置</span></a></li>\
              <li><a href="javascript:;" id="bkm_backdata">\
              <span>导入/导出</span></a></li>''' + old
  # binding
  # $('body').on 'click.bkmbtn', '#bkmbtn', ->
  #   unblock(id1, id2, avts1, avts2)
  $('body').on 'click.bkm_setting', '#bkm_setting', ->
    bksetting()
  $('body').on 'click.bkm_backdata', '#bkm_backdata', ->
    bkbackup()


batchDelete = ->
  ids = $(".selectable")
  for i in ids
    if i.checked
      # value = 'id1/id2' 这是旧的形式，现在改成value='id1'
      id1 = i.value
      delData(id1)
  bksetting()


bksetting = ->
  # var column = document.getElementById('columnA');
  $("#columnB").css("display", "none")
  # 修改标题文字
  $("#header > h1").html (i, old) -> return "屏蔽设置"
  $(".secTab > li > a").removeClass("selected")
  $("#bkm_setting").addClass("selected")
  # 添加用户和头像
  temp = ""
  users = getData()
  for u in users
    if u[2] == "dft"
      avt = "icon.jpg"
    else
      avt = "000/" + u[2] + "/" + u[3] + "/" + u[0] + ".jpg"
    avt = "http://lain.bgm.tv/pic/user/m/" + avt
    temp = temp + '<li class="user"><div class="userContainer pm_odd">' +
           '<strong><input class="selectable" value="' +
           u[0] + '" name="" type="checkbox"></input>' +
           '<a href="/user/' + u[1] + '" class="avatar">' +
           '<span class="userImage">' +
           '<img src="' + avt + '" ' +
           'alt="" class="avatar">' +
           '</span></a><div class="avatar">id: ' + u[1] + '</div></strong>' +
           '</div></li>';
  # 添加下方操作按钮
  newcolumn = '<div><ul id="memberUserList" class="usersLarge">' + temp +
              '</ul></div><input class="inputBtn" id="bkm_chk" type="submit" ' +
              'onclick="javascript:;"' +
              'value="全选" name="select_all"></input>' +
              '<input class="inputBtn" id="bkm_unchk" type="submit" ' +
              'onclick="javascript:;"' +
              'value="取消" name="select_all"></input>' +
              '<input class="inputBtn" id="bkm_del" type="submit" ' +
              'onclick="javascript:;"' +
              'value="解除屏蔽" name="batch_delete"></input>'
  $("#columnA").html(newcolumn)
  $('body').off 'click.bkm_chk'
  $('body').on 'click.bkm_chk', '#bkm_chk', ->
    checkAll()
  $('body').off 'click.bkm_unchk'
  $('body').on 'click.bkm_unchk', '#bkm_unchk', ->
    uncheckAll()
  $('body').off 'click.bkm_del'
  $('body').on 'click.bkm_del', '#bkm_del', ->
    batchDelete()


# 改变input type="file"按钮外观方法：
# stackoverflow.com/questions/1163667/how-to-rename-html-browse-button-of-an-input-type-file
# stackoverflow.com/questions/1944267/how-to-change-the-button-text-of-input-type-file
bkbackup = ->
  $("#columnB").css("display", "none")
  # 修改标题文字
  $("#header > h1").html (i, old) -> return "屏蔽列表导入/导出"
  $(".secTab > li > a").removeClass("selected")
  $("#bkm_backdata").addClass("selected")
  # 添加输入框
  newcolumn = '''<input id ="bkm_export" type="button" \
                 onclick="javascript:;" \
                 value="　文本导出　" name="export_data" /> \
                 <input id ="bkm_import" type="button" \
                 onclick="javascript:;" \
                 value="　文本导入　" name="import_data" />  \
                 <input id ="bkm_export_file" type="button" \
                 onclick="javascript:;" \
                 value="　导出至文件　" name="export_file" /> \
                 <input id ="bkm_import_omote" type="button" \
                 onclick="javascript:;" \
                 value="　从文件导入　" name="import_omote" />\
                 <input id ="bkm_import_file" type="file" \
                 onclick="javascript:;" \
                 value="　从文件导入　" name="import_file" style="display:none"/>'''
  $("#columnA").html(newcolumn)
  $('body').off 'click.bkm_export'
  $('body').on 'click.bkm_export', '#bkm_export', ->
    exportData()
  $('body').off 'click.bkm_import'
  $('body').on 'click.bkm_import', '#bkm_import', ->
    importFace()
  $('body').off 'click.bkm_export_file'
  $('body').on 'click.bkm_export_file', '#bkm_export_file', ->
    exportFile()
  $('body').off 'change.bkm_import_file'
  $('body').on 'change.bkm_import_file', '#bkm_import_file', (evt) ->
    importFile(evt)
  $('body').off 'click.bkm_import_omote'
  $('body').on 'click.bkm_import_omote', '#bkm_import_omote', ->
    $('#bkm_import_file').trigger('click')


# old func name:
# importInterface
importFace = ->
  # 先还原
  bkbackup()
  newcolumn = '''<br /><br /><textarea id="ryououki" class="quick" \
                 style="width: 504px; height: 225px;" rows="5" cols="45" \
                 name="newbio"></textarea><p class="tip"></p>\
                 <input class="inputBtn" id ="bkm_submit" type="submit"\
                 onclick="javascript:;" value="提交" name="select_all" />'''
  $("#columnA").html (i, old) -> return old + newcolumn
  $('body').off 'click.bkm_submit'
  $('body').on 'click.bkm_submit', '#bkm_submit', ->
    importData()


# 导入老版本的导出数据
importOldData = (text) ->
  conj_outer = '''-|-I HOPE YOU LIVE A LIFE YOU ARE PROUD OF. \
                  IF YOU FIND THAT YOU ARE NOT, I HOPE YOU HAVE \
                  THE STRENGTH TO START ALL OVER AGAIN-|-'''
  conj_mid = "-|-gochuumon wa usagi desu ka-|-"
  data = text.split('嘟嘟噜')[1]
  id1nid2 = data.split(conj_outer)[1].split(conj_mid)
  avatars = data.split(conj_outer)[2].split(conj_mid)
  # console.log id1nid2.length
  # console.log avatars.length
  newavatars = []
  for ava in avatars
    if ava.endsWith("default")
      newavatars.push( [ava.split("/")[0], "dft", "dft"] )
    else
      newavatars.push( ava.split("/") )
  n = id1nid2.length
  idx = 0
  while idx <= n
    user = id1nid2[idx]
    if ( 1 * id1nid2[idx+1] > 0 or !id1nid2[idx+1] )
      user_next = user
      idx += 1
    else
      user_next = id1nid2[idx+1]
      idx += 2
    for ava in newavatars
      if ava[0] is user
        setData( [user, user_next, ava[1], ava[2]] )
  alert('导入完成')
  # localStorage.clear()


importData = ->
  text = $("#ryououki")[0].value.trim()
  if text is ""
    return false
  if text.startsWith("嘟嘟噜")
    importOldData(text)
    return false
  try
    data = JSON.parse(text)
  catch error
    console.log error
    alert('错误：输入的内容有错误')
    return false
  for i in data
    setData(i)
  alert('导入完成')


exportData = ->
  # 先还原
  bkbackup()
  data = JSON.stringify(getData())
  newcolumn = '<br /><br /><div class="light_even row_reply clearit">' +
              data + '</div>'
  $("#columnA").html (i, old) -> return old + newcolumn


# 2 digits
formatNum = (n) ->
  if n < 10
    return "0" + n
  return "" + n


getTm = ->
  day = new Date()
  y = day.getFullYear()
  m = formatNum( day.getMonth() + 1 )
  d = formatNum( day.getDate() )
  return "" + y + m + d


exportFile = ->
  data = JSON.stringify(getData())
  blob = new Blob([data], {type: "text/plain;charset=utf-8"})
  day = getTm()
  saveAs(blob, "Blackumi_" + day + ".bkm")


importFile = (evt) ->
  unless window.File and window.FileReader and window.FileList
    alert('错误：正在使用的浏览器不支持此脚本读取本地文件\n请直接使用"导入"功能')
    return false
  console.log "importing file"
  file = evt.target.files[0]
  reader = new FileReader()
  reader.onload = (e) ->
    console.log typeof e.target.result
    console.log "reader.onload"
    text = e.target.result.trim()
    if text.startsWith("嘟嘟噜")
      importOldData(text)
      return false
    try
      data = JSON.parse(text)
    catch error
      console.log error
      alert('错误：文件错误或已经损坏')
      return false
    for i in data
      setData(i)
    alert('文件导入完成')
    console.log "imported"
  reader.readAsText(file)


# 原 flood control @bangumi 代码
# 现并入blakumi
# +++++++++ flood control +++++++++ START +++++++++ #
davtGetLimit = ->
  limit = GM_getValue("davt")
  if limit
    return 1 * limit
  else
    return 12


davtSetLimit = ->
  old_limit = davtGetLimit()
  tip = "当前限制数为 " + old_limit +
        "\n\n完全不限制默认头像用户数量请输入 0\n\n" +
        "请输入新限制数：\n\n"
  limit = prompt tip, ""
  if limit is null
    return null
  else if 1*limit >= 0
    GM_setValue("davt", Math.floor(1*limit))
    alert "设置成功，页面刷新后生效"
  else
    alert "错误，请确保输入阿拉伯数字(非负整数)："
    davtSetLimit()


davtCheckList = (n) ->
  davt = []
  if n is 0
    return false
  $(".avatarNeue").each ->
    avt = @.style.backgroundImage.split("/")
    if avt.length is 7 and avt[4] is "user"
      davt.push(@)
  if davt.length < n
    return false
  console.log "共有" + davt.length + "个默认头像用户被屏蔽"
  for i in davt
    $(i).parents().eq(1).remove()#css("display", "none")
  return true


removeDAvt = ->
  # limit = davtGetLimit()
  # console.log limit
  # flag = davtCheckList( limit )
  # console.log flag
  GM_registerMenuCommand("默认头像限制数", davtSetLimit)
  return davtCheckList( davtGetLimit() )

# +++++++++ flood control +++++++++  END  +++++++++ #


# hidePost
main = ->
  path = location.pathname
  regPatt =
    "/user/([0-9]+|[A-Za-z][A-Za-z_0-9]*)$" : ->
      console.log "/user/fubugongtengai"
      # 添加按钮
      userpage()
      # 处理"xxxx的朋友"区域
      listItems('.avatar', 2, '.side_port', 2)
    "/user/([0-9]+|[A-Za-z][A-Za-z_0-9]*)/friends$" : ->
      console.log "/user/fubugongtengai/friends"
      flag = listItems('.avatar', 3, '.userContainer', 2)
      refreshListItems('.user', 'user') if flag
    "/user/([0-9]+|[A-Za-z][A-Za-z_0-9]*)/timeline$" : ->
      console.log "/user/fubugongtengai/timeline"
      setInterval( ->
        flag1 = listItems('.l', 2, '.clearit.tml_item', 2)
        flag2 = listItems('.l', 3, '.clearit.tml_item', 3)
        cleanUp() if (flag1 is true or flag2 is true)
      ,500)
    "/rakuen" : ->
      console.log "/rakuen"
      flag = topic()
      flag2 = removeDAvt()#topic为原有，removeDAvt为flood control带入
      flag = flag or flag2
      # console.log flag
      if flag
        console.log 'refreshTopicList'
        refreshTopicList(
          ['line_odd item_list',
           'line_even item_list'],
          '.item_list')
        refreshTopicList(
          ['light_odd row_reply clearit',
           'light_even row_reply clearit'],
          '.row_reply')
    "/group/topic/[0-9]+$" : ->
      console.log "/group/topic/33349"
      flag = topic()
      if flag
        refreshTopicList(
          ['light_even row_reply clearit',
           'light_odd row_reply clearit'],
          '.row_reply')
    "/(blog|ep)/[0-9]+$" : ->
      # http://bangumi.tv/blog/51604
      console.log "/blog/51604"
      flag = topic()
      if flag
        refreshTopicList(
          ['light_odd row_reply clearit',
           'light_even row_reply clearit'],
          '.row_reply')
      hideOP()
    "/group$" : ->
      # http://bangumi.tv/group
      console.log "/group"
      # indexTopic('avatar ll', 3)
      listItems('a', 3, 'tr', 3)
    "/group/discover$" : ->
      # http://bangumi.tv/group/discover
      console.log "/group/discover"
      flag = listItems('a', 2, 'td', 1)
      if flag
        refreshTbodyList(['odd', 'even'], 'tr', 'td')
    "/group/my_reply$" : ->
      # http://bangumi.tv/group/my_reply
      console.log "/group/my_reply"
      flag = listItems('a.tip_j', 3, 'td.subject', 2)
      if flag
        refreshTopicList(['topic odd', 'topic even'],
                         '.topic')
    "/group/[A-Za-z][A-Za-z_0-9]*/members$" : ->
      # http://bangumi.tv/group/xiami/members
      console.log "http://bangumi.tv/group/xiami/members"
      flag = listItems('a', 3, 'li', 3)
      if flag
        refreshListItems('.user', 'user')
    "/group/[A-Za-z][A-Za-z_0-9]*$" : ->
      # http://bangumi.tv/group/boring
      console.log "http://bangumi.tv/group/boring"
      flag = listItems('.l', 2, '.author', 1)
      if flag
        refreshTopicList(['topic odd', 'topic even'],
                         '.topic')
      # 右上角的最近加入
      listItems('.l', 2, '.side_port', 2)
    "/subject/[0-9]+$" : ->
      # http://bangumi.tv/subject/100449
      console.log "http://bangumi.tv/subject/100449"
      # 推荐本条目的目录 / 谁看这部
      listItems('.avatar', 1, '.groupsLine', 2)
      # 吐槽箱
      flagtsu = listItems('.avatar', 1, '.item.clearit', 1)
      # 评论版
      listItems('.l', 4, '.item.clearit', 4);
      # 讨论版
      flagsub = listItems('a', 2, 'td', 1);
      if flagtsu
        refreshTsukkomi()
      if flagsub
        refreshTbodyList(['odd', 'even'], 'tr', 'td')
    "/subject/[0-9]+/index" : ->
      console.log "http://bangumi.tv/subject/40339/index"
      listItems('.avatar', 2, '.clearit.tml_item', 2)
    "/subject/[0-9]+/reviews" : ->
      console.log "http://bangumi.tv/subject/18462/reviews"
      listItems('.l', 4, '.item.clearit', 4)
    "/subject/[0-9]+/comments" : ->
      console.log "http://bangumi.tv/subject/18462/comments"
      flag = listItems('.avatar', 1, '.item.clearit', 1)
      if flag
        refreshTsukkomi()
    "/subject/[0-9]+/board" : ->
      console.log "http://bangumi.tv/subject/18462/board"
      flag = listItems('a', 2, 'td', 1)
      if flag
        refreshTbodyList(['odd', 'even'], 'tr', 'td')
    "/subject/[0-9]+/edit" : ->
      # wiki page
      console.log "http://bangumi.tv/subject/18462/edit"
      flag = listItems('.l', 1, '.columns.clearit', 4)
      if flag
        refreshTopicList(['line_even', 'line_odd'],
                         'ul#pagehistory > li')
    "/subject/[0-9]+/[A-Za-z]+" : ->
      # 其他 看过、听过、玩过
      console.log "http://bangumi.tv/subject/102695/collections"
      flag = listItems('.avatar', 3, '.userContainer', 2)
      if flag
        refreshListItems('.user', 'user')
    # /((rakuen/topic/(crt|prsn))|person|character)/[0-9]+$
    "/(person|character)/[0-9]+$" : ->
      # 人物首页
      console.log "http://bangumi.tv/person/12568"
      listItems('.avatar', 1, '.groupsLine', 2)
      flag = topic()
      if flag
        refreshTopicList(
          ['light_odd row_reply clearit',
           'light_even row_reply clearit'],
          '.row_reply')
    "/(person|character)/[0-9]+/collections" : ->
      # 人物收藏页面
      console.log "http://bangumi.tv/person/12568/collections"
      flag = listItems('.port', 3, '.userContainer', 2)
      if flag
        refreshListItems('.user', 'user')
    "(/index|/index/browser)$" : ->
      # 总目录界面
      console.log "http://bangumi.tv/index"
      console.log "http://bangumi.tv/index/browser"
      listItems('.avatar', 2, '.clearit.tml_item', 2)
    "/index/[0-9]+$" : ->
      # 个人目录首页
      console.log "http://bangumi.tv/index/18"
      listItems('.avatar', 2, '.timeline_img.clearit', 3)
    "/index/[0-9]+/comments" : ->
      # 个人目录讨论
      console.log "http://bangumi.tv/index/18/comments"
      hideOP()
      flag = topic()
      if flag
        refreshTopicList(
          ['light_odd row_reply clearit',
           'light_even row_reply clearit'],
          '.row_reply')
    "(/pm|/pm/inbox.chii)$" : ->
      console.log "/pm/inbox.chii"
      pmAutoDel('inbox')
    "/pm/outbox.chii$" : ->
      console.log "/pm/outbox.chii"
      pmAutoDel('outbox')
    "/pm/compose.chii$" : ->
      console.log "/pm/compose.chii"
      pmcompose()
    # "/pm/view/[0-9]+.chii" : ->
    #   console.log "http://bangumi.tv/pm/view/130345.chii"
    #   pmview()
    "(/blog$|/anime$|/anime/blog|/book$|/book/blog|\
    /music$|/music/blog|/game$|/game/blog)" : ->
      console.log "/blog or /anime or /anime/blog, etc."
      # 上区域 (/blog or /anime/blog, etc.)
      flag = listItems('.blue', 4, '.entry', 3)
      if flag
        refreshTopicList(
          ['item odd','item clearit'],
          '.item')
      # 下区域 (最新讨论)
      flag = listItems('a', 2, 'td', 1)
      if flag
        refreshTbodyList(['odd', 'even'], 'tr', 'td')
      # 中区域 (xxx的好友最近关注的xxx)
      # 如果加了好友，用户界面的屏蔽按钮其实是出不来的
      listItems('.l', 2, '.coversSmall', 3)
    "/$" : ->
      # 首页
      console.log "http://bangumi.tv"
      # 首页时间线
      listItems('.l', 2, '.clearit.tml_item', 2)
      listItems('.l', 3, '.clearit.tml_item', 3)
      # 首页热门讨论和小组话题
      # flag = indexTopic('avatar_mn ll', 2)
      flag = listItems('img.avatar_mn.ll', 2, 'a.avatar', 1)
      if flag
        refreshIndexList(
          ['line_odd clearit', 'line_even clearit'],'.sideTpcList', 'li')
    "/timeline$" : ->
      console.log "http://bangumi.tv/timeline"
      setInterval( ->
        listItems('.l', 2, '.clearit.tml_item', 2)
        listItems('.l', 3, '.clearit.tml_item', 3)
      ,500)
    "/user/([0-9]+|[A-Za-z][A-Za-z_0-9]*)/timeline/status/[0-9]+" : ->
      # 电波提醒 有人提到你
      console.log "/user/1231231/timeline/status/123123"
      # 发布者 / 多个保险，即时电波提醒失效也能隐藏
      listItems('.avatar', 2, '.columnsApp.statusSingle.clearit', 2)
      # 下面的回复
      listItems('.l', 1, '.statusContent', 2)
      flag = listItems('.l', 1, '.statusContent', 3)
      if flag
        refreshTopicList(
          ['even reply_item', 'odd reply_item'],
          '.reply_item')
    "/dollars" : ->
      console.log "/dollars"
      setInterval( ->
        listItems('img', 2, 'div.icon', 1)
      ,30)
    "/wiki" : ->
      console.log "/wiki"
      listItems('.avatar', 2, '.groupsLine', 3)
      listItems('a', 2, 'small', 1)
    "/magi" : ->
      console.log "/magi"
      listItems('.avatar', 2, '.quizInfo.clearit', 2)
      listItems('.avatar', 1, '.magiRank', 2)
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


main()