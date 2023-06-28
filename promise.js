const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // Promise/A+ 2.3.3.3.3 只能调用一次
  let called;
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
      let then = x.then;
      if (typeof then === "function") {
        // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
        then.call(
          x,
          (y) => {
            // 根据 promise 的状态决定是成功还是失败
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            // 只要失败就失败 Promise/A+ 2.3.3.3.2
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      // Promise/A+ 2.3.3.2
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
    resolve(x);
  }
};

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      // 这里需要注意的是，promise.resolve 是具备等待功能的。如果参数是 promise 会等待这个 promise 解析完毕，在向下执行，所以这里需要在 resolve 方法中做一个小小的处理
      if (value instanceof Promise) {
        // 递归解析
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  // 默认产生一个成功的 promise。
  static resolve(data) {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }
  // 默认产生一个失败的 promise，Promise.reject 是直接将值变成错误结果。
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  then(onFulfilled, onRejected) {
    //解决 onFufilled，onRejected 没有传值的问题
    //Promise/A+ 2.2.1 / Promise/A+ 2.2.5 / Promise/A+ 2.2.7.3 / Promise/A+ 2.2.7.4
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    // 每次调用 then 都返回一个新的 promise  Promise/A+ 2.2.7
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        //Promise/A+ 2.2.2
        //Promise/A+ 2.2.4 --- setTimeout
        setTimeout(() => {
          try {
            //Promise/A+ 2.2.7.1
            let x = onFulfilled(this.value);
            // x可能是一个proimise
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            //Promise/A+ 2.2.7.2
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        //Promise/A+ 2.2.3
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}
// Promise.prototype.catch 用来捕获 promise 的异常，就相当于一个没有成功的 then。
Promise.prototype.catch = function (errCallback) {
  return this.then(null, errCallback);
};
// finally 表示不是最终的意思，而是无论如何都会执行的意思。 如果返回一个 promise 会等待这个 promise 也执行完毕。如果返回的是成功的 promise，会采用上一次的结果；如果返回的是失败的 promise，会用这个失败的结果，传到 catch 中。
Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => {
      return Promise.resolve(callback()).then(() => value);
    },
    (reason) => {
      return Promise.resolve(callback()).then(() => {
        throw reason;
      });
    }
  );
};
// promise.all 是解决并发问题的，多个异步并发获取最终的结果（如果有一个失败则失败）。

Promise.all = function (values) {
  if (!Array.isArray(values)) {
    const type = typeof values;
    return new TypeError(`TypeError: ${type} ${values} is not iterable`);
  }
  return new Promise((resolve, reject) => {
    let resultArr = [];
    let orderIndex = 0;
    const processResultByKey = (value, index) => {
      resultArr[index] = value;
      if (++orderIndex === values.length) {
        resolve(resultArr);
      }
    };
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      if (value && typeof value.then === "function") {
        value.then((value) => {
          processResultByKey(value, i);
        }, reject);
      } else {
        processResultByKey(value, i);
      }
    }
  });
};
// Promise.race 用来处理多个请求，采用最快的（谁先完成用谁的）。
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    // 一起执行就是for循环
    for (let i = 0; i < promises.length; i++) {
      let val = promises[i];
      if (val && typeof val.then === "function") {
        val.then(resolve, reject);
      } else {
        // 普通值
        resolve(val);
      }
    }
  });
};
// 特别需要注意的是：因为Promise 是没有中断方法的，xhr.abort()、ajax 有自己的中断方法，axios 是基于 ajax 实现的；fetch 基于 promise，所以他的请求是无法中断的。这也是 promise 存在的缺陷，我们可以使用 race 来自己封装中断方法：

function wrap(promise) {
  // 在这里包装一个 promise，可以控制原来的promise是成功还是失败
  let abort;
  let newPromise = new Promise((resolve, reject) => {
    // defer 方法
    abort = reject;
  });
  let p = Promise.race([promise, newPromise]); // 任何一个先成功或者失败 就可以获取到结果
  p.abort = abort;
  return p;
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 模拟的接口调用 ajax 肯定有超时设置
    resolve("成功");
  }, 1000);
});

let newPromise = wrap(promise);

setTimeout(() => {
  // 超过3秒 就算超时 应该让 proimise 走到失败态
  newPromise.abort("超时了");
}, 3000);

newPromise
  .then((data) => {
    console.log("成功的结果" + data);
  })
  .catch((e) => {
    console.log("失败的结果" + e);
  });
  
// promisify 是把一个 node 中的 api 转换成 promise 的写法。 在 node 版本 12.18 以上，已经支持了原生的 promisify 方法：const fs = require('fs').promises。
const promisify = (fn) => {
  // 典型的高阶函数 参数是函数 返回值是函数
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        // node中的回调函数的参数 第一个永远是error
        if (err) return reject(err);
        resolve(data);
      });
    });
  };
};
// 如果想要把 node 中所有的 api 都转换成 promise 的写法呢：

const promisifyAll = (target) => {
  Reflect.ownKeys(target).forEach((key) => {
    if (typeof target[key] === "function") {
      // 默认会将原有的方法 全部增加一个 Async 后缀 变成 promise 写法
      target[key + "Async"] = promisify(target[key]);
    }
  });
  return target;
};
