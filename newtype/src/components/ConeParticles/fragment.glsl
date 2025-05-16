uniform float uTime;
varying vec2 vUv;
uniform float uNoiseStrength;
uniform vec3 uBaseColor;
uniform float uStartY;
uniform float uEndY;
uniform float uStreamSpeed;
uniform float uUvScaleX;
uniform float uUvScaleY;
uniform int uGaussian;

// ガウスブラーのパラメータ
const float blurScale = 0.002; // ブラーの強度
const int samples = 3; // サンプル数

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

/**
 * ドットパターンのアルファ値を計算
 */
float calculateDotAlpha(vec2 uv) {
  float x = sin(uv.x * 6.28318530718) * 0.5 + 0.5;
  vec2 pos = vec2(x * uUvScaleX, uv.y * uUvScaleY + uTime * uStreamSpeed);
  float valueNoise = generateValueNoise(pos);
  float dots = step(1.0 - uNoiseStrength, valueNoise);
  float fadeIn = smoothstep(1.0 - uStartY, 1.0 - (uStartY+0.1), uv.y);
  float fadeOut = smoothstep(0.0, 1.0 - uEndY, uv.y);
  return dots * 0.7 * fadeIn * fadeOut;
}

/**
 * ガウス分布の重みを計算
 */
float calculateGaussianWeight(int i, int totalSamples) {
  return exp(-float(i * i) / (2.0 * float(totalSamples * totalSamples)));
}

/**
 * 縦方向のガウスブラーを適用
 */
float applyVerticalGaussianBlur(vec2 uv) {
  float blurredAlpha = 0.0;
  float totalWeight = 0.0;

  if (uGaussian < 1) {
    vec2 sampleUv = vec2(uv.x, uv.y);
    float sampleAlpha = calculateDotAlpha(sampleUv);
    float weight = calculateGaussianWeight(1, 1);
    blurredAlpha += sampleAlpha * weight;
    totalWeight += weight;
    return blurredAlpha / totalWeight;
  }

  for(int i = -samples; i <= samples; i++) {
    float offset = float(i) * blurScale;
    vec2 sampleUv = vec2(uv.x, uv.y + offset);
    float sampleAlpha = calculateDotAlpha(sampleUv);
    float weight = calculateGaussianWeight(i, samples);
    blurredAlpha += sampleAlpha * weight;
    totalWeight += weight;
  }

  return blurredAlpha / totalWeight;
}

void main() {
  float blurredAlpha = applyVerticalGaussianBlur(vUv);
  gl_FragColor = vec4(uBaseColor, blurredAlpha);
}
