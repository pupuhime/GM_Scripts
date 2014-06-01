// ==UserScript==
// @name           ReTsu
// @description    回复吐槽箱
// @version        4.6.1.11
// @include        http://bangumi.tv/subject/*
// @include        http://bgm.tv/subject/*
// @include        http://chii.in/subject/*
// ==/UserScript==


function injectFunc(func) {
  var script = document.createElement('script');
  script.appendChild(document.createTextNode(func));
  document.body.appendChild(script);
}


function getPreviousSibling(node) {
  var ps = node.previousSibling;
  while (ps != null && ps.nodeType != 1) {
    ps = ps.previousSibling;
  }
  return ps;
}


function getLastChild(node) {
  var lc = node.lastChild;
  while (lc != null && lc.nodeType != 1) {
    lc = lc.previousSibling;
  }
  return lc;
}


function getFirstChild(node) {
  var fc = node.firstChild;
  while (fc != null && fc.nodeType != 1) {
    fc = fc.nextSibling;
  }
  return fc;
}


function getNextTextSibling(node) {
  var nts = node.nextSibling;
  while (nts != null && nts.nodeType != 3) {
    nts = nts.nextSibling;
  }
  return nts;
}


function openTextarea(node, id, nickname, rooturl) {
  var tmp;
  var panel;
  //信息标题
  var title
  //条目标题
  var name;
  //引用的吐槽
  var quotation;
  //预输入的引用文 (兼用来电波提醒对方)
  var formtext;
  var formhash;
  var url = rooturl + '/topic/new';
  var lastelem = getLastChild(node.parentNode);
  panel = document.getElementById('badgeUserPanel');
  if (! panel) {
    return false;
  }
  formhash = getLastChild(getLastChild(panel)).href.split('/')[4];
  //得到中文名
  name = getFirstChild(document.getElementsByClassName('nameSingle')[0]);
  if (name.getAttribute('title') == '') {
    name = name.textContent;
  }
  else {
    name = name.getAttribute('title');
  }
  quotation =  getLastChild(node.parentNode).innerHTML;
  formtext = '\n\n\n\n\n\n\n\n\n\n\n\n[quote]引用自 ' + name + ' 吐槽箱\n[b]@'
           + id + '[/b] 说: \n' + quotation + '[/quote]';
  title = '[回复] ' + nickname + ':  ' + quotation;
  if (title.length > 42) {
    title = title.slice(0, 42) + '...';
  }
  switchForm('aeka');
  tmp = '<div id="aeka"><form id="ryoukonewTopicForm" name="new_comment" \
        method="post" action="' + url + '">'
      + '<input name="formhash" value="' + formhash + '" type="hidden">'
      + '<input id="ryoukotitle" name="title" class="inputtext" type="hidden" \
        value="' + title + '"/>'
      + '<textarea name="content" id="ryoukocontent" cols="45" rows="7" \
        class="reply" style="width: 480px; height: 140px; overflow: hidden;">\
        </textarea>'
      + '<input class="inputBtn" value="加上去" name="submit" type="submit" /> \
        or <a class="l" onclick="switchForm(\'aeka\');" href="javascript:;">取消\
        </a></form></div>';
  lastelem.outerHTML += tmp;
  tmp = document.getElementById('ryoukocontent');
  tmp.value = formtext;
  tmp.focus();
}


function switchForm(id) {
  var reply = document.getElementById(id);
  if (reply) {
    reply.outerHTML = '';
  }
}


function trim(str) {
  var lst = str.split('');
  var last = lst.pop();
  while (last == '#' || last == ';') {
    last = lst.pop();
  }
  lst.push(last);
  return lst.join('');
}


function addReplyBtn(url) {
  var i;
  var id;
  var nickname;
  var timestamp = document.getElementsByClassName('grey');
  for (i = 0; i < timestamp.length; i++) {
    if (timestamp[i].parentNode.className == 'text') {
      id = getPreviousSibling(timestamp[i]).href.split('/')[4];
      nickname = getPreviousSibling(timestamp[i]).innerHTML;
      timestamp[i].outerHTML += '<a href="javascript:" \
                                onclick="javascript:openTextarea(this, \''
                              + id + '\', \'' + nickname + '\', \'' + url
                              + '\')" class="tip_i icons_cmt">回复</a>';
    }
  }
}




function addStyle(css){
  var style;
  var head = document.getElementsByTagName('head')[0];
  if (! head) {
    return false;
  }
  style = document.createElement("style");
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style); 
}



function main() {
  var img;
  var url = location.href.split('/');
  if (url.length == 6 && url[5].indexOf('comments') == 0) {
    url.pop();
    url = url.join('/');
  }
  else if (url.length == 5) {
    url = trim(location.href);
  }
  else {
    return false;
  }
  injectFunc(getPreviousSibling);
  injectFunc(getFirstChild);
  injectFunc(getLastChild);
  injectFunc(openTextarea);
  injectFunc(trim);
  injectFunc(switchForm);
  addReplyBtn(url);
  img = '.text_main_odd {background:url('
      + "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiYAAAPoCAYAAADq"
      + "WzU2AAAACXBIWXMAAArwAAAK8AFCrDSYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIH"
      + "Byb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBAS"
      + "QMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vO"
      + "ec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADw"
      + "A3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAM"
      + "gYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQC"
      + "QLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAID"
      + "gCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyx"
      + "QmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwby"
      + "I+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5"
      + "i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrc"
      + "Cjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKR"
      + "RCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5"
      + "EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSs"
      + "wA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMT"
      + "gN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg"
      + "6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QL"
      + "moHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyH"
      + "RWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWE"
      + "OoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+T"
      + "SCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5"
      + "BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWklt"
      + "oHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+"
      + "mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYq"
      + "fBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVb"
      + "upNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD"
      + "6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc"
      + "57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6"
      + "UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/"
      + "DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxr"
      + "PGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jY"
      + "WlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwyb"
      + "OpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHB"
      + "Id1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22n"
      + "iqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4n"
      + "HM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7G"
      + "PgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGo"
      + "GzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0V"
      + "Whv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUb"
      + "RTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGX"
      + "EnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OI"
      + "WYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D"
      + "+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KL"
      + "dPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9"
      + "SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8N"
      + "J9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9q"
      + "l9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0"
      + "q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqd"
      + "f13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7"
      + "q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3"
      + "tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+"
      + "iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8"
      + "mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1"
      + "tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh2"
      + "9u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9"
      + "OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j8"
      + "2PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UP"
      + "PR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDp"
      + "AAB1MAAA6mAAADqYAAAXb5JfxUYAAA+/SURBVHja7N1NSyNZFIDhk1hREoP50E"
      + "X5hS504XL6//+QbgQVhEDQKpSIwRCsWQw2MrbpKruLLmeeZ1WLGwJ39XJy66ZV"
      + "FEURKxRFES9LXj8DALyn1WpFq9V68/wzSZkoeYmR5XIZWZZFnufx9PRU+ksAgP"
      + "++oihiY2MjxuNxbG9vR5Ikb2Llp0GzamLyOkzm83lcXV1FkiSxu7sbW1tbwgQA"
      + "+O75+Tnu7+9jOp3GcrmM4+Pj6Ha73ycmvxQmr6NkuVzG+fl5jMfjSNM02u223Q"
      + "cA3g2UyWQSd3d3cXp6GkmSlI6TlYXxEiZZlkWn04m9vT1RAgCsjot2Ow4ODqLT"
      + "6USWZZXOqJaqjDzPI01TOw0AlLazsxN5nleLmjKLFotF9Pt9OwwAlNbv92OxWP"
      + "z+MImIWFtbs8MAQGnr6+uVP5OUXej6EgCgiiL+Oa96eXkZo9EohsPhm1eIPxwm"
      + "AABV/fXlS+RZFrPZLKbTafR6vRgOhzEYDH74Qo0wAQBqNRwOYzQaRUTE7e1tXF"
      + "xcxGAwiJOTE2ECAPwZj4+PMZvN4uzsLHq93g/XVAgTh0wAgI9HyfX1dRweHr4b"
      + "JRXDBACguoeHh5hMJnF0dBSbm5sr17rGFQCozXw+j5ubm9jf3185KREmAECtWh"
      + "Hx7evXSNO09EWt5e8xsb8AwAd0u93Sa01MAIDGKH/41cgEAKiZiQkAIEwAAIQJ"
      + "ACBMAACECQDwabjHBABoDBMTAECYAAAIEwCgsSrc/OqUCQBQLxMTAECYAAAIEw"
      + "CgsdxjAgA0hokJACBMAACECQAgTAAAhAkA8GlUuPnVZgEA9TIxAQAawz0mAEBj"
      + "mJgAAMIEAECYAACNVf6tHKdMAICamZgAAMIEAODfXLAGAHy+MNElAEDd/JQDAA"
      + "gTAABhAgAIEwAAYQIACBMAAGECAAgTAABhAgAIEwAAYQIACBMAAGECAPxvlP93"
      + "4cL/CwMA9TIxAQCECQCAMAEAhAkAgDABAIQJAIAwAQCECQCAMAEAhAkAgDABAI"
      + "QJAIAwAQCECQCAMAEAhAkAgDABABAmAEDTJGUXFkVhtwCAWpmYAADCBABAmAAA"
      + "wgQAQJgAAMIEAECYAADCBABAmAAAwgQAQJgAAMIEAECYAADCBABAmAAAwgQAQJ"
      + "gAAAgTAECYAAAIEwBAmAAACBMAQJgAAAgTAECYAAAIEwBAmAAACBMAQJgAAAgT"
      + "AECYAAAIEwBAmAAACBMAAGECAAgTAABhAgAIEwAAYQIACBMAAGECAAgTAABhAg"
      + "AIEwAAYQIACBMAAGECAAgTAABhAgAgTAAAYQIAIEwAAGECACBMAABhAgAgTAAA"
      + "YQIAIEwAAGECACBMAABhAgAgTAAAYQIAIEwAAGECACBMAACECQAgTAAAhAkAIE"
      + "wAAIQJACBMAACECQAgTAAAhAkAIEwAAIQJACBMAACECQAgTAAAhAkAgDABAIQJ"
      + "AIAwAQCECQCAMAEAhAkAgDABAIQJAIAwAQCECQCAMAEAhAkAgDABAIQJAIAwAQ"
      + "CECQCAMAEAECYAgDABABAmAIAwAQAQJgCAMAEAECYAgDABABAmAIAwAQAQJgCA"
      + "MAEAECYAgDABABAmAADCBAAQJgAAwgQAECYAAMIEABAmAADCBAAQJgAAwgQAEC"
      + "YAAMIEABAmAADCBAAQJgAAwgQAECYAAMIEAECYAADCBABAmAAAwgQAQJgAAMIE"
      + "AECYAADCBABAmAAAwgQAQJgAAMIEAECYAADCBABAmAAAwsQWAADCBABAmAAAwg"
      + "QAQJgAAMIEAECYAADCBABAmAAAwgQAQJgAAMIEAECYAADCBABAmAAAwgQAQJgA"
      + "AAgTAECYAAAIEwBAmAAACBMAQJgAAAgTAECYAAAIEwBAmAAACBMAQJgAAAgTAE"
      + "CYAAAIEwBAmAAACBMAAGECAAgTAABhAgAIEwAAYQIACBMAAGECAAgTAABhAgAI"
      + "EwAAYQIACBMAAGECAAgTAABhAgAgTAAAYQIAIEwAAGECACBMAABhAgAgTAAAYQ"
      + "IAIEwAAGECACBMAABhAgAgTAAAYQIAIEwAAGECACBMAACECQAgTAAAhAkAIEwA"
      + "AIQJACBMAACECQAgTAAAhAkAIEwAAIQJACBMAACECQAgTAAAhAkAgDABAIQJAI"
      + "AwAQCECQCAMAEAhAkAgDABAIQJAIAwAQCECQCAMAEAhAkAgDABAIQJAIAwAQCE"
      + "CQCAMAEAECYAgDABABAmAIAwAQAQJgCAMAEAECYAgDABABAmAIAwAQAQJgCAMA"
      + "EAECYAgDABABAmAADCBAAQJgAAwgQAECYAAMIEABAmAADCBAAQJgAAwgQAECYA"
      + "AMIEABAmAADCBAAQJgAAwgQAECYAAMIEAECYAADCBABAmAAAwgQAQJgAAMIEAE"
      + "CYAADCBABAmAAAwgQAQJgAAMIEAECYAADCBABAmAAAwgQAQJgAAAgTAECYAAAI"
      + "EwBAmAAACBMAQJgAAAgTAECYAAAIEwBAmAAACBMAQJgAAAgTAECYAAAIEwAAYQ"
      + "IACBMAAGECAAgTAABhAgAIEwAAYQIACBMAAGECAAgTAABhAgAIEwAAYQIACBMA"
      + "AGECAAgTAABhAgAgTAAAYQIAIEwAAGECACBMAABhAgAgTAAAYQIAIEwAAGECAC"
      + "BMAABhAgAgTAAAYQIAIEwAAIQJACBMAACECQAgTAAAhAkAIEwAAIQJACBMAACE"
      + "CQAgTAAAhAkAIEwAAIQJACBMAACECQAgTAAAhAkAgDABAIQJAIAwAQCECQCAMA"
      + "EAhAkAgDABAIQJAIAwAQCECQCAMAEAhAkAgDABAIQJAIAwAQAQJgCAMAEAECYA"
      + "gDABABAmAIAwAQAQJgCAMAEAECYAgDABABAmAIAwAQAQJgCAMAEAECYAgDABAB"
      + "AmAADCBAAQJgAAwgQAECYAAMIEABAmAADCBAAQJgAAwgQAECYAAMIEABAmAADC"
      + "BAAQJgAAwgQAECa2AAAQJgAAwgQAECYAAMIEABAmAADCBAAQJgAAwgQAECYAAM"
      + "IEABAmAADCBAAQJgAAwgQAECYAAMIEAECYAADCBABAmAAAwgQAQJgAAMIEAECY"
      + "AADCBABAmAAAwgQAQJgAAMIEAECYAADCBABAmAAAwgQAQJgAAAgTAECYAAAIEw"
      + "BAmAAACBMAQJgAAAgTAECYAAAIEwBAmAAACBMAQJgAAAgTAECYAAAIEwAAYQIA"
      + "CBMAAGECAAgTAABhAgAIEwAAYQIACBMAAGECAAgTAABhAgAIEwAAYQIACBMAAG"
      + "ECAAgTAABhAgAgTAAAYQIAIEwAAGECACBMAABhAgAgTAAAYQIAIEwAAGECACBM"
      + "AABhAgAgTAAAYQIAIEwAAIQJACBMAACECQAgTAAAhAkAIEwAAIQJACBMAACECQ"
      + "AgTAAAhAkAIEwAAIQJACBMAACECQAgTAAAhAkAgDABAIQJAIAwAQCECQCAMAEA"
      + "hAkAgDABAIQJAIAwAQCECQCAMAEAhAkAgDABAIQJAIAwAQAQJgCAMAEAECYAgD"
      + "ABABAmAIAwAQAQJgCAMAEAECYAgDABABAmAIAwAQAQJgCAMAEAECYAgDABABAm"
      + "AADCBAAQJgAAwgQAECYAAMIEABAmAADCBAAQJgAAwgQAECYAAMIEABAmAADCBA"
      + "AQJgAAwgQAECYAAMIEAECYAADCBABAmAAAwgQAQJgAAMIEAECYAADCBABAmAAA"
      + "wgQAQJgAAMIEAECYAADCBABAmAAACBMAQJgAAAgTAECYAAAIEwBAmAAACBMAQJ"
      + "gAAAgTAECYAAAIEwBAmAAACBMAQJgAAAgTAECYAAAIEwAAYQIACBMAAGECAAgT"
      + "AABhAgAIEwAAYQIACBMAAGECAAgTAABhAgAIEwAAYQIACBMAAGECACBMAABhAg"
      + "AgTAAAYQIAIEwAAGECACBMAABhAgAgTAAAYQIAIEwAAGECACBMAABhAgAgTAAA"
      + "YQIAIEwAAIQJACBMAACECQAgTAAAhAkAIEwAAIQJACBMAACECQAgTAAAhAkAIE"
      + "wAAIQJACBMAACECQCAMAEAhAkAgDABAIQJAIAwAQCECQCAMAEAhAkAgDABAIQJ"
      + "AIAwAQCECQCAMAEAhAkAgDABAIQJAIAwAQAQJgCAMAEAECYAgDABABAmAIAwAQ"
      + "AQJgCAMAEAECYAgDABABAmAIAwAQAQJgCAMAEAECYAgDCxBQCAMAEAECYAgDAB"
      + "ABAmAIAwAQAQJgCAMAEAECYAgDABABAmAIAwAQAQJgCAMAEAECYAgDABABAmAA"
      + "DCBAAQJgAAwgQAECYAAMIEABAmAADCBAAQJgAAwgQAECYAAMIEABAmAADCBAAQ"
      + "JgAAwgQAECYAAMIEAECYAADCBABAmAAAwgQAQJgAAMIEAECYAADCBABAmAAAwg"
      + "QAQJgAAMIEAECYAADCBABAmAAACBMAQJgAAAgTAECYAAAIEwBAmAAACBMAQJgA"
      + "AAgTAECYAAAIEwBAmAAACBMAQJgAAAgTAECYAAAIEwAAYQIACBMAAGECAAgTAA"
      + "BhAgAIEwAAYQIACBMAAGECAAgTAABhAgAIEwAAYQIACBMAAGECACBMAABhAgAg"
      + "TAAAYQIAIEwAAGECACBMAABhAgAgTAAAYQIAIEwAAGECACBMAABhAgAgTAAAYQ"
      + "IAIEwAAIQJACBMAACECQAgTAAAhAkAIEwAAIQJACBMAACECQAgTAAAhAkAIEwA"
      + "AIQJACBMAACECQCAMAEAhAkAgDABAIQJAIAwAQCECQCAMAEAhAkAgDABAIQJAI"
      + "AwAQCECQCAMAEAhAkAgDABAIQJAIAwAQAQJgCAMAEAECYAgDABABAmAIAwAQAQ"
      + "JgCAMAEAECYAgDABABAmAIAwAQAQJgCAMAEAECYAgDABABAmAADCBAAQJgAAwg"
      + "QAECYAAMIEABAmAADCBAAQJgAAwgQAECYAAMIEABAmAADCBAAQJgAAwgQAQJgA"
      + "AMIEAECYAADCBABAmAAAwgQAQJgAAMIEAECYAADCBABAmAAAwgQAQJgAAMIEAE"
      + "CYAADCBABAmAAACBMAQJgAAAgTAECYAAAIEwBAmAAACBMAQJgAAAgTAECYAAAI"
      + "EwBAmAAACBMAQJgAAAgTAABhAgAIEwAAYQIACBMAAGECAAgTAABhAgAIEwAAYQ"
      + "IACBMAAGECAAgTAABhAgAIEwAAYQIACBMAAGECACBMAABhAgAgTAAAYQIAIEwA"
      + "AGECACBMAABhAgAgTAAAYQIAIEwAAGECACBMAABhAgAgTAAAhAkAIEwAAIQJAC"
      + "BMAACECQAgTAAAhAkAIEwAAIQJACBMAACECQAgTAAAhAkAIEwAAIQJACBMAACE"
      + "CQCAMAEAhAkAgDABAIQJAIAwAQCECQCAMAEAhAkAgDABAIQJAIAwAQCECQCAMA"
      + "EAhAkAwJ/y9wB/AM/NQ02t+gAAAABJRU5ErkJggg=="
      + ') no-repeat ! important; }';
  addStyle(img);
}




main();