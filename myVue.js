// const bucket = new Set();
// let activeEffect;
// const effect = function(fn) {
//   activeEffect = fn;
//   fn();
// }
// const data = {text:"Hellow World"};
// const obj = new Proxy(data, {
//   get(target, key) {
//     if (activeEffect) {
//       bucket.add(activeEffect)
//     }
//     return target[key];
//   },
//   set(target, key, newVal) {
//     target[key] = newVal;
//     bucket.forEach(fn => fn());
//     return true;
//   }
// })
// effect(() => {
//   console.log("effect run");
//   document.body.innerText = obj.text;
// })

const bucket = new WeakMap();
let activeEffect;
const effect = function (fn) {
  activeEffect = fn;
  fn();
};
const data = { text: "Hellow World" };
const obj = new Proxy(data, {
  get(target, key) {
    if (!activeEffect) return target[key];
    let depsMap = bucket.get(target);
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()));
    }
    let deps = depsMap.get(key);
    if (!deps) {
      depsMap.set(key, (deps = new Set()));
    }
    deps.add(activeEffect);
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    const depsMap = bucket.get(target);
    if (!depsMap) return;
    const effects = depsMap.get(key);
    effects && effects.forEach(fn => fn());
  }
});
effect(() => {
  console.log("effect run");
  document.body.innerText = obj.text;
});
