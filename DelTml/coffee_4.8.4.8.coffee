delOrNot = ->
  flag = ! GM_getValue('deltml', false)
  GM_setValue('deltml', flag)
  if flag
    alert('现在开始自动删除时间线')
    console.log('现在开始自动删除时间线')
    delTml()
  else
    alert('自动删除时间线已终止')
    console.log('自动删除时间线已终止')


delhref = (href, i) ->
  if href.length > i
    console.log href[i]
    $.get(href[i], -> delhref(href, i+1))
      .fail(-> delhref(href, i+1))
  else
    location.href = location.href


delTml = ->
  flag = GM_getValue('deltml', false)
  if !flag
    return 0
  delboxes = $("a.tml_del")
  # console.log(delboxes.length)
  # if delboxes.length is 0
  #   gotoNextPage()
  #   return 0
  if delboxes.length > 0
    count = []
    i = 0
    delboxes.each ->
      href = this.getAttribute("href")
      count.push href
    console.log(count.length)
    delhref(count, i)
    # location.href = location.href
  else
    gotoNextPage()


gotoNextPage = ->
  pages = $("#tmlPager > .page_inner > a")
  if pages.length is 1
    url = pages[0]
  else if pages.length is 2
    url = pages[1]
  else
    GM_setValue('deltml', false)
    alert('自动删除结束')
    console.log('自动删除结束')
    location.href = location.href.split('?')[0]
    return 0
  console.log(url)
  location.href = url

main = ->
  flag = GM_getValue('deltml', false)
  if !flag
    GM_registerMenuCommand('删除', delOrNot)
    return 0
  else
    GM_registerMenuCommand('停止', delOrNot)
    delTml()

main()

# delTml()
# GM_registerMenuCommand('删除/停止', delTml)
# GM_registerMenuCommand('删除/停止', delOrNot)