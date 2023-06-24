// 数组扁平化、去重、排序
let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
// 解法1 es新特性
// console.log(Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b));
// 解法2 递归数组扁平化、遍历去重、遍历排序
// 手写flat方法
Array.prototype.myFlat = function (num = 1) {
  const result = [];
  function recursion(data, tier) {
    for (const item of data) {
      if (Array.isArray(item) && num >= tier) {
        recursion(item, tier + 1); // 此处不能使用++tier，因为会改变tier原始值
      } else {
        result.push(item);
      }
    }
  }
  recursion(this, 1);
  return result;
};
// console.log(arr.myFlat(Infinity));
// 手写数组去重
Array.prototype.deWeight = function () {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    let isOnly = true;
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] === this[j]) {
        isOnly = false;
        break;
      }
    }
    if (isOnly) result.push(this[i]);
  }
  return result;
};
// console.log(arr.myFlat(Infinity).deWeight());

// 手写at方法
Array.prototype.myAt = function (index) {
  const context = this;
  return (
    (index < 0 ? context[context.length + index] : context[index]) || undefined
  );
};
// console.log(arr.myAt(-1));

const brackets = function (origin) {
  if (!Array.prototype.at) {
    Array.prototype.at = function (index) {
      const context = this;
      return (
        (index < 0 ? context[context.length + index] : context[index]) ||
        undefined
      );
    };
  }
  const result = [];
  const map = {
    "{": "}",
    "[": "]",
    "(": ")"
  };
  for (const item of origin.split("")) {
    if (map[item]) {
      result.push(item);
    } else if (map[result.at(-1)] === item) {
      result.pop();
    }
  }
  return result.length === 0;
};
const str = "(11{3)()";
// console.log(brackets(str));
// ---------------------------------call、apply、bind-------------------------------------------
const obj = {
  a: "aaa"
};
Function.prototype.myCall = function (context) {
  const arg = [...arguments].slice(1);
  const target = context || window;
  const fn = Symbol();
  target[fn] = this;
  target[fn](...arg);
  delete target[fn];
};
Function.prototype.myApply = function (context, [...arg]) {
  // const arg = [...arguments].slice(1);
  const target = context || window;
  const fn = Symbol();
  target[fn] = this;
  target[fn](...arg);
  delete target[fn];
};
Function.prototype.myBind = function (context) {
  const arg = [...arguments].slice(1);
  const _this = this;
  return function() {
    const target = context || window;
    const fn = Symbol();
    target[fn] = _this;
    target[fn](...arg);
    delete target[fn];
  }
};

function callApplyBind(a, b) {
  console.log(this.a);
  console.log(a, b);
}
// callApplyBind.myCall(obj, 12, 3);
// callApplyBind.myApply(obj, [12,3]);
// callApplyBind.myBind(obj, 12,3);

// -----------------------柯里化-----------------------

