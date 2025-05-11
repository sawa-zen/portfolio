import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import { useRef } from 'react'
import { useFrame, ThreeElements, Canvas } from '@react-three/fiber'
import './styles.css'

function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((_state, delta) => (meshRef.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={meshRef}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'#2f74c0'} />
    </mesh>
  )
}

createRoot(document.getElementById('root')!).render(
  <Canvas>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>,
)