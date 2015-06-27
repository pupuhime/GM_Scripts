// ==UserScript==
// @name           bgmnote
// @namespace      https://github.com/hentaiPanda
// @description    简易备注
// @author         niR
// @version        0.0.2 dev 愛宕
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @require        http://code.jquery.com/ui/1.11.0/jquery-ui.js
// @require        http://coffeescript.org/extras/coffee-script.js
// @require        https://greasyfork.org/scripts/4274-filesaver-js/code/FileSaverjs.js
// @resource       coffee  coffee_dev_atago.coffee
// @grant          GM_getResourceText
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


CoffeeScript.eval(GM_getResourceText("coffee"));
