<template>
  <div ref="container" class="crt-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import crtFragment from '../shaders/crt.frag?raw'
import screenVertex from '../shaders/screen.vert?raw'

const container = ref(null)
const emit = defineEmits(['finish'])

onMounted(async () => {
  await document.fonts.ready
  initCRT()
})

function initCRT() {
  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(0, canvas.width, canvas.height, 0, 0.1, 10)
  camera.position.z = 1

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.generateMipmaps = false

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(canvas.width, canvas.height) }
    },
    vertexShader: screenVertex,
    fragmentShader: crtFragment
  })

  const geometry = new THREE.PlaneGeometry(canvas.width, canvas.height)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(canvas.width / 2, canvas.height / 2, 0)
  scene.add(mesh)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(canvas.width, canvas.height)
  container.value.appendChild(renderer.domElement)

  // Рисуем текст сразу
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#e6e6e6'
  ctx.font = '22px "Anonymous Pro-Regular", monospace'
  ctx.textBaseline = 'top'

  const text = 'all modules loaded successfully'
  const textWidth = ctx.measureText(text).width
  const x = (canvas.width - textWidth) / 2
  const y = canvas.height / 2
  ctx.fillText(text, x, y)

  texture.needsUpdate = true

  function animate(t) {
    material.uniforms.uTime.value = t / 1000
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()

  // Переход к следующему экрану
  setTimeout(() => {
    emit('finish')
  }, 1700)
}
</script>

<style scoped>
.crt-container {
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
}
</style>
