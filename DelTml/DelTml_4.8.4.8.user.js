// ==UserScript==
// @name           DelTml
// @namespace      https://github.com/hentaiPanda
// @description    自动删除时间线
// @author         niR
// @version        4.8.4.8
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceText
// @grant          GM_registerMenuCommand
// @include        http://bangumi.tv/user/*/timeline*
// @include        http://bgm.tv/user/*/timeline*
// @include        http://chii.in/user/*/timeline*
// ==/UserScript==

var delOrNot, delTml, delhref, gotoNextPage, main;

delOrNot = function() {
  var flag;
  flag = !GM_getValue('deltml', false);
  GM_setValue('deltml', flag);
  if (flag) {
    alert('现在开始自动删除时间线');
    console.log('现在开始自动删除时间线');
    return delTml();
  } else {
    alert('自动删除时间线已终止');
    return console.log('自动删除时间线已终止');
  }
};

delhref = function(href, i) {
  if (href.length > i) {
    console.log(href[i]);
    return $.get(href[i], function() {
      return delhref(href, i + 1);
    }).fail(function() {
      return delhref(href, i + 1);
    });
  } else {
    return location.href = location.href;
  }
};

delTml = function() {
  var count, delboxes, flag, i;
  flag = GM_getValue('deltml', false);
  if (!flag) {
    return 0;
  }
  delboxes = $("a.tml_del");
  if (delboxes.length > 0) {
    count = [];
    i = 0;
    delboxes.each(function() {
      var href;
      href = this.getAttribute("href");
      return count.push(href);
    });
    console.log(count.length);
    return delhref(count, i);
  } else {
    return gotoNextPage();
  }
};

gotoNextPage = function() {
  var pages, url;
  pages = $("#tmlPager > .page_inner > a");
  if (pages.length === 1) {
    url = pages[0];
  } else if (pages.length === 2) {
    url = pages[1];
  } else {
    GM_setValue('deltml', false);
    alert('自动删除结束');
    console.log('自动删除结束');
    location.href = location.href.split('?')[0];
    return 0;
  }
  console.log(url);
  return location.href = url;
};

main = function() {
  var flag;
  flag = GM_getValue('deltml', false);
  if (!flag) {
    GM_registerMenuCommand('删除', delOrNot);
    return 0;
  } else {
    GM_registerMenuCommand('停止', delOrNot);
    return delTml();
  }
};

main();