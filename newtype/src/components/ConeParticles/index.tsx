import { AdditiveBlending, Blending, Color, Group, Mesh, ShaderMaterial } from "three"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

interface Props {
  baseColor: number
  blending?: Blending
  rotatingSpeed?: number
  streamSpeed?: number
  noiseStrength?: number // 0~1
  startY?: number
  endY?: number
  gaussian?: boolean
  uvScaleX?: number
  uvScaleY?: number
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}

export const ConeParticles = ({
  baseColor,
  blending = AdditiveBlending,
  rotatingSpeed = 1,
  streamSpeed = 1,
  noiseStrength = 0.5,
  startY = 0.3,
  endY = 0.7,
  uvScaleX = 30.0,
  uvScaleY = 25.0,
  gaussian = false,
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
          side={1}
          depthWrite={false}
          // depthTest={false}
          uniforms={{
            uTime: { value: 0 },
            uStreamSpeed: { value: streamSpeed },
            uBaseColor: { value: new Color(baseColor) },
            uNoiseStrength: { value: noiseStrength },
            uStartY: { value: startY },
            uEndY: { value: endY },
            uUvScaleX: { value: uvScaleX },
            uUvScaleY: { value: uvScaleY },
            uGaussian: { value: gaussian ? 1 : 0 },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </group>
  )
}
