class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    // 1. 判断data是否是对象
    if (!data || typeof data !== 'object') {
      return;
    }
    // 2. 遍历data对象的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    })
  }
  defineReactive(obj, key, val) {
    const self = this;
    // 负责收集依赖, 并发送通知
    let dep = new Dep(); 
    // 如果val是对象, 把val内部的属性转换成响应式
    this.walk(val);
    // * val 局部遍历
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 搜集依赖
        Dep.target && dep.addSub(Dep.target);
        // ! 不能直接使用data[key], 否则会出现递归
        return val;
      },
      set(newValue) {
        if (newValue === val) {
          return;
        }
        val = newValue;
        self.walk(newValue);
        // 发送通知 
        dep.notify();
      }
    })
  }
}