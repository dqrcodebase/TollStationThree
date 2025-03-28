/*
 * @Author: dqr
 * @Date: 2025-03-26 17:22:27
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-27 09:45:50
 * @FilePath: /TollStationThree/src/components/Three/ThreeBase/messageTag.js
 * @Description: 
 * 
 */
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

// 创建一个HTML标签对象
function tag(domID) {
  const dom = document.getElementById(domID);
  console.log("🚀 ~ tag ~ dom:", dom)
  //dom元素包装为CSS2模型对象CSS2DObject
  const label = new CSS2DObject(dom);
  console.log("🚀 ~ tag ~ label:", label)
  dom.style.pointerEvents = 'none';//避免HTML标签遮挡三维场景的鼠标事件
  // 设置HTML元素标签在three.js世界坐标中位置
  // label.position.set(x, y, z);
  return label;//返回CSS2模型标签      
}
export { tag }