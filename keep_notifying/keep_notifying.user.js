// ==UserScript==
// @name           keep notifying
// @namespace      https://github.com/hentaiPanda
// @description    保存提醒
// @author         niR
// @version        0.0.1
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.min.js
// @require        http://coffeescript.org/extras/coffee-script.js
// @resource       coffee  coffee.coffee
// @grant          GM_getResourceText
// @grant          GM_registerMenuCommand
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==

CoffeeScript.eval(GM_getResourceText("coffee"));
