class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(this.el);
  }
  // 编译模版, 处理文本节点和元素节点
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node);
      }

      // 判断node节点, 是否有子节点, 如果有自节点, 要递归嗲用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    })
  }
  // 编译元素节点, 处理指令
  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是指令
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        // v-text --> text
        attrName = attrName.substr(2);
        let key = attr.value;
        this.update(node, key, attrName);
      }
    })
  }

  // * 学学
  update(node, key, attrName) {
    let updateFn = this[`${attrName}Updater`].bind(this);
    updateFn && updateFn(node, key, this.vm[key]);
  }

  // 处理 v-text 指令
  textUpdater(node, key, value) {
    node.textContent = value;
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue;
    })
  }

  // v-model
  modelUpdater(node, key, value) {
    node.value = value;
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    })

    node.addEventListener('input', () => {
      this.vm[key] = node.value;
    })
  }
  
  // 编译文本节点, 处理差值表达式
  compileText(node) {
    // ! console.dir 后面的参数以对象的形式打印
    // reg ? 非贪婪模式
    // console.dir(node); 
    const reg = /\{\{(.+?)\}\}/;
    const value = node.textContent;
    if (reg.test(value)) {
      // ! $1 第一个分组的内容
      const key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);
      // 创建watcher, 当数据改变时更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue;  
      });
    }
  }
  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-');
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
}