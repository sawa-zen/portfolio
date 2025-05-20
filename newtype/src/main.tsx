import { Suspense, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { App, ColorType } from './App'
import './styles.css'
import { createXRStore, XR, XROrigin } from '@react-three/xr';
import { DotParticles } from './components/DotParticles';

const store = createXRStore()

const Root = () => {
  const [colorType, setColorType] = useState<ColorType>('machu')

  return (
    <>
      <div className="buttons">
        <div className="color-buttons">
          <button
            className='button'
            onClick={() => {
              setColorType('machu')
            }}
          >
            Machu
          </button>
          <button
            className='button'
            onClick={() => {
              setColorType('nyaan')
            }}
          >
            Nyaan
          </button>
        </div>
        <button
          className='button'
          onClick={() => {
            store.enterVR()
          }}
        >
          VR
        </button>
      </div>
      <Canvas
        gl={{ antialias: true, pixelRatio: 1 }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        style={{ background: '#000000' }}
        camera={{ position: [0, 0, 1], fov: 120, near: 0.01 }}
      >
        <XR store={store}>
          <XROrigin position={[0, -1.5, 15]} />
          <App colorType={colorType} />
          <DotParticles />
          <Suspense>
            <OrbitControls />
          </Suspense>
        </XR>
      </Canvas>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <Root />
)
