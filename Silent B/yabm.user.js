// ==UserScript==
// @name           Yet Another Bangumi Mute
// @namespace      https://github.com/hentaiPanda
// @description    隐藏指定的超展开列表项目
// @author         niR
// @version        0.0.1
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @require        http://coffeescript.org/extras/coffee-script.js
// @resource       coffee  coffee.coffee
// @grant          GM_getResourceText
// @grant          GM_getValue
// @grant          GM_setValue
// @include        http://bgm.tv/rakuen/topiclist
// @include        http://bangumi.tv/rakuen/topiclist
// @include        http://chii.in/rakuen/topiclist
// ==/UserScript==

CoffeeScript.eval(GM_getResourceText("coffee"));