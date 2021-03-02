(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{627:function(t,e,r){"use strict";r.r(e);var i=r(11),o=Object(i.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"流量治理"}},[t._v("流量治理")]),t._v(" "),r("div",{staticClass:"custom-block tip"},[r("p",{staticClass:"custom-block-title"},[t._v("容错性设计")]),t._v(" "),r("p",[t._v("Since services can fail at any time, it's important to be able to detect the failures quickly and, if possible, automatically restore service")]),t._v(" "),r("p",[t._v("由于服务随时都有可能崩溃，因此快速的失败检测和自动恢复就显得至关重要。")]),t._v(" "),r("div",{staticClass:"custom-block right"},[r("p",[t._v("—— "),r("a",{attrs:{href:"https://martinfowler.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Martin Fowler"),r("OutboundLink")],1),t._v(" / "),r("a",{attrs:{href:"https://twitter.com/boicy",target:"_blank",rel:"noopener noreferrer"}},[t._v("James Lewis"),r("OutboundLink")],1),t._v(", "),r("a",{attrs:{href:"https://martinfowler.com/articles/microservices.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Microservices"),r("OutboundLink")],1),t._v(", 2014")])])]),t._v(" "),r("p",[t._v("“容错性设计”（Design for Failure）是微服务的另一个"),r("RouterLink",{attrs:{to:"/architecture/architect-history/microservices.html"}},[t._v("核心原则")]),t._v("，也是笔者书中多次反复强调的开发观念转变。不过，即使已经有一定的心理准备，大多数首次将微服务架构引入实际生产系统的开发者，在"),r("RouterLink",{attrs:{to:"/distribution/connect/service-discovery.html"}},[t._v("服务发现")]),t._v("、"),r("RouterLink",{attrs:{to:"/distribution/connect/service-routing.html"}},[t._v("网关路由")]),t._v("等支持下，踏出了服务化的第一步以后，很可能仍会经历一段阵痛期，随着拆分出的服务越来越多，随之而来会面临以下两个问题的困扰：")],1),t._v(" "),r("ul",[r("li",[r("p",[t._v("由于某一个服务的崩溃，导致所有用到这个服务的其他服务都无法正常工作，一个点的错误经过层层传递，最终波及到调用链上与此有关的所有服务，这便是雪崩效应。如何防止雪崩效应便是微服务架构容错性设计原则的具体实践，否则服务化程度越高，整个系统反而越不稳定。")])]),t._v(" "),r("li",[r("p",[t._v("服务虽然没有崩溃，但由于处理能力有限，面临超过预期的突发请求时，大部分请求直至超时都无法完成处理。这种现象产生的后果跟交通堵塞是类似的，如果一开始没有得到及时的治理，后面就需要长时间才能使全部服务都恢复正常。")])])]),t._v(" "),r("p",[t._v("本章我们将围绕以上两个问题，提出服务容错、流量控制等一系列解决方案。这些措施并不是孤立的，它们相互之间存在很多联系，其中许多功能必须与此前介绍过的服务注册中心、服务网关、负载均衡器配合才能实现。理清楚这些技术措施背后的逻辑链条，是了解它们工作原理的捷径。")])])}),[],!1,null,null,null);e.default=o.exports}}]);