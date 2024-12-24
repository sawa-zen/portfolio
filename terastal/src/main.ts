import {
  AnimationMixer,
  Clock,
  ConeGeometry,
  GridHelper,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SkinnedMesh,
  Vector2,
  WebGLRenderer,
} from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import Stats from 'stats.js'
import './style.css'
import { TelastalMaterial } from './materials/TerastalMaterial'
import { RainbowFlareMaterial } from './materials/RainbowFlareMaterial'
import { Manipulator } from './libs/Utsuroi'

const renderer = new WebGLRenderer({ antialias: true })
renderer.setClearColor(0x000000)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

const camera = new PerspectiveCamera(85)
camera.position.set(-1.5, 0.5, 2.5)
camera.lookAt(0, 1, 0)

const controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true
controls.target.set(0, 1, 0)

const scene = new Scene()
const clock = new Clock()
const mixer = new AnimationMixer(scene)

const gridHelper = new GridHelper(10, 10, 0x222222, 0x222222)
scene.add(gridHelper)

// 王冠
const crown = new Mesh(new ConeGeometry(2.8, 2.8, 6), new TelastalMaterial({}))
crown.rotation.x = Math.PI
crown.position.y = 1.0
crown.position.z = 0.15

// ぜんすけ
let zensuke: SkinnedMesh | null = null
let manupulator: Manipulator | null = null
const loader = new GLTFLoader()
loader.load('./assets/models/zensuke.gltf', (gltf) => {
  const modelScene = gltf.scene
  modelScene.scale.set(0.25, 0.25, 0.25)
  modelScene.traverse((child) => {
    if (child instanceof SkinnedMesh) {
      zensuke = child
      // マテリアルの設定
      child.material = new TelastalMaterial({ map: child.material.map, kiraStrength: 0.2 })
      child.material.needsUpdate = true
      child.material.skinning = true
      // crownの位置を頭に追従させる
      const boneIndex = 12
      zensuke.skeleton.bones[boneIndex].add(crown)
    }
  })
  scene.add(gltf.scene)

  manupulator = new Manipulator(modelScene, gltf.animations)
  manupulator.play('Rest Pose', true)
})

// 虹色フレアエフェクト
const flareMaterial = new RainbowFlareMaterial()
const flarePlaneMesh = new Mesh(new PlaneGeometry(5, 5), flareMaterial)
flarePlaneMesh.rotation.x = -Math.PI / 2
scene.add(flarePlaneMesh)

const composer = new EffectComposer(renderer)
composer.setPixelRatio(window.devicePixelRatio)
composer.setSize(window.innerWidth, window.innerHeight)

const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

const unrealBloomPass = new UnrealBloomPass(
  new Vector2(window.innerWidth, window.innerHeight),
  0.8, // strength
  2.0, // radius
  0.1, // threshold
)
composer.addPass(unrealBloomPass)

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const tick = () => {
  stats?.begin()
  manupulator?.update()
  flareMaterial.update()
  composer.render()
  controls.update()
  if (mixer) {
    const delta = clock.getDelta()
    mixer.update(delta)
  }
  stats?.end()
  requestAnimationFrame(tick)
}

const resize = () => {
  renderer.setSize(innerWidth, innerHeight)
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
}

window.addEventListener('resize', resize)
resize()
tick()
