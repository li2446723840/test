// Function.prototype.myCall = function (context) {
//   let args = [...arguments].slice(1);
//   let target = context || window;
//   let fn = Symbol();
//   console.log(this, "this");
//   target[fn] = this;
//   target[fn](...args);
//   delete target[fn];
// };
// let objA = { abc: 123 };
// function funca(a) {
//   console.log(this, "this111");
//   console.log(this.abc, a);
// }
// funca.myCall(objA, "456");

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
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : () => {};
      onReject = typeof onReject === "function" ? onReject : () => {};
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
}).then((res)=> {
  console.log(res);
}, err => {
  console.log(err);
})
// commitment


