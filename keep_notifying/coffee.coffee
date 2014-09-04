backup = ->
  if $('#home_notify').length > 0
    # haruna = $('#ukagaka_shell')
    # haruna_dis = haruna.css('display')
    # haruna.css('display', 'none')
    $.ajax
      type: 'GET'
      url: '/notify'
      success: (res) ->
        nv_items = $(res).find('.tml_item').removeClass('odd even')
        old_items = GM_getValue('notify', [])
        items = []
        nv_items
        .filter ->
          html = @.outerHTML
          ! (html in old_items)
        .map ->
          items.push @.outerHTML
        # -- -- #
        items = items.concat(old_items)
        GM_setValue('notify', items)
        console.log 'success'
        # haruna.css('display', haruna_dis)
      error: ->
        console.log 'error'


show = ->
  items = GM_getValue('notify',[]).join('\n')
  # console.log 'items', items
  x = '<div id="notifyeye">
       <div id="ntf_window">
       <div id="ntf_title">
       <div id="ntf_ajaxWindowTitle">电波记录</div>
       <div id="ntf_closeWindowButton">Close</div>
       </div>
       <div id="ntf_items">
       <a href="javascript:;" id="ntf_del_all" class="ignore_all">清空记录</a>' +
       items + '</div></div></div>'
  $('body').append(x)
  $('#notifyeye a.nt_del').remove()
  $('#notifyeye .tml_item:even').addClass('odd')
  $('#notifyeye .tml_item:odd').addClass('even')
  css = '''
    <style type="text/css">
      #ntf_window{
        top:50%;
        left:50%;
        margin-left: -290px;
        margin-top: -170px;
        width: 580px;
        height: 390px;
        display: block;
        position:fixed;
        background:#fff;
        z-index:102;
        color:#000;
        text-align:left;
        box-shadow:0px 0 15px #aaa;
        border-radius:5px;
      }
      #ntf_title{
        background:#e8e8e8 url(/img/bangumi/bangumi_ui_1.png) \
                   repeat-x scroll 0 -113px;
        height:30px;
        color:#FFF;
        position:relative;
        border-radius:5px 5px 0 0
      }
      #ntf_ajaxWindowTitle{
        float:left;
        padding:0 15px;
        line-height:30px;
        font-size:13px;
      }
      #ntf_closeWindowButton{
        color:#FFF;
        text-indent: -9999px;
        background:url('/img/ico/closebox.png');
        width:30px;
        height:30px;
        cursor:pointer;
        position:absolute;
        top:-12px;
        right: -12px;
      }
      #ntf_items{
        height: 355px;
        overflow: auto;
      }
      div#notifyeye{
        margin:0;
      }
      div#notifyeye div.tml_item{
        position:relative;
        padding:5px 0 5px 5px;
      }
      div#notifyeye div.tml_item a.nt_del{
        top:5px;
      }
      div#notifyeye div.inner{
        margin-left:45px;
      }
      div#notifyeye div.odd{
        border-bottom:1px dotted #E0E0E0;
      }
      div#notifyeye div.even{
        background-color:#F9F9F9;
        border-bottom:1px dotted #E0E0E0;
      }
      div#notifyeye a.ignore_all{
        display:block;
        text-align:center;
        background:#EEE;
        color:#555;
        width:100%;
        padding:0 0 2px 0;
      }
      div#notifyeye a.ignore_all:hover{
        background:#D51007;
        color:#FFF;
      }
      div#notifyeye a.nt_link{
        color:#1175A8;
        border:0;
        text-decoration:none;
      }
      div#notifyeye a.nt_link:hover{
        color:#0187C5;
        text-decoration:underline;
      }
      div#notifyeye div.frd_connect{
        margin: 0 7px 0 0;
      }
      div#notifyeye a.btn_link{
        background:#51B5E8;
        color:#FFF;
        padding:1px 8px;
        font-size:12px;
        border-radius:5px;
        line-height:12px;
      }
      div#notifyeye a.btn_link.ignore{
        background:#888;
      }
      div#notifyeye a:hover.btn_link{
        background:#000;
      }
    '''
  $('head').append(css)
  bindCloseToBtn()
  $('#ntf_del_all').click -> rmNtf() if empty()


empty = ->
  answer = confirm('清空所有电波记录吗？')
  if answer
    # GM_setValue('notify', '')
    GM_deleteValue('notify')
    return true
  else
    return false


rmNtf = ->
  $('body').off('.closeNTFWin')
  ntfeye = $('#notifyeye')
  ntfeye.fadeOut ->
    ntfeye.remove()
    bindShowToBtn()


bindShowToBtn = ->
  $('#openNTFWin').on 'click', ->
    console.log 'H H H'
    $('#openNTFWin').off()
    show()


bindCloseToBtn = ->
  $('body').on 'click.closeNTFWin', '#ntf_closeWindowButton', ->
    console.log 'ntf_closeWindowButton'
    rmNtf()
  $('body').on 'keydown.closeNTFWin', (evt) ->
    if evt.which is 27
      console.log 'ESC down'
      rmNtf()


main = ->
  if (location.pathname is '/notify') and (self is top)
    # show()
    # pass
  else
    # $('#dock li').eq(1).prepend('<a href="/notify">提醒</a> | ')
    $('#dock li').eq(1).prepend('<a id="openNTFWin" \
                                 href="javascript:;">提醒</a> | ')
    bindShowToBtn()
    backup()
    snt = setInterval ( -> backup() ), 20000


main()

# GM_registerMenuCommand('notify', show);
# GM_registerMenuCommand('empty', empty);