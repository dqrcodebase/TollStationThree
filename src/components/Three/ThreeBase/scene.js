/*
 * @Author: dqr
 * @Date: 2025-03-24 11:09:29
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-26 09:52:53
 * @FilePath: /收费站-three/src/components/Three/ThreeBase/scene.js
 * @Description: 
 * 
 */
import * as THREE from 'three';

// 创建3D场景对象Scene
const scene = new THREE.Scene();

/**
 * 光源设置
 */
// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
// const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.9);
// directionalLight2.position.set(-400, -200, -300);
// scene.add(directionalLight2);
//环境光
const ambient = new THREE.AmbientLight(0xffffff,2);
scene.add(ambient);


const texture = new THREE.TextureLoader().load( "./全景2048.jpg" );

const geometry = new THREE.SphereGeometry(1000, 32, 16)
const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide,map:texture })
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


export { scene };