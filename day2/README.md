选择题
1、下面关于 Vue.js 的数据响应式描述正确的是：
A. 任何一个对象都可以被设置为响应式对象，当该对象的数据发生变化后可以通知视图更新。

B. 只有 Vue.js 中的选项 data (如：new Vue({ data: {  } }))才可以设置为响应式对象，当该对象的数据发生变化后通知视图更新。

C. Dep 对象的作用是收集依赖，每一个属性都会对应一个 Dep 对象，当属性变化时会调用 Dep 对象的 notify 方法发送通知更新视图。

D. 1个 Dep 对象可能会对应多个 Watcher 对象，当数据变化触发依赖 Dep 对象通知对应的 Watcher 对象更新视图。

答: BD

2、下面关于响应式原理描述错误的是：
A. 给 data 对象的某个属性设置为一个新的对象 (this.o = { name: 'xxx' })，此对象是响应式的。

B. 点击按钮的时候给 data 对象上的 obj 新增一个 name 属性 (this.obj.name = 'xxx')，该属性是响应式的。

C. Vue.js 内部当数据变化后，直接更新真实 DOM。

D. Vue.js 内部当数据变化后，首先操作的是虚拟 DOM。

答: BC

简答题
1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。
let vm = new Vue({
  el: '#el'
  data: {
    o: 'object',
    dog: {}
  },
  method: {
    clickHandler () {
      // 该 name 属性是否是响应式的
      this.dog.name = 'Trump'
    }
  }
})

答: 不是, 在实例化对象时, 只给原有的data对象内原有的属性添加了setter和getter, 若通过js直接给data添加对象,  新增加了属性没有经过observer的处理, 所以不是响应式数据. 若要把新成员设置为响应式, 可以使用observer或实现一个$set给新增属性设置为响应式数据
