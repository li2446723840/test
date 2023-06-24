// const res = new Promise(function (resolve, reject) {
//   console.log(11111);
//   reject(12)
//   // resolve(123)
// })
// console.log(res.catch((res) => {
//   console.log(res, "res");
// }).then((res) => {
//   console.log(res, "res2");
// }));
// Array.prototype.myFlat = function (num = 1) {
//   const result = []
//   function recursion(data, tier) {
//     for (const item of data) {
//       if (Array.isArray(item) && tier <= num) {
//         recursion(item, tier + 1)
//       } else {
//         result.push(item)
//       }
//     }
//   }
//   recursion(this, 1)
//   return result
// }
// const arr = [1, 2, [3, 4, [5, 6]], 7];
// const res = arr.myFlat(2);
// console.log(res);

// const p1 = new Promise((resolve, reject) => {
//   console.log(11111);
//   setTimeout(() => {
//     resolve(2222)
//   })
// });
// const p2 = new Promise((resolve, reject) => {
//   console.log(333);
//   setTimeout(() => {
//     // resolve(4444)
//     reject(4444)
//   })
// });

// Promise.myAll = function (promises) {
//   const results = [];
//   let promiseCount = 0;
//   let promisesLength = promises.length;
//   return new Promise((resolve, reject) => {
//     for (let val of promises) {
//       Promise.resolve(val).then((res) => {
//         promiseCount++;
//         // results[i] = res;
//         results.push(res);
//         // 当所有函数都正确执行了，resolve输出所有返回结果。
//         if (promiseCount === promisesLength) {
//           return resolve(results);
//         }
//       }, function (err) {
//         return reject(err);
//       });
//     }
//   });
// };
// Promise.myAll([p1, p2]).then(res => {
//   console.log(res, "res");
// }).catch((err) => {
//   console.log(typeof err, "err");
// })

// a = "aa"
// const obj = {
//   a: "12",
//   fn: () => {
//     console.log(this.a, "this.a");
//   }
// }
// obj.fn()
