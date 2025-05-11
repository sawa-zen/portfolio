uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  // 4色の定義
  vec3 color1 = vec3(0.992, 0.980, 0.627);  // FDFAA0（最下部）
  vec3 color2 = vec3(0.937, 0.659, 0.816);  // EFA8D0
  vec3 color3 = vec3(0.333, 0.749, 0.733);  // 55BFBB
  vec3 color4 = vec3(0.016, 0.200, 0.267);  // 043344（最上部）

  float y = vUv.y;
  vec3 color;

  // 4色のグラデーション
  if (y < 0.05) {
    color = color1;  // color1の単色領域（下部）
  } else if (y < 0.2) {
    color = mix(color1, color2, (y - 0.05) * 6.67);
  } else if (y < 0.25) {
    color = mix(color2, color3, (y - 0.2) * 20.0);
  } else if (y < 0.5) {
    color = mix(color3, color4, (y - 0.25) * 4.0);
  } else {
    color = color4;  // color4の単色領域（上部）
  }

  gl_FragColor = vec4(color, 1.0);
}
