/*
 * @Author: dqr
 * @Date: 2025-03-26 09:21:47
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-26 11:04:46
 * @FilePath: /收费站-three/src/components/Three/ThreeBase/createTween.js
 * @Description: 
 * 
 */
import TWEEN from '@tweenjs/tween.js';

function createGanTween(gz) {
  const obj = {
    angle: 0
  }
  const openTween = new TWEEN.Tween(obj)
  openTween.to({ angle: Math.PI / 2 }, 2000)
  openTween.onUpdate(function (env) {
    gz.rotation.z = env.angle
  })
  gz.open = openTween

  const closeTween = new TWEEN.Tween(obj)
  closeTween.to({ angle: 0 }, 2000)
  closeTween.onUpdate(function (env) {
    gz.rotation.z = env.angle
  })
  gz.close = closeTween


  function animate(time) {
    openTween.update(time)
    closeTween.update(time)
    requestAnimationFrame(animate)
  }
  animate()
}

export { createGanTween }