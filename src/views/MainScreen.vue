<template>
  <div ref="container" class="crt-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import crtFragment from '../shaders/crt.frag?raw'
import screenVertex from '../shaders/screen.vert?raw'

const container = ref(null)
const emit = defineEmits(['start'])

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

  const btnWidth = 438
  const btnHeight = 64
  const titleY = 180
  const btnX = (canvas.width - btnWidth) / 2
  const btnY = titleY + 140 + 105

  const checkboxSize = 20
  const checkboxX = canvas.width / 2 - 110
  const checkboxY = btnY + btnHeight + 32

  let isHovered = false
  let isGamemodeEnabled = true // ✅ по умолчанию включено
  let hoverAlpha = 0
  let hoverTarget = 0

  function drawUI() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#e6e6e6'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    ctx.font = '128px "Anonymous Pro-Bold", monospace'
    ctx.fillText('O_R_P_H', canvas.width / 2, titleY)

    ctx.font = '18px "Anonymous Pro-Regular", monospace'
    ctx.fillText('software developer/designer/artist', canvas.width / 2, titleY + 140)

    // Кнопка
    ctx.beginPath()
    ctx.moveTo(btnX + 10, btnY)
    ctx.lineTo(btnX + btnWidth - 10, btnY)
    ctx.quadraticCurveTo(btnX + btnWidth, btnY, btnX + btnWidth, btnY + 10)
    ctx.lineTo(btnX + btnWidth, btnY + btnHeight - 10)
    ctx.quadraticCurveTo(btnX + btnWidth, btnY + btnHeight, btnX + btnWidth - 10, btnY + btnHeight)
    ctx.lineTo(btnX + 10, btnY + btnHeight)
    ctx.quadraticCurveTo(btnX, btnY + btnHeight, btnX, btnY + btnHeight - 10)
    ctx.lineTo(btnX, btnY + 10)
    ctx.quadraticCurveTo(btnX, btnY, btnX + 10, btnY)
    ctx.closePath()

    if (hoverAlpha > 0) {
      ctx.fillStyle = `rgba(230, 230, 230, ${hoverAlpha})`
      ctx.fill()
    }

    ctx.strokeStyle = '#e6e6e6'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.font = '40px "Anonymous Pro-Regular", monospace'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = hoverAlpha > 0.5 ? 'black' : '#e6e6e6'
    ctx.fillText('start', canvas.width / 2, btnY + btnHeight / 2)

    // ✅ Чекбокс
    ctx.textAlign = 'left'
    ctx.font = '18px "Anonymous Pro-Regular", monospace'
    ctx.fillStyle = '#e6e6e6'
    ctx.fillText('enable gamemode view', checkboxX + checkboxSize + 12, checkboxY + checkboxSize / 2)

    ctx.strokeRect(checkboxX, checkboxY, checkboxSize, checkboxSize)
    if (isGamemodeEnabled) {
      ctx.fillStyle = '#e6e6e6'
      ctx.fillRect(checkboxX + 4, checkboxY + 4, checkboxSize - 8, checkboxSize - 8)
    }

    texture.needsUpdate = true
  }

  drawUI()

  // Hover
  renderer.domElement.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX
    const mouseY = e.clientY

    const hoveredButton = mouseX >= btnX && mouseX <= btnX + btnWidth &&
        mouseY >= btnY && mouseY <= btnY + btnHeight

    const hoveredCheckbox = mouseX >= checkboxX && mouseX <= checkboxX + checkboxSize &&
        mouseY >= checkboxY && mouseY <= checkboxY + checkboxSize

    if (hoveredButton !== isHovered) {
      isHovered = hoveredButton
      hoverTarget = isHovered ? 1 : 0
    }

    renderer.domElement.style.cursor = (hoveredButton || hoveredCheckbox) ? 'pointer' : 'default'
  })

  // Click
  renderer.domElement.addEventListener('click', (e) => {
    const mouseX = e.clientX
    const mouseY = e.clientY

    const clickedButton = mouseX >= btnX && mouseX <= btnX + btnWidth &&
        mouseY >= btnY && mouseY <= btnY + btnHeight

    const clickedCheckbox = mouseX >= checkboxX && mouseX <= checkboxX + checkboxSize &&
        mouseY >= checkboxY && mouseY <= checkboxY + checkboxSize

    if (clickedButton) {
      emit('start', { gamemode: isGamemodeEnabled })
    }

    if (clickedCheckbox) {
      isGamemodeEnabled = !isGamemodeEnabled
      drawUI()
    }
  })

  function animate(t) {
    const fadeSpeed = 0.1
    if (Math.abs(hoverAlpha - hoverTarget) > 0.01) {
      hoverAlpha += (hoverTarget - hoverAlpha) * fadeSpeed
      drawUI()
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
