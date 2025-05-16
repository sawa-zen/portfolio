uniform float uTime;
uniform float uMinPointSize;  // パーティクルの最小サイズ
uniform float uMaxPointSize;  // パーティクルの最大サイズ
uniform float uDistanceNormalizeFactor;  // 距離の正規化係数
varying float vOpacity;
varying vec2 vUv;

void main() {
  vUv = uv;
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

  // カメラからの距離に応じてパーティクルサイズを変更
  float distanceToCamera = -viewPosition.z;
  float normalizedDistance = clamp(distanceToCamera / uDistanceNormalizeFactor, 0.0, 1.0);
  float baseSize = mix(uMaxPointSize, uMinPointSize, normalizedDistance);

  // Sine波でサイズを変動させる（周期2秒、振幅は基本サイズの30%）
  // uv.xを使用して各パーティクルの位相をずらす
  float phase = uv.x * 2.0 * 3.14159; // 0-1の値を0-2πにマッピング
  float sineWave = sin(uTime * 3.14159 * 10.0 + phase); // 位相をオフセット
  float sizeVariation = baseSize * 1.0; // 30%の振幅
  float finalSize = baseSize + sineWave * sizeVariation;

  gl_PointSize = finalSize;
}
