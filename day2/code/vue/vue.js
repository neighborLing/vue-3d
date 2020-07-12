class Vue {
  constructor(options) {
    // 1. 通过属性保存选项的数据
    this.$options = options || {};
    this.$data = options.data || {};
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
    // 2. 把data中的成员转换为getter和setter, 注入到vue实例中
    this._proxyData(this.$data);
    // 3. 调用observer对象, 监听数据的变化
    new Observer(this.$data);
    // 4. 调用compiler对象, 解析指令和差值表达式 
    new Compiler(this);
  }
  _proxyData(data) {
    // 遍历data中的所有属性
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        set(newValue) {
          if (data[key] === newValue) {
            return;
          }
          data[key] = newValue;
        },
        get() {
          return data[key];
        }
      })
    })
  }
}