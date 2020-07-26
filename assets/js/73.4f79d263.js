(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{507:function(t,v,_){"use strict";_.r(v);var s=_(11),o=Object(s.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"事务处理"}},[t._v("事务处理")]),t._v(" "),_("p",[t._v("事务处理几乎是每一个信息系统中都会涉及到的问题，它存在的意义就是为了保证系统中数据是正确的，不同数据间不会产生矛盾，即数据状态的"),_("strong",[t._v("一致性")]),t._v("（"),_("strong",[t._v("C")]),t._v("onsistency）。")]),t._v(" "),_("div",{staticClass:"custom-block tip"},[_("p",{staticClass:"custom-block-title"},[t._v("提示")]),t._v(" "),_("p",[_("code",[t._v("一致性")]),t._v("在数据科学中是有严肃定义、且有多种细分类型的概念，在“分布式的基石”讨论"),_("RouterLink",{attrs:{to:"/distribution/consensus/"}},[t._v("分布式共识算法")]),t._v("时说的一致性，与这里的数据库状态的一致性严格来说并不能直接等同，具体差别我们将在分布式共识算法中继续探讨。")],1)]),t._v(" "),_("p",[t._v("理论上，达成这个目标需要三方面共同努力来保障：")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("原子性")]),t._v("（"),_("strong",[t._v("A")]),t._v("tomic）：在同一项业务处理过程中，事务保证了多个对数据的修改，要么同时成功，要么一起被撤销。")]),t._v(" "),_("li",[_("strong",[t._v("隔离性")]),t._v("（"),_("strong",[t._v("I")]),t._v("solation）：在不同的业务处理过程中，事务保证了各自业务正在读、写的数据互相独立，不会彼此影响。")]),t._v(" "),_("li",[_("strong",[t._v("持久性")]),t._v("（"),_("strong",[t._v("D")]),t._v("urability）：事务应当保证所有成功被提交的数据修改都能够正确地被持久化，不丢失数据。")])]),t._v(" "),_("p",[t._v("以上即事务的“ACID”的概念提法，笔者自己对这种已经形成习惯的“ACID”的提法是不太认同的，上述四种特性并不正交，A、I、D是手段，C是目的，完全是为了拼凑个单词缩写才弄到一块去，误导的弊端已经超过了易于传播的好处。")]),t._v(" "),_("p",[t._v("事务的概念最初是源于数据库，但今天的信息系统中已经不再局限于数据库本身，所有需要保证数据正确性（一致性）的场景中，包括但不限于数据库、缓存、"),_("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E4%BA%8B%E5%8A%A1%E5%86%85%E5%AD%98",target:"_blank",rel:"noopener noreferrer"}},[t._v("事务内存"),_("OutboundLink")],1),t._v("、消息、队列、对象文件存储，等等，都有可能会涉及到事务处理。当一个服务只操作一个数据源时，通过A、I、D来获得一致性是相对容易的，但当一个服务涉及到多个不同的数据源，甚至多个不同服务同时涉及到多个不同的数据源时，这件事情就变得很困难，有时需要付出很大乃至于是不切实际的代价，因此业界探索过许多其他方案，在确保可操作的前提下获得尽可能高的一致性保障，事务处理由此才从一个具体操作上的“编程问题”上升成一个需要仔细权衡的“架构问题”。")]),t._v(" "),_("p",[t._v("人们在探索这些事务方案的过程中，产生了许多新的思路和概念，有一些概念看上去并不那么直观，在本章里，笔者会通过同一个具体事例在不同的事务方案中如何处理来贯穿、理顺这些概念。")]),t._v(" "),_("div",{staticClass:"quote"},[_("p",{staticClass:"title"},[t._v("场景事例")]),_("p",[t._v("Fenix's Bookstore是一个在线书店。当一份商品成功售出时，需要确保以下三件事情被正确地处理：")]),t._v(" "),_("ul",[_("li",[t._v("用户的账号扣减相应的商品款项")]),t._v(" "),_("li",[t._v("商品仓库中扣减库存，将商品标识为待配送状态")]),t._v(" "),_("li",[t._v("商家的账号增加相应的商品款项")])])]),_("p",[t._v("接下来，笔者将逐一介绍在“单个服务使用单个数据源”、“单个服务使用多个数据源”、“多个服务使用单个数据源”以及“多个服务使用多个数据源”的不同场景下，我们可以采用哪些手段来保证以上场景实例的正确性。")])])}),[],!1,null,null,null);v.default=o.exports}}]);