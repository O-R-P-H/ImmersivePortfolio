<template>
  <div ref="fullscreenElement">
    <!-- Уведомление при входе -->
    <FullscreenNotice v-if="showNotice" @confirm="onConfirmNotice" />

    <!-- Основной контент -->
    <template v-else>
      <BootScreen v-if="currentView === 'boot'" @done="goToMidScreen" />
      <MidScreen v-else-if="currentView === 'mid'" @finish="goToMainScreen" />
      <MainScreen v-else-if="currentView === 'main'" @start="handleMainScreenStart" />
      <TerminalView v-else-if="currentView === 'terminal'" />
      <MainViewNoGame v-else-if="currentView === 'html'" />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Views
import BootScreen from './views/BootScreen.vue'
import MidScreen from './views/MidScreen.vue'
import MainScreen from './views/MainScreen.vue'
import TerminalView from './views/TerminalView.vue'
import MainViewNoGame from './views/MainViewNoGame.vue'
import FullscreenNotice from './views/FullscreenNotice.vue'

// Состояния
const currentView = ref('boot')
const showNotice = ref(true)
const fullscreenElement = ref(null)

function onConfirmNotice() {
  showNotice.value = false
  enterFullscreen()
}

// Переходы
function goToMidScreen() {
  currentView.value = 'mid'
}

function goToMainScreen() {
  currentView.value = 'main'
}

function handleMainScreenStart({ gamemode }) {
  if (gamemode) {
    currentView.value = 'terminal'
  } else {
    currentView.value = 'html'
  }
}

// Полноэкранный режим
async function enterFullscreen() {
  try {
    const el = document.documentElement
    if (el.requestFullscreen) {
      await el.requestFullscreen()
    } else if (el.webkitRequestFullscreen) {
      await el.webkitRequestFullscreen()
    } else if (el.msRequestFullscreen) {
      await el.msRequestFullscreen()
    }
  } catch (err) {
    console.warn('Fullscreen failed:', err)
  }
}

// Подключение fullscreen по клику
onMounted(() => {
  const handler = () => {
    if (!document.fullscreenElement) {
      enterFullscreen()
    }
    window.removeEventListener('click', handler)
    window.removeEventListener('keydown', handler)
  }

  window.addEventListener('click', handler, { once: true })
  window.addEventListener('keydown', handler, { once: true })
})
</script>

<style>
body {
  margin: 0;
  background: black;
  font-family: "Anonymous Pro-Regular", monospace;
  color: #e6e6e6;
}
</style>
