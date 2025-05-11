import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { App } from './App'
import './styles.css'
import { Suspense } from 'react';

createRoot(document.getElementById('root')!).render(
  <Canvas
    gl={{ alpha: true, antialias: true, pixelRatio: 1 }}
    camera={{ position: [0, 0, 1], fov: 120 }}
  >
    <App />
    <Suspense>
      <OrbitControls />
    </Suspense>
  </Canvas>,
)