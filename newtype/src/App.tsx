import { useRef, useEffect } from 'react'
import { Points, ShaderMaterial } from 'three'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Background } from './components/Background'

const PARTICLE_COUNT = 1000

const vertexShader = `
uniform float uTime;
varying float vOpacity;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Z軸方向に移動（奥から手前に）
  float zPos = position.z + uTime * 7.0;
  // -20から20の範囲でループ
  modelPosition.z = -20.0 + fract(zPos * 0.025 + 0.5) * 40.0;

  // opacityの計算（-20から20の範囲で0から1にマッピング）
  vOpacity = (modelPosition.z + 20.0) / 40.0;
  // よりスムーズなフェードイン効果のために補正
  vOpacity = smoothstep(0.0, 0.3, vOpacity);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  gl_PointSize = 10.0;
}
`

const fragmentShader = `
varying float vOpacity;

void main() {
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength, 3.0);

  vec3 color = vec3(0.9, 0.9, 1.0);
  gl_FragColor = vec4(color, vOpacity);
}
`

const ParticleField = () => {
  const points = useRef<Points>(null!)
  const material = useRef<ShaderMaterial>(null!)

  useEffect(() => {
    // パーティクルの位置をランダムに設定
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10 // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10 // y
      positions[i * 3 + 2] = Math.random() * 40 - 20 // z（-20から20の間で均等に分布）
    }

    const geometry = points.current.geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  }, [])

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <points ref={points}>
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
        blending={2}
        depthTest={true}
      />
    </points>
  )
}

export const App = () => {
  return (
    <>
      <Background />
      <ParticleField />
    </>
  )
}
