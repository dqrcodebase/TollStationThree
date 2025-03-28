<!--
 * @Author: dqr
 * @Date: 2025-03-26 14:51:56
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-27 10:01:53
 * @FilePath: /TollStationThree/src/components/Three/Choose.vue
 * @Description: 
 * 
-->
<script setup>
import { createCameraTween } from './ThreeBase/createTween'
import {tag} from './messageTag'
import { raychoose } from './ThreeBase/raychoose'
import * as THREE from 'three'
import messageData from './messageData'
const chooseObj = ref(null)
const { model, camera, outlinePass, controls } = defineProps([
  'model',
  'camera',
  'outlinePass',
  'controls',
])
const chooseInfo = ref({
  shoufeizhan: '收费站',
  CarNum: '0',
  shouName: '收费员',
  shouNameId: '000000',
})
let windowBody = []
onMounted(() => {
  windowBody = model.getObjectByName('收费窗口').children
  windowBody.forEach((element) => {
    element.traverse(function (obj) {
      obj.windowBody = element
    })
  })
  createChoose()
})
addEventListener('click', function (event) {
  chooseObj.value = raychoose(event, camera, windowBody)
  if (!chooseObj.value) {
    outlinePass.selectedObjects = []
    return
  }
  const name = chooseObj.value.windowBody.name
  chooseInfo.value = {
    shoufeizhan: messageData[name].shoufeizhan,
    CarNum: messageData[name].CarNum,
    shouName: messageData[name].shouName,
    order: messageData[name].order,
    shouNameId: messageData[name].shouNameId,
  }
  const dom = tag('messageTag')
  chooseObj.value.windowBody.add(dom)
  outlinePass.selectedObjects = [chooseObj.value.windowBody]
  chooseObj.value.windowBody.inTween.start()
})
function createChoose() {
  windowBody.forEach((item) => {
    const target = new THREE.Vector3()
    item.getWorldPosition(target)
    const pos = new THREE.Vector3()
    pos.set(target.x - 5, target.y + 3, target.z + 10)
    createCameraTween(item, camera, controls, pos, target)
  })
}
</script>
<template>
  <div id="messageTag">
    <div
      v-if="chooseObj"
      style="
        width: 500px;
        height: 400px;
        position: absolute;
        color: #fff;
        z-index: 12;
        font-size: 16px;
      "
    >
      <!-- top:-80px;left: 20px;相对原来位置偏移5标注 -->
      <!-- top:-280px;left: -230px; -->
      <div style="position: relative; top: -280px; left: -230px">
        <!-- 收费站标签信息背景图片 -->
        <div style="position: absolute; left: 0px; top: 0px">
          <img
            src="../../assets/信息背景.png"
            alt=""
            style="width: 400px; opacity: 1"
          />
        </div>
        <!-- 收费站名称 -->
        <div
          id="shoufeizhan"
          style="
            color: linear-gradient(red, blue);
            position: absolute;
            left: 25px;
            top: 40px;
            font-size: 16px;
          "
        >
          {{ chooseInfo.shoufeizhan }}
        </div>

        <!-- 当天已经通车的次数 -->
        <div
          style="
            position: absolute;
            left: 155px;
            top: 80px;
            font-size: 60px;
            color: #00ffff;
            vertical-align: middle;
          "
        >
          <span id="CarNum">{{ chooseInfo.CarNum }}</span
          ><span style="font-size: 14px"> 车次 </span>
        </div>
        <div
          style="position: absolute; left: 85px; top: 163px; padding: 8px 25px"
        >
          <span id="shouName">{{ chooseInfo.shouName }}</span>
        </div>
        <div
          style="position: absolute; left: 200px; top: 165px; padding: 8px 25px"
        >
          工号：<span id="shouNameId">{{ chooseInfo.shouNameId }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
