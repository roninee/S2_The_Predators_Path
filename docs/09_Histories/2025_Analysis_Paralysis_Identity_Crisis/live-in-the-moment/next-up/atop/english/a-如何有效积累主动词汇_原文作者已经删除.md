你只需要下filelocator这个搜索文件的软件，然后把txt下载下来就能用，不需要你有编程基础！

在学英语的小黄有一天碰到这么一个句子

![img](images/de91d93a7b6bce41f2b682b5b70fe52a_r.webp)

他觉得这个 **rallying point ** 用的很传神。这个小黄是比较认真的，他还想通过造句把这个词进一步掌握。因为他在备考GRE，手头刚好有个issue题目是讨论媒体在现代社会中的作用。小黄眼珠子一转

计上心来，写出这么一个句子：

*The media always use rumors as a **rallying point ** for stimulating the tension of the whole society members from different financial and educational backgrounds.* 他写完这个句子先自恋了一下，完全被自己的才华倾倒了。不过这是一个很优秀的小黄，他马上察觉到，有些表达不能确定是否地道，并且有些地方还想润色一下。 是的，小黄的担心是有道理的，并且很有必要。所以他找了一位把牛津高阶，剑桥高阶，朗文当代，柯林斯高阶，麦克米伦高阶，和牛津搭配统统 **一字不落背下来的老师 **来做修改。这老师改成了这样：

*The media always exploit something unfounded as a rallying point for building up tension among the whole members of society, ranging from 985ers to zhuankegous.*

这个梗说的好像就是那位攒了大叠证书找不到工作然后在知乎搞了个大新闻的少年嘛。啧啧啧，这位老师你Fashion（此处切换谢娜口音）哦。

*exploit*一词使媒体狗的丑态尽显无疑;

不说*rumor*而说*something unfounded*，说明没有诬告他们传谣，这是文字游戏;

*Society members* 的表达是有的，一般指会社成员，社会成员一般说*members of society;*

*stimulate the tension* 比较少见，多用于政党国家间，感觉上*build up*稳当些；

*985ers, zhuankegous* 是什么鬼小黄也不知道。。。是那个老师改的o(^▽^)o

小黄认真备考过GRE托福，现在也在教雅思阅读，他对这些考试的作文主题进行了归类。截了3600多张适合这些话题造句的例句，最终筛选1400多个句子进行了造句练习，并且这些全部找那个 **背了所有字典的老师 **修改。

![img](images/4280bae8bdffcd0e38f343a016871081_r.webp)![img](images/0a3494fdb5892d02871f6bad6f0f3f8f_r.webp)

新手机可以对图片直接进行简单的裁剪，几个月前小黄就把截屏缩减到目标例句。

你是不是很羡慕小黄有这么一位 **几乎背了所有字典的老师 **？来来来，现在我打算把这位老师介绍给大家。

接下来开始进入正题，大家领个小马扎慢慢听。

思路是这样的：

把市面上现有的英英字典和英汉双解 **反编译成txt文档 **，然后用平时找代码的filelocator做全局搜索。这样， **英汉双解字典 **里的例句就成了地道的 **中译英 **的语料库， **英英字典 **就变成了检查你 **写的是否地道 **的语料库。更重要的是，它离线，并且支持正则表达式。接着我在2000多个小时读字典过程中把适合写作的例句截图出来，把雅思托福GRE写作主题归类，对着这些主题造句。并实时用filelocator检查表达并润色。

步骤是这样的：

 **一、把字典反编译成txt格式。 **这个想法其实几年前好几个网站上有零星说到过，不过由于各种原因现在这些txt资源在网络上完全绝迹了。英汉双解部分我一直用的是当时就下的资源，现在要拿出来普及，就回去把双解重新做了一遍并做了不少优化，然后自己又反编译了几个重要英英词典。 ALD六大厂家中现在韦氏高阶和麦克米伦还没有双解，剩下柯林斯高阶，朗文当代，牛津高阶和剑桥高阶都有，并且再加一部新牛津双解字典。用正则表达式的时候，牛津搭配词典也可以做语料库。做成txt格式如下图：

![img](images/ff92fc730944a5a3835d660a030bd681_r.webp)

把各个英英ALD集聚起来可以当英英语料库：

![img](images/eff3d1ba4ec5fe398de279d4d339bd68_r.webp)

朗文的例句极其丰富，非常适合拿来做语料库。剑桥高阶英英比双解多出将近两倍的例句。麦克米伦与韦氏高阶我最终选择了前者，没什么理由，任性。 一般情况下字典反编译是先把mdx格式的文件用GetDict转成UTF-8格式的TXT，麦克米伦就变成了这样：

![img](images/7282943471a133f4e8419b050c9d2a96_r.webp)

这时候需要在特殊字符后取消或者插入回车，以保证做全文搜索的时候精确到句子而非段落。这个过程中可以自己写个简单的小程序：

![img](images/98235398cde84de6227a353fcaf7142e_r.webp)

中间跳过细节，估计你对这个也不感兴趣。把他放到filelocator里搜脱颖而出就成了这样：

![img](images/979ebd5c4a66618696b574adb5aabb29_r.webp)

这种中译英的优势在于，它是 **基于整个句子的意译，而不是基于词组的直译。 **你有什么东西不会表达了可以直接在里面搜然后通过语境来确定哪个可以为你所用，并且例句绝对权威。



接下来我说一说它的另一个优势：正则表达式。

正常的字典里，除了麦克米伦可以搜词组，其他字典碰到词组基本抓瞎。前一阶段这个句子：

*Even if you get killed,just walk it off.* 误译闹了个大笑话。这里很多人碰到的第一个理解困难不是walk it off， 而是get killed。get -ed中，表达一种将会达到的状态。有些人把它直接理解成be killed那就怎么弄都搞不清楚了（即使你被杀了也要撑下去。。。）



其实暗含 **将来状态 **，在我能查到的字典里没有一个直说的。所以我也不敢确信的。但是我们可以用正则表达式验证一下：

![img](images/3700e4de7ebe6eeeb0ace1692737c2ae_r.webp)

上面的例句中是对我理解的肯定。（红色部分是：get \w*ed）



这个就是我接下来要说的正则表达式搜索。因为你们碰到了Frank蜀黍，所以不需要自己去从浩瀚的正则表达中寻找有用的形式，我就教你们四招防身：

 **1、get killed可以用get \w\*ed来搜索。 **\w表示任意一个英文字符；*表示重复前面。\w*就会匹配任意个英文字符，\w*ed的意思是一个单词以ed结束。同样道理 .*中，点.表示除换行符以外的任意字符，所以.*就能和任何内容匹配。这一招是最常用的。



比如我们接下来想搜walk it off什么意思，就可以这样子walk.*off.

他的意思是找出一个句子，它从walk开始，到off结束。然后搜出来就是这个鬼样：

![img](images/169079cda81efe53bec1261f988d848c_r.webp)

是的，offcial,offend也算off结尾。这时候要用第二招。



 **2、\boff\b 表示off前后都是空格。 **所以就变成walk.*\boff\b

![img](images/31dde99f51b1577e78e5e946e7757fee_r.webp)

这时候我们就想，walk it off应该跟走没什么关系吧，所以我们想在例句翻译中有“走”这个字的统统不匹配。这时候是第三招。



 **3、walk.\*\boff\b(?!.\*走) 搜出来变成： **

![img](images/a62afab3c53ec03b43bfc9aa74fcb7a3_r.webp)

这里面的走也可以替换成英文单词：walk.*\boff\b(?!.*look)



现在范围就足够小了，目标词义也就出现了。把walk it off翻译成撑下去是意译，我第一次看到*Even if you get killed,just walk it off.*这个句子的时候，是这么理解的：你觉得自己马上要被杀了，想办法让这个事走开。我读字典的时候碰到walk off the headache觉得这个表达很传神，其实walk it off也是这个意思，只是意译成撑下去容易让人摸不着头脑。看到这里，你会想，我直接搜 walk sth off会怎么样。其实你还应该搜walked sth off;walking sth off;walked something off; walking sth. off等等。这时候就要用第四招

 **4、(walk|walked|walking) (sth|sth.|something) \boff\b **

![img](images/004a87d625848ccaaeea3bb4cc48fad5_r.webp)

其中，| 表示或的意思。

掌握了以上四招你基本上就能把正则表达式搜字典搞的有声有色了。其他功能待你你自己慢慢摸索。



二、 **我把托福雅思GRE作文的常见话题归成11个具体类和一个杂类。 **

你单纯地造句可能会因为没有目标而纠结写什么。这时候我提供11个大的的作文主题，你就把看好的用法跟这些主题凑。这十一个主题是：

![img](images/e2e311fdc5e15acf29d8dd3e77a9e975_r.webp)

是的，把他放到excel里面方便归档。

 **三、平时读字典时碰到与上面话题相关，或者表达很地道的例句，截屏。 **

我早年读字典的时候碰到这些句子：

![img](images/94ddd51f052801101f9874ba69180b93_r.webp)

a major requisite for 这个表达用到教育应该重视就业还是纯学术这类话题里怎么样？

![img](images/6bdb099c601119ccb342aaed5ce9af76_r.webp)![img](images/c06482f20af13a216013fba54928a99b_r.webp)

这些表达用在环境类话题里怎么样？

![img](images/77a1cb266f7a04be433ed4076baa1703_r.webp)

这个用来论述传统与发展怎么样？

![img](images/65aa1ea38861250b250ec5f65f187dab_r.webp)

haemorrhage这个词用来描述全球化怎么样？

![img](images/ff68b65dabe6c42bac43fa68b749db04_r.webp)

这个英文直接拿来到知乎月经贴“女性衣着暴露是不是加剧了强奸案件”下面装个逼怎么样？



我之所以喜欢看双解字典是因为这样的翻译比比皆是

![img](images/2443db5accf5021f3ba12e695bd64e86_r.webp)

自从开始读字典，身体一天不如一天。



是的，我截了3600多张适合造句的例句，两年前根据上面分类的主题造了1400多个句子。其实为了应付考试，你能每个话题造30个句子就能秒杀绝大多数不好好提高表达能力沉溺于所谓写作技巧的 **。

 **四、对着分类的话题，手里拿着截屏下来的例句，造句。碰到不会表达的地方用filelocator反查双解字典。 **

还记得我们一开始小黄造的句子吗？（有人反映看成了：小黄句。。。）

The media always use rumors as a rallying point for stimulating the tension of the whole society members from different financial and educational backgrounds.



我们想替换use，这时候你搜媒体.*利用

![img](images/43243e970070c7fbe8fb2d37598cabf1_r.webp)

你不知道stimulate the tension 是否地道时，首先你当然可以去google一下这个表达， **记得把他打上引号 **。但是对于学习模仿者我不建议这么做，你要做的是先学习中规中矩地的表达，请牢记这句图片里的三句话：

![img](images/6df88b4b5c99a92fc644d8b0e6e4f110_r.webp)

这是中国制造业创新过程中走的路——模仿然后创新。学任何东西也是如此。这时候我们就来看看挑起争端可以怎么表达。当我们搜

\btension\b.*(加剧|激化|引起|挑起|升级)

这些都是有完整语境的权威例句，你自己选一个吧。

你想把rumor这个词替成捕风捉影的事，这时候就直接搜捕风捉影好了：

![img](images/4d01618a4ddc93f6eeb139fbdf7f133b_r.webp)

如果你搜 **(没有|无|没)根据(的)? **，那会出来更多表达。很多网络上在线句酷例句质量不能保证，并且搜出来很杂很乱，当然他们更不支持正则。 **以上所有符号全部在半角状态下输入。 **

例子就不多举了，注意领会精神。在确定用哪个英文单词之后，牛津搭配+正则搜索也是非常给力（我也编译好了）。看到这里不知道你有没有开始激动地尽情摇摆。

链接：[百度云 请输入提取密码](https://link.zhihu.com/?target=http%3A//pan.baidu.com/s/1c0nRYoC) 密码：n33z

