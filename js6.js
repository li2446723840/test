// // 公式类型一: 参数数量满足函数参数要求，触发执行
// // fn(a,b,c,d) => fn(a)(b)(c)(d);

// function add(a, b, c, d) {
//   return a + b + c + d;
// }

// // const createCurry = (fn, ...args) => {
// //   let _args = args || [];
// //   let length = fn.length; // fn.length代码函数参数数量

// //   return (...rest) => {
// //     let _allArgs = _args.slice(0);
// //     // 深拷贝闭包共用对象_args，避免后续操作影响（引用类型）
// //     _allArgs.push(...rest);
// //     if (_allArgs.length < length) {
// //       // 参数数量不满足原始函数数量，返回curry函数
// //       return createCurry.call(this, fn, ..._allArgs);
// //     } else {
// //       // 参数数量满足原始函数数量，触发执行
// //       return fn.apply(this, _allArgs);
// //     }
// //   };
// // };

// // ES5写法
// function createCurry() {
//   var fn = arguments[0];
//   var _args = [].slice.call(arguments, 1);
//   console.log(_args, '_args');
//   var length = fn.length;

//   return function () {
//     var _allArgs = _args.slice(0);
//     _allArgs = _allArgs.concat([].slice.call(arguments));
//     if (_allArgs.length < length) {
//       _allArgs.unshift(fn);
//       return createCurry.apply(this, _allArgs);
//     } else {
//       return fn.apply(this, _allArgs);
//     }
//   };
// }

// const curryAdd = createCurry(add, 2);
// let sum = curryAdd(3)(4)(5); // 14
// console.log(sum);

// // 本体
// var myImage = (function () {
//   var imgNode = document.createElement("img");
//   document.body.appendChild(imgNode);
//   return {
//     setSrc: function (src) {
//       imgNode.src = src;
//     }
//   };
// })();

// // 代理
// var proxyImage = (function () {
//   var img = new Image();
//   img.onload = function () {
//     myImage.setSrc(this.src); // 图片加载完设置真实图片src
//   };
//   return {
//     setSrc: function (src) {
//       myImage.setSrc("./loading.gif"); // 预先设置图片src为loading图
//       img.src = src;
//     }
//   };
// })();

// const targetObj = { name: "tom" };
// const proxy = new Proxy(targetObj, {
//   get(trapTarget, property, receiver) {
//     console.log(trapTarget === targetObj); // true
//     console.log(property); // name
//     console.log(receiver === proxy); // true
//     console.log(trapTarget === receiver); // false
//     return trapTarget[property];
//   },
//   set(target, property, value, receiver) {
//     console.log(target === targetObj); // true
//     console.log(property); // age
//     console.log(value); // 12
//     console.log(receiver === proxy); // true
//     console.log(target === receiver); // false
//   }
// });
// console.log(proxy.name, "proxy");
// proxy.age = 12;

// function doSomething(arg1) {
//   console.log(1111);
//   arg1 = arg1 || 10;
//   // 如果尚未设置，则将 arg1 设置为 10 作为默认值
//   return arg1;
// }

// let foo = 10;
// // foo === 10 && doSomething();
// // is the same thing as if (foo == 10) then doSomething();
// // 输出: 10
// console.log(foo === 5);
// foo === 10 || doSomething();
// // is the same thing as if (foo != 5) then doSomething();
// // 输出: 10

// const obj = {};
// obj.__proto__.a = "aa";
// obj.a = "bb";
// console.log(obj);
// console.log(obj.a);

// 这个属性会返回一个调用该函数对象的外层函数引用。
// 也就是说，如果我们是在函数B()中调用函数A()的，
// 那么只要在A()中调用A.caller，结果就会返回B()
// function A(){return A.caller;}
// function B(){return A();}
// console.log(B())

// (function B() {
//   (function A() {
//     console.log(A.caller);
//   })()
// })()
// function A() {
//   console.log(arguments.callee);
// }
// A();
//如题
//add(1)(2)(3)
//逻辑应该是这样add(1)执行收集参数1继续执行收集参数2依次类推直到收集完毕。
// function curry(fn) {
//   let arg = []; //用于收集参数
//   //做一个闭包https://segmentfault.com/a/1190000017824877
//   return function () {
//     //每执行一次收集一次参数,为什么用concat是因为有时候后是多个参数(2,3)
//     arg = arg.concat([...arguments]);
//     //直到参数收集完成执行fn
//     // 我们需要知道什么时候收集完了，条件就是curry参数fn的参数个数 fn.length
//     //如果收集的参数个数大于等于fn的参数个数执行fn,如果没有递归执行
//     if (arg.length >= fn.length) {
//       return fn(...arg);
//     }
//     // 参数没有收集完我们需要继续收集，递归
//     return arguments.callee;
//   };
// }
// // 测试一下
// let testAdd = curry(add1);
// // console.log(testAdd(1)(2)(3))
// // console.log(testAdd(1, 2)(3))
// //console.log(testAdd(1)(2, 3))
// function curry(fn) {}

// {
//   var a = {name: 1};
// }
// a.name = 2;
// console.log(a.name);
// const compose = (a , b) => {
//   return c => a( b( c ) )
// };
const obj = {
  name: "12",
  get cc() {
    return this.name;
  }
}
console.log(obj.cc);