export default function createElm(vnode) {
  let domNode = document.createElement(vnode.sel); // 创建dom节点
  // 判断有没有子节点（通过判断children是不是undefined）
  if (vnode.children === undefined) { // 没有子节点
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children)){
    // 有子节点，需要递归创建节点
    for (const child of vnode.children) {
      let childDom = createElm(child);
      domNode.appendChild(childDom)
    }
  }
  vnode.elm = domNode; // 给vnode补充elm属性
  return domNode;
}
