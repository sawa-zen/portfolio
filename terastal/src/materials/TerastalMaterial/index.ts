import { DoubleSide, ShaderMaterial, type Side, type Texture, TextureLoader } from 'three'
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

interface Params {
  map?: Texture
  side?: Side
  kiraStrength?: number
}

export class TelastalMaterial extends ShaderMaterial {
  constructor({ map, side = DoubleSide, kiraStrength = 1.0 }: Params) {
    const uColorMap = map || new TextureLoader().load('./assets/textures/blackdot.png')
    super({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uNormalMap: { value: new TextureLoader().load('./assets/textures/normal.png') },
        uColorMap: { value: uColorMap },
        uBaseColor: { value: [0.0, 0.05, 0.1] },
        uKiraStrength: { value: kiraStrength },
      },
      side,
    })
  }
}
