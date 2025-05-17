import { Background } from './components/Background'
import { CircleParticles } from './components/CircleParticles'
import { SparkParticles } from './components/SparkParticles'
import { ConeParticles } from './components/ConeParticles'

export const App = () => {
  return (
    <>
      <Background />
      <ConeParticles
        position={[0, 0, 1]}
        scale={[0.9, 0.9, 1.0]}
        baseColor={0x005675}
        rotatingSpeed={-0.3}
        streamSpeed={12.0}
        noiseStrength={0.05}
        uvScaleX={50.0}
        uvScaleY={25.0}
        blending={1}
        startY={0.4}
        gaussian
      />
      <ConeParticles
        position={[0, 0, 1]}
        scale={[2, 2, 1.0]}
        baseColor={0x55BFBB}
        rotatingSpeed={0.3}
        streamSpeed={30.0}
        noiseStrength={0.15}
        blending={2}
        uvScaleX={30.0}
        uvScaleY={50.0}
        gaussian
      />
      <ConeParticles
        position={[0, 0, -18]}
        scale={[2, 2, 0.2]}
        baseColor={0x37817F}
        rotatingSpeed={-0.4}
        streamSpeed={30.0}
        noiseStrength={0.1}
        startY={0.4}
        uvScaleX={60.0}
        uvScaleY={30.0}
      />
      <ConeParticles
        position={[0, 0, 1]}
        scale={[3, 3, 1.5]}
        baseColor={0x2CC1A3}
        rotatingSpeed={-0.2}
        streamSpeed={40.0}
        noiseStrength={0.1}
        startY={0.3}
        uvScaleX={60.0}
        uvScaleY={60.0}
        gaussian
      />
      <ConeParticles
        position={[0, 0, -14]}
        scale={[0.35, 0.35, 0.2]}
        baseColor={0xFDFAA0}
        rotatingSpeed={0.3}
        streamSpeed={12.0}
        noiseStrength={0.5}
        startY={0.3}
        endY={0.35}
        uvScaleX={10.0}
        uvScaleY={25.0}
        blending={2}
      />
      <ConeParticles
        position={[0, 0, -18]}
        scale={[0.5, 0.5, 0.1]}
        baseColor={0xFE91CE}
        rotatingSpeed={-0.2}
        streamSpeed={8.0}
        noiseStrength={0.3}
        startY={0.5}
        endY={0.3}
        uvScaleX={20.0}
        uvScaleY={20.0}
        blending={1}
      />
      <ConeParticles
        position={[0, 0, 1]}
        scale={[0.4, 0.4, 1.0]}
        baseColor={0xAAFC6C}
        rotatingSpeed={0.5}
        streamSpeed={18.0}
        noiseStrength={0.05}
        uvScaleX={50.0}
        startY={0.4}
      />
      <ConeParticles
        position={[0, 0, 1]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.5, 0.5, 1.0]}
        baseColor={0xED54AA}
        rotatingSpeed={-0.3}
        streamSpeed={19.0}
        noiseStrength={0.05}
        uvScaleX={50.0}
        uvScaleY={30.0}
        startY={0.2}
      />
      <CircleParticles />
      <SparkParticles />
    </>
  )
}
