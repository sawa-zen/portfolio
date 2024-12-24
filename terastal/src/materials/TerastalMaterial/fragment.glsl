// three.js の ShaderMaterial 用のデフォルトシェーダ構成を踏襲
precision highp float;

uniform sampler2D uColorMap;
uniform sampler2D uNormalMap;

uniform float uEdgeIntensity;
uniform float uRefractionIndex;
uniform vec3 uBaseColor;
uniform float uKiraStrength;

varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec2 vUv;
varying vec3 vWorldPosition; // ワールド座標

// カメラとポリゴンの角度を返す
float viewAngle() {
  vec3 viewDir = normalize(cameraPosition - vWorldPosition); // カメラ方向
  return dot(viewDir, normalize(vNormal)); // ビュー方向と法線の角度 -1.0 ～ 1.0
}

// HSVからRGBへの変換
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

/**
 * 虹色の反射のキラキラを生成
 * @param {vec3} viewDir カメラ方向
 */
vec3 generateRainbowKiraRGB(vec3 viewDir) {
  float strength = 5.0; // キラキラの強さ
  float normalViewAngle = dot(
    normalize(vNormal),
    normalize(viewDir)
  ) * strength;

  // 角度が0.0から1.0の間に収まるように縮める
  float normalizedAngle = clamp(sin(normalViewAngle), 0.0, 1.0);

  float blightness = 0.1;
  vec3 kiraHSV = vec3(normalizedAngle, 1.0, blightness);
  vec3 kiraRGB = hsv2rgb(kiraHSV);

  // 赤色を暗くする
  kiraRGB.r = mix(kiraRGB.r, 0.0, 0.5);

  return kiraRGB;
}

/**
 * 法線マップのキラキラを生成
 * @param {vec3} viewDir カメラ方向
 */
vec3 generateNormalMapKiraRGB(vec3 viewDir) {
  // ノーマルマップの読み込み
  vec4 normalMapSample = texture2D(uNormalMap, vUv);
  // 法線マップの法線とビュー方向が近しい場合は白くする
  float strength = 8.0; // キラキラの強さ
  float normalViewAngle = sin(dot(
    normalize(normalMapSample.rgb),
    normalize(viewDir)
  ) * strength);

  // 角度が0.0から1.0の間に収まるように縮める
  normalViewAngle = clamp(normalViewAngle, 0.0, 1.0);

  // ベースカラー
  vec3 baseColor = vec3(0.2824, 0.8196, 1.0);

  // ベースカラーの透明度を angle に合わせて変更
  return mix(vec3(0.0), vec3(0.2824, 0.8196, 1.0), normalViewAngle);
}

void main() {
  // カメラ方向
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);

  // 虹のキラキラ
  vec3 rainbowKiraRGB = generateRainbowKiraRGB(viewDir);

  // 法線マップのキラキラ
  vec3 normalMapKiraRGB = generateNormalMapKiraRGB(viewDir);

  // モデルのカラーテクスチャを取得
  vec4 colorMapSample = texture2D(uColorMap, vUv);
  // カラーテクスチャを少し暗くする
  colorMapSample.rgb *= 0.35;

  // フレネルに合わせて反射色とベース色をブレンド
  vec3 finalKiraRGB = (uBaseColor + normalMapKiraRGB + rainbowKiraRGB);
  // キラキラの強さを調整
  finalKiraRGB = finalKiraRGB * uKiraStrength;

  vec3 finalColor = finalKiraRGB + colorMapSample.rgb;

  gl_FragColor = vec4(finalColor, 1.0);

  // gl_FragColor = vec4(rainbowKiraRGB, 1.0);
}
