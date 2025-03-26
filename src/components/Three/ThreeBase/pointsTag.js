/*
 * @Author: dqr
 * @Date: 2025-03-24 16:10:02
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-24 16:41:52
 * @FilePath: /收费站-three/src/components/Three/ThreeBase/pointsTag.js
 * @Description: 
 * 
 */
// 引入Three.js
import * as THREE from 'three'

const spriteMap = new THREE.TextureLoader().load('./3D/光点.png')

function CreatePointsTag() {
  const spriteMaterial = new THREE.SpriteMaterial({
    map: spriteMap,
    transparent: true,
    color: 0x00ffff,
  })
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(1.0, 1.0, 1); //大小设置
  // 设置标注精灵Sprite波动，提示用户点击
  let s = 0.0;
  let Smax = 0.6;
  function waveAnimation() {
    s += 0.01;
    if (s < 0.5) {
      sprite.scale.x = Smax * (1 + s);
      sprite.scale.y = Smax * (1 + s);
    } else if (s > 0.5 && s < 1.0) {
      sprite.scale.x = Smax * (2 - s);
      sprite.scale.y = Smax * (2 - s);
    } else {
      s = 0.0;
    }
    requestAnimationFrame(waveAnimation);

  }
  waveAnimation()
  return sprite
}

export { CreatePointsTag }