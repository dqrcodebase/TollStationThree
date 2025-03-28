<!--
 * @Author: dqr
 * @Date: 2025-03-24 15:18:38
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-27 10:05:20
 * @FilePath: /TollStationThree/src/components/Three/Control.vue
 * @Description: 
 * 
-->

<script setup>
import { CreatePointsTag } from './ThreeBase/pointsTag'
import { raychoose } from './ThreeBase/raychoose.js'
import { camera } from './ThreeBase/camera.js'
import { createGanTween } from './ThreeBase/createTween.js'
const dangganArr = ref([])
const spriteArr = []
const allBool = ref(false)
const { model } = defineProps(['model'])
const boolNum = model.getObjectByName('通行杆').children.length

onMounted(() => {
  createSwitch()
})

watch(allBool,(newVal) => {
    console.log("🚀 ~ watch ~ newVal:", newVal)
    dangganArr.value.forEach((ele,index) => {
      ele.isOpen = newVal
      openClose(index,ele)
    })
})

function createSwitch() {
  for (let i = 0; i < boolNum; i++) {
    const gz = model.getObjectByName('GZ00' + (i + 1))
    const sprite = CreatePointsTag()
    sprite.position.x = 3
    sprite.position.z = 1
    sprite.i = i
    gz.add(sprite)
    createGanTween(gz)
    dangganArr.value.push({
      id: `GZ00${i + 1}`,
      isOpen: false,
      gz,
    })
    spriteArr.push(sprite)
  }
}

addEventListener('click', function (event) {
  const sprite = raychoose(event, camera, spriteArr)
  if (sprite) {
    const gz = model.getObjectByName('GZ00' + (sprite.i + 1))
    if (gz.openBool) {
      gz.close.start()
      gz.close.onStart(function () {
        gz.openBool = false
      })
    } else {
      gz.open.start()
      gz.open.onStart(function () {
        gz.openBool = true
      })
    }
  }
})

function openClose(i, danggan) {
  console.log("🚀 ~ openClose ~ i, danggan:", i, danggan)
  const gz = model.getObjectByName('GZ00' + (i + 1))
  if (!danggan.isOpen) {
      gz.close.start()
      gz.close.onStart(function () {
        gz.openBool = false
      })
    } else {
      gz.open.start()
      gz.open.onStart(function () {
        gz.openBool = true
      })
    }
}

</script>

<template>
  <div class="con">
    <div style="padding: 8px 12px; margin-top: -10px">
      <div class="out">
        <span class="in">全开</span>
        <el-switch v-model="allBool" />
      </div>
      <div class="out" v-for="(danggan, i) in dangganArr" :key="i">
        <span class="in">0{{ i + 1 }}</span>
        <!-- v-model直接绑定val会报错 -->
        <el-switch
          v-model="dangganArr[i].isOpen"
          @click="openClose(i, danggan)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.con {
  position: absolute;
  top: 250px;
  left: 20px;
}

.out {
  background: rgba(0, 0, 0, 0.4);
  width: 100px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  margin-top: 20px;
}

.in {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.3);
  display: inline-block;
  line-height: 40px;
  color: #fff;
  text-align: center;
  /* vertical-align:; */
}
</style>
