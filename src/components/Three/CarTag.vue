<!--
 * @Author: dqr
 * @Date: 2025-03-27 11:11:18
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-27 16:48:06
 * @FilePath: /TollStationThree/src/components/Three/CarTag.vue
 * @Description: 
 * 
-->

<script setup>
import { CSS3DSprite } from 'three/addons/renderers/CSS3DRenderer.js'
import * as THREE from 'three'
import {createCarTween,createCarTweenFan} from './ThreeBase/createTween'

const { car, model } = defineProps(['car', 'model'])
const cartag = ref(null)
const carObj = toRaw(car)

onMounted(() => {
  carateTag()
  if(carObj.order > 4) {
    carObj.rotateY(Math.PI) 
    createCarTweenFan(carObj,cartag.value)
  }else {
    createCarTween(carObj,cartag.value)

  }
  startTween()

  const carAisle = model.getObjectByName(`CD0${car.order}`)
  const pos = new THREE.Vector3()
  carAisle.getWorldPosition(pos)
  carObj.position.copy(pos)
  model.add(carObj)
})

function carateTag() {
  const label = new CSS3DSprite(cartag.value)
  const box3 = new THREE.Box3()
  box3.expandByObject(car)
  const size = new THREE.Vector3()
  box3.getSize(size)
  label.scale.set(0.02, 0.02, 0.02)
  label.position.y += box3.max.y + 2
  car.add(label)
}
function startTween() {
  const gz = model.getObjectByName('GZ00' + (car.order ))
  carObj.stopTween.start()
  carObj.showTween.onComplete(function() {
    gz.open.start()
  })
  gz.open.onComplete(function() {
    carObj.runTween.start()
  })
  carObj.hideTween.onComplete(function() {
    gz.close.start()
  })
  carObj.runTween.onComplete(function() {
    model.remove(carObj)
  })
}
</script>
<template>
  <!-- css3渲染器会把该div元素默认渲染为绝对定位，默认HTML标签的几何中心与标注点位置世界坐标重合 -->
  <div ref="cartag" class="tag">
    <div class="container">
      <div>车牌号</div>
      <div>{{ car.num }}</div>
    </div>
    <div class="container">
      <div>司机</div>
      <div>{{ car.driverName }}</div>
    </div>
    <div class="container">
      <div>车型</div>
      <div>{{ car.carType }}</div>
    </div>
    <div class="container">
      <div>状态</div>
      <div v-if="car.state == '正常'" style="color: #00ff00">
        {{ car.state }}
      </div>
      <div v-if="car.state == '异常'" style="color: #ffff00">
        {{ car.state }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.tag {
  opacity: 0.0;
  background-image: url(../../assets/车信息背景3.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;

  /* width: 684px; */
  /* height: 616px; */
  color: #fff;
  font-size: 16px;

  z-index: 20;
  padding: 20px 30px;
  padding-bottom: 80px;
  /* width: 171px;
    height:154px ; */
}

.container {
  width: 200px;
  display: flex;
  /* row是flex-direction默认值,可以不设置，表示主轴为水平方向，从左向右排列*/
  flex-direction: row;
  /*space-between表示*/
  justify-content: space-between;
}

.container div {
  padding: 6px 0px;
  width: 120px;
}
</style>
