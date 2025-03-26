<script setup>
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'
const chooseObj = ref(null)
const shoufeizhan = ref('')
const CarNum = ref('')
const shouName = ref('')
const shouNameId = ref('')
const {model} = defineProps(['model'])
onMounted(() => {
  model.getObjectByName('SF001')
  const div = document.getElementById('messageTag')
  const label = new CSS3DObject(div)
  model.add(label)
  createChoose()
})

function createChoose() {

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
          {{ shoufeizhan }}
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
          <span id="CarNum">{{ CarNum }}</span
          ><span style="font-size: 14px"> 车次 </span>
        </div>
        <div
          style="position: absolute; left: 85px; top: 163px; padding: 8px 25px"
        >
          <span id="shouName">{{ shouName }}</span>
        </div>
        <div
          style="position: absolute; left: 200px; top: 165px; padding: 8px 25px"
        >
          工号：<span id="shouNameId">{{ shouNameId }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
