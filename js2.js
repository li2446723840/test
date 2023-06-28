// call、apply、bind
// 知识点
// this指向问题，谁调用this指向谁
// 构造函数的原型链上绑定函数
// Symbol类型，具有唯一性
// 函数默认值
// ...扩展运算符
// globalThis，最顶层的对象
// 闭包的概念：函数嵌套函数，内部函数调用外部函数的变量。
const obj = {
  a: "aaa",
}
const fn = function (b, c) {
  console.log(this.a, b, c);
}
Function.prototype.MyCall = function (target = globalThis, ...args) {
  const symbol = Symbol()
  target[symbol] = this
  target[symbol](...args)
  delete target[symbol]
}
fn.MyCall(obj, a, c, s)

Function.prototype.MyApply = function (target = globalThis, args) {
  const symbol = Symbol()
  target[symbol] = this
  target[symbol](...args)
  delete target[symbol]
}
fn.MyApply(obj, [a, c, s])

Function.prototype.MyBind = function (target = globalThis, ...args) {
  return () => {
    // 写法一
    this.MyCall(target, ...args)
    // 写法二
    // const symbol = Symbol();
    // target[symbol] = this;
    // target[symbol](...args);
    // delete target[symbol];
  }
}
fn.MyBind(obj, "bbb", "ccc")()

// 防抖
// 知识点
// 函数只能够通过()来调用
// 函数的返回值，如果没有返回值，默认返回undefined
// addEventListenter绑定事件
// 闭包的概念：函数嵌套函数，内部函数调用外部函数的变量。
// 函数也是对象
// 对于普通函数来说，内部的this指向函数运行时所在的对象，但是这一点对箭头函数不成立。它没有自己的this对象，内部的this就是定义时上层作用域中的this。也就是说，箭头函数内部的this指向是固定的，相比之下，普通函数的this指向是可变的。
const debounce = function (fn, delay = 200, immediate = false) {
  let timer = null;
  let isInvoke = false;
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer);
    if (immediate && !isInvoke) {
      fn();
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        fn();
      }, delay);
    }
  }
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer);
    isInvoke = false;
  }
  return _debounce;
}
// 节流
// 比较上一次执行和当前的时间差
const throttle = function (fn, delay = 500) {
  let time = 0;
  const _throttle = function () {
    const currentTime = +new Date
    if (currentTime - time > delay) {
      fn()
      time = currentTime
    }
  }
  return _throttle
}

// if ("A" > "A1") {
//   console.log(111);
// } else if ("A" < "A1") {
//   console.log(222);
// }
// let arr = ["A1", "A", "A3", "A2"];
// arr.sort((a, b) => b - a);
// console.log(arr);

// var a = {
//   i: 1,
//   toString() {
//     return (a.i)++;
//   }
// };
// if (a == 1 && a == 2 && a == 3) {
//   console.log(1);
// }

// let arr = [3, 15, 8, 29, 102, 22]
// arr.sort()
// console.log(arr);

class MyPromise {
  constructor(func) {
    this.status = "pending";
    this.result = null;
    this.resloveCallback = [];
    this.rejectCallback = [];
    try {
      func(this.reslove.bind(this), this.reject.bind(this));
    } catch (error) {
      this.result = error;
      this.reject(error);
    }
  }
  reslove(result) {
    setTimeout(() => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.result = result;
        this.resloveCallback.forEach(callback => {
          callback(this.result);
        });
      }
    });
  }
  reject(result) {
    setTimeout(() => {
      if (this.status === "pending") {
        this.status = "reject";
        this.result = result;
        this.rejectCallback.forEach(callback => {
          callback(this.result);
        });
      }
    });
  }
  then(onFulfilled, onReject) {
    return new MyPromise((reslove, reject) => {
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : () => { };
      onReject = typeof onReject === "function" ? onReject : () => { };
      if (this.status === "pending") {
        this.resloveCallback.push(onFulfilled);
        this.rejectCallback.push(onReject);
      }
      if (this.status === "fulfilled") {
        setTimeout(() => {
          onFulfilled(this.reslut);
        });
      }
      if (this.status === "reject") {
        setTimeout(() => {
          onReject(this.reslut);
        });
      }
    })
  }
}
let commitment = new MyPromise((reslove, reject) => {
  throw new Error("报错");
  // reslove("這是一個接口")
}).then((res) => {
  console.log(res);
}, err => {
  console.log(err);
})
// commitment

// 手写new操作符
// 首先创建一个新的空对象
// 将这个对象的原型设置为构造函数的prototype对象
// 让构造函数的this指向这个新的对象，
// 执行构造函数代码（给新对象添加属性）
// 判断构造函数的返回值类型。如果是基本数据类型，返回新创建的对象；如果是引用数据类型，则返回这个引用类型的对象。
function Car(brand) {
  this.background = brand;
}
const newFn = function(fn, args) {
  const obj = {}
  obj.__propto__ = fn.prototype
  fn.call(obj, args)
  return obj
}
console.log(newFn(Car, "red"));

// 手写发布订阅模式
// const eventHub = {
//   map: {},
//   on: (name, fn) => {
//     eventHub.map[name] = eventHub.map[name] || [];
//     eventHub.map[name].push(fn);
//   },
//   emit: (name, data) => {
//     const q = eventHub.map[name];
//     if (!q) {
//       return;
//     }
//     q.map((f) => f.call(undefined, data));
//   },
//   off: (name, fn) => {
//     const q = eventHub.map[name];
//     if (!q) {
//       return;
//     }
//     const index = q.indexOf(fn);
//     if (index < 0) {
//       return;
//     }
//     q.splice(index, 1);
//   },
// };

// eventHub.on("click", console.log);
// eventHub.on("click", console.error);
// console.log(eventHub.map, 111);

// setTimeout(() => {
//   eventHub.emit("click", "dipper");
// }, 3000);

// eventHub.off("click", console.error);
// console.log(eventHub.map, 222);
// 手写diff算法
// 手写Promise
// 手写Promise.all
// 手写Promise.race
// 函数柯里化
// function fn(a, b, c) {
//   return a + b + c;
// }
// function currying(fn) {
//   return function c(...args) {
//     if (args.length === fn.length) {
//       return fn(...args)
//     } else {
//       return (...params) => c(...args, ...params)
//     }
//   }
//   // 箭头函数写法
//   // const c = (...args) => (args.length === fn.length) ? fn(...args) : (...params) => c(...args, ...params)
//   // return c;
// }
// // 闭包写法
// function currying(fn) {
//   let params = []
//   return function c(...args) {
//     params = [...params, ...args]
//     if (params.length === fn.length) {
//       return fn(...params)
//     } else {
//       return c
//     }
//   }
// }
// console.log(currying(fn)(1,2,3));
// console.log(currying(fn)(1)(2)(3));
// 数组扁平化
const arr = [[[[[[[1], 2], 3], 4], 5], 6], 7]
Array.prototype.MyFlat = function (tier = 1) {
  const res = []
  const recursion = function (arr, ctier) {
    if (ctier <= tier) {
      for (const item of arr) {
        if (Array.isArray(item)) {
          recursion(item, ctier + 1)
        } else {
          res.push(item)
        }
      }
    } else {
      res.push(arr)
    }
  }
  recursion(this, 0)
  return res;
}
const res = arr.MyFlat(3)
console.log(res);

// 判断字符串中的括号是否对称
// 实现一个寄生式组合继承

// 事件循环、任务队列
// 先执行同步代码
// 遇见微任务，放在当前任务队列的最后执行
// 遇见宏任务，放在下一个任务队列执行
// 当同一队列中有多个宏任务，会按顺序执行宏任务，前置宏任务中的微任务会先于后置宏任务执行
const eventLoop = []
eventLoop.push("1")
setTimeout(function () {
  eventLoop.push('2');
  new Promise(function (resolve) {
    eventLoop.push('4');
    resolve();
  }).then(function () {
    eventLoop.push('5')
  })
  setTimeout(() => {
    eventLoop.push("13");
    setTimeout(() => {
      eventLoop.push("15")
    })
  }, 0)
},0)

setTimeout(function () {
  eventLoop.push('9');
  new Promise(function (resolve) {
    eventLoop.push('11');
    resolve();
  }).then(function () {
    eventLoop.push('12')
  })
  setTimeout(() => {
    eventLoop.push("14")
  })
},0)
console.log(eventLoop);

// 1 2 4 5 9 11 12 13 14 15

