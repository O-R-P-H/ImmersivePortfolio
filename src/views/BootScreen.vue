<template>
  <div ref="container" class="crt-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import crtFragment from '../shaders/crt.frag?raw'
import screenVertex from '../shaders/screen.vert?raw'

const container = ref(null)
const emit = defineEmits(['done'])

const bootLines = [
  'initialize_engine',
  'loading_skills',
  'loading_projects',
  'loading_about',
  'loading_contacts',
]

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

onMounted(async () => {
  await document.fonts.load(isMobile ? '12px "Anonymous Pro"' : '18px "Anonymous Pro"')
  await document.fonts.ready
  initCRT()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  initCRT()
}

function initCRT() {
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

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  container.value.appendChild(renderer.domElement)

  // Анимация текста
  const lines = []
  let currentLine = 0
  let currentDot = 0
  let state = 'typing'
  let lastTime = 0
  let cursorVisible = true
  let isFinished = false

  const cursorInterval = setInterval(() => {
    cursorVisible = !cursorVisible
  }, 500)

  lines.push(bootLines[0])
  drawText()

  function drawText() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = '#e6e6e6'

    // Настройки для разных устройств
    const fontSize = isMobile ? 14 : 22
    const left = isMobile ? 20 : 60
    const lineHeight = isMobile ? 24 : 32
    const totalHeight = bootLines.length * lineHeight
    const top = (height - totalHeight) / 2

    ctx.font = `${fontSize}px "Anonymous Pro", monospace`
    ctx.textBaseline = 'top'

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], left, top + i * lineHeight)
    }

    if (cursorVisible) {
      const cursorY = top + (isFinished ? lines.length : currentLine + 1) * lineHeight
      ctx.fillText('█', left, cursorY)
    }

    texture.needsUpdate = true
  }

  function animate(t) {
    const elapsed = performance.now()
    const baseText = bootLines[currentLine]
    const maxDots = isMobile ? 30 - baseText.length - 3 : 46 - baseText.length - 3

    if (state === 'typing' && elapsed - lastTime > (isMobile ? 30 : 15)) {
      if (currentDot < maxDots) {
        currentDot++
        lines[currentLine] = baseText + '.'.repeat(currentDot)
        drawText()
        lastTime = elapsed
      } else {
        state = 'waiting'
        lastTime = elapsed
      }
    } else if (state === 'waiting' && elapsed - lastTime > (isMobile ? 150 : 100)) {
      lines[currentLine] = baseText + '.'.repeat(maxDots) + ' ok'
      drawText()
      state = 'done'
      lastTime = elapsed
    } else if (state === 'done' && elapsed - lastTime > (isMobile ? 300 : 400)) {
      currentLine++
      if (currentLine < bootLines.length) {
        lines.push(bootLines[currentLine])
        currentDot = 0
        state = 'typing'
      } else if (!isFinished) {
        isFinished = true
        drawText()
        clearInterval(cursorInterval)
        setTimeout(() => emit('done'), 500)
      }
      lastTime = elapsed
    }

    material.uniforms.uTime.value = t / 1000
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()
}
</script>

<style scoped>
.crt-container {
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
  touch-action: none;
}
</style>