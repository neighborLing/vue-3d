/** 
 * Vue3响应式原理
 * Proxy
 * 直接监听对象而非属性
 * ! ie不支持, 性能有浏览器优化
*/

let obj = {
  name: 'meadery',
  phone: '13600000000'
};

const vm = new Proxy(obj, {
  set (target, key, newValue) {
    console.log('set');
    target[key] = newValue;
  },
  get(target, key) {
    console.log('get');
    return target[key];
  }
});

vm.name = 'hello';
vm.ip = '0.0.0.0';
console.log('obj: ', obj);

