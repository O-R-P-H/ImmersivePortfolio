<template>
  <div class="crt-overlay" ref="container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import crtOverlayFragment from '../../shaders/crtOverlay.frag?raw'
import screenOverlayVertex from '../../shaders/screenOverlay.vert?raw'

const container = ref(null)
let renderer, camera, scene, mesh, material
let animationFrameId

function initScene(width, height) {
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(0, width, height, 0, -1, 1)
  camera.position.z = 1

  const geometry = new THREE.PlaneGeometry(width, height)
  material = new THREE.ShaderMaterial({
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

  mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(width / 2, height / 2, 0)
  scene.add(mesh)

  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)
}

function resizeOverlay() {
  if (!renderer || !camera || !material) return

  const width = window.innerWidth
  const height = window.innerHeight

  camera.right = width
  camera.top = height
  camera.updateProjectionMatrix()

  mesh.geometry.dispose()
  mesh.geometry = new THREE.PlaneGeometry(width, height)
  mesh.position.set(width / 2, height / 2, 0)

  material.uniforms.uResolution.value.set(width, height)
  renderer.setSize(width, height)
}

function animate(time) {
  material.uniforms.uTime.value = time / 1000
  renderer.render(scene, camera)
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  const width = window.innerWidth
  const height = window.innerHeight
  initScene(width, height)
  animate()

  window.addEventListener('resize', resizeOverlay)
  window.addEventListener('orientationchange', resizeOverlay)

  // Специально для iOS Safari
  window.addEventListener('scroll', resizeOverlay)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', resizeOverlay)
  window.removeEventListener('orientationchange', resizeOverlay)
  window.removeEventListener('scroll', resizeOverlay)
})
</script>

<style scoped>
.crt-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: multiply;
}
</style>
