getChildren = (node) ->
  result = []
  cn = node.childNodes
  for i in [0...cn.length]
    if cn[i].nodeType isnt 1
      continue
    else
      result.push(cn[i])
  return result


# -- legacy code start --
# --- double list ---
getItems = ->
  items = []
  $('#browserItemList > li > div.inner > h3 > a').each ->
    items.push(this.getAttribute('href'))
  return items

getComments = ->
  comments = []
  $('#browserItemList > li > div.inner').each ->
    children = getChildren(this)
    comment = false
    for i in children
      if i.id and i.id is 'comment_box'
        comment = i.textContent.trim()
        break
    comments.push(comment)
  return comments
# -- legacy code end --


getItemsComments = ->
  items = []
  comments = {}
  $('#browserItemList > li > div.inner').each ->
    children = getChildren(this)
    comment = false
    for i in children
      if i.id and i.id is 'comment_box'
        comment = i.textContent.trim()
        break
    href = $(this).find('h3 > a')[0].getAttribute('href')
    comments[href] = comment
    items.push(href)
  return [items, comments]


createidx = ->
  formhash = ''
  $('#badgeUserPanel > li.row > a').each ->
    href = this.getAttribute('href').split('ogout/')
    formhash = href[1] if href.length > 1
  header = $('#header > h1')[0].textContent.trim()
  detail = $('.line_detail > span')[0].textContent.trim()
  console.log header
  console.log detail
  console.log formhash
  # -- legacy code start --
  # --- double list ---
  # items = getItems()
  # comments = getComments()
  # -- legacy code end --
  [items, comments] = getItemsComments()
  console.log items
  console.log comments
  # return
  postdata = 
    'formhash' : formhash,
    'title' : header,
    'desc' : detail,
    'submit' : '创建目录'
  $.ajax( 
    type: 'POST'
    url: '/index/create'
    data: postdata
    success: (data, textStatus, xhr) ->
      action = $(data).find('#newIndexRelatedForm')[0].getAttribute('action')
      console.log 'action:'
      console.log action
      cloneItems(items, action, formhash, comments)
    error: -> alert('创建目录时出错')
  )


cloneItems = (items, action, formhash, comments) ->
  if items.length > 0
    postdata =
      'formhash' : formhash,
      'add_related' : items[0],
      'submit' : '添加新关联'
    $.ajax( 
      type: 'POST'
      url: action
      data: postdata
      success: (data) ->
        console.log 'Adding ' + items[0] + ' succeed'
        cloneItems(items[1..], action, formhash, comments)
      error: -> alert('复制条目时出错')
    )
  else
    cloneComments(action[...12], formhash, comments)
    console.log 'complete'
    return


modifyComments = (action, formhash, comment) ->
  if comment
    postdata =
      'formhash' : formhash,
      'content' : comment,
      'order' : 0,
      'submit' : '提交'
    $.ajax( 
      type: 'POST'
      url: action
      data: postdata
      success: -> console.log 'Success'
      error: -> alert('添加评价时出错')
    )


cloneComments = (link, formhash, comments) ->
  $.ajax( 
    type: 'GET'
    url: link
    success: (data) ->
      # -- legacy code start --
      # --- double list ---
      # i = 0
      # $(data).find('p.tools > a.thickbox').each ->
      #   action = '/index/related/' + this.id[7..] + '/modify'
      #   modifyComments(action, formhash, comments[i])
      #   i += 1
      # -- legacy code end --
      $(data).find('#browserItemList > li > div.inner').each ->
        html = $(this)
        href = html.find('h3 > a')[0].getAttribute('href')
        modify_id = html.find('p.tools > a.thickbox')[0].id[7..]
        action = '/index/related/' + modify_id + '/modify'
        modifyComments(action, formhash, comments[href])
    error: -> alert('获取目录时出错')
  )


GM_registerMenuCommand('Clone', createidx)