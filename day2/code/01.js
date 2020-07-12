/** 
* Vue2数据响应式核心原理
* defineProperty 单个属性
*/
let data = {
  name: 'meadery'
}

let vm = {};

Object.defineProperty(vm, 'name', {
  // 是否可枚举(遍历) 若为false Object.keys取不到当前值, 但Reflect.onwKeys可以
  enumerable: false,
  // 是否可配置(可以使用delete删除, 可以通过defineProperty重新定义)
  configurable: true,
  set(newVal) {
    console.log('set');
    if (newVal === data.name) {
      return;
    }
    data.name = newVal;
  },
  get(val) {
    console.log('get');
    return data.name;
  }
})

vm.name = 'hello';
console.log(data);