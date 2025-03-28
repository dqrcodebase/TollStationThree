/*
 * @Author: dqr
 * @Date: 2025-03-26 15:38:42
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-28 10:13:40
 * @FilePath: /TollStationThree/src/components/Three/ThreeBase/composer.js
 * @Description: 
 * 
 */
import * as THREE from 'three';
import {renderer} from './renderer.js';
import {camera} from './camera.js';
import {scene} from './scene.js';
// 引入后处理扩展库EffectComposer.js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
// 伽马校正后处理Shader
import {GammaCorrectionShader} from 'three/addons/shaders/GammaCorrectionShader.js';
// ShaderPass功能：使用后处理Shader创建后处理通道
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';

import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

const composer = new EffectComposer(renderer);
// 渲染通道
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// 轮廓通道
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
//模型描边颜色，默认白色
outlinePass.visibleEdgeColor.set(0x00ffff);
//高亮发光描边厚度
outlinePass.edgeThickness = 4; 
//高亮描边发光强度
outlinePass.edgeStrength = 6; 
 //模型闪烁频率控制，默认0不闪烁
outlinePass.pulsePeriod = 2;
composer.addPass(outlinePass);
// 创建伽马校正通道
const gammaPass= new ShaderPass(GammaCorrectionShader);
composer.addPass(gammaPass);

// FXAA锯齿
const FXAA = new ShaderPass( FXAAShader );
FXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
composer.addPass( FXAA );


export {composer,outlinePass}

