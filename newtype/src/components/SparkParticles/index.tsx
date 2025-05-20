import { useFrame, useLoader } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import { AdditiveBlending, BufferAttribute, Color, LinearSRGBColorSpace, Points, ShaderMaterial, TextureLoader } from "three"
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

const PARTICLE_COUNT = 200

interface Props {
  baseColor?: number
}

export const SparkParticles = ({ baseColor = 0x0078ff }: Props) => {
  const points = useRef<Points>(null!)
  const sparkTexture = useLoader(TextureLoader, './spark.png')
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uBaseColor: { value: new Color().setHex(baseColor, LinearSRGBColorSpace) },
    uTexture: { value: sparkTexture },
    uMinPointSize: { value: 0.5 },
    uMaxPointSize: { value: 150.0 },
    uDistanceNormalizeFactor: { value: 10.0 }
  }), [baseColor, sparkTexture])

  useEffect(() => {
    // パーティクルの位置をランダムに設定
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const uvs = new Float32Array(PARTICLE_COUNT * 2)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10 // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10 // y
      positions[i * 3 + 2] = Math.random() * 40 - 20 // z（-20から20の間で均等に分布）

      // UV座標を設定（各パーティクルに対して0-1の範囲で）
      uvs[i * 2] = Math.random()
      uvs[i * 2 + 1] = Math.random()
    }

    const geometry = points.current.geometry
    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('uv', new BufferAttribute(uvs, 2))
  }, [])

  useEffect(() => {
    if (points.current.material && points.current.material instanceof ShaderMaterial) {
      points.current.material.needsUpdate = true
      points.current.material.uniforms.uTime.value = 0
    }
  }, [points.current?.material])

  useFrame((state) => {
    if (points.current.material && points.current.material instanceof ShaderMaterial) {
      points.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <points ref={points} position={[0, 0, -10]}>
      <bufferGeometry />
      <shaderMaterial
        key={'spark'}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        uniforms={uniforms}
        side={2} // THREE.DoubleSide
      />
    </points>
  )
}
