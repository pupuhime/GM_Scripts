// ==UserScript==
// @name           sixFEetuNder
// @namespace      https://github.com/hentaiPanda
// @description    标示挖坟
// @author         niR
// @version        0.0.1
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.min.js
// @include        http://bangumi.tv/group/topic/*
// @include        http://bgm.tv/group/topic/*
// @include        http://chii.in/group/topic/*
// ==/UserScript==



var findFEN, getFirstChild, getTimeStamp, quickSort;

getFirstChild = function(node) {
  var fc;
  fc = node.firstChild;
  while (fc !== null && fc.nodeType !== 1) {
    fc = fc.nextSibling;
  }
  return fc;
};

quickSort = function(a) {
  var array, big, bigger, cache, i, smaller, _i, _ref;
  if (a.length <= 1) {
    return a;
  }
  smaller = [];
  bigger = [];
  for (i = _i = 1, _ref = a.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
    if (a[i] < a[0]) {
      smaller.push(a[i]);
    } else {
      bigger.push(a[i]);
    }
  }
  array = quickSort(smaller);
  big = [a[0]];
  cache = Array.prototype.push;
  cache.apply(big, quickSort(bigger));
  cache.apply(array, big);
  return array;
};

getTimeStamp = function() {
  var posts;
  posts = {};
  $(".re_info").each(function() {
    var time;
    time = $.trim(this.textContent).split(" ");
    time = time[2].replace(/-/g, " ") + " " + time[3].replace(/-/g, " ");
    return posts[time] = this;
  });
  return posts;
};

findFEN = function(interval) {
  var fener, i, k, num, posts, seq, t, _i, _j, _len, _ref, _results;
  posts = getTimeStamp();
  fener = [];
  t = {};
  for (k in posts) {
    num = Date.parse(k);
    t[num] = k;
  }
  seq = quickSort((function() {
    var _i, _len, _ref, _results;
    _ref = Object.keys(t);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      _results.push(i * 1);
    }
    return _results;
  })());
  for (i = _i = 1, _ref = seq.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
    if (seq[i] - seq[i - 1] >= interval) {
      fener.push(t[seq[i]]);
    }
  }
  if (fener.length >= 1) {
    $("#pageHeader").append('<div style="color:#999;float:left;">这可能是一篇被挖坟的帖子</div>');
  }
  _results = [];
  for (_j = 0, _len = fener.length; _j < _len; _j++) {
    i = fener[_j];
    getFirstChild(getFirstChild(posts[i])).style = "color:black";
    _results.push(posts[i].style = "background:#F09199;color:black;border-radius:5px;");
  }
  return _results;
};

findFEN(15897600000);
