import { Scene } from 'three'
import { Zensuke } from './objects/Zensuke'

export class MainScene extends Scene {
  private _zensuke: Zensuke

  constructor() {
    super()

    this._zensuke = Zensuke.instance
    this._zensuke.position.set(0, 15, 10)
    this.add(this._zensuke)
  }

  update() {
    this._zensuke.update()
  }
}
