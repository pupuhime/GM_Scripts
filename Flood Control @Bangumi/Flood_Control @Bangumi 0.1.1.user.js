// ==UserScript==
// @name           Flood Control @Bangumi
// @description    默认头像帖太多时全部隐藏
// @version        0.1.1
// @include        http://bgm.tv/rakuen*
// @include        http://bangumi.tv/rakuen*
// @include        http://chii.in/rakuen*
// ==/UserScript==


function getLimit() {
  var limit = localStorage.getItem('flood');
  if (limit == null || limit == '') {
    return 12;
  }
  else {
    return 1 * limit;
  }
}


function setLimit() {
  var limit = prompt("请输入限制数:","");
  if (limit == null) {
    return null;
  }
  else if (1 * limit >= 0) {
    localStorage.setItem('flood', Math.floor(1 * limit));
    alert('成功');
  }
  else {
    alert('错误，请确保输入阿拉伯数字(正整数)：');
    setLimit();
  }
}


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


function topic(n) {
  var i;
  var bgurl;
  var dficon = [];
  var avatar = document.getElementsByClassName("avatarNeue");
  var flag = false;
  for (i = 0; i < avatar.length; i++) {
    bgurl = avatar[i].style.backgroundImage.split("/");
    if (bgurl.length == 7 && bgurl[4] == "user") {
      dficon.push(avatar[i]);
    }
  }
  if (dficon.length <= n) {
    return false;
  }
  for (i = 0; i < dficon.length; i++) {
    dficon[i].parentNode.parentNode.style.display = 'none';
  }
  return true;
}


function main() {
  var flag;
  var limit = getLimit();
  flag = topic(limit);
  if (flag) {
    refreshTopicList({'1' : 'line_odd item_list',
                      '-1' : 'line_even item_list'}, 'item_list');
  }
}


main();
GM_registerMenuCommand('Limit', setLimit);