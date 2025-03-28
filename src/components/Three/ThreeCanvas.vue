<!--
 * @Author: dqr
 * @Date: 2025-03-24 10:37:18
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-28 10:09:21
 * @FilePath: /TollStationThree/src/components/Three/ThreeCanvas.vue
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
import { camera, controls } from './ThreeBase/camera'
import { outlinePass } from './ThreeBase/composer'
// DRACOLoader解析Draco压缩过的gltf模型
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import CarTag from './CarTag.vue'
import { ref } from 'vue'
const model = new THREE.Group()
const isLoad = ref(false)
const fileNum = ref(0)
const carArr = ref([])
const carBool = ref(false)
const percent = ref(0)

const fileArr = ['大货车', '警车', '救护车', '客车', '消防车', '小货车']
const numArr = [
  '豫N·55666',
  '京A·53466',
  '苏B·55556',
  '鲁C·51266',
  '苏D·33456',
  '鲁A·57826',
]
const nameArr = ['武大郎', '宋江', '武松', '林冲', '镇关西', '鲁智深']
const carGltfArr = []
// 环境贴图
const cubeTexture = new THREE.CubeTextureLoader()
  .setPath('./环境贴图/环境贴图1/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath( 'three/examples/jsm/libs/draco/');
dracoLoader.setDecoderPath('./libs/draco/gltf/')
loader.setDRACOLoader(dracoLoader)
loader.load(
  './收费站Draco.glb',
  function (gltf) {
    gltf.scene.traverse(function (obj) {
      if (obj.isMesh) {
        obj.material.envMap = cubeTexture
        obj.material.envMapIntensity = 0.5
      }
    })
    for (let i = 0; i < fileArr.length; i++) {
      loader.load('./车/' + fileArr[i] + 'Draco.glb', function (gltf2) {
        gltf2.scene.name = fileArr[i] //文件名作为车name的属性值
        fileNum.value++
        carGltfArr.push(gltf2.scene)
      })
    }
    isLoad.value = true
    model.add(gltf.scene)
  },
  function (progress) {
    console.log('🚀 ~ progress:', progress)
    percent.value = Math.floor((progress.loaded / progress.total) * 100)
    console.log("🚀 ~ percent.value:", percent.value)
  }
)
scene.add(model)

watch(fileNum, function (newVal) {
  if (newVal === fileArr.length) {
    carBool.value = true
  }
})
watch(carBool, function (newVal) {
  randomCreateCar()
})

function randomCreateCar() {
  let num = Math.random()
  if (num > 0.996) {
    createCar()
  }
  requestAnimationFrame(randomCreateCar)
}

function createCar() {
  let num = Math.floor(Math.random() * 6) + 2
  const carIndex = Math.floor(Math.random() * 6) //随机选择一辆车，并设置车的类型
  const car = carGltfArr[carIndex].clone()
  car.carType = carGltfArr[carIndex].name //车辆的类型
  car.order = num //所在车道
  car.num = numArr[Math.floor(Math.random() * 6)] //车牌号
  car.driverName = nameArr[Math.floor(Math.random() * 6)] //驾驶员姓名
  car.state = Math.random() > 0.5 ? '正常' : '异常' //状态
  carArr.value.push(car)
}
</script>

<template>
  <!-- 半透明遮挡背景图片 -->
  <div v-if="!isLoad" ref="back" class="back">
    <!-- 进度条 -->
    <el-progress
      class="percent"
      :text-inside="false"
      :stroke-width="6"
      :percentage="percent"
      striped
      striped-flow
    />
  </div>
  <template v-else>
    <Control :model="model" />
    <ShouNum :model="model" />
    <Choose
      :model="model"
      :camera="camera"
      :outlinePass="outlinePass"
      :controls="controls"
    />
    <car-tag
      :model="model"
      v-for="(obj, i) in carArr"
      :key="i"
      :car="obj"
    ></car-tag>
  </template>
</template>

<style scoped>
.percent {
  /* 居中 */
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -4px;
  margin-left: -200px;
  z-index: 11;
}

.back {
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  width: 100%;
  height: 100%;
}

/* .backimg {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9;
} */
</style>
