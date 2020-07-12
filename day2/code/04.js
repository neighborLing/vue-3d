/**
 * 发布订阅模式
 */

// 事件触发器
class EventEmitter {
  constructor() {
    // Object.craete(null) 创建的对象没有属性
    // { 'click': [fn1, fn2] }
    this.subs = Object.create(null);
  }

  // 注册事件
  $on(eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || [];
    this.subs[eventType].push(handler);
  }

  // 触发事件
  $emit(eventType) {
    if (this.subs[eventType]) {
      this.subs[eventType].forEach(handler => handler());
    }
  }
}

const em = new EventEmitter();
em.$on('click', () => {
  console.log('click');
})
em.$on('click', () => {
  console.log('click2');
})
em.$emit('click');