<template>
  <div ref="container" class="crt-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import crtFragment from '../shaders/crt.frag?raw'
import screenVertex from '../shaders/screen.vert?raw'

const container = ref(null)
const emit = defineEmits(['start'])

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

onMounted(async () => {
  // Оптимизированная загрузка шрифтов
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

  // Адаптивные размеры элементов
  const btnWidth = isMobile ? Math.min(width * 0.8, 438) : 438
  const btnHeight = isMobile ? 48 : 64
  const titleY = isMobile ? height * 0.3 : 180 // Изменил с 0.2 на 0.25 для мобильных
  const btnX = (width - btnWidth) / 2
  const btnY = isMobile ? titleY + height * 0.18 : titleY + 140 + 105

  // Закомментированный чекбокс
  /*
  const checkboxSize = 20
  const checkboxX = width / 2 - 110
  const checkboxY = btnY + btnHeight + 32
  let isGamemodeEnabled = false
  */

  let isHovered = false
  let hoverAlpha = 0
  let hoverTarget = 0

  function drawUI() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = '#e6e6e6'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    // Заголовок
    const titleFontSize = isMobile ? Math.min(64, width / 8) : 128
    ctx.font = `${titleFontSize}px "Anonymous Pro-Bold", monospace`
    ctx.fillText('O_R_P_H', width / 2, titleY)

    // Подзаголовок
    const subtitleFontSize = isMobile ? 14 : 18
    ctx.font = `${subtitleFontSize}px "Anonymous Pro-Regular", monospace`
    ctx.fillText('software developer/designer/artist', width / 2, titleY + (isMobile ? 80 : 140))

    // Кнопка
    const borderRadius = 10
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

    if (hoverAlpha > 0) {
      ctx.fillStyle = `rgba(230, 230, 230, ${hoverAlpha})`
      ctx.fill()
    }

    ctx.strokeStyle = '#e6e6e6'
    ctx.lineWidth = 1
    ctx.stroke()

    // Текст кнопки
    const btnFontSize = isMobile ? 24 : 40
    ctx.font = `${btnFontSize}px "Anonymous Pro-Regular", monospace`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = hoverAlpha > 0.5 ? 'black' : '#e6e6e6'
    ctx.fillText('start', width / 2, btnY + btnHeight / 2)

    /*
    // Закомментированный чекбокс
    ctx.textAlign = 'left'
    ctx.font = '18px "Anonymous Pro-Regular", monospace'
    ctx.fillStyle = '#e6e6e6'
    ctx.fillText('enable gamemode view', checkboxX + checkboxSize + 12, checkboxY + checkboxSize / 2)

    ctx.strokeRect(checkboxX, checkboxY, checkboxSize, checkboxSize)
    if (isGamemodeEnabled) {
      ctx.fillStyle = '#e6e6e6'
      ctx.fillRect(checkboxX + 4, checkboxY + 4, checkboxSize - 8, checkboxSize - 8)
    }
    */

    texture.needsUpdate = true
  }

  drawUI()

  // Обработчики событий
  function handlePointerMove(e) {
    const mouseX = e.clientX ?? e.touches?.[0]?.clientX
    const mouseY = e.clientY ?? e.changedTouches?.[0]?.clientY

    if (!mouseX || !mouseY) return

    const hoveredButton = mouseX >= btnX && mouseX <= btnX + btnWidth &&
        mouseY >= btnY && mouseY <= btnY + btnHeight

    if (hoveredButton !== isHovered) {
      isHovered = hoveredButton
      hoverTarget = isHovered ? 1 : 0
    }

    renderer.domElement.style.cursor = hoveredButton ? 'pointer' : 'default'
  }

  function handlePointerClick(e) {
    const mouseX = e.clientX ?? e.changedTouches?.[0]?.clientX
    const mouseY = e.clientY ?? e.changedTouches?.[0]?.clientY

    if (!mouseX || !mouseY) return

    const clickedButton = mouseX >= btnX && mouseX <= btnX + btnWidth &&
        mouseY >= btnY && mouseY <= btnY + btnHeight

    if (clickedButton) {
      emit('start', { gamemode: false }) // gamemode всегда false, так как чекбокс закомментирован
    }
  }

  // Добавляем обработчики для десктопов и мобильных
  if (isMobile) {
    renderer.domElement.addEventListener('touchmove', handlePointerMove)
    renderer.domElement.addEventListener('touchend', handlePointerClick)
  } else {
    renderer.domElement.addEventListener('mousemove', handlePointerMove)
    renderer.domElement.addEventListener('click', handlePointerClick)
  }

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
  touch-action: none; /* Блокировка масштабирования на мобильных */
}

@media (max-width: 768px) {
  .crt-container {
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }
}
</style>