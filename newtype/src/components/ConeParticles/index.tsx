import { AdditiveBlending, Blending, Group, Mesh, ShaderMaterial, Vector3 } from "three"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import chroma from "chroma-js"
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

interface Props {
  baseColor: string
  blending?: Blending
  rotatingSpeed?: number
  streamSpeed?: number
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}

export const ConeParticles = ({
  baseColor,
  blending = AdditiveBlending,
  rotatingSpeed = 1,
  streamSpeed = 1,
  ...otherProps
}: Props) => {
  console.log('baseColor', baseColor)
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)

  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as ShaderMaterial
      material.needsUpdate = true
    }
  }, [streamSpeed])

  useFrame((_, delta) => {
    if (meshRef.current && meshRef.current.material instanceof ShaderMaterial) {
      meshRef.current.material.uniforms.uTime.value += delta
    }
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * rotatingSpeed
    }
  })

  return (
    <group ref={groupRef} {...otherProps}>
      <mesh ref={meshRef} rotation={[0, Math.PI / 2, -Math.PI / 2]}>
        <coneGeometry
          args={[10, 50, 32, 10, true]}
        />
        <shaderMaterial
          transparent
          blending={blending}
          side={2}
          uniforms={{
            uTime: { value: 0 },
            uStreamSpeed: { value: streamSpeed },
            uBaseColor: { value: new Vector3(...chroma(baseColor).rgb()) },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </group>
  )
}
