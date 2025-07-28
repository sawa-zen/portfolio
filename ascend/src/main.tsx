import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { App } from './App'
import './styles.css'
import { createXRStore, XR, XROrigin } from '@react-three/xr';

const store = createXRStore()

const Root = () => {
  return (
    <>
      <div className="buttons">
        <button
          className='button'
          onClick={() => {
            store.enterVR()
          }}
        >
          XR開始
        </button>
      </div>
      <Canvas
        gl={{ antialias: true, pixelRatio: 1 }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        style={{ background: '#1a1a2e' }}
        camera={{ position: [0, 1.6, 3], fov: 75, near: 0.01 }}
      >
        <XR store={store}>
          <XROrigin position={[0, 0, 0]} />
          <App />
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
