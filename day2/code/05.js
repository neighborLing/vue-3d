/** 
 * 发布者-观察者
*/
// * 发布者
class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }

  notify() {
    this.subs.forEach(sub => sub.update());
  }
}
// * 订阅者-观察者
class Watcher {
  update() {
    console.log('update');
  }
}

const dep = new Dep();
const watcher = new Watcher();

dep.addSub(watcher);

dep.notify();