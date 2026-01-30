开发

2017年8月31日

20:14

 

切换的时候千万吧mysql数据导出来

明天：Vue简单，那就简单的实现一下表单的数据双向绑定。_不要重复造轮子，能用就继续用。——时间很宝贵。其他还好说，对于datatable数据源有二维数组转为json太麻烦了。

后天：es，react 目标定向的本地，简单导入几条数据，修改searchkit符合自己需求。

 

express已经非常好了，和apache比，不用每次都清除缓存了，只要刷新F5就行了。

 

先搞定react，然后学习ruby。vue放在最后，毕竟对他的需求也小(因为检索有react，数据库浏览就是用datatable足够了。只有编辑表格的时候有个双向绑定响应的优点，已经实现了没必要改轮子。)

web也就用express，也别改koa了。

 

迁移当前工程用白天的零散时间就够了，都是重复劳动。

目前的程序主要是表格浏览为主，不需要别的复杂的东西。

同时学习react和vue会促进理解

ruby,rails,react,泛舟,grunt

阮一峰：React 技术栈系列教程

 

编程方面总有对未知事物的恐惧，恐惧的原因是不熟悉。

 

es图片是存储在哪里的？

有些文章太长，分页是怎么累积算一篇文章的。

根据规划，Elastic 6.x 版只允许每个 Index 包含一个 Type，7.x 版将会彻底移除 Type。

 

鼠标悬停股票，文字识别，然后显示最近新闻，板块。由html旋转后显示。

抓取泛舟博客。

 

索引类型：每篇doc必须包括日期。了了；

 

分词：同义词：白酒，酒类。

 

不要造轮子：使用已经有的各种库，js的，ruby，java等等的。————而且由于是工具，不用太精确，例如在jquery的datatable和chart上花费的过多的时间，不是不值得花时间，是不值得话过多的时间了解那么详细。

 

明天，webmagic文档，webporter，然后react。

 

爬虫一定要有slf4j log，

4.6 爬虫的监控

 

创造一个chrome临时crx导入泛舟博客，注意用html数据导入，因为以后要增加粗体，红色样式

 

react or vue 行编辑，双向数据绑定。

 koa 可以用，但是debug 没有继承到intellij。

ruby，railse 测试驱动开发。

searchkit已经可以用了。

减少jQuery。

把手头项目减少jquery，增加vue。并且先以最简单的方式移植express，跑起来。

 

vue 改写现有直接操作数据库项目，双向绑定。

 

koa，学习流程，把代码全部改换为使用各种node工具，参考onenote,webpack

 

data table 如何直接放json数组，方式2 rows = rows.map(cell =>Object.values(cell));但是这样title也要换。title就是Object.keys(grid[1])

 

react 表格功能期待：filter，search，隐藏列，列回调

 

  // document.createElement('div');

  // 你不需要jQuery

  // datatable不能用react替换，功能太强大了。考虑一下react-table，毕竟用的功能也没那么多。而且还有免费的可编辑功能。非常多，搜索table和grid

  // 先看看能不能跑起来searchkit，毕竟这个事最重要的。

  // column 应该可以手动调整顺序，否则就不需要columns了，因为json已经包含titile了

  // 学习

Vue__________________我们 **不需要撰写任何 DOM 操作代码 **：被绑定增强的 HTML 模板是底层数据状态的声明式的映射，数据不过是普通 JavaScript 对象。我们的视图完全由数据驱动。

 

来自 <[*https://zhuanlan.zhihu.com/p/21818903*](https://zhuanlan.zhihu.com/p/21818903)>

用网上现成的组件，这样就可以阅读最优秀的代码

后端安装vue，帮助理解react，各种npm等等。

 

 

.首次渲染性能，对于大量数据来说react还是比vue有优势

 

来自 <[*https://www.zhihu.com/question/31585377*](https://www.zhihu.com/question/31585377)>

虽然React学习有一点坡度，但只要过这个坎后面就特别容易了。我希望Vue.3.0完全把指令干掉。

 

来自 <[*https://www.zhihu.com/question/31585377*](https://www.zhihu.com/question/31585377)>

 

3：减少jquery

mysql客户端

导入如果出问题

vue

 

idea快捷键，视频和文本

 

好多undefined。

 

淘股吧，每次刷新时，页面的日期总是跳跃。

 

淘股吧导入数据可能会有问题，因为collect出来的已经不是二维数组了，而是json数组。

 

关于涨停时间列，在导入到db的时候或者导入之后马上做，而不是取数据的时候做。

 

日期列8位数字改变10位

 

 

复述，给别人讲解

Wednesday, January 1, 2020

9:24 PM

 

 

尤其是工作中的“原型项目”，它们更为糟糕。因为在你心目中，*早已明白*这些项目并不会占有一席之地。况且，该类项目往往会长期驻留在原型阶段，或变成线上的软件。最终，你将无法摒弃或重写。

 

此外，把原型项目当作学习的项目将会为带来大量的烦恼。对于你来说，你可能会就*未来的因素*考虑一切可能发生的事情。而当你*认为*这不仅仅是一个原型的时候，你就会产生疑惑 —— 是否要测试一下呢？我应该要保证架构能延伸扩展……我需要延后重构的工作吗？还是不进行测试呢？

为了解决该问题，我希望能用上我所写的一篇指引《[为 Augular 开发者所准备的 React](https://daveceddia.com/react-for-angular-developers)》：一旦你完成了 “Hello World” 的基础课程，你将如何去学习 ”think in React” 的课程。

在这里，我有一些个人的提议给到大家：那就是，理想的项目是介乎于 “Hello World” 和 ”All of Twitter“ 之间。

另外，请尝试去构建一些官方文档列表中所展示的项目（TODOs、beers、movies），然后，借此学会数据流（data flow）的工作原理。

当然，你也可以把一些已有的大型 UI 项目（Twitter、Reddit、Hacker News等）分割成一小块来构建 —— 即把其瓜分成组件（components），并使用静态的数据去进行构建。

总的来说，我们需要构建的，理应是一的 **些小型且可被摒弃的应用程序项目。这些项目 **必须是**可摒弃 **。否则，你将深陷于一些不为重要的东西，如可维护性和代码结构等。

 

 

作者：掘金官方

链接：http://www.jianshu.com/p/ed55b366cd96

來源：简书

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

 

 

学习技能应该是集中时间攻击

2017年9月3日

6:34

 

 

学习程序

2017年9月5日

8:21

 

要阐明心中所想难免要多费些口舌，不过，千万不要因为这些（可能较为冗长的）解释，就误以为编写脚本得为每个决定伤透脑筋。相反，做决定要尽量干脆利落。如果面对两种可选方案时举棋不定，那也许恰恰表明选择哪种方案都没问题。要是犯了错，只需及时修正，就可继续前行。 除了脚本，写程序也都是如此吧， **应该细心，而不是小心翼翼，那样就失去了太多的乐趣了。 **

 

https://ruby.taobao.org/

如何使用？

$ gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/
 $ gem sources -l
 *** CURRENT SOURCES ***

https://gems.ruby-china.org
 *#* *请确保只有* *gems.ruby-china.org*
 $ gem install rails

 

来自 <[*https://ruby.taobao.org/*](https://ruby.taobao.org/)>

 

 

 

 

elasticsearch es

```
"Content-Type header [application/x-www-form-urlencoded] is not supported"
在``-d ``之前`` ``加入`` -H 'Content-Type: application/json' 
例如
curl -XPOST `http://localhost:9200/index/fulltext/1` -H 'Content-Type: application/json' -d'
{"content":"``美国留给伊拉克的是个烂摊子吗``"}
'
```

2017年9月29日

20:11

```
curl -XDELETE '`http://localhost:9200/movies`'
 
Ik``分词不能有英文，万科``A=``》拆分成三个独立的词
jieba``分词可以有英文，``st``万科``=``》没有拆分，独立的一个词
 
```

https://github.com/medcl/elasticsearch-analysis-ik

```
安装``ik``分词器
 
```

`.\bin\elasticsearch-plugin install `https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v6.0.0/elasticsearch-analysis-ik-6.0.0.zip

```
 
可能会需要梯子
 
来自`` <`https://github.com/medcl/elasticsearch-analysis-ik`> 
 
 
 
 
 StockDoc.search('apple', fields: [ { title: :ik_max_word } ])
 
调试：``StockDoc.search('apple',debug: true)
```

 

```
curl -XGET '`http://localhost:9200/scrapy/_search?pretty`' -d '
{
"query": {
"match" : {
"content" : "div"}}}'
 
curl -XGET '`http://localhost:9200/scrapy/_search?pretty`' -d '
{
"query": {
"match" : {
"author" : "``包头人``"}}}'
在数据层面，主要有：
```

·     Index：Elasticsearch用来存储数据的逻辑区域，它类似于关系型数据库中的db概念。一个index可以在一个或者多个shard上面，同时一个shard也可能会有多个replicas。

·     Document：Elasticsearch里面存储的实体数据，类似于关系数据中一个table里面的一行数据。
 document由多个field组成，不同的document里面同名的field一定具有相同的类型。document里面field可以重复出现，也就是一个field会有多个值，即multivalued。

·     Document type：为了查询需要，一个index可能会有多种document，也就是document type，但需要注意，不同document里面同名的field一定要是相同类型的。

·     Mapping：存储field的相关映射信息，不同document type会有不同的mapping。

```
索引和搜索
虽然``Elasticsearch``能自动判断``field``类型并建立合适的索引，但笔者仍然推荐自己设置相关索引规则，这样才能更好为后续的搜索服务。
一些限制：
```

·     binlog一定要变成row-based format格式，其实我们并不需要担心这种格式的binlog占用太多的硬盘空间，MySQL 5.6之后GTID模式都推荐使用row-based format了，而且通常我们都会把控SQL语句质量，不允许一次性更改过多行数据的。

·     需要同步的table最好是innodb引擎，这样mysqldump的时候才不会阻碍写操作。

·     需要同步的table一定要有主键，好吧，如果一个table没有主键，笔者真心会怀疑设计这个table的同学编程水平了。多列主键也是不推荐的，笔者现阶段不打算支持。

·     一定别动态更改需要同步的table结构，Elasticsearch只能支持动态增加field，并不支持动态删除和更改field。通常来说，如果涉及到alter table，很多时候已经证明前期设计的不合理以及对于未来扩展的预估不足了。

```
 
作者：``siddontang
链接：``http://www.jianshu.com/p/05cff717563c
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 
来自`` <`http://www.jianshu.com/p/05cff717563c`> 
curl -X DELETE 'localhost:9200/``stock_docs``'
 
来自`` <`http://www.ruanyifeng.com/blog/2017/08/elasticsearch.html`> 
```

 

```
curl -X PUT 'localhost:9200/stock_docs' -d '
{
"settings": {
"analysis": {
"analyzer": {
"stock_content": {
"type": "custom",
"char_filter": "html_strip",
"tokenizer":  "ik_max_word"}
}
}
},
"mappings" : {
    "stock_doc" : {
      "dynamic" : true,
      "properties" : {
        "content" : {
          "type" : "string",
          "analyzer" : "stock_content"
        }
      }
    }
  }
}
}'
 
curl -XPOST `http://localhost:9200/stock_docs/stock_doc/_bulk?pretty` -d '
{ "index" : { "_id" : "1" } }
{"content" : "``＂闺蜜＂崔顺实被韩检方传唤 韩总统府促彻查真相``" }
{ "index" : { "_id" : "2" } }
{"content" : "``韩举行＂护国训练＂ 青瓦台``:``决不许国家安全出问题``" }
{ "index" : { "_id" : "3" } }
{"content" : "``媒体称``FBI``已经取得搜查令 检视希拉里电邮``" }
{ "index" : { "_id" : "4" } }
{"content" : "``村上春树获安徒生奖 演讲中谈及欧洲排外问题``" }
{ "index" : { "_id" : "5" } }
{"content" : "``希拉里团队炮轰``FBI ``参院民主党领袖批其``“``违法``”" }
'
 
curl -XPOST `http://localhost:9200/stock_docs/stock_doc/_search?pretty` -d'
{
  "query" : { "match" : { "content" : "``银行``" }}
}'
 
curl `http://localhost:9200/stock_docs/_search?pretty` -d '{"query" : { "match" : { "content" : "``银行``" }},
"size":1000,"from":0,"timeout":"11s","_source":false}'
 
 
 
curl `http://localhost:9200/stock_docs/_search?pretty` -d '{"query":{"bool":{"must":{"match" : { "content" : "``板块``" }},"filter":[{"range":{"create_time":{"to":"2017-11-01","include_upper":false}}}]}},"size":1000,"from":0,"timeout":"11s","_source":false}'
```

 

curl -X PUT 'localhost:9200/docs' -H 'Content-Type: application/json' -d '

{

  "settings":{

​    "analysis":{

​      "analyzer":{

​        "stock_content":{

​          "type":"custom",

​          "char_filter":"html_strip",

​          "tokenizer":"ik_max_word"

​        }

​      }

​    }

  },

 

  "mappings":{

​    "x":{

​       "properties":{

​        "content":{

​          "type":"text",

​          "analyzer":"stock_content"

​        },

​        "title":{

​          "type":"text",

​          "analyzer":"ik_max_word"

​         },

​        "sub_titles":{

​          "type":"text",

​          "analyzer":"ik_max_word"

​        },

​        "codes":{

​          "type":"text",

​          "analyzer":"ik_smart"

​        },

​        "publish_at":{

​          "type":"date"},

​        "url":{

​          "type":"keyword",

​          "index":"false"

​        },

​        "site":{

​          "type":"keyword"

​        },

​        "source":{

​          "type":"keyword"

​        },

​        "author":{

​          "type":"keyword"

​         },

​        "kind":{

​          "type":"text",

​          "analyzer":"ik_smart"

​        }

​      }

​    }

  }

}'

`建立``Index ``创建一个名为``tianya``的``Index``，一个``Index``相当于一个数据库的概念：`` curl -XPUT `http://localhost:9200/tianya


 `分词：`

```
curl -XPOST `http://localhost:9200/stock_docs/stock_doc/_search?pretty` -d'
{"query" : { "match" : { "title" : "``七成``" }}}'
 
curl -XGET '`http://localhost:9200/_analyze?pretty&analyzer=ik_max_word`' -d '
康达新材``19``日晚间公告``'
 
来自`` <`https://yq.aliyun.com/articles/55959`> 
```

 

 

notepad++

2017年10月9日

19:17

 

notepad++怎么隔行删除

 

删除奇数行

 

开正则，查找^[^\n]*\n([^\n]*)替换为\1 不是在Notepad++上写的

 

来自 <[*https://zhidao.baidu.com/question/1672359415299412147.html*](https://zhidao.baidu.com/question/1672359415299412147.html)>

 

 

ss

2018年1月12日

7:58

 

 

明明没看的文章说看了，

故意气你，

自以为是

太垃圾，

做点好事就宣扬

没有公德心

他母亲不让别人和仝宪的父母玩

宣扬我父母耽误我了，

参与拆迁，被打发走，就生气了，却从没与我说起

穷的时候向我借3000块钱

问有没有认识刷信用卡的，知道我着急给的价格高以后，事后又打电话给我我说可以找他朋友刷卡

有信用卡10万额度，想借，说在别人那，一点没有考虑要借我的意思

问我为什么不投资境外股票，现在想来明显是想给自己投资，咨询我建议。怕我问他借钱，很明显，他考虑过我的情况，他想把我当成他的狗。

 

 

 

钻牛角尖

2017年11月23日

21:23

 

【 · 原创: [炒股养家](https://www.taoguba.com.cn/blog/134434)  2010-08-20 22:18[只看该作者(-1)】](javascript:lookUser(134434))

![img](images/clip_image002-16480990324883f.webp)

 [赞(29)](javascript:AddUseful('5062362','29','R','S');)

·     [直呼Ta](javascript:void(0);)

原帖由天地英豪在2010-08-20 02:49发表

​    

​    没看到一点技术含量的说法，

​       

​       多是夸夸其谈的假话。

​       一种技术，如果不能量化，

​       纯粹是屁话，蒙人的话，

​       然后可以随便解释。

​       下面的话，全是空话，

​       有点脑子的人都会说。

​       

​       大盘超跌，板块超跌，买啊？

​       俺考，这是人话吗？

​       老子也说，高抛低吸必能赚钱。哈

​    

​    追求技术的量化，曾经让我大量的时间钻这个牛角尖，还是有太多的人执迷于此，炒股若是这样可行的话，那些基金经理们应该比炒手们更有优势了。————逻辑

 

来自 <[*https://www.taoguba.com.cn/Article/307466/1*](https://www.taoguba.com.cn/Article/307466/1)>

 

和所有的事情一样，程序越多，越容易出错，投篮中的步骤，尽可能减少，这样才能减少出错的概率，保持稳定”，科沃尔谈起投篮，完全是上升了一个高度，不是局限于简单的出手姿势。

 

来自 <[*http://sports.qq.com/a/20171203/008913.htm*](http://sports.qq.com/a/20171203/008913.htm)>

 

 

认知心理学告诉你什么才是高效学习——内隐语言理论：打破学习错觉

2017年11月12日

16:27

 

大家从小都被教育要好好学习，但却从没人专门教过我们怎样好好学习。直到接触心理学尤其是认知心理学，才发现以前的学习多么低效，高效的学习又多么迷人！

知其然更要知其所以然，从心理学视角探究学习理论，既能将常用的老方法化腐朽为神奇，又能指导我们培养新的高效方法。

以下6个方法，每个方法都从两个方面详细阐述：“为什么有效”（认知心理学理论），以及“怎样高效利用”（理论照进现实）。原来，学习真的不是一件苦差事！

 **一、注意力稳定性理论：必须有目的地预习 **

注意力稳定性，是指注意力不能长时间保持稳定，而是周期性起伏变化，通俗讲就是课堂45分钟，真正有效时间大约不到20分钟，这不是以个人意志为转移的。——（番茄时间？？？）

因此，要成为学霸，有效的课堂时间必须用来听重点、听难点、听方法思路。而要做到这一点，有目的的提前预习非常重要！必须要带着问题听讲。很多人不明白这一点，要么不预习，要么稀里糊涂预习，虽然瞪大眼睛听讲，最后只能自证智商确实存在差异！

之所以将这条放到第一点，因为课堂听重点太重要了，另外就是对于晚上缺觉、白天走神的高中生来讲，集中精神听讲基本不可能。尽管大多数时候在开小差，但有的同学对上课内容吸收非常高效，这归功于有目的的预习，带着问题听课，一旦老师讲解到问题内容，自然就全神贯注！

 **二、记忆衰退理论：必须及时复习 **

德国心理学家艾宾浩斯研究发现，遗忘在学习之后立即开始，而且遗忘的进程并不是均匀的。最初遗忘速度很快，以后逐渐缓慢。

![img](images/clip_image003-16480990324884.webp)

 

 

上面曲线告诉我们，及时复习非常重要。但实验又证实，合理安排复习时间也非常重要，并非复习就有效果，正确的时间点进行复习就会事半功倍！

![img](images/clip_image005-16480990324895.webp)

 

来自 <[*https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc*](https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc)>

 

 

 

什么才是最佳的时间节点，实验给出的建议是5分钟后重复一遍，20分钟后再重复一遍，1小时后、12小时后、1天后、2天后、5天后、8天后，14天后就会记得很牢，很难再遗忘。

![img](images/clip_image007-16480990324896.webp)

 

来自 <[*https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc*](https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc)>

 

 

 

 **三、记忆编码理论： **必须动手构建知识树 **

认知心理学研究指出，记忆效果取决于信息编码方式，“深层次”加工比“浅层次”加工更有利于知识的记忆和提取。

换句话说，记忆和理解取决于如何加工信息。加工深度很难衡量、定义，因时而异，但有效的深加工肯定是在记忆内容和已知信息间建立联系，而建立知识树是最为有效的方式，通过树形结构把知识串联、和组织！

![img](images/clip_image009-16480990324897.webp)

 

来自 <[*https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc*](https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc)>

 

 

 

知识树一旦被搭建出来，每一个节点就是一次思考，每一次思考就是与周边知识节点的一次连接，知识之间的联系就越来越紧密，知识树也就越来越有条理，越来越有生命力，很多问题自然而然就能触类旁通、融会贯通，而不是杂乱无章的一团浆糊，毫无头绪！

 **四、内隐语言理论：打破学习错觉 **

很多时候我们自认为学得好，是错将熟悉当做知道。

比如我们学习一个章节内容，画了重点记号，甚至还做了笔记，这时我们可能会认为学得很好，对知识点也了如指掌，但如果合上书做个简单的自我检测，瞬间就会忘掉三四成。

再比如，问自己一个经典问题：“什么是囚徒困境”？心里是不是很快闪出“两个人”“博弈”“策略”等关键词，觉得对这个问题很熟悉，但如果我要求用你完整描述出来，你真的知道吗？

这种学习错觉（误将熟悉当知道）是内隐语言与外部语言的差异造成的。语言分为内隐语言和外部语言。通俗讲，内隐语言是我们自问自答或不出声的言语，外部语言就是我们正常交谈或小声默念。内隐语言过于隐秘、快捷、破碎，而外部语言（或者书写表达）是逻辑、完整、成体系的，但如果一个知识点能用内隐语言描述，我们就误以为很熟悉。

具体到学习中，对一个知识点进行复习时，内隐语言抓住了几个关键点，我们就会产生学习错觉，误以为都知道，但知识点不是孤岛，是由逻辑关系构成的，这需要外部语言去描述、串联，唯有经过外部语言检验，才是真正的掌握理解！因此，必须将内部语言转换成外部语言。认知心理学推荐生成与测试两种办法：

![img](images/clip_image011-16480990324898.webp)

 

来自 <[*https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc*](https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc)>

 

 

 

 **测试是指对知识点进行自我提问，然后将答案小声说出来，或者完整写出来，不能心里一晃而过几个关键词就觉得了解然后测试结束。 **

 **五、情绪绩效理论：压力是资源 **

学习最终是为了提高自身素质，但对学生而言，考场发挥也非常重要，临场心态非常关键，那一刻的心态抵得上几个礼拜、几个月甚至几年的苦功！

这就涉及情绪绩效理，即情绪唤醒水平和绩效间存在着倒U型曲线的关系， **情绪太低或太高都会损害绩效 **。所以适当的压力是有好处的，完全没有压力或压力过高都会影响发挥。

![img](images/clip_image012-16480990324899.webp)

 

来自 <[*https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc*](https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc)>

 

 

 

压力的最新研究还表明，我们对压力的认知会改变这一压力曲线（大致是左、右平移）。比如一个实验证实，如果人们被简单告知“你是那种在压力下表现更好的人”，他们实际表现会提高33%，即使这只是随便说说也无妨，重要的是信息改变了个人对压力的评估方式。

所以，视压力为资源，会让我们在压力下表现更好（向右平移），而谈压色变则会让哪怕一丁点的压力都影像我们发挥（向左平移）。

 **六、合理休息：休息也是学习 **

最后一个方法引用学习论文《The Role of Deliberate Practice in the Acquisition of Expert Performance》一段话：

![img](images/clip_image014-164809903248910.webp)

 

来自 <[*https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc*](https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc)>

 

 

 

对于长期的学习，明智的做法是，控制每天的高强度学习时间，避免精神疲劳或逆反心理。较好的做法可参考一些独立撰稿人：每天早上的高效能时间撰写4小时，剩下时间就是休息、调整。总而言之：

![img](images/clip_image016-164809903248911.webp)

 

来自 <[*https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc*](https://baijiahao.baidu.com/s?id=1550205927180891&wfr=spider&for=pc)>

 

 

 

另外，认知心理学有一个“间隔效应”：分几段时间来学习，不要试图一次学完所有东西，这会大大提高学习效率。此外，研究还证实，学习之后休息或睡一会，能有效提高记忆效果。

最后，预祝各位早日修炼成学霸！