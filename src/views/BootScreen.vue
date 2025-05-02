// File: BootScreen.vue
<template>
  <div ref="container" class="crt-container"></div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
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

onMounted(async () => {
  await document.fonts.load('128px "Anonymous Pro-Bold"')
  await document.fonts.load('18px "Anonymous Pro-Regular"')
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
    fragmentShader: crtFragment,
    transparent: false
  })

  const geometry = new THREE.PlaneGeometry(canvas.width, canvas.height)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(canvas.width / 2, canvas.height / 2, 0)
  scene.add(mesh)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(canvas.width, canvas.height)
  container.value.appendChild(renderer.domElement)

  container.value.style.width = '100vw'
  container.value.style.height = '100vh'

  const lines = []
  let currentLine = 0
  let currentDot = 0
  let state = 'typing'
  let lastTime = 0
  let cursorVisible = true
  let isFinished = false

  setInterval(() => {
    cursorVisible = !cursorVisible
  }, 500)

  lines.push(bootLines[0])
  drawText()

  function drawText() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#e6e6e6'
    ctx.font = '22px "Anonymous Pro-Regular", monospace'
    ctx.textBaseline = 'top'

    const left = 60
    const screenCenterY = canvas.height / 2
    const textBlockHeight = bootLines.length * 32
    const top = screenCenterY - textBlockHeight / 2
    const lineHeight = 32

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], left, top + i * lineHeight)
    }

    if (cursorVisible) {
      const cursorX = left
      const cursorY = top + (isFinished ? lines.length : currentLine + 1) * lineHeight
      ctx.fillText('█', cursorX, cursorY)
    }

    texture.needsUpdate = true
  }

  function animate(t) {
    const elapsed = performance.now()
    const baseText = bootLines[currentLine]
    const maxDots = 46 - baseText.length - 3

    if (state === 'typing' && elapsed - lastTime > 50) {
      if (currentDot < maxDots) {
        currentDot++
        lines[currentLine] = baseText + '.'.repeat(currentDot)
        drawText()
        lastTime = elapsed
      } else {
        state = 'waiting'
        lastTime = elapsed
      }
    } else if (state === 'waiting' && elapsed - lastTime > 300) {
      lines[currentLine] = baseText + '.'.repeat(maxDots) + ' ok'
      drawText()
      state = 'done'
      lastTime = elapsed
    } else if (state === 'done' && elapsed - lastTime > 400) {
      currentLine++
      if (currentLine < bootLines.length) {
        lines.push(bootLines[currentLine])
        currentDot = 0
        state = 'typing'
      } else if (!isFinished) {
        isFinished = true
        drawText()
        emit('done') // <--- вот он, переход к MidScreen
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
}
</style>





<style scoped>
.crt-container {
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
}
</style>
