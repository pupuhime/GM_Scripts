// ==UserScript==
// @name           Yet Another Bangumi Mute
// @namespace      https://github.com/hentaiPanda
// @description    隐藏指定的超展开列表项目
// @author         niR
// @version        0.0.1
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @grant          GM_getValue
// @grant          GM_setValue
// @include        http://bgm.tv/rakuen/topiclist
// @include        http://bangumi.tv/rakuen/topiclist
// @include        http://chii.in/rakuen/topiclist
// ==/UserScript==


var addBtn, getParentNode, initItemList, main, refreshList, removeItem;

getParentNode = function(node, level) {
  var i, pn;
  i = level - 1;
  pn = node.parentNode;
  if (level === 0) {
    return node;
  }
  while (i > 0) {
    pn = pn.parentNode;
    i -= 1;
  }
  return pn;
};

addBtn = function() {
  $('li.item_list > div.inner > span.row').each(function() {
    var x_btn;
    x_btn = '<span class="xlihil"><a href="javascript:;">[X]</a></span>';
    return this.innerHTML = this.innerHTML + x_btn;
  });
  return $('body').on('click.removeli', '.xlihil', function(evt) {
    return removeItem(evt.target);
  });
};

removeItem = function(node) {
  var item;
  item = getParentNode(node, 4);
  GM_setValue(item.id, true);
  return item.outerHTML = '';
};

initItemList = function() {
  var flag;
  flag = false;
  $('li.item_list').each(function() {
    if (GM_getValue(this.id, false)) {
      this.outerHTML = '';
      return flag = true;
    }
  });
  return flag;
};

refreshList = function() {
  var i;
  i = true;
  return $('li.item_list').each(function() {
    if (this.style.display) {
      return;
    }
    if (i) {
      this.className = 'line_odd item_list';
    } else {
      this.className = 'line_even item_list';
    }
    i = !i;
    return console.log(this.id);
  });
};

main = function() {
  var flag;
  flag = initItemList();
  if (flag) {
    refreshList();
  }
  return addBtn();
};

main();