// ==UserScript==
// @name           Read Books @Bangumi
// @namespace      https://github.com/hentaiPanda
// @description    人人都有一颗成为文学少女的心
// @version        0.1.1
// @include        http://bangumi.tv/subject/*
// @include        http://bgm.tv/subject/*
// @include        http://chii.in/subject/*
// ==/UserScript==

//おっぱいちょうだい！！
//おっぱい大好き！！


function getBookName()
{
    var bookname;
    var booktype;
    var name = getFirstChild(document.getElementsByClassName('nameSingle')[0]);
    if (! name)
    {
        return false;
    }
    if (name.getAttribute('title') == '')
    {
        bookname = name.textContent;
    }
    else
    {
        bookname = name.getAttribute('title');
    }
    booktype = getNextSibling(name).innerHTML;
    if (booktype != "漫画" && booktype != "小说")
    {
        return false;
    }
    return [bookname, booktype];
}


function addReadingLink()
{
    var hlink = [];
	var ratingscore = document.getElementsByClassName("global_rating")[0];
	var bookinfo = getBookName();
    if (! ratingscore || ! bookinfo)
    {
        return false;
    }
    //alert(bookinfo);
    if (bookinfo[1] == "小说")
    {
	    hlink[0] = "<a href=\"http://s.sfacg.com/?Key=" + bookinfo[0] +"&S=1&SS=0\" target=\"_BLANK\">跳转至『SF』在线阅读</a>";
        hlink[1] = "<a href=\"http://lknovel.lightnovel.cn/main/booklist/" + bookinfo[0] +".html\" target=\"_BLANK\">跳转至『轻之国度』在线阅读</a>";
        hlink[2] = "<a href=\"http://cn.bing.com/search?q=" + bookinfo[0] + "+" + bookinfo[1] + "\" target=\"_BLANK\">跳转至BING进行搜索</a>";
        hlink[3] = "<a href=\"https://www.google.com/webhp?hl=zh-CN#hl=zh-CN&newwindow=1&q=" + bookinfo[0] + "+" + bookinfo[1] + "\" target=\"_BLANK\">跳转至GOOGLE进行搜索</a>";
	    ratingscore.parentNode.innerHTML = hlink[0] + "<br />" + hlink[1] + "<br /><br />" + hlink[2] + "<br />" + hlink[3];
	}
	else (bookinfo[1] == "漫画")
	{
	    //ratingscore[0].parentNode.style.display = "none";
	    hlink[0] = "<a href=\"http://www.kkkmh.com/search.php?keyword=" + bookinfo[0] +"&t=c\" target=\"_BLANK\">跳转至『看漫画』在线阅读</a>";
        hlink[1] = "<a href=\"http://manhua.dmzj.com/tags/search.shtml?s=" + bookinfo[0] +"\" target=\"_BLANK\">跳转至『动漫之家』在线阅读</a>";
	    hlink[2] = "<a href=\"http://cn.bing.com/search?q=" + bookinfo[0] + "+" + bookinfo[1] + "\" target=\"_BLANK\">跳转至BING进行搜索</a>";
        hlink[3] = "<a href=\"https://www.google.com/webhp?hl=zh-CN#hl=zh-CN&newwindow=1&q=" + bookinfo[0] + "+" + bookinfo[1] + "\" target=\"_BLANK\">跳转至GOOGLE进行搜索</a>";
	    ratingscore.parentNode.innerHTML = hlink[0] + "<br />" + hlink[1] + "<br /><br />" + hlink[2] + "<br />" + hlink[3];
	}
}


function getFirstChild(node) {
  var fc = node.firstChild;
  while (fc != null && fc.nodeType != 1) {
    fc = fc.nextSibling;
  }
  return fc;
}


function getNextSibling(node) {
  var ns = node.nextSibling;
  while (ns != null && ns.nodeType != 1) {
    ns = ns.nextSibling;
  }
  return ns;
}


addReadingLink();