uniform float uTime;
varying float vOpacity;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Z軸方向に移動（奥から手前に）
  float zPos = position.z + uTime * 20.0;
  // -20から20の範囲でループ
  modelPosition.z = -20.0 + fract(zPos * 0.025 + 0.5) * 40.0;

  // opacityの計算（-20から20の範囲で0から1にマッピング）
  vOpacity = (modelPosition.z + 20.0) / 40.0;
  // よりスムーズなフェードイン効果のために補正
  vOpacity = smoothstep(0.0, 0.5, vOpacity);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  gl_PointSize = 2.0;
}
