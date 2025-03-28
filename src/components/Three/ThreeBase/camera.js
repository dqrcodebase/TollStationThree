/*
 * @Author: dqr
 * @Date: 2025-03-24 11:11:45
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-26 16:57:23
 * @FilePath: /TollStationThree/src/components/Three/ThreeBase/camera.js
 * @Description: 
 * 
 */
import * as THREE from 'three';
import { renderer } from './renderer';
// 引入Three.js扩展库
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import config from './config';
// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
const width = window.innerWidth; //窗口文档显示区的宽度
const height = window.innerHeight; //窗口文档显示区的高度

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(config.px, config.py, config.pz)
const x = config.tx, y = config.ty, z = config.tz;
camera.lookAt(x, y, z);

// 创建控制器对象
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(x, y, z);
controls.update();//update()函数内会执行camera.lookAt(controls.targe)

export { camera, controls };