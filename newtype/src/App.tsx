import { Background } from './components/Background'
import { SparkParticles } from './components/SparkParticles'
import { ConeParticles } from './components/ConeParticles'
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { DotParticles } from './components/DotParticles'

export type ColorType = 'nyaan' | 'machu'

interface Color {
  background: {
    color1: number,
    color2: number,
    color3: number,
    color4: number,
  },
  sparks: {
    color1: number,
  },
  cones: {
    layer1: number,
    layer2: number,
    layer3: number,
    layer4: number,
    layer5: number,
    layer6: number,
    layer7: number,
    layer8: number,
  }
}

const colors: Record<ColorType, Color> = {
  machu: {
    background: {
      color1: 0xFDFAA0,
      color2: 0xEFA8D0,
      color3: 0x55BFBB,
      color4: 0x043344,
    },
    sparks: {
      color1: 0x55BFBB,
    },
    cones: {
      layer1: 0x005675,
      layer2: 0x55BFBB,
      layer3: 0x37817F,
      layer4: 0x2CC1A3,
      layer5: 0xFDFAA0,
      layer6: 0xFE91CE,
      layer7: 0xAAFC6C,
      layer8: 0xED54AA,
    }
  },
    nyaan: {
    background: {
      color1: 0xFDFAA0,
      color2: 0x94D6FF,
      color3: 0xBD8AD5,
      color4: 0x000B3D,
    },
    sparks: {
      color1: 0x9370DB,
    },
    cones: {
      layer1: 0x3B2969,
      layer2: 0x402F6B,
      layer3: 0x64B7FE,
      layer4: 0x2CC1A3,
      layer5: 0xFFD700,
      layer6: 0xF9FF00,
      layer7: 0x9370DB,
      layer8: 0xFFD59D,
    }
  },
}

interface Props {
  colorType?: ColorType
}

export const App = ({ colorType }: Props) => {
  const color = colorType ? colors[colorType] : colors.machu
  const { gl } = useThree()

  useEffect(() => {
    // colorTypeが変更されたらレンダラーをリセット
    gl.dispose()
  }, [colorType, gl])

  return (
    <>
      <Background colors={color.background} />
      <SparkParticles baseColor={color.sparks.color1} />
      <DotParticles />

      {/* Layer1 */}
      <ConeParticles
        position={[0, 0, 1]}
        scale={[0.9, 0.9, 1.0]}
        baseColor={color.cones.layer1}
        rotatingSpeed={-0.3}
        streamSpeed={12.0}
        noiseStrength={0.05}
        uvScaleX={50.0}
        uvScaleY={25.0}
        blending={1}
        startY={0.4}
        gaussian
      />

      {/* Layer2 */}
      <ConeParticles
        position={[0, 0, 1]}
        scale={[2, 2, 1.0]}
        baseColor={color.cones.layer2}
        rotatingSpeed={0.3}
        streamSpeed={30.0}
        noiseStrength={0.15}
        blending={2}
        uvScaleX={30.0}
        uvScaleY={50.0}
        gaussian
      />

      {/* Layer3 */}
      <ConeParticles
        position={[0, 0, -18]}
        scale={[2, 2, 0.2]}
        baseColor={color.cones.layer3}
        rotatingSpeed={-0.4}
        streamSpeed={30.0}
        noiseStrength={0.1}
        startY={0.4}
        uvScaleX={60.0}
        uvScaleY={30.0}
      />

      {/* Layer4 */}
      <ConeParticles
        position={[0, 0, 1]}
        scale={[3, 3, 1.5]}
        baseColor={color.cones.layer4}
        rotatingSpeed={-0.2}
        streamSpeed={40.0}
        noiseStrength={0.1}
        startY={0.3}
        uvScaleX={60.0}
        uvScaleY={60.0}
        gaussian
      />

      {/* Layer5 */}
      <ConeParticles
        position={[0, 0, -14]}
        scale={[0.35, 0.35, 0.2]}
        baseColor={color.cones.layer5}
        rotatingSpeed={0.3}
        streamSpeed={12.0}
        noiseStrength={0.5}
        startY={0.3}
        endY={0.35}
        uvScaleX={10.0}
        uvScaleY={25.0}
        blending={2}
      />

      {/* Layer6 */}
      <ConeParticles
        position={[0, 0, -18]}
        scale={[0.5, 0.5, 0.1]}
        baseColor={color.cones.layer6}
        rotatingSpeed={-0.2}
        streamSpeed={8.0}
        noiseStrength={0.3}
        startY={0.5}
        endY={0.3}
        uvScaleX={20.0}
        uvScaleY={20.0}
        blending={1}
      />

      {/* Layer7 */}
      <ConeParticles
        position={[0, 0, 1]}
        scale={[0.4, 0.4, 1.0]}
        baseColor={color.cones.layer7}
        rotatingSpeed={0.5}
        streamSpeed={18.0}
        noiseStrength={0.05}
        uvScaleX={50.0}
        startY={0.4}
      />

      {/* Layer8 */}
      <ConeParticles
        position={[0, 0, 1]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.5, 0.5, 1.0]}
        baseColor={color.cones.layer8}
        rotatingSpeed={-0.3}
        streamSpeed={19.0}
        noiseStrength={0.05}
        uvScaleX={50.0}
        uvScaleY={30.0}
        startY={0.2}
      />
    </>
  )
}
