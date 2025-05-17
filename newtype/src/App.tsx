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
        baseColor={0x043344}
        rotatingSpeed={-0.3}
        streamSpeed={15.0}
        noiseStrength={0.04}
        blending={1}
        startY={0.45}
      />
      <ConeParticles
        position={[0, 0, 1]}
        scale={[1.5, 1.5, 1.0]}
        baseColor={0x55BFBB}
        rotatingSpeed={0.3}
        streamSpeed={15.0}
        noiseStrength={0.1}
        blending={2}
        uvScaleX={40.0}
      />
      <ConeParticles
        position={[0, 0, -5]}
        scale={[1, 1, 0.2]}
        baseColor={0x37817F}
        rotatingSpeed={-0.4}
        streamSpeed={20.0}
        noiseStrength={0.1}
        startY={0.5}
        uvScaleX={40.0}
      />
      <ConeParticles
        position={[0, 0, -15]}
        scale={[0.6, 0.6, 0.2]}
        baseColor={0xED54AA}
        rotatingSpeed={0.1}
        streamSpeed={10.0}
        noiseStrength={0.2}
        startY={0.4}
        endY={0.5}
        uvScaleX={30.0}
        blending={2}
      />
      <ConeParticles
        position={[0, 0, -15]}
        scale={[0.5, 0.5, 0.2]}
        baseColor={0xEFA8D0}
        rotatingSpeed={-0.2}
        streamSpeed={10.0}
        noiseStrength={0.2}
        startY={0.4}
        endY={0.5}
        uvScaleX={20.0}
        blending={1}
      />
      <ConeParticles
        position={[0, 0, 1]}
        scale={[0.4, 0.4, 1.0]}
        baseColor={0x6CFC75}
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
        startY={0.4}
      />
      <CircleParticles />
      <SparkParticles />
    </>
  )
}
