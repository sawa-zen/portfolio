uniform sampler2D uTexture;
varying float vOpacity;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(uTexture, gl_PointCoord);
  vec3 blue = vec3(0.0, 0.4824, 1.0);
  vec3 white = vec3(1.0);
  float luminance = (texColor.r + texColor.g + texColor.b) / 3.0;
  vec3 finalColor = mix(blue, white, luminance);
  float alpha = texColor.a * vOpacity * luminance;
  gl_FragColor = vec4(finalColor, alpha);
}
