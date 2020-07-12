选择题
1、下面关于虚拟 DOM 的说法正确的是：
A. 使用虚拟 DOM 不需要手动操作 DOM，可以极大的提高程序的性能。

B. 使用虚拟 DOM 不需要手动操作 DOM，可以极大的提高开发效率。

C. 虚拟 DOM 可以维护程序的状态，通过对比两次状态的差异更新真实 DOM。

D. 虚拟 DOM 本质上是 JavaScript 对象，可以跨平台，例如服务器渲染、Weex 开发等。

答案: BCD

2、下面关于 Snabbdom 库的描述错误的是：
A. Snabbdom 库是一个高效的虚拟 DOM 库，Vue.js 的虚拟 DOM 借鉴了 Snabbdom 库。

B. 使用 h() 函数创建 VNode 对象，描述真实 DOM 结构。

C. Snabbdom 库本身可以处理 DOM 的属性、事件、样式等操作。

D. 使用 patch(oldVnode, null) 可以清空页面元素

答案: D

简答题
1、请简述 patchVnode 函数的执行过程。
首先会判断是否存在prepatch钩子函数若有则执行, 如果新旧vnode相等, 则直接返回. 
更新并触发update钩子函数
判断vnode是否存在text, 若有则尝试移除oldvnode上的ch, 移除相关的oldvnodechild的钩子函数以及真实DOM, 然后在真实DOM上面更新文本
判断新旧vnode的ch是否存在, 同级对比执行新增移除判断
最后判断是否存在是否存在postpatch函数, 若有则执行