/*
 * @Author: dqr
 * @Date: 2025-03-24 11:15:13
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-28 09:38:51
 * @FilePath: /TollStationThree/src/components/Three/ThreeBase/renderLoop.js
 * @Description: 
 * 
 */
import {
  scene
} from './scene.js' //Three.js三维场景
import {
  camera
} from './camera.js' //相机对象
import {
  renderer,
  css3Renderer,
  css2Renderer
} from './renderer.js' //渲染器对象
import {composer} from './composer.js'
// 渲染循环
function render() {
  // renderer.render(scene, camera);
  composer.render(scene, camera);
  css3Renderer.render(scene, camera);
  css2Renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

// 画布跟随窗口变化
window.onresize = function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(innerWidth, innerHeight);
  css2Renderer.setSize(width,height);
  css3Renderer.setSize(width,height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};