import { AdditiveBlending, DoubleSide, ShaderMaterial } from 'three'
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

export class RainbowFlareMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
      },
      side: DoubleSide,
      transparent: true,
      blending: AdditiveBlending,
    })
  }

  update() {
    this.uniforms.uTime.value += 0.1
  }
}
