<template>
  <div ref="container" class="notice-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import crtFragment from '../shaders/crt.frag?raw'
import screenVertex from '../shaders/screen.vert?raw'

const container = ref(null)
const emit = defineEmits(['confirm'])

onMounted(async () => {
  await document.fonts.load('128px "Anonymous Pro-Bold"')
  await document.fonts.load('18px "Anonymous Pro-Regular"')
  await document.fonts.ready
  initCRT()
})

function initCRT() {
  const canvas = document.createElement('canvas')
  canvas.width = 600
  canvas.height = 240
  const ctx = canvas.getContext('2d')

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(0, canvas.width, canvas.height, 0, 0.1, 10)
  camera.position.z = 1

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter

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

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(canvas.width, canvas.height)
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.top = '50%'
  renderer.domElement.style.left = '50%'
  renderer.domElement.style.transform = 'translate(-50%, -50%)'
  container.value.appendChild(renderer.domElement)

  // Button bounds
  const btnWidth = 100
  const btnHeight = 36
  const btnX = (canvas.width - btnWidth) / 2
  const btnY = 150
  let isHovered = false
  let hoverAlpha = 0
  let hoverTarget = 0

  function drawNotice() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // border
    ctx.strokeStyle = '#e6e6e6'
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    // text
    ctx.font = '18px "Anonymous Pro-Regular", monospace'
    ctx.fillStyle = '#e6e6e6'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText('This site is best experienced in fullscreen mode.', canvas.width / 2, 60)

    // rounded button
    ctx.beginPath()
    ctx.moveTo(btnX + 4, btnY)
    ctx.lineTo(btnX + btnWidth - 4, btnY)
    ctx.quadraticCurveTo(btnX + btnWidth, btnY, btnX + btnWidth, btnY + 4)
    ctx.lineTo(btnX + btnWidth, btnY + btnHeight - 4)
    ctx.quadraticCurveTo(btnX + btnWidth, btnY + btnHeight, btnX + btnWidth - 4, btnY + btnHeight)
    ctx.lineTo(btnX + 4, btnY + btnHeight)
    ctx.quadraticCurveTo(btnX, btnY + btnHeight, btnX, btnY + btnHeight - 4)
    ctx.lineTo(btnX, btnY + 4)
    ctx.quadraticCurveTo(btnX, btnY, btnX + 4, btnY)
    ctx.closePath()

    if (hoverAlpha > 0) {
      ctx.fillStyle = `rgba(230, 230, 230, ${hoverAlpha})`
      ctx.fill()
    }

    ctx.strokeStyle = '#e6e6e6'
    ctx.stroke()

    // text inside button
    ctx.font = '20px "Anonymous Pro-Regular", monospace'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = hoverAlpha > 0.5 ? 'black' : '#e6e6e6'
    ctx.fillText('OK', canvas.width / 2, btnY + btnHeight / 2)

    texture.needsUpdate = true
  }

  drawNotice()

  renderer.domElement.addEventListener('mousemove', (e) => {
    const rect = renderer.domElement.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const hover =
        x >= btnX && x <= btnX + btnWidth &&
        y >= btnY && y <= btnY + btnHeight

    if (hover !== isHovered) {
      isHovered = hover
      hoverTarget = isHovered ? 1 : 0
    }

    renderer.domElement.style.cursor = hover ? 'pointer' : 'default'
  })

  renderer.domElement.addEventListener('click', (e) => {
    const rect = renderer.domElement.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (
        x >= btnX &&
        x <= btnX + btnWidth &&
        y >= btnY &&
        y <= btnY + btnHeight
    ) {
      emit('confirm')
    }
  })

  function animate(t) {
    // fade hover alpha
    const fadeSpeed = 0.1
    if (Math.abs(hoverAlpha - hoverTarget) > 0.01) {
      hoverAlpha += (hoverTarget - hoverAlpha) * fadeSpeed
      drawNotice()
    }

    material.uniforms.uTime.value = t / 1000
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()
}
</script>

<style scoped>
.notice-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: auto;
  z-index: 9999;
}
</style>
