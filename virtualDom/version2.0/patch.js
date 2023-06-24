import vnode from "./vnode.js";
import createElm from "./createElm.js";
import patchVnode from "./patchVnode.js";
/**
 * @description diff算法
 * @oldVnode  {Object} 旧的虚拟dom
 * @newVnode  {Object} 新的虚拟dom
 * @return {Number}   返回两个数字之和
 */
export default function patch(oldVnode, newVnode) {
  // 如果oldVnode没有sel，就证明是非虚拟节点（需要转换为虚拟节点，方便对比）
  if (oldVnode.sel === undefined) {
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
    console.log(oldVnode, "oldVnode");
  }
  // 判断旧的虚拟节点和新的虚拟节点是不是同一个节点
  if (oldVnode.sel === newVnode.sel) {
    patchVnode(oldVnode, newVnode);
  } else {
    // 不是同一个节点，直接删除旧的节点，创建新的节点
    let newVnodeElm = createElm(newVnode); // 把新的虚拟dom创建为真实dom节点
    let oldVnodeElm = oldVnode.elm; // 获取旧的虚拟dom的真实节点
    newVnodeElm && oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm); // 添加新节点
    oldVnodeElm.parentNode.removeChild(oldVnodeElm); // 删除旧节点
  }
}
