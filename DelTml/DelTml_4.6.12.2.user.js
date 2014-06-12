// ==UserScript==
// @name           DelTml
// @namespace      https://github.com/hentaiPanda
// @description    自动删除时间线
// @author         niR
// @version        4.6.12.2
// @license        MIT License
// @encoding       utf-8
// @include        http://bangumi.tv/user/*/timeline
// @include        http://bgm.tv/user/*/timeline
// @include        http://chii.in/user/*/timeline
// ==/UserScript==


function log(method, str) {
  var args = Array.prototype.slice.call(arguments);
  if (window.console && eval('window.console.' + method)) {
    if (arguments.length < 2) {
      eval('console.' + method + '(\'' + method + '\');');
    }
    else {
      eval('console.' + method + '(\'' + args.slice(1).join(',') + '\');');
    }
  }
}


function sendMsg(url, gh) {
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


function delTml() {
  var flag = GM_getValue('deltml', false);
  var a;
  var url;
  var gh;
  a = document.getElementsByClassName('tml_del')[0];
  if (! a) {
    GM_setValue('deltml', false);
    log('info', 'tml_del doesn’t exist');
    return false;
  }
  if (! flag) {
    log('info', 'user stopped');
    return false;
  }
  url = a.href.split('?')[0];
  gh = a.href.split('=')[1];
  log('log', url, gh);
  sendMsg(url, gh);
}


function delOrNot() {
  var flag = ! GM_getValue('deltml', false);
  GM_setValue('deltml', flag);
  if (flag) {
    alert('现在开始自动删除时间线');
    log('warn', '现在开始自动删除时间线');
    delTml();
  }
  else {
    alert('自动删除时间线已终止');
    log('warn', '自动删除时间线已终止');
  }
}


window.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.altKey && event.keyCode == 69) {
  log('info', 'keydown');
  log('log', 'Ctrl + Alt + E');
  delOrNot();
  }}, true);


GM_registerMenuCommand('删除/停止', delOrNot);

delTml();