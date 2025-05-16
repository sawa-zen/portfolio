import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { App } from './App'
import './styles.css'
import { createXRStore, XR, XROrigin } from '@react-three/xr';

const store = createXRStore()

createRoot(document.getElementById('root')!).render(
  <Canvas
    gl={{ antialias: true, pixelRatio: 1 }}
    style={{ background: '#000000' }}
    camera={{ position: [0, 0, 1], fov: 120, near: 1 }}
  >
    <XR store={store}>
      <XROrigin position={[0, -1.5, 15]} />
      <App />
      <Suspense>
        <OrbitControls />
      </Suspense>
    </XR>
  </Canvas>,
)
