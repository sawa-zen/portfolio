import { Background } from './components/Background'
import { DotParticles } from './components/DotParticles'
import { SparkParticles } from './components/SparkParticles'
import { ConeParticles } from './components/ConeParticles'

const colors = {
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
}

export const App = () => {
  return (
    <>
      <Background colors={colors.background} />
      <DotParticles />
      <SparkParticles baseColor={colors.sparks.color1} />

      {/* Layer1 */}
      <ConeParticles
        position={[0, 0, 1]}
        scale={[0.9, 0.9, 1.0]}
        baseColor={colors.cones.layer1}
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
        baseColor={colors.cones.layer2}
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
        baseColor={colors.cones.layer3}
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
        baseColor={colors.cones.layer4}
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
        baseColor={colors.cones.layer5}
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
        baseColor={colors.cones.layer6}
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
        baseColor={colors.cones.layer7}
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
        baseColor={colors.cones.layer8}
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
