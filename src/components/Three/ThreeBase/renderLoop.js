/*
 * @Author: dqr
 * @Date: 2025-03-24 11:15:13
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-26 09:34:29
 * @FilePath: /收费站-three/src/components/Three/ThreeBase/RenderLoop.js
 * @Description: 
 * 
 */
import {
  scene
} from './scene.js' //Three.js三维场景
import {
  camera
} from './Camera.js' //相机对象
import {
  renderer,
  css3Renderer
} from './renderer.js' //渲染器对象
// 渲染循环
function render() {
  renderer.render(scene, camera);
  css3Renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();