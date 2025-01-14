# 域名解析

::: tip 域名缓存（DNS Lookup）

DNS也许是全世界最大、使用最频繁的信息查询系统，如果没有适当的分流机制，DNS将会成为整个网络的瓶颈。

:::

大家都知道DNS的作用是将便于人类理解的域名地址转换为便于计算机处理的IP地址，也许你会觉得好笑：笔者在接触计算机网络的开头一段不短的时间里面，都把DNS想像成一个部署在全世界某个神秘机房中的大型电话本式的翻译服务。后来，当笔者第一次了解到DNS的工作原理，并得知世界根域名服务器的ZONE文件只有2MB大小，甚至可以打印出来物理备份的时候，对DNS系统的设计是非常惊叹的。

域名解析对于大多数信息系统，尤其是对于基于互联网的系统来说是必不可少的组件，却属于没有太高存在感，通常都不会受重点关注的设施，不过DNS本身的工作过程，以及它对系统流量能够施加的影响，却还是有许多程序员不太了解；而且DNS本身就堪称是示范性的透明多级分流系统，非常符合本章的主题，值得我们去借鉴。

无论是使用浏览器抑或是在程序代码中访问某个网址域名，譬如以`www.icyfenix.com.cn`为例，如果没有缓存的话，都会先经过DNS服务器的解析翻译，找到域名对应的IP地址才能开始通信，这项操作是操作系统自动完成的，一般不需要用户程序的介入。不过，DNS服务器并不是一次性地将“`www.icyfenix.com.cn`”直接解析成IP地址，需要经历一个递归的过程。首先DNS会将域名还原为“`www.icyfenix.com.cn.`”，注意最后多了一个点“`.`”，它是“`.root`”的含义。早期的域名必须带有这个点才能被DNS正确解析，如今几乎所有的操作系统、DNS服务器都可以自动补上结尾的点号，然后开始如下解析步骤：

1. 客户端先检查本地的DNS缓存，查看是否存在并且是存活着的该域名的地址记录。DNS是以[存活时间](https://en.wikipedia.org/wiki/Time_to_live)（Time to Live，TTL）来衡量缓存的有效情况的，所以，如果某个域名改变了IP地址，DNS服务器并没有任何机制去通知缓存了该地址的机器去更新或者失效掉缓存，只能依靠TTL超期后的重新获取来保证一致性。后续每一级DNS查询的过程都会有类似的缓存查询操作，再遇到时笔者就不重复叙述了。
2. 客户端将地址发送给本机操作系统中配置的本地DNS（Local DNS），这个本地DNS服务器可以由用户手工设置，也可以在DHCP分配时或者在拨号时从PPP服务器中自动获取到。
3. 本地DNS收到查询请求后，会按照“是否有`www.icyfenix.com.cn`的权威服务器”→“是否有`icyfenix.com.cn`的权威服务器”→“是否有`com.cn`的权威服务器”→“是否有`cn`的权威服务器”的顺序，依次查询自己的地址记录，如果都没有查询到，就会一直找到最后点号代表的根域名服务器为止。这个步骤里涉及了两个重要名词：
   - **权威域名服务器**（Authoritative DNS）：是指负责翻译特定域名的DNS服务器，“权威”意味着这个域名应该翻译出怎样的结果是由它来决定的。DNS翻译域名时无需像查电话本一样刻板地一对一翻译，根据来访机器、网络链路、服务内容等各种信息，可以玩出很多花样，权威DNS的灵活应用，在后面的内容分发网络、服务发现等章节都还会有所涉及。
   - **根域名服务器**（Root DNS）是指固定的、无需查询的[顶级域名](https://en.wikipedia.org/wiki/Top-level_domain)（Top-Level Domain）服务器，可以默认为它们已内置在操作系统代码之中。全世界一共有13组根域名服务器（注意并不是13台，每一组根域名都通过[任播](https://en.wikipedia.org/wiki/Anycast)的方式建立了一大群镜像，根据维基百科的数据，迄今已经超过1000台根域名服务器的镜像了）。13这个数字是由于DNS主要采用UDP传输协议（在需要稳定性保证的时候也可以采用TCP）来进行数据交换，未分片的UDP数据包在IPv4下最大有效值为512字节，最多可以存放13组地址记录，由此而来的限制。
4. 现在假设本地DNS是全新的，上面不存在任何域名的权威服务器记录，所以当DNS查询请求按步骤3的顺序一直查到根域名服务器之后，它将会得到“`cn`的权威服务器”的地址记录，然后通过“`cn`的权威服务器”，得到“`com.cn`的权威服务器”的地址记录，以此类推，最后找到能够解释`www.icyfenix.com.cn`的权威服务器地址。
5. 通过“`www.icyfenix.com.cn`的权威服务器”，查询`www.icyfenix.com.cn`的地址记录，地址记录并不一定就是指IP地址，在RFC规范中有定义的地址记录类型已经[多达数十种](https://en.wikipedia.org/wiki/List_of_DNS_record_types)，譬如IPv4下的IP地址为A记录，IPv6下的AAAA记录、主机别名CNAME记录，等等。

前面提到过，每种记录类型中还可以包括多条记录，以一个域名下配置多条不同的A记录为例，此时权威服务器可以根据自己的策略来进行选择，典型的应用是智能线路：根据访问者所处的不同地区（譬如华北、华南、东北）、不同服务商（譬如电信、联通、移动）等因素来确定返回最合适的A记录，将访问者路由到最合适的数据中心，达到智能加速的目的。

DNS系统多级分流的设计使得DNS系统能够经受住全球网络流量不间断的冲击，但也并非全无缺点。典型的问题是响应速度，当极端情况（各级服务器均无缓存）下的域名解析可能导致每个域名都必须递归多次才能查询到结果，显著影响传输的响应速度，譬如图4-1所示高达310毫秒的DNS查询。

:::center
![](./images/dns-lag.png)
图4-1 首次DNS请求耗时（图片来自网络）
:::

专门有一种被称为“[DNS预取](https://en.wikipedia.org/wiki/Link_prefetching)”（DNS Prefetching）的前端优化手段用来避免这类问题：如果网站后续要使用来自于其他域的资源，那就在网页加载时生成一个link请求，促使浏览器提前对该域名进行预解释，譬如下面代码所示：

```html
<link rel="dns-prefetch" href="//domain.not-icyfenx.cn">
```

而另一种可能更严重的缺陷是DNS的分级查询意味着每一级都有可能受到中间人攻击的威胁，产生被劫持的风险。要攻陷位于递归链条顶层的（譬如根域名服务器，cn权威服务器）服务器和链路是非常困难的，它们都有很专业的安全防护措施。但很多位于递归链底层或者来自本地运营商的Local DNS服务器的安全防护则相对松懈，甚至不少地区的运行商自己就会主动进行劫持，专门返回一个错的IP，通过在这个IP上代理用户请求，以便给特定类型的资源（主要是HTML）注入广告，以此牟利。

为此，最近几年出现了另一种新的DNS工作模式：[HTTPDNS](https://en.wikipedia.org/wiki/DNS_over_HTTPS)（也称为DNS over HTTPS，DoH）。它将原本的DNS解析服务开放为一个基于HTTPS协议的查询服务，替代基于UDP传输协议的DNS域名解析，通过程序代替操作系统直接从权威DNS或者可靠的Local DNS获取解析数据，从而绕过传统Local DNS。这种做法的好处是完全免去了“中间商赚差价”的环节，不再惧怕底层的域名劫持，能够有效避免Local DNS不可靠导致的域名生效缓慢、来源IP不准确、产生的智能线路切换错误等问题。
