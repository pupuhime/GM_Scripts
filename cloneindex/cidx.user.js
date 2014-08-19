// ==UserScript==
// @name           cloneindex
// @namespace      https://github.com/hentaiPanda
// @description    克隆目录
// @author         niR
// @version        0.0.1
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @require        http://code.jquery.com/ui/1.11.0/jquery-ui.js
// @require        http://coffeescript.org/extras/coffee-script.js
// @resource       coffee  coffee.coffee
// @grant          GM_registerMenuCommand
// @grant          GM_getResourceText
// @include        http://bangumi.tv/index/*
// @include        http://bgm.tv/index/*
// @include        http://chii.in/index/*
// ==/UserScript==


CoffeeScript.eval(GM_getResourceText("coffee"));