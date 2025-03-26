<!--
 * @Author: dqr
 * @Date: 2025-03-26 10:56:07
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-26 14:20:41
 * @FilePath: /收费站-three/src/components/Three/ShouNum.vue
 * @Description: 
 * 
-->
<template>
  <div id="num">
    <!-- 给每个收费窗口标注一个CSS3标签：标注收费窗口序号 -->
    <!-- 也可以美术建模用用贴图标注 -->
    <div class="numTag" v-for="(num, i) in numArr" :key="i" :id="'CD' + i">
      0{{ num }}
    </div>
  </div>
</template>

<script setup>
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'
import { onMounted } from 'vue'
import * as THREE from 'three'
const { model } = defineProps(['model'])
const numArr = ref([1, 2, 3, 4, 5, 6, 7, 8])

onMounted(() => {
  numArr.value.forEach((ele, index) => {
    const obj = model.getObjectByName('CD0' + (index + 1))
    const label = new CSS3DObject(document.getElementById('CD' + index))
    const pos = new THREE.Vector3()
    obj.getWorldPosition(pos)
    label.position.copy(pos)
    model.add(label)
    label.position.y += 0.6
    label.scale.set(0.03, 0.03, 0.03)
  })
})
</script>

<style scoped>
.numTag {
  color: #ffffff;
  font-size: 18px;
  padding: 4px 16px;
  padding-bottom: 8px;
  background-image: url(../../assets/车道序号.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
