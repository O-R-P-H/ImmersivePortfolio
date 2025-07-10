<template>
  <div ref="container" class="notice-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import crtFragment from '../shaders/crt.frag?raw'
import screenVertex from '../shaders/screen.vert?raw'

const container = ref(null)
const emit = defineEmits(['confirm'])

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

onMounted(async () => {
  await document.fonts.load(isMobile ? '12px "Anonymous Pro-Bold"' : '128px "Anonymous Pro-Bold"')
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
  if (container.value?.firstChild) {
    container.value.removeChild(container.value.firstChild)
  }

  // Адаптивные размеры для мобильных устройств
  const width = isMobile ? Math.min(window.innerWidth * 0.9, 400) : 600
  const height = isMobile ? 180 : 240

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

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: isMobile ? 'low-power' : 'high-performance'
  })
  renderer.setSize(width, height)
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.top = '50%'
  renderer.domElement.style.left = '50%'
  renderer.domElement.style.transform = 'translate(-50%, -50%)'
  container.value.appendChild(renderer.domElement)

  // Адаптивные параметры кнопки
  const btnWidth = isMobile ? 80 : 100
  const btnHeight = isMobile ? 30 : 36
  const btnX = (width - btnWidth) / 2
  const btnY = isMobile ? 110 : 150
  let isHovered = false
  let isTouched = false
  let hoverAlpha = 0
  let hoverTarget = 0

  function drawNotice() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, width, height)

    // border
    ctx.strokeStyle = '#e6e6e6'
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, width, height)

    // text
    const fontSize = isMobile ? 14 : 18
    ctx.font = `${fontSize}px "Anonymous Pro-Regular", monospace`
    ctx.fillStyle = '#e6e6e6'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    // Многострочный текст для мобильных
    if (isMobile) {
      const lines = ['This site is best', 'experienced in fullscreen mode.']
      lines.forEach((line, i) => {
        ctx.fillText(line, width / 2, 40 + i * 25)
      })
    } else {
      ctx.fillText('This site is best experienced in fullscreen mode.', width / 2, 60)
    }

    // rounded button
    const borderRadius = 4
    ctx.beginPath()
    ctx.moveTo(btnX + borderRadius, btnY)
    ctx.lineTo(btnX + btnWidth - borderRadius, btnY)
    ctx.quadraticCurveTo(btnX + btnWidth, btnY, btnX + btnWidth, btnY + borderRadius)
    ctx.lineTo(btnX + btnWidth, btnY + btnHeight - borderRadius)
    ctx.quadraticCurveTo(btnX + btnWidth, btnY + btnHeight, btnX + btnWidth - borderRadius, btnY + btnHeight)
    ctx.lineTo(btnX + borderRadius, btnY + btnHeight)
    ctx.quadraticCurveTo(btnX, btnY + btnHeight, btnX, btnY + btnHeight - borderRadius)
    ctx.lineTo(btnX, btnY + borderRadius)
    ctx.quadraticCurveTo(btnX, btnY, btnX + borderRadius, btnY)
    ctx.closePath()

    if (hoverAlpha > 0 || isTouched) {
      ctx.fillStyle = `rgba(230, 230, 230, ${Math.max(hoverAlpha, isTouched ? 1 : 0)})`
      ctx.fill()
    }

    ctx.strokeStyle = '#e6e6e6'
    ctx.stroke()

    // text inside button
    const btnFontSize = isMobile ? 16 : 20
    ctx.font = `${btnFontSize}px "Anonymous Pro-Regular", monospace`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = (hoverAlpha > 0.5 || isTouched) ? 'black' : '#e6e6e6'
    ctx.fillText('OK', width / 2, btnY + btnHeight / 2)

    texture.needsUpdate = true
  }

  drawNotice()

  // Обработчики для десктопов
  function handleMouseMove(e) {
    const rect = renderer.domElement.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const hover = x >= btnX && x <= btnX + btnWidth &&
        y >= btnY && y <= btnY + btnHeight

    if (hover !== isHovered) {
      isHovered = hover
      hoverTarget = isHovered ? 1 : 0
    }

    renderer.domElement.style.cursor = hover ? 'pointer' : 'default'
  }

  function handleClick(e) {
    const rect = renderer.domElement.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x >= btnX && x <= btnX + btnWidth &&
        y >= btnY && y <= btnY + btnHeight) {
      emit('confirm')
    }
  }

  // Обработчики для мобильных устройств
  function handleTouchStart(e) {
    const touch = e.touches[0]
    const rect = renderer.domElement.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    isTouched = x >= btnX && x <= btnX + btnWidth &&
        y >= btnY && y <= btnY + btnHeight

    if (isTouched) {
      drawNotice()
    }
  }

  function handleTouchEnd(e) {
    if (isTouched) {
      emit('confirm')
      isTouched = false
      drawNotice()
    }
  }

  if (isMobile) {
    renderer.domElement.addEventListener('touchstart', handleTouchStart)
    renderer.domElement.addEventListener('touchend', handleTouchEnd)
  } else {
    renderer.domElement.addEventListener('mousemove', handleMouseMove)
    renderer.domElement.addEventListener('click', handleClick)
  }

  function animate(t) {
    // Плавное изменение hover эффекта
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
  -webkit-tap-highlight-color: transparent;
}

.notice-container canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>