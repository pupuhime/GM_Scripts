// ==UserScript==
// @name           BlackumiTest
// @namespace      https://github.com/hentaiPanda
// @description    bangumi用户屏蔽
// @author         niR
// @version        dev
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @require        http://coffeescript.org/extras/coffee-script.js
// @require        https://greasyfork.org/scripts/4274-filesaver-js/code/FileSaverjs.js
// @resource       coffee  Blackumi_dev.coffee
// @grant          GM_getResourceText
// @grant          GM_getValue
// @grant          GM_setValue
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==
// ==/UserScript==


CoffeeScript.eval(GM_getResourceText("coffee"));
