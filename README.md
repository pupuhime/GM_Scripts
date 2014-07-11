GM_Scripts
==========

Greasemonkey脚本存放
20140711 updated readme.md

***********************************************************

说明：
-----------------------------------------------------------
1) Blackumi    
https://greasyfork.org/scripts/1928-blackumi    
bangumi.tv 的用户屏蔽脚本（黑名单功能） 
在对方的用户页面增加一个屏蔽按钮
在网站的设置页面添加批量删除和备份功能，见图

用户界面（不是你自己的）会多一个按钮

![演示](http://i.imgur.com/NAxLFZc.png)    


设置里会多两个选项，如下 

![演示](http://i.imgur.com/jBBdYxJ.png)    

***********************************************************

2) Flood Control @Bangumi    
https://greasyfork.org/scripts/1927-flood-control-bangumi    
bangumi.tv 超展开，如果有超过限定数量的使用默认头像的用户(默认设置为12)， 
自动隐藏当前所有默认头像用户。当设置到0时即超展开始终不显示默认头像用户
此脚本目的是稍微控制一下偶然出现的一些发帖人不更换头像的无脑广告贴    
限定数量可以在greasemonkey / tampermonkey 的菜单里修改    
注：必须在生效界面，即超展开界面下才有这个选项    

![演示](http://i.imgur.com/5Sc90ht.png)    
![演示](http://i.imgur.com/FrOI1v4.png)    

***********************************************************

3) Hide Ratings @Bangumi    
https://greasyfork.org/scripts/1926-hide-ratings-bangumi    
bangumi.tv  隐藏评分信息   

***********************************************************

4) Hide Ratings @Douban    
https://greasyfork.org/scripts/1925-hide-ratings-douban    
douban.com 隐藏评分信息  

***********************************************************

5) Hide Tsukkomi @Bangumi    
https://greasyfork.org/scripts/1924-hide-tsukkomi-bangumi    
bangumi.tv 隐藏吐槽箱   

***********************************************************

6) ReTsu    
https://greasyfork.org/scripts/1922-retsu    
bangumi.tv 吐槽箱快速回复功能    
使用的是相关条目的讨论区功能    
仅快速发出消息，没有直接开贴一样的互动功能    

![演示](http://i.imgur.com/oVi7OQH.png)    

***********************************************************

7) Read Books @Bangumi    
https://greasyfork.org/scripts/1923-read-books-bangumi    
bangumi.tv 在书籍页面右侧提供在线阅读/搜索的外链（把评分区替换掉）  
只是『外链』。有2个站点加2个搜索引擎    

***********************************************************

8) Show Bangumi ID    
https://greasyfork.org/scripts/1920-show-bangumi-id    
bangumi.tv 昵称旁显示id   

![演示](http://i.imgur.com/pyS9A.png)    

***********************************************************

9) DelTml  
bangumi.tv 自动删除时间线  
在用户自己的『时间胶囊』页面生效 （http://bangumi.tv/user/XXXXXXX/timeline）  
（哦对了，我想起来一个问题，因为改名是删不掉的，如果你是改名狂人，最后第一页都是删不掉的改名条目   
那后面就删不掉了，应该可以自动删，暂时不拿自己试验了）  

在Greasemonkey或者Tampermonkey的指令中会出现『删除/停止』字样的按钮，如下图  

![演示](http://i.minus.com/ibfq7bVS7DVjJj.jpg)

![演示](http://i.minus.com/ikdpAGXdwD353.png)

如字面意思，点击一次开始自动删除时间线，直到全部删除为止  
删除过程中若再次点击『删除/停止』，即停止删除    
如果因为页面刷新，『删除/停止』出现按不到的情况   
还有一个备用快捷键『Ctrl + Alt + E』      

***********************************************************

10) ChangeSearch  
使用外部搜索引擎对bangumi站内条目进行搜索（只对『全部』搜索，不对动画、漫画等分类搜索(其实是我不知道怎么设关键字来分类)）   
默认仍然还是bangumi的站内搜索功能，但是提供切换谷歌必应等的选项   
我设定了一些限定关键词，觉得不理想的自己直接改吧    

（有一点注意，不知道是不是地区政策，短时间反复搜索同一个内容会被GOOGLE封住（但你另外开窗口进google搜素没问题）   
必须用先前请求的同一个URL在新窗口打开，正确输入google的校验码     
“先前请求的同一个URL" ，在console里会输出      


![演示](http://i.minus.com/ibpRPUKYNEBVDq.jpg)

![演示](http://i.minus.com/ibcUu9XCu1BFif.jpg)

![演示](http://i.minus.com/iM8074FiMzoNw.jpg)

***********************************************************

11) sixFEetuNder  
bangumi.tv 找出挖坟的人   
只对小组讨论生效，同时顶部会有提示是旧讨论   
(间隔时间按大概六个月算)   

![演示](http://i.imgur.com/1zhROSi.jpg)

![演示](http://i.imgur.com/f3XsFyH.jpg)
