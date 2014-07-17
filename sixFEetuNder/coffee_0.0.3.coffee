getFirstChild = (node) ->
  fc = node.firstChild
  while (fc != null && fc.nodeType != 1)
    fc = fc.nextSibling
  return fc


quickSort = (a) ->
  # legacy code
  # return a if a.length <= 1
  # smaller = []
  # bigger = []
  # for i in [1...a.length]
  #   if a[i] < a[0]
  #     smaller.push a[i]
  #   else
  #     bigger.push a[i]
  # return quickSort(smaller).concat([a[0]], quickSort(bigger))
  # new code
  return a if a.length <= 1
  smaller = []
  bigger = []
  for i in [1...a.length]
    if a[i] < a[0]
      smaller.push a[i]
    else
      bigger.push a[i]
  array = quickSort(smaller)
  big = [a[0]]
  cache = Array::push
  cache.apply( big, quickSort(bigger) )
  cache.apply( array, big )
  return array


getTimeStamp = ->
  posts = {}
  $(".re_info").each ->
    time = $.trim(@textContent).split(" ")
    time = time[2].replace(/-/g, " ") + " " + time[3].replace(/-/g, " ")
    # console.log time
    posts[time] = @
  return posts


findFEN = (interval) ->
  # interval = 15897600000
  # get string of time
  posts = getTimeStamp()
  # console.log "posts", posts
  fener = []
  t = {}
  # parse time
  for k of posts
    # console.log k
    # console.log typeof Date.parse(k).toString()
    num = Date.parse(k)
    # console.log num
    t[num] = k
  # console.log "t", t
  # sort time
  seq = quickSort( (i * 1 for i in Object.keys(t)) )
  # console.log "seq", seq
  # find FEN
  for i in [1...seq.length]
    fener.push( t[ seq[i] ] ) if seq[i] - seq[i-1] >= interval
  # console.log "fener", fener
  if fener.length >= 1
    $("#pageHeader").append('<div style="color:#999;float:left;"
      >这可能是一篇被挖坟的帖子</div>')
  for i in fener
    getFirstChild( getFirstChild( posts[i] ) ).style = "color:black"
    posts[i].style = "background:#F09199;color:black;opacity:0.8;border-radius:5px;"

# interval = 15897600000
# a = "2013 7 1"
# b = "2014 1 3"
# console.log(Date.parse(b) - Date.parse(a) > 0)

# interval = 15897600000

if $("#pageHeader a:first-child").attr("href").indexOf("/group/") is 0
  console.log("group topic")
  findFEN(15897600000)

# findFEN(15897600000)
