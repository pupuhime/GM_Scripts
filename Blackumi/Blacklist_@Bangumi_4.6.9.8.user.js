// ==UserScript==
// @name           Blackumi
// @namespace      https://github.com/hentaiPanda
// @description    bangumi用户屏蔽
// @author         niR
// @version        4.6.9.8
// @license        MIT License
// @encoding       utf-8
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==

//おっぱい　すきすき
//localStorage.clear();

//getData(name)  name = 'koroshimashita'  or name = 'shitainoavatars'
//'koroshimashita' 用于存放id, 'shitainoavatars' 用于存放头像地址
function getData(name) {
  var shikabane = localStorage.getItem(name);
  if (shikabane == null || shikabane == "") {
    return [];
  }
  else {
    return shikabane.split(",");
  }
}


function testBlockedOrNot(id) {
  var shikabane = getData('koroshimashita');
  if (shikabane.indexOf(id) > -1) {
    return true;
  }
  else {
    return false;
  }
}


function block(id1, id2) {
  var bbtn = document.getElementById("korosukorosu");
  var shikabane = getData('koroshimashita');
  if (shikabane.indexOf(id1) == -1) {
    if (id1 == id2) {
      shikabane.push(id1);
    }
    else {
      shikabane.push(id1);
      shikabane.push(id2);
    }
  }
  localStorage.setItem("koroshimashita", shikabane);
  if (testBlockedOrNot(id1)) {
    //控制个人页面上的动画、音乐、介绍等模块
    userintro("none");
    bbtn.firstChild.innerHTML = "解除屏蔽";
    bbtn.href = 'javascript:unblock(\'' + id1 + '\',\'' + id2 + '\')';
  }
  //存放头像
  getAvatar(id1);
}


function unblock(id1, id2) {
  var index1;
  var index2;
  var ubbtn = document.getElementById("korosukorosu");
  var shikabane = getData('koroshimashita');
  if (id1 == id2) {
    index1 = shikabane.indexOf(id1);
    shikabane.splice(index1, 1);
  }
  else {
    index1 = shikabane.indexOf(id1);
    shikabane.splice(index1, 1);
    index2 = shikabane.indexOf(id2);
    shikabane.splice(index2, 1);
  }
  localStorage.setItem("koroshimashita", shikabane);
  if (! testBlockedOrNot(id1)) {
    //控制个人页面上的动画、音乐、介绍等模块
    userintro("block");
    ubbtn.firstChild.innerHTML = "屏蔽";
    ubbtn.href = 'javascript:block(\'' + id1 + '\',\'' + id2 + '\')';
  }
  //删除存放的头像
  //其实没必要做这一步，全站的人都放进去数据体积估计都不会超过限制
  delAvatar(id1);
}


//存放头像地址
function getAvatar(id1) {
  var tmp;
  var avatar = document.getElementsByClassName('avatarNeue avatarSize75 ll')[0];
  var bgurl = avatar.style.backgroundImage.split("/");
  var nicks = document.getElementsByClassName('avatar l');
  var data = getData('shitainoavatars');
  if (bgurl[6].split('.')[0] == 'icon') {
    tmp = [id1, 'default'].join('/');
    data.push(tmp);
    //alert(data);
    localStorage.setItem('shitainoavatars', data);
  }
  else {
    tmp = [id1, bgurl[7], bgurl[8]].join('/');
    data.push(tmp);
    //alert(data);
    localStorage.setItem('shitainoavatars', data);
  }
}


function searchAvatar(id1) {
  var i;
  var tmp;
  var data = getData('shitainoavatars');
  for (i = 0; i < data.length; i++) {
    if (data[i].indexOf(id1 + '/') == 0) {
      //alert(data[i]);
      return data[i];
    }
  }
  return false;
}


function delAvatar(id1) {
  var i;
  var tmp = [];
  var data = getData('shitainoavatars');
  for (i = 0; i < data.length; i++) {
    if (data[i].indexOf(id1) != 0) {
      tmp.push(data[i]);
    }
  }
  localStorage.setItem('shitainoavatars', tmp);
  //alert(getData('shitainoavatars'));
}


//隐藏用户介绍信息
// swch = "none" / "block"
function userintro(swch) {
  var areaklass = ["SidePanel", "menu_inner", "intro", "site",
                   "userSynchronize"];
  var areaid = ["columnB","friend", "index", "mono", "game", "real",
                "anime", "music", "book", "group", "blog"];
  var gklass;
  var gid;
  var i;
  var j;
  //隐藏class区块
  for (i = 0; i < areaklass.length; i++) {
    gklass = document.getElementsByClassName(areaklass[i]);
    if (gklass == null) {
      continue;
    }
    for (j = 0; j < gklass.length; j++) {
      gklass[j].style.display = swch;
    }
  }
  //隐藏id区块
  for (i = 0; i < areaid.length; i++) {
    gid = document.getElementById(areaid[i]);
    if (gid == null) {
      continue;
    }
    gid.style.display = swch;
  }
}


/*
//如果把用户加为好友则#connectFrd就没有了
//用户页面
function userpage() {
  //id1  real id / number id ;  id2  fake id / 用户名
  //id1必须抓，因为超展开只有id1，其他地方大多可以只用id2
  var i;
  var user = document.getElementById("connectFrd");
  var id1 = user.href.split("/")[4].split("?")[0];
  var id2;
  var avatar = document.getElementsByClassName("avatar");
  for (i = 0; i < avatar.length; i++) {
    //get fake id
    if (avatar[i].parentNode.className == "user_box clearit") {
      id2 = avatar[i].href.split("/")[4];
    }
    //friends
    else if(getParentNode(avatar[i], 2).className == "side_port"
      && testBlockedOrNot(avatar[i].href.split("/")[4])) {
      avatar[i].parentNode.parentNode.style.display = "none";
    }
  }
  injectFunc(block);
  injectFunc(unblock);
  injectFunc(getData);
  injectFunc(testBlockedOrNot);
  injectFunc(userintro);
  injectFunc(getAvatar);
  injectFunc(delAvatar);
  //添加按钮
  if (testBlockedOrNot(id1)) {
    userintro("none");
    user.parentNode.innerHTML = user.parentNode.innerHTML
      + '<a href="javascript:unblock(\'' + id1 + '\',\'' + id2
      + '\')"class="chiiBtn" id="korosukorosu"><span>解除屏蔽</span></a>';
  }
  else {
    userintro("block");
    user.parentNode.innerHTML = user.parentNode.innerHTML
      + '<a href="javascript:block(\'' + id1 + '\',\'' + id2
      + '\')" class="chiiBtn" id="korosukorosu"><span>屏蔽</span></a>';
  }
}
*/


function getFirstChild(node) {
  var fc = node.firstChild;
  while (fc != null && fc.nodeType != 1) {
    fc = fc.nextSibling;
  }
  return fc;
}


//用户页面
function userpage() {
  var i;
  var user;
  var chiibtns;
  var rrbox;
  var id1;
  var id2;
  var avatar;
  user = document.getElementById("user_home");
  rrbox = getFirstChild(getFirstChild(user));
  chiibtns = getChildNodes(rrbox);
  if (chiibtns.length == 2) {
    //alert("Your own page");
    return false;
  }
  id1 = chiibtns[1].href.split('/')[5].split('.')[0];
  //alert(id1);
  avatar = document.getElementsByClassName("avatar");
  for (i = 0; i < avatar.length; i++) {
    //get fake id
    if (avatar[i].parentNode.className == "user_box clearit") {
      id2 = avatar[i].href.split("/")[4];
      //alert(id2);
      break;
    }
  }
  //his or her friends
  listItems('avatar', 2, 'side_port', 2);
  //inject functions
  injectFunc(block);
  injectFunc(unblock);
  injectFunc(getData);
  injectFunc(testBlockedOrNot);
  injectFunc(userintro);
  injectFunc(getAvatar);
  injectFunc(delAvatar);
  //添加按钮
  if (testBlockedOrNot(id1)) {
    userintro("none");
    rrbox.innerHTML = rrbox.innerHTML
            + '<a href="javascript:unblock(\'' + id1 + '\',\'' + id2
            + '\')"class="chiiBtn" id="korosukorosu"><span>解除屏蔽</span></a>';
  }
  else {
    userintro("block");
    rrbox.innerHTML = rrbox.innerHTML
            + '<a href="javascript:block(\'' + id1 + '\',\'' + id2
            + '\')" class="chiiBtn" id="korosukorosu"><span>屏蔽</span></a>';
  }
}


    
//超展开是 real id
//topiclist 超展开
//http://bangumi.tv/rakuen/topiclist
    
//group topic 则是 real id, fake id 都可以
//http://bangumi.tv/group/topic/32610
//http://bangumi.tv/group/topic/32295

//人物页下方的讨论
//http://bangumi.tv/person/7734
function topic() {
  var i;
  var bgurl;
  var uid;
  var avatar = document.getElementsByClassName("avatarNeue");
  var flag = false;
  for (i = 0; i < avatar.length; i++) {
    bgurl = avatar[i].style.backgroundImage.split("/");
    if (bgurl[4] == "user" && bgurl.length > 7) {
      uid = bgurl[9].split(".")[0];
      if (testBlockedOrNot(uid)) {
        getParentNode(avatar[i], 2).style.display = 'none';
        flag = true;
      }
    }
    else if (bgurl[4] == "user") {
      uid = avatar[i].parentNode.href.split("/")[4]
      if (testBlockedOrNot(uid)) {
        getParentNode(avatar[i], 2).style.display = 'none';
        flag = true;
      }
    }
  }
  return flag;
}


//具体条目
//http://bangumi.tv/subject/18462
function subject() {
  var flagtsu;
  var flagsub;
  //吐槽箱
  flagtsu = listItems('avatar', 1, 'item clearit', 1);
  //评论版
  listItems('l', 4, 'item clearit', 4);
  //讨论版
  flagsub = subSection('a', 2, 'td', 1);
  if (flagtsu) {
    refreshTsukkomi();
  }
  if (flagsub) {
    refreshSubSection({'1' : 'odd', '-1' : 'even'}, 0);
  }
}


//blog
//http://bangumi.tv/blog/46382
//用于屏蔽blog主人(顶楼)
function blog() {
  var entry;
  var reinfo;
  var avatar = document.getElementsByClassName("avatar l");
  if (testBlockedOrNot(avatar[0].href.split("/")[4])) {
    avatar[0].parentNode.style.display = "none";
    entry = document.getElementById("viewEntry");
    reinfo = document.getElementsByClassName("re_info");
    entry.style.display = "none";
    reinfo[0].style.display = "none";
  }
}


//pm inbox
//收件箱
//real id
//自动删除信件
function mailbox(box) {
  var pmurl;
  var pms = [];
  var avatar = document.getElementsByClassName("avatar ll");
  var pmside = document.getElementById("pm_sidebar");
  var pmmain = document.getElementById("pm_main");
  for (i = 0; i < avatar.length; i++) {
    if (testBlockedOrNot(avatar[i].src.split("/")[9].split(".")[0])) {
      //先隐藏再说
      pmmain.style.display = "none";
      pmside.style.display = "none";
      pms.push(avatar[i].parentNode.href.split("/")[5].split(".")[0]);
    }
  }
  //删除信件
  //alert(pms.length);
  if (pms.length != 0) {
    pmurl = document.getElementById("pmForm").action;
    autoDel(pmurl, pms, box);
  }
}


//隐藏信件
function mailboxHideMail(box) {
  var grandpa = "";
  var flag = false;
  var pms = [];
  var usravatar = document.getElementsByClassName("avatar ll");
  var pmside = document.getElementById("pm_sidebar");
  var pmmain = document.getElementById("pm_main");
  var unread = 1*pmside.innerHTML.split(":")[1].split("<")[0];
  var unreadtemp = unread;
  var mails = 1*pmside.innerHTML.split(":")[2].split("<")[0];
  var mailstemp = mails;
  var sent = 1*pmside.innerHTML.split(":")[3];
  var senttemp = sent;
  for (i = 0; i < usravatar.length; i++) {
    if (testBlockedOrNot(usravatar[i].src.split("/")[9].split(".")[0])) {
      grandpa = usravatar[i].parentNode.parentNode.parentNode;
      grandpa.parentNode.style.display = "none";
      if (grandpa.className == "pm_odd pm_new"
        || grandpa.className == "pm_even pm_new") {
        unreadtemp--;
        mailstemp--;
        senttemp--;
      }
      else {
        mailstemp--;
        senttemp--;
      }
      pms.push(usravatar[i].parentNode.href.split("/")[5].split(".")[0]);
      flag = true;
    }
  }
  //隐藏信件
  if (box == "inbox") {
    unread = unreadtemp;
    mails = mailstemp;
  }
  else if (box == "outbox") {
    sent = senttemp;
  }
  pmside.innerHTML = "未读: " + unread + "<br />收件箱: " + mails
                     + "<br />发件箱: " + sent;
  if (mails == 0) {
    pmmain.innerHTML = '收件箱中还没有新信息<div id="pm_pager"></div>';
  }
  if (flag) refreshInbox();
}



//撰写信件界面删除最近联系人
function pmcompose() {
  var i;
  var contacts = document.getElementsByClassName("l");
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i].parentNode.id == "pm_sidebar"
      && testBlockedOrNot(contacts[i].getAttribute('onclick').split("'")[1])) {
      contacts[i].style.display = "none";
      contacts[i].nextSibling.outerHTML = "";
    }
  }
}


//聊天型界面自动删除邮件
function pmview() {
  var i;
  var j = 4;
  var pmurl;
  var pmsin = [];
  var eraselink;
  var avatar = document.getElementsByClassName("avatar");
  var cbox = document.getElementById("comment_box");
  for (i = 0; i < avatar.length; i++) {
    if (avatar[i].parentNode.className == "item"
      && avatar[i].href.split("/")[3] == "user"
      && testBlockedOrNot(avatar[i].href.split("/")[4])) {
      //总之先隐藏再说
      cbox.style.display = "none";
      eraselink = getNextSibling(avatar[i]);
      while (j > 0) {
        eraselink = getChildNodes(eraselink)[0];
        j -= 1;
      }
      j = 4;
      pmsin.push(eraselink.getAttribute("onclick").split("'")[1]);
      pmurl = "/pm/erase/batch?gh="
              + eraselink.getAttribute("onclick").split("'")[3];
      //alert(pmurl);
    }
  }
  //删除信件
  //alert(pmsin.length);
  if (pmsin.length != 0) {
    autoDel(pmurl, pmsin, "inbox");
  }
}


//自动忽略电波提醒
function notify() {
  var i;
  var flag = false;
  var grandpa;
  var eraselink;
  var user = document.getElementsByClassName('l');
  for (i = 0; i < user.length; i++) {
    if (getParentNode(user[i], 2).className == 'inner tip'
      && user[i].href.split("/")[3] == 'user'
      && testBlockedOrNot(user[i].href.split("/")[4])) {
      grandpa = getParentNode(user[i], 3);
      grandpa.style.display = 'none';
      eraselink = getChildNodes(grandpa)[0].href.split('?');
      eraseNtf(eraselink[0], eraselink[1].split('=')[1]);
    }
  }
}


//提交忽略
function eraseNtf(url, gh) {
  var inputbox;
  var form = document.createElement('form');
  form.setAttribute('method', 'get');
  form.setAttribute('action', url);
  inputbox = document.createElement("input");
  inputbox.setAttribute("type", "hidden");
  inputbox.setAttribute("name", "gh");
  inputbox.setAttribute("value", gh);
  form.appendChild(inputbox);
  document.body.appendChild(form);
  form.submit();
}




//---------辅助类函数---------//

//把函数写入页面便于多次执行
function injectFunc(func) {
  var script = document.createElement('script');
  script.appendChild(document.createTextNode(func));
  document.body.appendChild(script);
}


/*
group 讨论组首页的 间隔条纹刷新
或者
讨论页面的条纹刷新
group的讨论，人物收藏下的讨论，blog的讨论
http://bangumi.tv/blog/46382

klassdict负责需要控制条文间隔的元素
klass负责找到这些元素

group 列表界面
klassdict = {'1' : 'topic odd', '-1' : 'topic even'};
klass = 'topic'

rakuen 超展开
klassdict = {'1' : 'line_odd item_list', '-1' : 'line_even item_list'};
klass = 'item_list'

一般topic
klassdict = {'1' : 'light_odd row_reply clearit',
             '-1' : 'light_even row_reply clearit'};
//klass = 'commentList' (Id 'comment_list')
klass = row_reply

要改变odd even顺序只要改变klassdict就可以了
*/
function refreshTopicList(klassdict, klass) {
  var i;
  var f = '1';
  var tr = document.getElementsByClassName(klass);
  for (i = 0; i < tr.length; i++) {
    if (! tr[i].style.display) {
      tr[i].className = klassdict[f];
      f = (-1 * f).toString();
    }
  }
}



//吐槽箱 左右对齐刷新
function refreshTsukkomi() {
  var i;
  var c;
  var f = '-1';
  var klassdict = {'1' : ['rr', 'text_main_odd'],
                   '-1' : ['ll', 'text_main_even']};
  var items = getChildNodes(document.getElementById('comment_box'));
  for (i = 0; i < items.length; i++) {
    if (! items[i].style.display) {
      c = getChildNodes(items[i]);
      c[0].className = klassdict[f][0];
      c[1].className = klassdict[f][1];
      f = (-1 * f).toString();
    }
  }
}


//参数 n
//groupdiscover 是 1
//subject中间讨论区 是 0
//n控制取哪个tbody
//klassdict = {'1' : 'odd', '-1' : 'even'}
//讨论区和discover的 dict 相同
function refreshSubSection(klassdict, n) {
  var i;
  var j;
  var td;
  var f = '1';
  var table = document.getElementsByClassName('topic_list')[0];
  var tr = getChildNodes(getChildNodes(table)[n]);
  for (i = 0; i < tr.length; i++) {
    if (! tr[i].style.display) {
      td = getChildNodes(tr[i]);
      for (j = 0; j < td.length; j++) {
        td[j].className = klassdict[f];
      }
      f = (-1 * f).toString();
    }
  }
}



//维基编辑页面, class 是 line_even 和 line_odd交错
//没有其他class直接抓li 不能直接用listItems()
//klassdict = {'1' : 'line_even', '-1' : 'line_odd'};
//id = 'pagehistory';
function refreshEditPage(klassdict, id) {
  var i;
  var f = '1';
  var items = getChildNodes(document.getElementById(id));
  for (i = 0; i < items.length; i++) {
    if (! items[i].style.display) {
      items[i].className = klassdict[f];
      f = (-1 * f).toString();
    }
  }
}


//首页有两个讨论列表，需要分别刷新line_odd在前
//ul class = 'sideTpcList'
function refreshIndexTpcList(klassdict, klass) {
  var i;
  var j;
  var f = '1';
  var li;
  var ul = document.getElementsByClassName(klass);
  for (i = 0; i < ul.length; i++) {
    li = getChildNodes(ul[i]);
    for (j = 0; j < li.length; j++) {
      if (! li[j].style.display) {
        li[j].className = klassdict[f];
        f = (-1 * f).toString();
      }
    }
  }
}





//inbox条纹刷新
//仅仅用在选择隐藏而不是自动删除的情况
//自动删除的话，提交数据后会自动刷新
function refreshInbox() {
  var i;
  var k;
  var td;
  var f = '1';
  var klassdict = {'1' : 'pm_odd', '-1' : 'pm_even'};
  var tbd = getChildNodes(document.getElementsByClassName("topic_list")[0])[0];
  var tr = getChildNodes(tbd);
  for (i = 1; i < tr.length - 1; i++) {
    if (! tr[i].style.display) {
      td = getChildNodes(tr[i]);
      td[0].className = [klassdict[f], td[0].className.split(' ')[1]].join(' ');
      td[1].className = klassdict[f];
      f = (-1 * f).toString();
    }
  }
}


//collections()完成后重新排列 class 'user odd' => 'user'
function refreshCollections(oldklass, newklass) {
  var i;
  var userlist = document.getElementsByClassName(oldklass);
  for (i = 0; i < userlist.length; i++) {
    userlist[i].className = newklass;
  }
}


//自动删除邮件
//url / form action    pms / erase_pm[]    box / 'inbox'|'outbox'
function autoDel(url, pms, box) {
  var i;
  var form;
  var inputbox;
  form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", url);
  inputbox = document.createElement("input");
  inputbox.setAttribute("type", "hidden");
  inputbox.setAttribute("name", "folder");
  inputbox.setAttribute("value", box);
  form.appendChild(inputbox);
  for (i = 0; i < pms.length; i++) {
    inputbox = document.createElement("input");
    inputbox.setAttribute("type", "hidden");
    inputbox.setAttribute("name", "erase_pm[]");
    inputbox.setAttribute("value", pms[i]);
    form.appendChild(inputbox);
  }
  document.body.appendChild(form);
  form.submit();
}

//得到指定上溯层数的父元素
function getParentNode(node, t) {
  var i = t - 1;
  var pn = node.parentNode;
  if (t == 0) {
    return node;
  }
  while (i > 0) {
    pn = pn.parentNode;
    i--;
  }
  return pn;
}

//非空白邻近节点(向下)
function getNextSibling(node) {
  var ns = node.nextSibling;
  while (ns != null && ns.nodeType != 1) {
    ns = ns.nextSibling;
  }
  return ns;
}

//找到所有非空白子节点
function getChildNodes(node) {
  var i;
  var result = [];
  var cn = node.childNodes;
  for (i = 0; i < cn.length; i++) {
    if (cn[i].nodeType != 1) {
      continue;
    }
    result.push(cn[i]);
  }
  return result;
}


//main
function hidePosts() {
  var flag;
  var url = location.href.split("/");
  //用户页
  //url.length == 8 的情况是
  //http://bangumi.tv/user/USERID/timeline/status/6880264#post_6880264
  if (url[3] == "user" && url.length != 8) {
    if (url.length == 5) {
      //用户首页
      userpage();
      //alert("FRONTPAGE / add Button / kira");
    }
    else if (url[5] == "friends" || url[5].indexOf("friends") == 0) {
      //用户朋友页
      flag = listItems('avatar', 3, 'userContainer', 2);
      if (flag) {
        refreshCollections('user', 'user');
      }
      //alert("銀河美少年 / kira");
    }
    //用户页面的时间线只对第一页过滤
    else if (url[5] == "timeline" || url[5].indexOf("timeline") == 0) {
      //alert('timeline');
      //用户时间线
      //listItems('l', 2, 'clearit tml_item', 2);
      //listItems('l', 3, 'clearit tml_item', 3);
      //总共两个地方周期检测，还有一个在dollars
      setInterval(function() {
        listItems('l', 2, 'clearit tml_item', 2);
        listItems('l', 3, 'clearit tml_item', 3);
      },500);
      //alert("銀河美少年II / kira");
    }
  }
  //超展开 或 话题页
  else if (url[3] == "rakuen") {
    flag = topic();
    if (flag) {
      refreshTopicList({'1' : 'line_odd item_list',
                        '-1' : 'line_even item_list'}, 'item_list');
    }
    //alert("rukuen");
  }
  else if (url[4] == "topic") {
    flag = topic();
    if (flag) {
      refreshTopicList({'1' : 'light_even row_reply clearit',
                        '-1' : 'light_odd row_reply clearit'}, 'row_reply');
    }
    //alert("topic");
  }
  //blog
  else if (url[3] == "blog" || url[3] == "ep") {
    flag = topic();
    if (flag) {
      refreshTopicList({'1' : 'light_odd row_reply clearit',
                        '-1' : 'light_even row_reply clearit'}, 'row_reply');
    }
    blog();
    //alert("url blog");
  }
  //讨论组
  else if (url[3] == "group") {
    if (url[4] == "discover" || url[4].indexOf("discover") == 0) {
      flag = subSection('a', 2, 'td', 1);
      if (flag) {
        refreshSubSection({'1' : 'odd', '-1' : 'even'}, 1);
      }
      //alert("group discover");
    }
    else if (url[4] == "my_reply" || url[4].indexOf("my_reply") == 0) {
      flag = listItems('tip_j', 3, 'subject', 2);
      if (flag) {
        refreshTopicList({'1' : 'topic odd',
                          '-1' : 'topic even'}, 'topic');
      }
    }
    //http://bangumi.tv/group/xiami/members
    else if (url.length == 6
          && (url[5] == "members" || url[5].indexOf("members") == 0)) {
      flag = subSection('a', 3, 'li', 3);
      if (flag) {
        refreshCollections('user', 'user');
      }
    }
    //http://bangumi.tv/group/boring
    else {
      flag = listItems('l', 2, 'author', 1);
      if (flag) {
        refreshTopicList({'1' : 'topic odd',
                          '-1' : 'topic even'}, 'topic');
      }
      //右上角的最近加入
      listItems('l', 2, 'side_port', 2);
      //alert("url group");
    }
  }
  //具体条目
  else if (url[3] == "subject" && url.length == 5) {
    //条目首页
    listItems('avatar', 1, 'groupsLine', 2);
    subject();
    //alert("url subject");
  }
  //条目各类讨论、评论等
  else if (url[3] == "subject" && url.length == 6) {
    if (url[5] == "index" || url[5].indexOf("index") == 0 ) {
      //推荐本条目的目录
      //http://bangumi.tv/subject/40339/index
      listItems('avatar', 2, 'clearit tml_item', 2);
      //alert("subject index chan / kira");
    }
    else if (url[5] == "reviews" || url[5].indexOf("reviews") == 0 ) {
      //条目的 评论
      //http://bangumi.tv/subject/18462/reviews
      listItems('l', 4, 'item clearit', 4);
    }
    else if (url[5] == "comments" || url[5].indexOf("comments") == 0 ) {
      //条目的 吐槽
      //http://bangumi.tv/subject/18462/comments
      flag = listItems('avatar', 1, 'item clearit', 1);
      if (flag) {
        refreshTsukkomi();
      }
    }
    else if (url[5] == "board" || url[5].indexOf("board") == 0 ) {
      //条目的 讨论
      //http://bangumi.tv/subject/18462/board
      flag = subSection('a', 2, 'td', 1);
      if (flag) {
        refreshSubSection({'1' : 'odd', '-1' : 'even'}, 0);
      }
    }
    else if (url[5] == "edit" || url[5].indexOf("edit") == 0 ) {
      //条目的 编辑页面 （维基信息页面）
      //http://bangumi.tv/subject/18462/board
      //alert('edit page');
      flag = listItems('l', 1, 'columns clearit', 4);
      if (flag) {
        refreshEditPage({'1' : 'line_even', '-1' : 'line_odd'}, 'pagehistory');
      }
    }
    else {
      //条目的 看过、听过、玩过
      //http://bangumi.tv/subject/102695/wishes
      flag = listItems('avatar', 3, 'userContainer', 2);
      if (flag) {
        refreshCollections('user', 'user');
      }
      //alert("subject / index");
    }
  }
  //真实、虚拟 的 人物、公司
  else if (url[3] == "person" || url[3] == 'character') {
    if (url.length == 5) {
      //人物首页
      listItems('avatar', 1, 'groupsLine', 2);
      flag = topic();
      if (flag) {
        refreshTopicList({'1' : 'light_odd row_reply clearit',
                          '-1' : 'light_even row_reply clearit'}, 'row_reply');
      }
      //alert("person or character");
    }
    else {
      //人物收藏用户页(全部收藏用户)
      flag = listItems('port', 3, 'userContainer', 2);
      if (flag) {
        refreshCollections('user', 'user');
      }
      //alert("collections");
    }
  }
  //总目录 或者 个人目录
  //http://bangumi.tv/index/17030
  //http://bangumi.tv/index
  else if (url[3] == "index") {
    //总目录界面
    listItems('avatar', 2, 'clearit tml_item', 2);
    //这个用在个人目录首页 http://bangumi.tv/index/1268
    listItems('avatar', 2, 'timeline_img clearit', 3);
    //topic()用在个人目录详细讨论 http://bangumi.tv/index/xxxxx/comments
    flag = topic();
    if (flag) {
      refreshTopicList({'1' : 'light_odd row_reply clearit',
                        '-1' : 'light_even row_reply clearit'}, 'row_reply');
    }
    //忘了哪个页面要用blog()了，有可能是失误多写了
    blog();
    //alert("index");
  }
  //收件箱
  else if (url[3] == "pm" || url[3].indexOf('pm') == 0 ) {
    if (url.length == 4 || url[4].split(".")[0] == "inbox") {
      mailbox("inbox");
      //mailboxHideMail('inbox');
      //alert("inbox dayo");
    }
    else if (url[4].split(".")[0] == "view") {
      pmview();
      //alert("pmview dayo");
    }
    else if (url[4].split(".")[0] == "outbox") {
      mailbox("outbox");
      //mailboxHideMail('outbox');
      //alert("outbox dayo");
    }
    else if (url[4].split(".")[0] == "compose") {
      pmcompose();
      //alert("pmcompose dayo");
    }
  }
  //http://bangumi.tv/book
  //http://bangumi.tv/music
  //http://bangumi.tv/anime
  //http://bangumi.tv/game
  //http://bangumi.tv/game/blog
  else if (['anime', 'book', 'music', 'game'].indexOf(url[3]) > -1) {
    //上区域 (blog)
    flag = listItems('blue', 4, 'entry', 3);
    if (flag) {
      refreshTopicList({'1' : 'item odd', '-1' : 'item clearit'}, 'item');
    }
    //下区域 (最新讨论)
    flag = subSection('a', 2, 'td', 1);
    if (flag) {
      refreshSubSection({'1' : 'odd', '-1' : 'even'}, 0);
    }
    //中区域 (xxx的好友最近关注的xxx)
    //如果加了好友，用户界面的屏蔽按钮其实是出不来的
    listItems('l', 2, 'coversSmall', 3);
    //alert('anime book music game');
  }
  //首页时间线
  else if (url[3] == '') {
    //alert('index');
    listItems('l', 2, 'clearit tml_item', 2);
    listItems('l', 3, 'clearit tml_item', 3);
    //alert("timeline");
    //首页热门讨论和小组话题
    flag = indexTopic('avatar_mn ll');
    if (flag) {
      refreshIndexTpcList({'1' : 'line_odd clearit',
                           '-1' : 'line_even clearit'}, 'sideTpcList')
    }
  }
  //时间线
  //http://bangumi.tv/timeline
  else if (url[3] == 'timeline') {
    setInterval(function() {
      listItems('l', 2, 'clearit tml_item', 2);
      listItems('l', 3, 'clearit tml_item', 3);
    },500);
    //alert('timeline');
  }
  //电波提醒 有人提到你
  //http://bangumi.tv/user/s23sui/timeline/status/6880264#post_6880264
  else if (url.length == 8 && url[5] == 'timeline') {
    //发布者 // 多个保险，即时电波提醒失效也能隐藏
    listItems('avatar', 2, 'columnsApp statusSingle clearit', 2);
    //下面的回复
    listItems('l', 1, 'statusContent', 2);
    flag = listItems('l', 1, 'statusContent', 3);
    if (flag) {
      refreshTopicList({'1' : 'even reply_item',
                        '-1' : 'odd reply_item'}, 'reply_item');
    }
  }
  //桃乐丝
  else if (url[3] == 'dollars' || url[3].indexOf('dollars') == 0) {
    setInterval(dollars,30);
    //dollars();
  }
  //维基人首页
  else if (url[3] == 'wiki' || url[3].indexOf('wiki') > -1) {
    listItems('avatar', 2, 'groupsLine', 3);
    subSection('a', 2, 'small', 1);
  }
  else if (url[3] == 'magi' || url[3].indexOf('magi') > -1) {
    //MAGI问答
    listItems('avatar', 2, 'quizInfo clearit', 2);
    listItems('avatar', 1, 'magiRank', 2);
  }
  else if (url[3].indexOf('notify') == 0) {
    notify();
  }
  //设置
  else if (url[3] == "settings") {
    addSettingBtn();
    //setting();
    //alert("setting");
  }
}


//首页的条目列表类似于超展开，抓不到fake id，只有头像的real id
//所以也屏蔽不了默认头像
//本来应该修改topic()函数，但是topic()用在了好几个地方
//不高兴去搞了直接写个新的函数
//首页的列表 klass = 'avatar_mn ll'
function indexTopic(klass) {
  var i;
  var bgurl;
  var flag = false;
  var avatar = document.getElementsByClassName(klass);
  for(i = 0; i < avatar.length; i++) {
    bgurl = avatar[i].getAttribute('src').split('/');
    if(bgurl[4] == 'user' && bgurl.length > 7
      && testBlockedOrNot(bgurl[9].split('.')[0])) {
      getParentNode(avatar[i], 2).style.display = 'none';
      flag = true;
    }
  }
  return flag;
}




/*
user timeline
http://bangumi.tv/user/sincere/timeline
home page timeline
http://bangumi.tv/
topic list
http://bangumi.tv/group/boring
总目录index
http://bangumi.tv/index
收藏条目的目录index
http://bangumi.tv/subject/40339/index
---替代 0.3.4R--- listitem() / listindex() / timeline(tml)
*/
///////////////////////////////////////////////////////////
/*
用于用户好友
http://bangumi.tv/user/ehan/friends
收藏真实用户列表
http://bangumi.tv/person/7734/collections
收藏虚拟人物用户列表
http://bangumi.tv/character/21881/collections
收藏游戏用户列表
http://bangumi.tv/subject/88429/collections
听过、玩过、想要
http://bangumi.tv/subject/102695/wishes
http://bangumi.tv/subject/102695/collections
---替代 0.3.4R--- friednspage()
---替代 0.4--- collections()
*/
///////////////////////////////////////////////////////////
/*
具体条目
http://bangumi.tv/subject/18462
person 人物 公司
http://bangumi.tv/person/7734
---替代 0.3.4R--- person() / subject()左边收藏栏隐藏功能
作用于左边的SimpleSidePanel
*/
//klass id位置的class, t 上溯隐藏的parentNode层数
//paklass 用于确定是否是用户名的父元素class， pat paklass的上溯层数
//返回变量flag用于判断是否有条目被隐藏，来控制是否刷新条纹界面
//
//timeline, index 的 paklass = 'clearit tml_item', pat = 2
//bangumi.tv/group/boring中 paklass = 'author', pat = 1
//
//collections中 paklass = 'userContainer', pat = 2
//
//SimpleSidePanel中 klass = 'avatar', t = 1, paklass = 'groupsLine', pat = 2
//
function listItems(klass, t, paklass, pat) {
  var i;
  var flag = false;
  var avatar = document.getElementsByClassName(klass);
  for (i = 0; i < avatar.length; i++) {
    if (getParentNode(avatar[i], pat).className == paklass
      && avatar[i].href.split("/")[3] == 'user'
      && testBlockedOrNot(avatar[i].href.split("/")[4])) {
      getParentNode(avatar[i], t).style.display = 'none';
      flag = true;
    }
  }
  return flag;
}


/*
具体条目
http://bangumi.tv/subject/18462
group discover
http://bangumi.tv/group/discover
---替代0.3.4R--- subject()部分隐藏讨论版功能
---替代0.4.2--- groupdiscover()
*/
//没有class，直接用a标签定位，上溯到某个tagName
//用法类同listItems()
//tag tag位置, t 上溯隐藏的parentNode层数
//patag 用于确定是否是用户名的父元素tag， pat patag的上溯层数
//返回变量flag用于判断是否有条目被隐藏，来控制是否刷新条纹界面
//
function subSection(tag, t, patag, pat) {
  var i;
  var flag = false;
  var topiclist = document.getElementsByTagName(tag);
  for (i = 0; i < topiclist.length; i++) {
    if (getParentNode(topiclist[i], pat).tagName.toLowerCase() == patag
      && topiclist[i].href.split('/')[3] == 'user'
      && testBlockedOrNot(topiclist[i].href.split('/')[4])) {
      getParentNode(topiclist[i], t).style.display = 'none';
      flag = true;
    }
  }
  return flag;
}



//dollars
function dollars() {
  var i;
  var bgurl;
  var avatar = document.getElementsByClassName('avatar');
  for (i = 0; i < avatar.length; i++) {
    bgurl = avatar[i].src.split("/")[9];
    if (bgurl == undefined) {
      continue;
    }
    if (testBlockedOrNot(bgurl.split(".")[0])) {
      getParentNode(avatar[i], 2).style.display = 'none';
    }
  }
}



//添加设置
function addSettingBtn() {
  var sectab = document.getElementsByClassName('secTab')[0];
  injectFunc(bksetting);
  injectFunc(bkbackup);
  injectFunc(exportData);
  injectFunc(importData);
  injectFunc(importInterface);
  injectFunc(getChildNodes);
  injectFunc(getParentNode);
  injectFunc(getData);
  injectFunc(delAvatar);
  injectFunc(searchAvatar);
  injectFunc(checkAll);
  injectFunc(uncheckAll);
  injectFunc(batchDelete);
  sectab.innerHTML = '<li><a href="javascript:bksetting(true)"> \
                      <span>屏蔽设置</span></a></li> \
                      <li><a href="javascript:bkbackup()"> \
                      <span>导入/导出</span></a></li>' 
                   + sectab.innerHTML;
}


function checkAll() {
  var i;
  var inputbox = document.getElementsByClassName('selectable');
  for (i = 0; i < inputbox.length; i++) {
    inputbox[i].checked = true;
  }
}


function uncheckAll() {
  var i;
  var inputbox = document.getElementsByClassName('selectable');
  for (i = 0; i < inputbox.length; i++) {
    inputbox[i].checked = false;
  }
}


function batchDelete() {
  var i;
  var id1;
  var id2;
  var index1;
  var index2;
  var shikabane = getData('koroshimashita');
  var ids = document.getElementsByClassName('selectable');
  //alert(ids.length);
  for (i = 0; i < ids.length; i++) {
    //alert(ids[i].checked);
    if (ids[i].checked) {
      id1 = ids[i].value.split('/')[0];
      id2 = ids[i].value.split('/')[1];
      //alert(id1);
      //alert(id2);
      if (id1 == id2) {
        index1 = shikabane.indexOf(id1);
        shikabane.splice(index1, 1);
      }
      else {
        index1 = shikabane.indexOf(id1);
        shikabane.splice(index1, 1);
        index2 = shikabane.indexOf(id2);
        shikabane.splice(index2, 1);
      }
      delAvatar(id1);
    }
  }
  //alert(shikabane);
  localStorage.setItem("koroshimashita", shikabane);
  //alert(getData('shitainoavatars'));
  //alert('完成');
  bksetting(false);
}



function bksetting(flag) {
  var i;
  var users;
  var id1;
  var id2;
  var avatar;
  var ulst;
  var temp = '';
  var btns;
  var column = document.getElementById('columnA');
  var robot = document.getElementById('robot_speech');
  var roboshell = getChildNodes(document.getElementById('ukagaka_shell'))[0];
  var sectab = document.getElementsByClassName('secTab')[0];
  getChildNodes(document.getElementById('header'))[1].innerHTML = '屏蔽设置';
  document.getElementById('columnB').style.display = 'none';
  column.style.display = 'none';
  btns = getChildNodes(sectab);
  getChildNodes(btns[0])[0].className = 'selected';
  for (i = 1; i < btns.length; i++) {
    getChildNodes(btns[i])[0].className = '';
  }
  //春菜如果太小，下面的北斗会看不到
  roboshell.className = 'ui_10 shell_1';
  //
  users = getData('koroshimashita');
  ulst = users;
  temp = '<div><ul id="memberUserList" class="usersLarge">';
  for (i = 0; i < ulst.length; i++) {
    //alert(ulst);
    avatar = searchAvatar(ulst[i]);
    if (! avatar) {
      break;
    }
    avatar = avatar.split('/');
    if (avatar[1] != 'default') {
      avatar = '000/' + avatar[1] + '/' + avatar[2] + '/' + ulst[i] + '.jpg';
    }
    else {
      avatar = 'icon.jpg';
    }
    //alert(avatar);
    //alert(1 * ulst[i+1]);
    //防止最后一位id1 == id2，则ulst[i+1] == undefined
    if (1 * ulst[i+1] > 0 || (!ulst[i+1])) {
      id2 = ulst[i];
      id1 = ulst[i];
    }
    else {
      id2 = ulst[i+1];
      id1 = ulst[i];
      i += 1;
    }
    //alert(i);
    temp = temp + '<li class="user"><div class="userContainer pm_odd"><strong>'
         + '<input class="selectable" value="'
         + id1 + '/' + id2 + '" name="" type="checkbox"></input>'
         + '<a href="/user/' + id2 + '" class="avatar">'
         + '<span class="userImage">'
         + '<img src="http://lain.bgm.tv/pic/user/m/'
         + avatar + '" '
         + 'alt="" class="avatar">'
         + '</span></a><div class="avatar">id: ' + id2 + '</div></strong>'
         + '</div></li>';
  }
  temp += '</ul></div>';
  temp += '<input class="inputBtn" type="submit" '
        + 'onclick="javascript:checkAll();"'
        + 'value="全选" name="select_all"></input>';
  temp += '<input class="inputBtn" type="submit" '
        + 'onclick="javascript:uncheckAll();"'
        + 'value="取消" name="select_all"></input>';
  temp += '<input class="inputBtn" type="submit" '
        + 'onclick="javascript:batchDelete();"'
        + 'value="解除屏蔽" name="batch_delete"></input>';
  column.innerHTML = temp;
  column.style.display = 'block';
  //
  //
  //speech
  if (flag) {
  robot.innerHTML = '＃＃＃＃＃＃＃＃＃＃＃＃＃　　　Y<br />'
                  + '＃＃＃＃＃★＃＃＃＃＃＃＃　　　O<br />'
                  + '＃＃＃＃＃＃＃＃＃★＃＃＃　　　U<br />'
                  + '＃＃＃＃＃＃＃＃＃＃＃＃＃　　　 <br />'
                  + '＃＃＃＃＃＃＃＃★＃＃＃＃　　　は<br />'
                  + '＃＃＃＃＃★＃＃＃＃＃＃＃　　　 <br />'
                  + '＃＃＃＃＃＃＃＃＃＃＃＃＃　　　S<br />'
                  + '＃＃＃＃★＃＃＃＃＃＃＃＃　　　H<br />'
                  + '＃＃＃＃＃＃＃＃＃＃＃＃＃　　　O<br />'
                  + '＃＃＃★＃＃＃＃＃＃＃＃＃　　　C<br />'
                  + '＃＃＃＃＃＃＃＃＃＃＃＃＃　　　K<br />'
                  + '＃＃＃＃＃★＃＃＃＃＃＃＃　　　<br />'
                  + '＃＃＃＃＃＃＃＃＃＃＃＃＃　　#^﹃^#';
  }
  else {
    robot.innerHTML = 'くすぐられたよ　my 僅かな母性本能';
  }
}


function bkbackup() {
  var i;
  var btns;
  var temp;
  var column = document.getElementById('columnA');
  var robot = document.getElementById('robot_speech');
  var roboshell = getChildNodes(document.getElementById('ukagaka_shell'))[0];
  var sectab = document.getElementsByClassName('secTab')[0];
  var header = document.getElementById('header');
  getChildNodes(header)[1].innerHTML = '屏蔽列表导入/导出';
  document.getElementById('columnB').style.display = 'none';
  column.style.display = 'none';
  btns = getChildNodes(sectab);
  getChildNodes(btns[1])[0].className = 'selected';
  getChildNodes(btns[0])[0].className = '';
  for (i = 2; i < btns.length; i++) {
    getChildNodes(btns[i])[0].className = '';
  }
  //春菜如果太小，下面的北斗会看不到
  roboshell.className = 'ui_10 shell_1';
  //
  temp = '<input class="inputBtn" type="submit" '
       + 'onclick="javascript:exportData();" '
       + 'value="导出" name="export_data" />'
       + '<input class="inputBtn" type="submit" '
       + 'onclick="javascript:importInterface();" '
       + 'value="导入" name="import_data" />';
  column.innerHTML = temp;
  column.style.display = 'block';
  robot.innerHTML = '撩起了 my那一点母性本能';
}


function exportData() {
  var conj_outer = '-|-I HOPE YOU LIVE A LIFE YOU ARE PROUD OF. '
                 + 'IF YOU FIND THAT YOU ARE NOT, I HOPE YOU HAVE '
                 + 'THE STRENGTH TO START ALL OVER AGAIN-|-';
  var conj_mid = '-|-gochuumon wa usagi desu ka-|-'
  var text = '嘟嘟噜' + conj_outer;
  var robot = document.getElementById('robot_speech');
  var roboshell = getChildNodes(document.getElementById('ukagaka_shell'))[0];
  var columna = document.getElementById('columnA');
  var shikabane = localStorage.getItem('koroshimashita');
  var avatars = localStorage.getItem('shitainoavatars');
  //若先使用导入，再进入导出时可以归位
  bkbackup();
  if (shikabane == null || shikabane == '') {
    //alert('还没有屏蔽任何人，先抓个试试？');
    robot.style.display = 'block';
    robot.innerHTML = 'Master!  还没有屏蔽任何人，先抓个试试？';
    return false;
  }
  else {
    shikabane = shikabane.split(",").join(conj_mid);
  }
  avatars = avatars.split(",").join(conj_mid);
  text += [shikabane, avatars].join(conj_outer) + conj_outer + '嘟嘟噜';
  columna.innerHTML += '<br /><br /><div class="light_even row_reply clearit">'
                     + text + '</div>';
  //切换春菜为克莱克本樱
  roboshell.className = 'ui_11 shell_22';
  robot.innerHTML = '请复制到随便什么地方<br />反正别让我给找到了，哼哼～';
}


function importInterface() {
  var robot = document.getElementById('robot_speech');
  var columna = document.getElementById('columnA');
  var temp = '<br /><br /><textarea id="ryououki" class="quick" '
           + 'style="width: 504px; height: 225px;" rows="5" cols="45" '
           + 'name="newbio"></textarea><p class="tip"></p>';
  temp += '<input class="inputBtn" type="submit" '
        + 'onclick="javascript:importData();" value="提交" name="select_all" />';
  //alert(columna.outerHTML);
  bkbackup();
  columna.innerHTML = columna.innerHTML + temp;
  robot.innerHTML = 'くすぐられたよ　my 僅かな母性本能';
}


function importData() {
  var shikabane;
  var avatars;
  var robot = document.getElementById('robot_speech');
  var data = document.getElementById('ryououki').value;
  var columna = document.getElementById('columnA');
  var text = data.trim();
  //alert(text);
  var conj_outer = '-|-I HOPE YOU LIVE A LIFE YOU ARE PROUD OF. '
                 + 'IF YOU FIND THAT YOU ARE NOT, I HOPE YOU HAVE '
                 + 'THE STRENGTH TO START ALL OVER AGAIN-|-';
  var conj_mid = '-|-gochuumon wa usagi desu ka-|-'
  if (text == '') {
    robot.innerHTML = '请输入';
    return false;
  }
  text = text.split('嘟嘟噜')[1];
  //alert(text);
  shikabane = text.split(conj_outer)[1].split(conj_mid);
  //alert(shikabane);
  //alert(shikabane.length);
  avatars = text.split(conj_outer)[2].split(conj_mid);
  //alert(avatars);
  //alert(avatars.length);
  localStorage.setItem('koroshimashita', shikabane);
  localStorage.setItem('shitainoavatars', avatars);
  bkbackup();
  getParentNode(robot, 5).style.display = 'block';
  robot.innerHTML = '导入完成';
}





hidePosts();
