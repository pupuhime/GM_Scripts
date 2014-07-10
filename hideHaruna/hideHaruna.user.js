// ==UserScript==
// @name           hideHaruna
// @namespace      https://github.com/hentaiPanda
// @description    隐藏春菜
// @author         niR
// @version        0.0.1
// @license        MIT License
// @encoding       utf-8
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==


var hideHaruna;

hideHaruna = function() {
  try {
    return document.getElementById("ukagaka_shell").style.display = "none";
  } catch (_error) {}
};

hideHaruna();