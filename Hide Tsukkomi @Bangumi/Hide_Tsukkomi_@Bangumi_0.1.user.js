// ==UserScript==
// @name           Hide Tsukkomi @Bangumi
// @description    爆乳教师再也不用担心我被Bangumi吐槽箱的义妹给拐走了
// @version        0.1
// @include        http://bangumi.tv/subject/*
// @include        http://bgm.tv/subject/*
// @include        http://chii.in/subject/*
// ==/UserScript==

function disableTsukkomi()
{
	var subtitle = document.getElementsByClassName("subtitle");
	for (i = 0; i < subtitle.length; i++){
		if (subtitle[i].innerHTML == "吐槽箱"){
			subtitle[i].parentNode.style.display = "none";
		}
	}
}

disableTsukkomi()