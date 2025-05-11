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
    gl={{ alpha: true, antialias: true, pixelRatio: 1 }}
    camera={{ position: [0, 0, 1], fov: 120 }}
  >
    <XR store={store}>
      <XROrigin position={[0, 0, 1]} />
      <App />
      <Suspense>
        <OrbitControls />
      </Suspense>
    </XR>
  </Canvas>,
)