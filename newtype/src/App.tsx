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
        baseColor="#00AA00"
        rotatingSpeed={0.8}
        streamSpeed={12.0}
      />
      <ConeParticles
        position={[0, 0, 1]}
        rotation={[0, 0, -Math.PI / 2]}
        baseColor="#AA00AA"
        rotatingSpeed={-0.3}
        streamSpeed={13.0}
      />
      <CircleParticles />
      <SparkParticles />
    </>
  )
}
