<template>
  <div class="crt-overlay" ref="container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'

// ✅ Используем отдельные, безопасные шейдеры только для оверлея
import crtOverlayFragment from '../../shaders/crtOverlay.frag?raw'
import screenOverlayVertex from '../../shaders/screenOverlay.vert?raw'

const container = ref(null)

onMounted(() => {
  const width = window.innerWidth
  const height = window.innerHeight

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(0, width, height, 0, -1, 1)
  camera.position.z = 1

  const geometry = new THREE.PlaneGeometry(width, height)

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(width, height) }
    },
    vertexShader: screenOverlayVertex,
    fragmentShader: crtOverlayFragment,
    transparent: true,
    depthWrite: false,
    depthTest: false
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(width / 2, height / 2, 0)
  scene.add(mesh)

  const renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  function animate(time) {
    material.uniforms.uTime.value = time / 1000
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<style scoped>
.canvas{
  pointer-events: none;
}
.crt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: multiply; /* ← ключевой момент! */
}

</style>
