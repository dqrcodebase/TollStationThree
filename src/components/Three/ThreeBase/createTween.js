/*
 * @Author: dqr
 * @Date: 2025-03-26 09:21:47
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-27 16:48:41
 * @FilePath: /TollStationThree/src/components/Three/ThreeBase/createTween.js
 * @Description: 
 * 
 */
import TWEEN from '@tweenjs/tween.js';
import config from './config';

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

function createCameraTween(choose, camera, controls, pos, target) {
  const obj = {
    x: config.px,
    y: config.py,
    z: config.pz,
    lookAtX: config.tx,
    lookAtY: config.ty,
    lookAtZ: config.tz
  }

  const inTween = new TWEEN.Tween(obj)
  const changeObj = {
    x: pos.x,
    y: pos.y,
    z: pos.z,
    lookAtX: target.x,
    lookAtY: target.y,
    lookAtZ: target.z
  }
  inTween.to(changeObj, 2000)
  inTween.onUpdate(function (env) {
    camera.position.set(env.x, env.y, env.z)
    // camera.lookAt(env.lookAtX, env.lookAtY, env.lookAtZ);
    controls.target.set(env.lookAtX, env.lookAtY, env.lookAtZ);
    controls.update();
  })
  choose.inTween = inTween

  const outTween = new TWEEN.Tween(obj)
  outTween.to(obj, 2000)
  outTween.onUpdate(function (env) {
    camera.position.set(env.x, env.y, env.z)
    // camera.lookAt(env.lookAtX, env.lookAtY, env.lookAtZ);
    controls.target.set(env.lookAtX, env.lookAtY, env.lookAtZ);
    controls.update();
  })

  choose.outTween = outTween
  function animate(time) {
    inTween.update(time)
    outTween.update(time)
    requestAnimationFrame(animate)
  }
  animate()
}

function createCarTween(car, tagDom) {
  const obj = {
    z: 40,
    opacity: 0
  }
  const stopTween = new TWEEN.Tween(obj)
  stopTween.to({ z: 15 }, 3000)
  stopTween.onUpdate(function (env) {
    car.position.z = env.z
  })

  const showTween = new TWEEN.Tween(obj)
  showTween.to({ z: 10, opacity: 1 }, 1000)
  showTween.onUpdate(function (env) {
    car.position.z = env.z
    tagDom.style.opacity = env.opacity
  })

  const runTween = new TWEEN.Tween(obj)
  runTween.to({ z: -200 }, 10000)
  runTween.onUpdate(function (env) {
    car.position.z = env.z
    tagDom.style.opacity = env.opacity
  })

  const hideTween = new TWEEN.Tween(obj)
  hideTween.to({ opacity: 0 }, 2000)
  hideTween.onUpdate(function (env) {
    tagDom.style.opacity = env.opacity
  })

  stopTween.onComplete(function () {
    showTween.start()
  })

  runTween.onStart(function () {
    hideTween.start()
  })

  car.stopTween = stopTween
  car.showTween = showTween
  car.runTween = runTween
  car.hideTween = hideTween
  function animate(time) {
    stopTween.update(time)
    showTween.update(time)
    runTween.update(time)
    hideTween.update(time)
    requestAnimationFrame(animate)
  }
  animate()
}
function createCarTweenFan(car, tagDom) {
  const obj = {
    z: -40,
    opacity: 0
  }
  const stopTween = new TWEEN.Tween(obj)
  stopTween.to({ z: -15 }, 3000)
  stopTween.onUpdate(function (env) {
    car.position.z = env.z
  })

  const showTween = new TWEEN.Tween(obj)
  showTween.to({ z: -10, opacity: 1 }, 1000)
  showTween.onUpdate(function (env) {
    car.position.z = env.z
    tagDom.style.opacity = env.opacity
  })

  const runTween = new TWEEN.Tween(obj)
  runTween.to({ z: 200 }, 10000)
  runTween.onUpdate(function (env) {
    car.position.z = env.z
    tagDom.style.opacity = env.opacity
  })

  const hideTween = new TWEEN.Tween(obj)
  hideTween.to({ opacity: 0 }, 2000)
  hideTween.onUpdate(function (env) {
    tagDom.style.opacity = env.opacity
  })

  stopTween.onComplete(function () {
    showTween.start()
  })

  runTween.onStart(function () {
    hideTween.start()
  })

  car.stopTween = stopTween
  car.showTween = showTween
  car.runTween = runTween
  car.hideTween = hideTween
  function animate(time) {
    stopTween.update(time)
    showTween.update(time)
    runTween.update(time)
    hideTween.update(time)
    requestAnimationFrame(animate)
  }
  animate()
}


export { createGanTween, createCameraTween, createCarTween,createCarTweenFan }