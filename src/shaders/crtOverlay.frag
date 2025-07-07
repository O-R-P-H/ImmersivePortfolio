uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;

  // SCANLINES
  float scanline = 0.88 + 0.12 * sin(uv.y * uResolution.y * 1.5);

  // FLICKER
  float flicker = 0.96 + 0.04 * sin(uTime * 100.0 + uv.x * 120.0);

  // ЗЕРНО
  float noise = rand(uv + uTime) * 0.025;

  // Эффект как будто уже отрисовано изображение (светимость маски)
  vec3 lightMask = vec3(1.0);

  // Те же манипуляции, как с текстурой в оригинале
  lightMask = pow(lightMask, vec3(1.2));  // яркость / контраст
  lightMask *= 1.1;                       // свечка CRT

  vec3 final = lightMask * scanline * flicker + noise;

  gl_FragColor = vec4(final, 1.0); // не прозрачный, но работает как постэффект
}
