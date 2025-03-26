<!--
 * @Author: dqr
 * @Date: 2025-03-24 10:37:18
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-26 14:48:50
 * @FilePath: /收费站-three/src/components/Three/ThreeCanvas.vue
 * @Description: 
 * 
-->

<script setup>
// 引入Three.js
import * as THREE from 'three'
import { scene } from './ThreeBase/scene'
import './ThreeBase/renderLoop'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import Control from './Control.vue'
import Choose from './Choose.vue'

const model = new THREE.Group()
const isLoad = ref(false)

// 环境贴图
const cubeTexture = new THREE.CubeTextureLoader()
  .setPath('./环境贴图/环境贴图1/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

const loader = new GLTFLoader()
loader.load('./收费站.glb', function (gltf) {
  gltf.scene.traverse(function (obj) {
    if (obj.isMesh) {
      // console.log("🚀 ~ obj:", obj)
      obj.material.envMap = cubeTexture
      obj.material.envMapIntensity = 0.5
    }
  })
  isLoad.value = true
  model.add(gltf.scene)
})
scene.add(model)




</script>

<template>
<Control v-if="isLoad" :model="model" />
<ShouNum v-if="isLoad" :model="model" />
<Choose v-if="isLoad" :model="model" />
</template>
