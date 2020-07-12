/** 
 * Vue2数据响应式核心原理
 * defineProperty多个属性
*/

// * 模拟Vue中但data选项
let data = {
  name: 'meadery',
  phone: '13600000000'
};
// * 模拟Vue的实例
let vm = {};

function proxyData(data) {
  Object.keys(data).forEach(key => {
    // 把data中的属性, 转换成vm的setter/getter
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      set(newValue) {
        console.log('set');
        data[key] = newValue;
      },
      get() {
        console.log('get');
        return data[key];
      }
    })
  })
}

proxyData(data);

vm.name = 'hello';
console.log('data: ', data);