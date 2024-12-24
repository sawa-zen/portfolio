#include <common>
#include <skinning_pars_vertex>

varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec2 vUv;
varying vec3 vWorldPosition; // ワールド座標
varying vec3 vWorldNormal;

void main() {
  #include <skinbase_vertex>
  #include <begin_vertex>
  #include <skinning_vertex>

  // 法線のワールド座標系への変換
  vNormal = normalize(normalMatrix * normal);

  // ワールド座標を計算
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  vUv = uv;

  #include <project_vertex>
  #include <worldpos_vertex>
}
