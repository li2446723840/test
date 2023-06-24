import patch from "./patch.js";
import h from "./h.js";

const container = document.getElementById("container"); // 真实dom
// const vnode = h("h1", {}, "你好"); // 虚拟dom
document.getElementById("btn1").onclick = function () {
  const vnode = h("div", {}, [
    h("div", {}, "div1"),
    h("div", {}, "div2"),
    h("div", {}, "div3")
  ]); // 虚拟dom
  patch(container, vnode);
};
