getVal = ->
  userlink = $('.user_box > a.avatar').attr('href')
  val = GM_getValue(userlink, '')
  return val


updateNote = ->
  val = $('#bgmnote textarea').val()
  userlink = $('.user_box > a.avatar').attr('href')
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
  console.log 'This is showNote'
  # -- insert the textarea elem as the last child of the .inner --
  # ui = $('#user_home .inner')
  # ui.html(ui.html() + '''<div id="bgmnote"><textarea name="bgmnote" \
  #         class="reply" style="width:97.5%; height: 150px;"></textarea>\
  #         <div id="submitBtnO"><input id="updatenote" \
  #         class="inputBtn" value="写好了" name="submit" type="submit">\
  #         &nbsp;&nbsp; <a id="cancelbtn" href="javascript:;">取消</a>\
  #         </div></div>''')
  ui = $('#user_home .inner > p.tip').last()
  ui.after('''<div id="bgmnote"><textarea name="bgmnote" \
          class="reply" style="width:97.5%; height: 150px;"></textarea>\
          <div id="submitBtnO"><input id="updatenote" \
          class="inputBtn" value="写好了" name="submit" type="submit">\
          &nbsp;&nbsp; <a id="cancelbtn" href="javascript:;">取消</a>\
          </div></div>''')
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
  rr = $('div.rr')
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
  new_str = str.replace(/(>|^)([^<]*)\n([^>]*)(<|$)/g, (s) ->
    s.replace(/\n/g, '<br>'))
  return new_str


appendStyle = ->
  # $('head').append(
  #   '''<link rel="stylesheet" type="text/css" href=\  
  #   "http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">''')
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