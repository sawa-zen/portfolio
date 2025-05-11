uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  // 色の定義
  vec3 color1 = vec3(0.992, 0.980, 0.627);  // FDFAA0（最下部）
  vec3 color2 = vec3(0.937, 0.659, 0.816);  // EFA8D0
  vec3 color3 = vec3(0.333, 0.749, 0.733);  // 55BFBB
  vec3 color4 = vec3(0.016, 0.200, 0.267);  // 043344（最上部）

  // 各セクションの開始位置
  float color1_solid_end = 0.04;    // color1の単色領域終了位置
  float color1_grad_end = 0.2;      // color1→color2のグラデーション終了位置
  float color2_grad_end = 0.28;     // color2→color3のグラデーション終了位置
  float color3_grad_end = 0.45;      // color3→color4のグラデーション終了位置

  float y = vUv.y;
  vec3 color;

  // グラデーションの計算
  if (y < color1_solid_end) {
    color = color1;  // color1の単色領域（下部）
  } else if (y < color1_grad_end) {
    float t = (y - color1_solid_end) / (color1_grad_end - color1_solid_end);
    color = mix(color1, color2, t);
  } else if (y < color2_grad_end) {
    float t = (y - color1_grad_end) / (color2_grad_end - color1_grad_end);
    color = mix(color2, color3, t);
  } else if (y < color3_grad_end) {
    float t = (y - color2_grad_end) / (color3_grad_end - color2_grad_end);
    color = mix(color3, color4, t);
  } else {
    color = color4;  // color4の単色領域（上部）
  }

  gl_FragColor = vec4(color, 1.0);
}
