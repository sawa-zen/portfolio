import { BackSide, Color, Vector2 } from "three"
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

export const Background = () => {
  return (
    <mesh rotation={[0, Math.PI / 2, Math.PI / 2]}>
      <sphereGeometry args={[50, 32, 8]} />
      <shaderMaterial
        side={BackSide}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new Color(0x000000) },
          uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  )
}