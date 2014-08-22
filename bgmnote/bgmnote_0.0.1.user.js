// ==UserScript==
// @name           bgmnote
// @namespace      https://github.com/hentaiPanda
// @description    简易备注
// @author         niR
// @version        0.0.1
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @require        http://code.jquery.com/ui/1.11.0/jquery-ui.js
// @grant          GM_getValue
// @grant          GM_setValue
// @include        http://bangumi.tv/group/topic/*
// @include        http://bgm.tv/group/topic/*
// @include        http://chii.in/group/topic/*
// @include        http://bangumi.tv/subject/topic/*
// @include        http://bgm.tv/subject/topic/*
// @include        http://chii.in/subject/topic/*
// @include        http://bangumi.tv/rakuen/topic/group/*
// @include        http://bgm.tv/rakuen/topic/group/*
// @include        http://chii.in/rakuen/topic/group/*
// @include        http://bangumi.tv/rakuen/topic/ep/*
// @include        http://bgm.tv/rakuen/topic/ep/*
// @include        http://chii.in/rakuen/topic/ep/*
// @include        http://bangumi.tv/blog/*
// @include        http://bgm.tv/blog/*
// @include        http://chii.in/blog/*
// @include        http://bangumi.tv/ep/*
// @include        http://bgm.tv/ep/*
// @include        http://chii.in/user/*
// @include        http://bangumi.tv/user/*
// @include        http://bgm.tv/user/*
// @exclude        http://chii.in/user/*/*
// @exclude        http://bangumi.tv/user/*/*
// @exclude        http://bgm.tv/user/*/*
// ==/UserScript==


var addBtn, addNotes, appendStyle, confirmHiding, getVal, hideNote, main, replaceNlc, showNote, updateNote;

getVal = function() {
  var userlink, val;
  userlink = $('.user_box > a.avatar').attr('href');
  val = GM_getValue(userlink, '');
  return val;
};

updateNote = function() {
  var userlink, val;
  val = $('#bgmnote textarea').val();
  userlink = $('.user_box > a.avatar').attr('href');
  GM_setValue(userlink, val);
  return hideNote();
};

confirmHiding = function() {
  var answer, new_val, val;
  val = getVal();
  new_val = $('#bgmnote textarea').val();
  if (val === new_val) {
    return hideNote();
  } else {
    answer = confirm('备注似乎已经被更改，是否保存更改？');
    if (answer) {
      return updateNote();
    } else {
      return hideNote();
    }
  }
};

showNote = function() {
  var ui, val;
  console.log('This is showNote');
  ui = $('#user_home .inner > p.tip').last();
  ui.after('<div id="bgmnote"><textarea name="bgmnote" class="reply" style="width:97.5%; height: 150px;"></textarea><div id="submitBtnO"><input id="updatenote" class="inputBtn" value="写好了" name="submit" type="submit">&nbsp;&nbsp; <a id="cancelbtn" href="javascript:;">取消</a></div></div>');
  val = getVal();
  $('#bgmnote textarea').val(val);
  $('body').off('click.show_n');
  $('body').on('click.textarea', '#bgmnotebtn', confirmHiding);
  $('body').on('click.textarea', '#cancelbtn', hideNote);
  return $('body').on('click.textarea', '#updatenote', updateNote);
};

hideNote = function() {
  $('body').off('click.textarea');
  $('#bgmnote').remove();
  return $('body').on('click.show_n', '#bgmnotebtn', showNote);
};

addBtn = function() {
  var new_btn, rr;
  rr = $('div.rr');
  new_btn = '<a href="javascript:;" class="chiiBtn" id="bgmnotebtn"><span>备注</span></a>';
  rr.html(rr.html() + new_btn);
  return $('body').on('click.show_n', '#bgmnotebtn', showNote);
};

addNotes = function() {
  return $('a.avatar').each(function() {
    var note, userlink;
    if (this.parentNode.id.indexOf('post_') !== 0) {
      return 0;
    }
    userlink = this.getAttribute('href');
    note = GM_getValue(userlink, '');
    return this.setAttribute('title', note);
  });
};

replaceNlc = function(str) {
  var new_str;
  new_str = str.replace(/(>|^)([^<]*)\n([^>]*)(<|$)/g, function(s) {
    return s.replace(/\n/g, '<br>');
  });
  return new_str;
};

appendStyle = function() {
  return $('head').append('<style type="text/css">\n  .ui-helper-hidden {\n    display: none;\n  }\n  .ui-helper-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n  }\n  .ui-helper-reset {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    outline: 0;\n    line-height: 1.3;\n    text-decoration: none;\n    font-size: 100%;\n    list-style: none;\n  }\n  .ui-helper-clearfix:before,\n  .ui-helper-clearfix:after {\n    content: "";\n    display: table;\n    border-collapse: collapse;\n  }\n  .ui-helper-clearfix:after {\n    clear: both;\n  }\n  .ui-helper-clearfix {\n    min-height: 0; /* support: IE7 */\n  }\n  .ui-helper-zfix {\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    position: absolute;\n    opacity: 0;\n    filter:Alpha(Opacity=0);\n  }\n  .ui-front {\n    z-index: 100;\n  }\n  .ui-tooltip {\n    padding: 8px;\n    position: absolute;\n    z-index: 9999;\n    max-width: 500px;\n    -webkit-box-shadow: 0 0 5px #aaa;\n    box-shadow: 0 0 5px #aaa;\n  }\n  body .ui-tooltip {\n    border-width: 2px;\n  }\n</style>');
};

main = function() {
  if (location.href.indexOf('user') > 0) {
    return addBtn();
  } else {
    appendStyle();
    addNotes();
    return $('a.avatar').tooltip({
      track: true,
      items: '[title]',
      content: function() {
        return replaceNlc(this.title);
      }
    });
  }
};

main();