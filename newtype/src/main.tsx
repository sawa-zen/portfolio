import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { App } from './App'
import './styles.css'
import { createXRStore, XR, XROrigin } from '@react-three/xr';

const store = createXRStore()

createRoot(document.getElementById('root')!).render(
  <>
    <button
      className='vr_button'
      onClick={() => {
        store.enterVR()
      }}
    >
      VR
    </button>
    <Canvas
      gl={{ antialias: true, pixelRatio: 1 }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
      style={{ background: '#000000' }}
      camera={{ position: [0, 0, 1], fov: 120, near: 0.01 }}
    >
      <XR store={store}>
        <XROrigin position={[0, -1.5, 15]} />
        <App />
        <Suspense>
          <OrbitControls />
        </Suspense>
      </XR>
    </Canvas>
  </>
)
