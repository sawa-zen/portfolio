uniform float uTime;
varying vec2 vUv;
uniform vec3 uBaseColor;
uniform float uStreamSpeed;

/**
 * 乱数生成
 * @param {vec2} st 位置
 * 参考: https://nogson2.hatenablog.com/entry/2017/11/18/150645
 * 参考: https://thebookofshaders.com/11/?lan=jp
 */
float generateRandomFloat(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

/**
  * バリューノイズ
  * @param {vec2} st 位置
  * 参考: https://nogson2.hatenablog.com/entry/2017/11/18/150645
  * 参考: https://thebookofshaders.com/11/?lan=jp
  */
float generateValueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = generateRandomFloat(i);
  float b = generateRandomFloat(i + vec2(1.0, 0.0));
  float c = generateRandomFloat(i + vec2(0.0, 1.0));
  float d = generateRandomFloat(i + vec2(1.0, 1.0));

  vec2 u = f*f*(3.0-2.0*f);

  return mix(a, b, u.x) +
    (c - a)* u.y * (1.0 - u.x) +
    (d - b) * u.x * u.y;
}

/**
 * HSVからRGBへの変換
 * @param {vec3} hsv HSV
 */
vec3 hsv2rgb(vec3 hsv) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(hsv.xxx + K.xyz) * 6.0 - K.www);
  return hsv.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), hsv.y);
}

void main() {
  // x方向をsin関数で周期的にマッピングすることで、左右がシームレスにつながるようにする
  float x = sin(vUv.x * 6.28318530718) * 0.5 + 0.5;  // 2πで1周期
  vec2 pos = vec2(x * 30.0, vUv.y * 25.0 + uTime * uStreamSpeed);     // ノイズのスケール（y方向に時間を加算）
  float valueNoise = generateValueNoise(pos);           // ノイズ値

  // ノイズを二値化して水玉効果を作成
  float dots = step(0.95, valueNoise);

  // 赤色のみを使用した色の設定
  vec3 dotColor = uBaseColor * dots;

  // アルファ値を二値化とy座標に基づいて調整
  // y座標が0.7より上の場合は完全に透明
  // y座標が0.3より下の場合は通常の不透明度
  // その間はグラデーション
  float gradientAlpha = smoothstep(0.7, 0.6, vUv.y);
  float alpha = dots * 0.7 * gradientAlpha;

  gl_FragColor = vec4(dotColor, alpha);
}
