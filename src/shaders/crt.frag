// crt.frag
uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;
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

  vec3 tex = texture2D(uTexture, uv).rgb;

  // Повышаем чёткость и контраст
  tex = pow(tex, vec3(1.2));      // яркость/контраст
  tex *= 1.1;                     // усиление общего свечения

  vec3 color = tex * scanline * flicker + noise;

  gl_FragColor = vec4(color, 1.0);
}
