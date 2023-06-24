import vnode from "./vnode.js";

export default function h(sel, data, params) {
  if (typeof params === "string") { // params是字符串类型，意味没有子元素
    return vnode(sel, data, undefined, params, undefined)
  } else if (Array.isArray(params)) {
    return vnode(sel, data, params, undefined, undefined);
  }
}