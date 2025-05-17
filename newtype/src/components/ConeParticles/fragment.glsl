uniform float uTime;
varying vec2 vUv;
uniform float uNoiseStrength;
uniform vec3 uBaseColor;
uniform float uStartY;
uniform float uEndY;
uniform float uStreamSpeed;
uniform float uUvScaleX;
uniform float uUvScaleY;

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
  vec2 pos = vec2(x * uUvScaleX, vUv.y * uUvScaleY + uTime * uStreamSpeed);     // ノイズのスケール（y方向に時間を加算）
  float valueNoise = generateValueNoise(pos);           // ノイズ値

  // ノイズを二値化して水玉効果を作成
  float dots = step(1.0 - uNoiseStrength, valueNoise);

  // フェードイン効果（下部）
  float fadeIn = smoothstep(1.0 - uStartY, 1.0 - (uStartY+0.1), vUv.y);
  // フェードアウト効果（上部）
  float fadeOut = smoothstep(0.0, 1.0 - uEndY, vUv.y);

  float alpha = dots * 0.7 * fadeIn * fadeOut;

  gl_FragColor = vec4(uBaseColor, alpha);
}
