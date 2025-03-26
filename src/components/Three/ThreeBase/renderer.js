/*
 * @Author: dqr
 * @Date: 2025-03-24 11:12:51
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-26 11:22:31
 * @FilePath: /收费站-three/src/components/Three/ThreeBase/renderer.js
 * @Description: 
 * 
 */
import * as THREE from 'three';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';


// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
const width = window.innerWidth; //窗口文档显示区的宽度
const height = window.innerHeight; //窗口文档显示区的高度
// 创建渲染器对象
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 抗锯齿
  logarithmicDepthBuffer: true // 深度缓冲区 削弱深度冲突
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);


// 创建一个CSS3渲染器CSS3DRenderer
const css3Renderer = new CSS3DRenderer();
css3Renderer.setSize(width, height);
// HTML标签<div id="tag"></div>外面父元素叠加到canvas画布上且重合
css3Renderer.domElement.style.position = 'absolute';
css3Renderer.domElement.style.top = '0px';//具体值根据canvas画布位置来定
//设置.pointerEvents=none，解决HTML元素标签对threejs canvas画布鼠标事件的遮挡
css3Renderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(css3Renderer.domElement);

export { renderer ,css3Renderer};