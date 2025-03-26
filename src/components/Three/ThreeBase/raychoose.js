/*
 * @Author: dqr
 * @Date: 2025-03-24 16:46:48
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-26 09:16:21
 * @FilePath: /收费站-three/src/components/Three/ThreeBase/raychoose.js
 * @Description: 
 * 
 */
import * as THREE from 'three';
import config from './config';

function raychoose(event, camera, points) {
  const Sx = event.clientX; //鼠标单击位置横坐标
  const Sy = event.clientY; //鼠标单击位置纵坐标
  //屏幕坐标转WebGL标准设备坐标
  const x = (Sx / config.cWidth) * 2 - 1; //WebGL标准设备横坐标
  const y = -(Sy / config.cHeight) * 2 + 1; //WebGL标准设备纵坐标
  const pointer = new THREE.Vector2(x, y);
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(points);
  let choose =null;
  if (intersects.length > 0) {
      choose=intersects[0].object;
  }
  return choose;
}

export { raychoose }