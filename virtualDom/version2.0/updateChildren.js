import createElm from "./createElm";
import patchVnode from "./patchVnode.js";

function sameVnode(vNode1, vNode2) {
  return vNode1.key === vNode2.key;
}
/**
* @description 这是一个求和函数
* @param  {Number} a 第一个数字
* @param  {Number} b 第二个数字
* @return {Number}   返回两个数字之和
*/
export default function updateChildren(parentElm, oldChildren, newChildren) {
  let oldStartIdx = 0; // 旧前的指针
  let oldEndIdx = oldChildren.length - 1; // 旧后的指针
  let newStartIdx = 0; // 新前的指针
  let newEndIdx = newChildren.length - 1; // 新后的指针
  let oldStartVnode = oldChildren[oldStartIdx]; // 旧前的虚拟节点
  let oldEndVnode = oldChildren[oldEndIdx]; // 旧后的虚拟节点
  let newStartVnode = newChildren[newStartIdx]; // 新前的虚拟节点
  let newEndVnode = newChildren[newEndIdx]; // 新后的虚拟节点
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode === undefined) {
      oldStartVnode = oldChildren[++oldStartIdx];
    } else if (oldEndVnode === undefined) {
      oldEndVnode = oldChildren[--oldEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      if (newStartVnode) newStartVnode.elm = oldStartVnode?.elm;
      oldStartVnode = oldChildren[++oldStartIdx];
      newStartVnode = newChildren[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      if (newEndVnode) newEndVnode.elm = oldEndVnode?.elm;
      oldEndVnode = oldChildren[--oldEndIdx];
      newEndVnode = newChildren[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      if (newEndVnode) newEndVnode.elm = oldStartVnode?.elm;
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling); // 把旧前指定的节点移动到旧后指向的节点的后面
      oldStartVnode = oldChildren[++oldStartIdx];
      newEndVnode = newChildren[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      if (newStartVnode) newStartVnode.elm = oldEndVnode?.elm;
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm.nextSibling); // 把旧后指定的节点移动到旧前指向的节点的后面
      oldEndVnode = oldChildren[--oldEndIdx];
      newStartVnode = newChildren[++newStartIdx];
    } else {
      // 创建一个对象，存虚拟节点的（判断新旧有没有相同节点）
      const keyMap = {};
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        const key = oldChildren?.key;
        if (key) keyMap[key] = i;
      }
      // 在旧节点中寻找新前指向的节点
      let idxInOld = keyMap[newStartVnode.key];
      if (idxInOld) { // 如果有，说明数据在新旧虚拟节点中都存在
        const elmMove = oldChildren[idxInOld];
        patchVnode(elmMove, newStartVnode);
        oldChildren[idxInOld] = undefined;
        parentElm.insertBefore(elmMove.elm, oldStartVnode.elm);
      } else { // 如果没有，说明是一个新节点，需要创建
        parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm);
      }
    }
  }
  if (newStartIdx <= newEndIdx) {
    console.log('进入添加剩余节点')
    // 这是一个标识
    // let beforeFlag = oldChildren[oldEndIdx + 1] ? oldChildren[oldEndIdx + 1].elm : null
    let beforeFlag = newChildren[newEndIdx + 1] ? newChildren[newEndIdx + 1] : null
    // new 里面还有剩余节点 遍历添加
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // newChildren里面的子节点还需要 从虚拟DOM 转为 DOM
      parentElm.insertBefore(createElm(newChildren[i]), beforeFlag)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('进入删除多余节点')
    // old 里面还有剩余 节点 ,旧前 和 旧后 之间的节点需要删除
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      // 删除 剩余节点之前 先判断下是否存在
      if (oldChildren[i].elm) parentElm.removeChild(oldChildren[i].elm)
    }
  }
}