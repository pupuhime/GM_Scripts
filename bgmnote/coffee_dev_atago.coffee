getVal = ->
  userlink = $('.headerAvatar > a.avatar').attr('href')
  val = GM_getValue(userlink, '')
  return val


updateNote = ->
  val = $('#bgmnote textarea').val()
  userlink = $('.headerAvatar > a.avatar').attr('href')
  GM_setValue(userlink, val)
  hideNote()


confirmHiding = ->
  val = getVal()
  new_val = $('#bgmnote textarea').val()
  if val is new_val
    hideNote()
  else
    answer = confirm('备注似乎已经被更改，是否保存更改？')
    if answer
      updateNote()
    else
      hideNote()


showNote = ->
  # console.log 'This is showNote'
  $('#user_home .user_box').html (i, old) ->
    nvct = '<div id="bgmnote"><textarea name="bgmnote" \
            class="reply" style="width:97.5%; height: 150px;"></textarea>\
            <div id="submitBtnO"><input id="updatenote" \
            class="inputBtn" value="写好了" name="submit" type="submit">\
            &nbsp;&nbsp; <a id="cancelbtn" href="javascript:;">取消</a>\
            </div></div>'
    return nvct + old
  val = getVal()
  $('#bgmnote textarea').val( val )
  $('body').off 'click.show_n'
  $('body').on 'click.textarea', '#bgmnotebtn', confirmHiding
  $('body').on 'click.textarea', '#cancelbtn', hideNote
  $('body').on 'click.textarea', '#updatenote', updateNote


hideNote = ->
  $('body').off 'click.textarea'
  $('#bgmnote').remove()
  $('body').on 'click.show_n', '#bgmnotebtn', showNote


addBtn = ->
  rr = $('#headerProfile div.rr')
  new_btn = '<a href="javascript:;" class="chiiBtn" id="bgmnotebtn">\
             <span>备注</span></a>'
  rr.html(rr.html() + new_btn)
  $('body').on 'click.show_n', '#bgmnotebtn', showNote


addNotes = ->
  $('a.avatar').each ->
    if this.parentNode.id.indexOf('post_') isnt 0
      return 0
    userlink = this.getAttribute('href')
    note = GM_getValue(userlink, '')
    this.setAttribute('title', note)


# replace '\n' with '<br>'
replaceNlc = (str) ->
  # replace '<p> \n\n \n </p>'
  _str = str.replace(/>[\n\s]*</g, '><')
  new_str = _str.replace(/(>|^)([^<]*)\n([^>]*)(<|$)/g, (s) ->
    s.replace(/\n/g, '<br>'))
  return new_str


# utf-8 to base64
utf8tobase64 = (str) ->
  btoa(unescape(encodeURIComponent(str)))


# base64 to utf-8
base64toutf8 = (str) ->
  decodeURIComponent(escape(atob(str)))


exportData = ->
  pairs = []
  for i in GM_listValues()
    value = GM_getValue(i)
    continue if !value.trim()
    pairs.push( [utf8tobase64(i), utf8tobase64(value)].join(':') )
  b64str = pairs.join(';')
  console.log b64str
  GM_setClipboard(b64str)
  alert('已复制到剪贴板')


exportPlainText = ->
  n = 3
  sup = '♀'
  sub = '♂'
  t = n + 1
  supl = Array(t).join(sup) + ' '
  supr = ' ' + Array(t).join(sup)
  subl = Array(t).join(sub) + ' '
  subr = ' ' + Array(t).join(sub)
  pairs = []
  for i in GM_listValues()
    value = GM_getValue(i)
    continue if !value.trim()
    # pairs.push( [ '♀♀♀ ' + i[6..] + ' ♀♀♀', value ].join('\n') )
    pairs.push( [ supl + i[6..] + supr,
                  value,
                  subl + i[6..] + subr].join('\n') )
  plain_text = pairs.join('\n\n')
  console.log plain_text
  GM_setClipboard(plain_text)
  alert('已复制到剪贴板')


importData = (b64str) ->
  pairs = b64str.split(';')
  for i in pairs
    pair = i.split(':')
    try
      key = base64toutf8(pair[0])
      value = base64toutf8(pair[1])
    catch error
      console.log error
      continue
    GM_setValue(key, value)


# format a number to 2 digits
formatNum = (n) ->
  if n < 10
    return "0" + n
  return "" + n


getTm = ->
  day = new Date()
  y = day.getFullYear()
  m = formatNum( day.getMonth() + 1 )
  d = formatNum( day.getDate() )
  return "" + y + m + d


saveFile = ->
  pairs = []
  for key in GM_listValues()
    value = GM_getValue(key)
    continue unless value.trim()
    pairs.push([key, value])
  text = JSON.stringify(pairs)
  blob = new Blob([data], {type: "text/plain;charset=utf-8"})
  day = getTm()
  saveAs(blob, "bgmnote_" + day + ".txt")



readFile = (evt) ->
  # unless window.File and window.FileReader and window.FileList and window.blob
  #   alert("浏览器不支持")
  #   return false
  unless window.File and window.FileReader and window.FileList
    alert("浏览器不支持")
    return false
  file = evt.target.files[0]
  reader = new FileReader()
  reader.onload = (e) ->
    console.log typeof e.target.result
    text = e.target.result.trim()
    pairs = JSON.parse(text)
    for pair in pairs
      GM_setValue(pair[0], pair[1])
  reader.readAsText(file)



appendStyle = ->
  $('head').append('''
    <style type="text/css">
      .ui-helper-hidden {
        display: none;
      }
      .ui-helper-hidden-accessible {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }
      .ui-helper-reset {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        line-height: 1.3;
        text-decoration: none;
        font-size: 100%;
        list-style: none;
      }
      .ui-helper-clearfix:before,
      .ui-helper-clearfix:after {
        content: "";
        display: table;
        border-collapse: collapse;
      }
      .ui-helper-clearfix:after {
        clear: both;
      }
      .ui-helper-clearfix {
        min-height: 0; /* support: IE7 */
      }
      .ui-helper-zfix {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        opacity: 0;
        filter:Alpha(Opacity=0);
      }
      .ui-front {
        z-index: 100;
      }
      .ui-tooltip {
        padding: 8px;
        position: absolute;
        z-index: 9999;
        max-width: 500px;
        -webkit-box-shadow: 0 0 5px #aaa;
        box-shadow: 0 0 5px #aaa;
      }
      body .ui-tooltip {
        border-width: 2px;
      }
    </style>''')


main = ->
  if location.href.indexOf('user') > 0
    addBtn()
    # GM_registerMenuCommand('导出注释', exportData)
    GM_registerMenuCommand('导出注释', exportPlainText)
  else
    appendStyle()
    addNotes()
    $('a.avatar').tooltip(
      track: true,
      items: '[title]',
      content: ->
        return replaceNlc(this.title)
    )


main()