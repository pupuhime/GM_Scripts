// ==UserScript==
// @name           ChangeSearch
// @description    替换bangumi『全部』一栏的搜索结果为搜索引擎结果
// @author         niR
// @version        0.0.1
// @license        MIT License
// @encoding       utf-8
// @require        http://code.jquery.com/jquery-2.1.1.js
// @require        http://code.jquery.com/ui/1.11.0/jquery-ui.js
// @require        http://coffeescript.org/extras/coffee-script.js
// @resource       coffee  file:///E:\Repositories\Test\ChangeSearch\coffee.coffee
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @grant          GM_getValue
// @grant          GM_setValue
// @include        http://bangumi.tv/subject_search/*?cat=all*
// @include        http://bgm.tv/subject_search/*?cat=all*
// @include        http://chii.in/subject_search/*?cat=all*
// ==/UserScript==


CoffeeScript.eval(GM_getResourceText("coffee"));
