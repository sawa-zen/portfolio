import { BackSide, Color, LinearSRGBColorSpace } from "three"
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

type Props = {
  colors: {
    color1: number
    color2: number
    color3: number
    color4: number
  }
}

export const Background = ({ colors }: Props) => {
  return (
    <mesh rotation={[0, Math.PI / 2, Math.PI / 2]} scale={[3, 15, 3]}>
      <sphereGeometry args={[15, 32, 8]} />
      <shaderMaterial
        side={BackSide}
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new Color().setHex(colors.color1, LinearSRGBColorSpace) },
          uColor2: { value: new Color().setHex(colors.color2, LinearSRGBColorSpace) },
          uColor3: { value: new Color().setHex(colors.color3, LinearSRGBColorSpace) },
          uColor4: { value: new Color().setHex(colors.color4, LinearSRGBColorSpace) },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}
