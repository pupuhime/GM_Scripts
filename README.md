GM_Scripts
==========

Greasemonkey脚本存放

以下
默认头像用户 = 默头


说明格式：
-----------------------------------------------------------
x) 脚本名
Greasyfork链接
site: 站址
脚本说明


***********************************************************

说明：
-----------------------------------------------------------
1) Blackumi
https://greasyfork.org/scripts/1928-blackumi
site: bangumi.tv
bangumi.tv 的用户屏蔽脚本
因为我一直是以不加好友的条件测试的
最后才发现加了好友某些东西会改变，修改过后可能还有一些没
发觉的可能存在的问题
0.  在对方用户主页屏蔽/解除屏蔽
1.  批量删除、导入导出在设置里面
2.  对方在topic里面提到你的话，电波提醒会有，打开应该会自动忽略，不过会“等待”一下
3.  站内信提醒依然会有，但是进入信箱自动删除所有 被屏蔽者 的信件，包括以前的。
    如果进入发件箱，你以前向对方发送的也会自动删除。自己做好备份工作。
4.  超展开不屏蔽默认头像，抓不到用户名
5.  所有引用由于是引用昵称，不屏蔽
6.  一般讨论，母帖被屏蔽，子帖一起屏蔽(e.g. 3#,3-1#, 3-2#…  23#, 23-1#, 23-2#…)
    理由：一、方便省力；二、子帖不消失会很丑；三、提及人物的相关性
    但是3-1# 3-2#隐藏 不影响 3#
7.  magi界面出现后闪一下——即你会看到对方的机会可能会更大一点
8.  [待测试]timeline上面的回复打开后也不能屏蔽
    timeline不检测时间，当天只有一条加好友信息但是被屏蔽了的话会多一个空的日期出来
9.  dollars只能屏蔽有头像的，默认头像不行，@引用的也不行。
10. 如果你的机器比较旧，在浏览TIMELINE和DOLLARS时
    可能风扇声音会大一点（也可能是我测试机器的错觉），其他没什么（没有最好）
    具体页面是
    http://bangumi.tv/user/USERID/timeline
    http://bangumi.tv/timeline
    http://bangumi.tv/dollars

设置里会多两个选项，如下
![演示](http://i.imgur.com/NAxLFZc.png)
![演示](http://i.imgur.com/jBBdYxJ.png)

***********************************************************

2) Flood Control @Bangumi
https://greasyfork.org/scripts/1927-flood-control-bangumi
site: bangumi.tv
作为Blackumi的补充，在超展开，如果有超过限定数量的默头(默认设置为12)，
自动隐藏所有默头。当设置到0时就是默头都不显示
限定数量可以在greasemonkey / tampermonkey 的菜单里修改
注：必须在生效界面，即超展开界面下才有这个选项

![演示](http://i.imgur.com/5Sc90ht.png)
![演示](http://i.imgur.com/FrOI1v4.png)

***********************************************************

3) Hide Ratings @Bangumi
https://greasyfork.org/scripts/1926-hide-ratings-bangumi
site: bangumi.tv
隐藏评分信息

***********************************************************

4) Hide Ratings @Douban
https://greasyfork.org/scripts/1925-hide-ratings-douban
site: douban.com
隐藏评分信息

***********************************************************

5) Hide Tsukkomi @Bangumi
https://greasyfork.org/scripts/1924-hide-tsukkomi-bangumi
site: bangumi.tv
隐藏吐槽箱

***********************************************************

6) ReTsu
https://greasyfork.org/scripts/1922-retsu
site: bangumi.tv
吐槽箱快速回复功能
使用的是相关条目的讨论区功能
仅快速发出消息，没有直接开贴一样的互动功能
以后就是去讨论区回复了

![演示](http://i.imgur.com/oVi7OQH.png)

***********************************************************

7) Read Books @Bangumi
https://greasyfork.org/scripts/1923-read-books-bangumi
site: bangumi.tv
在书籍页面右侧提供在线阅读/搜索的外链（把没用的评分区替换掉）
只是『外链』。有2个站点加2个搜索引擎

***********************************************************

8) Show Bangumi ID
https://greasyfork.org/scripts/1920-show-bangumi-id
site: bangumi.tv
昵称旁显示id

![演示](http://i.imgur.com/pyS9A.png)