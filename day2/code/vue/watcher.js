class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    // 把watcher对象记录到Dep类到静态属性target
    Dep.target = this;
    // 触发get方法, 在gat方法中调用addSub
    this.oldValue = vm[key];
    Dep.target = null;
  }
  // 当数据发生变化的时候更新视图
  update() {
    const newValue = this.vm[this.key];
    if (this.oldValue === newValue) {
      return;
    }
    this.cb(newValue);
  }
}