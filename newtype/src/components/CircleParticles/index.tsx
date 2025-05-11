import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { BufferAttribute, Points, ShaderMaterial } from "three"
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

const PARTICLE_COUNT = 500

export const CircleParticles = () => {
  const points = useRef<Points>(null!)
  const material = useRef<ShaderMaterial>(null!)

  useEffect(() => {
    // パーティクルの位置をランダムに設定
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20 // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20 // y
      positions[i * 3 + 2] = Math.random() * 40 - 20 // z（-20から20の間で均等に分布）
    }

    const geometry = points.current.geometry
    geometry.setAttribute('position', new BufferAttribute(positions, 3))
  }, [])

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <points ref={points} position={[0, 0, -10]}>
      <bufferGeometry />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={true}
        uniforms={{
          uTime: { value: 0 }
        }}
      />
    </points>
  )
}