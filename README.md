# H5GameByPhaser
类似泡泡堂的单机页游 推荐使用火狐浏览器打开
游戏角色设置包括：主角洋葱头、僵尸猪、幽灵、牛头人、蝙蝠王。

 在index.html引入phaser.min.js后，将游戏分为几个大场景，分别是加载界面loadState，开始主面板menuState，关卡选择levelState，游戏面板playState。

角色的不同之处在于每个角色的血量，移动速度，攻击力的不同。每个角色在一开始出场的时他们的炸弹类型都是一样的，只能吃了道具才能改变炸弹增加攻击性。而炸弹的攻击力计算方法为攻击者的攻击力乘以炸弹系数。
在游戏中箱子里设置了几种道具，分别为红瓶（加血）、蓝瓶（加速）、蓝色的激光弹、攻击距离增长、攻击范围加宽。这些道具隐藏在游戏中的木箱下，需要先炸毁箱子。
 
 首先在加载场景里将前面做好的资源加载进去，同时create当资源加载未完成时，显示文字loading ...在面板中央。当加载完毕后，自动跳到下个场景。menuState设置了两个按钮，一个是‘关于’按钮，弹出游戏玩法介绍；另一个开始按钮进入游戏关卡选择场景，在此场景，存储用户游戏进度，判断用户所解锁的关卡。不同的游戏关卡的地图跟所出现的角色都放在json里，在playState加载当前关卡的资源后显示，先闪现字母‘READY GO’,而角色的基本行为写在Character函数里，包括了玩家跟怪物的共同点，行走的动画，碰壁不能继续走，放置炸弹，收到攻击health减小，重置后health恢复等共同功能。
玩家的其他功能写在Player函数里，当玩家死亡后返回levelState重新选择关卡开始，而在这里还要写段检查，当玩家放置炸弹时，放放置炸弹的音效。
最有挑战性的问题还是游戏ai，因为要保证每一个敌人都能够根据自己的位置去攻击或者躲避炸弹还有主动去获取道具。最后将角色的行为分为几大类：呆住，躲避，追逐，获得道具，放炸弹，在Character这个函数里设置好无论是玩家以及敌人怪物通用的行为，上下左右就放对应的动作，碰到炸弹堵住就呆住，死后定住重置等等。而在Enemy函数里设置判断，给每个行为赋值，当某个行为的估算值最小，就执行这个行为。


emmm还不会上传图片，迟点再来补充吧
