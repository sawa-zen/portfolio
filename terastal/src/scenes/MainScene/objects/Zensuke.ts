import { ConeGeometry, Mesh, Object3D, SkinnedMesh } from 'three'
import type { GLTF } from 'three/examples/jsm/Addons.js'
import { Manipulator } from '../../../libs/Utsuroi'
import { TelastalMaterial } from '../materials/TerastalMaterial'

export class Zensuke extends Object3D {
  static _instance: Zensuke
  static get instance() {
    return Zensuke._instance || new Zensuke()
  }

  private _manipulator: Manipulator | null = null
  private _crown: Mesh | null = null

  constructor() {
    super()

    Zensuke._instance = this
  }

  private _handleLoadGLTF = (gltf: GLTF) => {
    const obj = gltf.scene
    obj.scale.set(0.35, 0.35, 0.35)
    obj.rotation.y = (180 * Math.PI) / 180

    obj.traverse((child) => {
      if (child instanceof SkinnedMesh) {
        child.castShadow = true
        // ワイヤーフレームの設定
        child.material = new TelastalMaterial({ map: child.material.map, kiraStrength: 0.2 })
        child.material.needsUpdate = true
        child.material.skinning = true

        this._crown = new Mesh(new ConeGeometry(3, 3, 6), new TelastalMaterial({}))
        const boneIndex = 9
        this._crown?.position.set(
          child.skeleton.bones[boneIndex].position.x,
          child.skeleton.bones[boneIndex].position.z + 4.5 + child.skeleton.bones[0].position.y,
          child.skeleton.bones[boneIndex].position.y - 0.8,
        )
        this._crown.rotation.x = Math.PI / 1.2
        child.add(this._crown)
      }
    })

    this._manipulator = new Manipulator(gltf.scene, gltf.animations)
    this._manipulator.play('Rest Pose', true)
    this.add(gltf.scene)
  }

  update() {
    this._manipulator?.update()
    const boneIndex = 9
    this._crown?.position.set(
      this._crown.parent?.skeleton.bones[boneIndex].position.x,
      this._crown.parent?.skeleton.bones[boneIndex].position.z +
        4.5 +
        this._crown.parent?.skeleton.bones[0].position.y,
      this._crown.parent?.skeleton.bones[boneIndex].position.y - 0.8,
    )
  }
}
