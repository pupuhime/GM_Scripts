getParentNode = (node, level) ->
  i = level - 1
  pn = node.parentNode
  if level is 0
    return node
  while i > 0
    pn = pn.parentNode
    i -= 1
  return pn


addBtn = ->
  $('li.item_list > div.inner > span.row').each ->
    x_btn = '<span class="xlihil"><a href="javascript:;">[X]</a></span>'
    @.innerHTML = @.innerHTML + x_btn
  $('body').on 'click.removeli', '.xlihil', (evt) -> removeItem(evt.target)


removeItem = (node) ->
  item = getParentNode(node, 4)
  GM_setValue(item.id, true)
  item.outerHTML = ''


initItemList = ->
  flag = false
  $('li.item_list').each ->
    if GM_getValue(@.id, false)
      @.outerHTML = ''
      flag = true
  return flag


refreshList = ->
  i = true
  $('li.item_list').each ->
    return if @.style.display
    if i
      @.className = 'line_odd item_list'
    else
      @.className = 'line_even item_list'
    i = not i
    console.log @.id


main = ->
  flag = initItemList()
  refreshList() if flag
  addBtn()


main()