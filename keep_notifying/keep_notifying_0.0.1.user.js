// ==UserScript==
// @name           keep notifying
// @namespace      https://github.com/hentaiPanda
// @description    保存提醒
// @author         niR
// @version        0.0.1
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==


var backup, bindCloseToBtn, bindShowToBtn, empty, main, rmNtf, show,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

backup = function() {
  if ($('#home_notify').length > 0) {
    return $.ajax({
      type: 'GET',
      url: '/notify',
      success: function(res) {
        var items, nv_items, old_items;
        nv_items = $(res).find('.tml_item').removeClass('odd even');
        old_items = GM_getValue('notify', []);
        items = [];
        nv_items.filter(function() {
          var html;
          html = this.outerHTML;
          return !(__indexOf.call(old_items, html) >= 0);
        }).map(function() {
          return items.push(this.outerHTML);
        });
        items = items.concat(old_items);
        GM_setValue('notify', items);
        return console.log('success');
      },
      error: function() {
        return console.log('error');
      }
    });
  }
};

show = function() {
  var css, items, x;
  items = GM_getValue('notify', []).join('\n');
  x = '<div id="notifyeye"> <div id="ntf_window"> <div id="ntf_title"> <div id="ntf_ajaxWindowTitle">电波记录</div> <div id="ntf_closeWindowButton">Close</div> </div> <div id="ntf_items"> <a href="javascript:;" id="ntf_del_all" class="ignore_all">清空记录</a>' + items + '</div></div></div>';
  $('body').append(x);
  $('#notifyeye a.nt_del').remove();
  $('#notifyeye .tml_item:even').addClass('odd');
  $('#notifyeye .tml_item:odd').addClass('even');
  css = '<style type="text/css">\n  #ntf_window{\n    top:50%;\n    left:50%;\n    margin-left: -290px;\n    margin-top: -170px;\n    width: 580px;\n    height: 390px;\n    display: block;\n    position:fixed;\n    background:#fff;\n    z-index:102;\n    color:#000;\n    text-align:left;\n    box-shadow:0px 0 15px #aaa;\n    border-radius:5px;\n  }\n  #ntf_title{\n    background:#e8e8e8 url(/img/bangumi/bangumi_ui_1.png) repeat-x scroll 0 -113px;\n    height:30px;\n    color:#FFF;\n    position:relative;\n    border-radius:5px 5px 0 0\n  }\n  #ntf_ajaxWindowTitle{\n    float:left;\n    padding:0 15px;\n    line-height:30px;\n    font-size:13px;\n  }\n  #ntf_closeWindowButton{\n    color:#FFF;\n    text-indent: -9999px;\n    background:url(\'/img/ico/closebox.png\');\n    width:30px;\n    height:30px;\n    cursor:pointer;\n    position:absolute;\n    top:-12px;\n    right: -12px;\n  }\n  #ntf_items{\n    height: 355px;\n    overflow: auto;\n  }\n  div#notifyeye{\n    margin:0;\n  }\n  div#notifyeye div.tml_item{\n    position:relative;\n    padding:5px 0 5px 5px;\n  }\n  div#notifyeye div.tml_item a.nt_del{\n    top:5px;\n  }\n  div#notifyeye div.inner{\n    margin-left:45px;\n  }\n  div#notifyeye div.odd{\n    border-bottom:1px dotted #E0E0E0;\n  }\n  div#notifyeye div.even{\n    background-color:#F9F9F9;\n    border-bottom:1px dotted #E0E0E0;\n  }\n  div#notifyeye a.ignore_all{\n    display:block;\n    text-align:center;\n    background:#EEE;\n    color:#555;\n    width:100%;\n    padding:0 0 2px 0;\n  }\n  div#notifyeye a.ignore_all:hover{\n    background:#D51007;\n    color:#FFF;\n  }\n  div#notifyeye a.nt_link{\n    color:#1175A8;\n    border:0;\n    text-decoration:none;\n  }\n  div#notifyeye a.nt_link:hover{\n    color:#0187C5;\n    text-decoration:underline;\n  }\n  div#notifyeye div.frd_connect{\n    margin: 0 7px 0 0;\n  }\n  div#notifyeye a.btn_link{\n    background:#51B5E8;\n    color:#FFF;\n    padding:1px 8px;\n    font-size:12px;\n    border-radius:5px;\n    line-height:12px;\n  }\n  div#notifyeye a.btn_link.ignore{\n    background:#888;\n  }\n  div#notifyeye a:hover.btn_link{\n    background:#000;\n  }';
  $('head').append(css);
  bindCloseToBtn();
  return $('#ntf_del_all').click(function() {
    if (empty()) {
      return rmNtf();
    }
  });
};

empty = function() {
  var answer;
  answer = confirm('清空所有电波记录吗？');
  if (answer) {
    GM_deleteValue('notify');
    return true;
  } else {
    return false;
  }
};

rmNtf = function() {
  var ntfeye;
  $('body').off('.closeNTFWin');
  ntfeye = $('#notifyeye');
  return ntfeye.fadeOut(function() {
    ntfeye.remove();
    return bindShowToBtn();
  });
};

bindShowToBtn = function() {
  return $('#openNTFWin').on('click', function() {
    console.log('H H H');
    $('#openNTFWin').off();
    return show();
  });
};

bindCloseToBtn = function() {
  $('body').on('click.closeNTFWin', '#ntf_closeWindowButton', function() {
    console.log('ntf_closeWindowButton');
    return rmNtf();
  });
  return $('body').on('keydown.closeNTFWin', function(evt) {
    if (evt.which === 27) {
      console.log('ESC down');
      return rmNtf();
    }
  });
};

main = function() {
  var snt;
  if ((location.pathname === '/notify') && (self === top)) {

  } else {
    $('#dock li').eq(1).prepend('<a id="openNTFWin" href="javascript:;">提醒</a> | ');
    bindShowToBtn();
    backup();
    return snt = setInterval((function() {
      return backup();
    }), 20000);
  }
};

main();