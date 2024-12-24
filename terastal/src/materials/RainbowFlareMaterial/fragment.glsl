varying vec2 vUv;
uniform float uTime;

#define PI 3.14159265359

/**
 * 乱数生成
 */
float generateRandomFloat(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

/**
 * バリューノイズ
 */
float generateValueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = generateRandomFloat(i);
  float b = generateRandomFloat(i + vec2(1.0, 0.0));
  float c = generateRandomFloat(i + vec2(0.0, 1.0));
  float d = generateRandomFloat(i + vec2(1.0, 1.0));

  vec2 u = f*f*(3.0-2.0*f);

  return mix(a, b, u.x)
    + (c - a)*u.y*(1.0 - u.x)
    + (d - b)*u.x*u.y;
}

/**
 * HSVからRGBへの変換
 */
vec3 hsv2rgb(vec3 hsv) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(hsv.xxx + K.xyz) * 6.0 - K.www);
  return hsv.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), hsv.y);
}

/**
 * RGBからHSVへの変換
 */
vec3 rgb2hsv(vec3 rgb) {
  vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
  vec4 p = mix(vec4(rgb.bg, K.wz), vec4(rgb.gb, K.xy), step(rgb.b, rgb.g));
  vec4 q = mix(vec4(p.xyw, rgb.r), vec4(rgb.r, p.yzx), step(p.x, rgb.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y)/(6.0*d+e)), d/(q.x+e), q.x);
}

/**
 * 直交座標を極座標に変換
 * @param {vec2} xy 直交座標
 */
vec2 xy2pol(vec2 xy) {
  return vec2(atan(xy.y, xy.x), length(xy));
}

/**
 * フレアを生成
 * @param {vec2} uv UV座標
 * @param {vec3} baseColor ベースカラー
 */
vec3 generateFlare(vec2 uv, vec3 baseColor) {
  float noise = generateValueNoise(uv * 5.0);

  // noise の値が 0.5 〜 1.0 の間になるように調整
  noise = noise * 0.5 + 0.5;

  // noise の値が 0.9 〜 1.0 の間になるように調整
  float brightness = smoothstep(0.9, 1.0, noise);

  vec3 monocloNoiseHSV = vec3(1.0, 0.0, brightness);
  vec3 monocloNoiseRGB = hsv2rgb(monocloNoiseHSV);

  vec3 flareColor = monocloNoiseRGB * baseColor;
  return flareColor;
}

void main() {
  // -1.0〜1.0 に直した座標
  vec2 uv = vUv * 2.0 - vec2(1.0);

  // 極座標変換
  uv = xy2pol(uv);
  uv.x = uv.x * 4.0;
  uv.y = uv.y - uTime * 0.01;

  float offset = 0.03;
  // フレア
  vec3 redFlareRGB = generateFlare(
    vec2(uv.x, uv.y + offset),
    vec3(1.0, 0.0, 0.0)
  );
  vec3 greenFlareRGB = generateFlare(
    vec2(uv.x, uv.y),
    vec3(0.0, 1.0, 0.0)
  );
  vec3 blueFlareRGB = generateFlare(
    vec2(uv.x, uv.y - offset),
    vec3(0.0, 0.0, 1.0)
  );
  vec3 finalFlareRGB = (redFlareRGB + greenFlareRGB + blueFlareRGB) * 0.5;

  // グロー
  float radius = length(vUv - 0.5);
  float glowBlueAlpha = smoothstep(0.0, 0.5, 0.2 - radius);
  vec3 glowBlueRGB = vec3(0.0, 0.1843, 1.0) * glowBlueAlpha;
  float glowWhiteAlpha = smoothstep(0.0, 0.5, 0.15 - radius);
  vec3 glowWhiteRGB = vec3(1.0) * glowWhiteAlpha;
  vec3 finalGlowRGB = glowBlueRGB + glowWhiteRGB;

  // 全体の透明度（外側に近づくほど透明にする）
  float alpha = (1.0 - radius * 2.0);

  gl_FragColor = vec4(finalFlareRGB + finalGlowRGB, alpha);
}
