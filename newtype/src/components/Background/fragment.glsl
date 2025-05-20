uniform vec3 uColor1;  // 最下部の色
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;  // 最上部の色
varying vec2 vUv;

void main() {

  // 各セクションの開始位置
  float color1_solid_end = 0.2;    // color1の単色領域終了位置
  float color1_grad_end = 0.4;      // color1→color2のグラデーション終了位置
  float color2_grad_end = 0.44;     // color2→color3のグラデーション終了位置
  float color3_grad_end = 0.48;      // color3→color4のグラデーション終了位置

  float y = vUv.y;
  vec3 color;

  // グラデーションの計算
  if (y < color1_solid_end) {
    color = uColor1;  // color1の単色領域（下部）
  } else if (y < color1_grad_end) {
    float t = (y - color1_solid_end) / (color1_grad_end - color1_solid_end);
    color = mix(uColor1, uColor2, t);
  } else if (y < color2_grad_end) {
    float t = (y - color1_grad_end) / (color2_grad_end - color1_grad_end);
    color = mix(uColor2, uColor3, t);
  } else if (y < color3_grad_end) {
    float t = (y - color2_grad_end) / (color3_grad_end - color2_grad_end);
    color = mix(uColor3, uColor4, t);
  } else {
    color = uColor4;  // color4の単色領域（上部）
  }

  gl_FragColor = vec4(color, 1.0);
}
