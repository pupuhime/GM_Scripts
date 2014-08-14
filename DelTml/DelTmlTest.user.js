// ==UserScript==
// @name           DelTml
// @namespace      https://github.com/hentaiPanda
// @description    自动删除时间线
// @author         niR
// @version        0.0.2
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.min.js
// @require        coffee-script.js
// @resource       coffee  coffee.coffee
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceText
// @grant          GM_registerMenuCommand
// @include        http://bangumi.tv/user/*/timeline*
// @include        http://bgm.tv/user/*/timeline*
// @include        http://chii.in/user/*/timeline*
// ==/UserScript==

CoffeeScript.eval(GM_getResourceText("coffee"));