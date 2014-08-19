// ==UserScript==
// @name           cloneindex
// @namespace      https://github.com/hentaiPanda
// @description    克隆目录
// @author         niR
// @version        0.0.1
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @grant          GM_registerMenuCommand
// @include        http://bangumi.tv/index/*
// @include        http://bgm.tv/index/*
// @include        http://chii.in/index/*
// ==/UserScript==

var cloneComments, cloneItems, createidx, getChildren, getComments, getItems, getItemsComments, modifyComments;

getChildren = function(node) {
  var cn, i, result, _i, _ref;
  result = [];
  cn = node.childNodes;
  for (i = _i = 0, _ref = cn.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    if (cn[i].nodeType !== 1) {
      continue;
    } else {
      result.push(cn[i]);
    }
  }
  return result;
};

getItems = function() {
  var items;
  items = [];
  $('#browserItemList > li > div.inner > h3 > a').each(function() {
    return items.push(this.getAttribute('href'));
  });
  return items;
};

getComments = function() {
  var comments;
  comments = [];
  $('#browserItemList > li > div.inner').each(function() {
    var children, comment, i, _i, _len;
    children = getChildren(this);
    comment = false;
    for (_i = 0, _len = children.length; _i < _len; _i++) {
      i = children[_i];
      if (i.id && i.id === 'comment_box') {
        comment = i.textContent.trim();
        break;
      }
    }
    return comments.push(comment);
  });
  return comments;
};

getItemsComments = function() {
  var comments, items;
  items = [];
  comments = {};
  $('#browserItemList > li > div.inner').each(function() {
    var children, comment, href, i, _i, _len;
    children = getChildren(this);
    comment = false;
    for (_i = 0, _len = children.length; _i < _len; _i++) {
      i = children[_i];
      if (i.id && i.id === 'comment_box') {
        comment = i.textContent.trim();
        break;
      }
    }
    href = $(this).find('h3 > a')[0].getAttribute('href');
    comments[href] = comment;
    return items.push(href);
  });
  return [items, comments];
};

createidx = function() {
  var comments, detail, formhash, header, items, postdata, _ref;
  formhash = '';
  $('#badgeUserPanel > li.row > a').each(function() {
    var href;
    href = this.getAttribute('href').split('ogout/');
    if (href.length > 1) {
      return formhash = href[1];
    }
  });
  header = $('#header > h1')[0].textContent.trim();
  detail = $('.line_detail > span')[0].textContent.trim();
  console.log(header);
  console.log(detail);
  console.log(formhash);
  _ref = getItemsComments(), items = _ref[0], comments = _ref[1];
  console.log(items);
  console.log(comments);
  postdata = {
    'formhash': formhash,
    'title': header,
    'desc': detail,
    'submit': '创建目录'
  };
  return $.ajax({
    type: 'POST',
    url: '/index/create',
    data: postdata,
    success: function(data, textStatus, xhr) {
      var action;
      action = $(data).find('#newIndexRelatedForm')[0].getAttribute('action');
      console.log('action:');
      console.log(action);
      return cloneItems(items, action, formhash, comments);
    },
    error: function() {
      return alert('创建目录时出错');
    }
  });
};

cloneItems = function(items, action, formhash, comments) {
  var postdata;
  if (items.length > 0) {
    postdata = {
      'formhash': formhash,
      'add_related': items[0],
      'submit': '添加新关联'
    };
    return $.ajax({
      type: 'POST',
      url: action,
      data: postdata,
      success: function(data) {
        console.log('Adding ' + items[0] + ' succeed');
        return cloneItems(items.slice(1), action, formhash, comments);
      },
      error: function() {
        return alert('复制条目时出错');
      }
    });
  } else {
    cloneComments(action.slice(0, 12), formhash, comments);
    console.log('complete');
  }
};

modifyComments = function(action, formhash, comment) {
  var postdata;
  if (comment) {
    postdata = {
      'formhash': formhash,
      'content': comment,
      'order': 0,
      'submit': '提交'
    };
    return $.ajax({
      type: 'POST',
      url: action,
      data: postdata,
      success: function() {
        return console.log('Success');
      },
      error: function() {
        return alert('添加评价时出错');
      }
    });
  }
};

cloneComments = function(link, formhash, comments) {
  return $.ajax({
    type: 'GET',
    url: link,
    success: function(data) {
      return $(data).find('#browserItemList > li > div.inner').each(function() {
        var action, href, html, modify_id;
        html = $(this);
        href = html.find('h3 > a')[0].getAttribute('href');
        modify_id = html.find('p.tools > a.thickbox')[0].id.slice(7);
        action = '/index/related/' + modify_id + '/modify';
        return modifyComments(action, formhash, comments[href]);
      });
    },
    error: function() {
      return alert('获取目录时出错');
    }
  });
};

GM_registerMenuCommand('Clone', createidx);