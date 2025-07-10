<template>
  <div ref="container" class="crt-container"></div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import * as THREE from 'three'
import crtFragment from '../shaders/crt.frag?raw'
import screenVertex from '../shaders/screen.vert?raw'

const container = ref(null)
const emit = defineEmits(['finish'])

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

onMounted(async () => {
  // Оптимизированная загрузка шрифтов для разных устройств
  await document.fonts.load(isMobile ? '64px "Anonymous Pro-Bold"' : '128px "Anonymous Pro-Bold"')
  await document.fonts.load(isMobile ? '14px "Anonymous Pro-Regular"' : '18px "Anonymous Pro-Regular"')
  await document.fonts.ready
  initCRT()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  initCRT()
}

function initCRT() {
  // Очистка предыдущего рендера
  if (container.value?.firstChild) {
    container.value.removeChild(container.value.firstChild)
  }

  const width = window.innerWidth
  const height = window.innerHeight

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(0, width, height, 0, 0.1, 10)
  camera.position.z = 1

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.generateMipmaps = false

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(width, height) }
    },
    vertexShader: screenVertex,
    fragmentShader: crtFragment
  })

  const geometry = new THREE.PlaneGeometry(width, height)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(width / 2, height / 2, 0)
  scene.add(mesh)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: isMobile ? 'low-power' : 'high-performance'
  })
  renderer.setSize(width, height)
  container.value.appendChild(renderer.domElement)

  // Рисуем текст
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = '#e6e6e6'

  // Адаптивный размер шрифта
  const fontSize = isMobile ? Math.min(18, width / 20) : 22
  ctx.font = `${fontSize}px "Anonymous Pro-Regular", monospace`
  ctx.textBaseline = 'top'

  const text = 'all modules loaded successfully'
  const textWidth = ctx.measureText(text).width
  const x = (width - textWidth) / 2
  const y = height / 2
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
  }, isMobile ? 1200 : 1700) // Укороченное время для мобильных
}
</script>

<style scoped>
.crt-container {
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
  touch-action: none; /* Блокировка масштабирования на мобильных */
}

@media (max-width: 768px) {
  .crt-container {
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }
}
</style>