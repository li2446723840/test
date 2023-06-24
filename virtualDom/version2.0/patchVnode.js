import createElm from "./createElm.js";
import updateChildren from "./updateChildren.js";

export default function patchVnode(oldVnode, newVnode) {
  // 判断新节点有没有children
  if (newVnode.children === undefined) { // 3.1、新节点没有children，说明新的节点是文本，直接把旧的替换成新的文本。
    if (newVnode.text !== oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text;
    }
  } else { // 3.2、新的节点有children。
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) { // 3.2.1、旧的节点也有children。diff算法的核心。
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else { // 3.2.2、旧的节点没有children。删除旧的内容，添加新的内容。
      for (const child of newVnode.children) {
        oldVnode.elm.innerHTML = "";
        let childDom = createElm(child);
        oldVnode.elm.appendChild(childDom);
      }
    }
  }
}