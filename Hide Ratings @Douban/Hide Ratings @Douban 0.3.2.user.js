// ==UserScript==
// @name           Hide Ratings @Douban
// @namespace      https://github.com/hentaiPanda
// @namespace      再也不想被豆瓣文青欺骗了
// @description    Hide ratings
// @version        0.3.2
// @include        http://*.douban.com/*
// ==/UserScript==


// page
function disableInfosect()
{
	var infosect = document.getElementById("interest_sectl");
	if (infosect){
		infosect.style.display = "none";
	}
}

// search results page
function disableRatinginfo()
{
    var tags = document.getElementsByTagName("*");
    for (i = 0; i < tags.length; i++)
    {
        if (tags[i].className == "subject-cast")
        {
            tags[i].parentNode.innerHTML = tags[i].innerHTML;
         }
    }
}


function disableStars()
{
    var stars = document.getElementsByTagName("*");
    for (i = 0; i < stars.length; i++)
    {
        if ((stars[i].className.indexOf("star") > -1 && stars[i].className != "starb" && stars[i].className != "rate_stars" && stars[i].className != "j a_stars") || stars[i].className == "rating")
        {
            stars[i].style.display = "none";
         }
    }
}

disableStars()
disableInfosect()
disableRatinginfo()