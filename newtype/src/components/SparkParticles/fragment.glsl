uniform sampler2D uTexture;
uniform vec3 uBaseColor;
varying float vOpacity;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(uTexture, gl_PointCoord);
  vec3 white = vec3(1.0);
  float luminance = (texColor.r + texColor.g + texColor.b) / 3.0;
  vec3 finalColor = mix(uBaseColor, white, luminance);
  float alpha = texColor.a * vOpacity * luminance;
  gl_FragColor = vec4(finalColor, alpha);
}
