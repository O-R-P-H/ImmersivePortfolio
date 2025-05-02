<template>
  <div ref="fullscreenElement">
    <!-- Только уведомление, пока не закрыто -->
    <FullscreenNotice v-if="showNotice" @confirm="onConfirmNotice" />

    <!-- Основной контент только после подтверждения -->
    <template v-else>
      <BootScreen v-if="currentView === 'boot'" @done="goToMidScreen" />
      <MidScreen v-else-if="currentView === 'mid'" @finish="goToMainScreen" />
      <MainScreen v-else-if="currentView === 'main'" @start="goToTerminal" />
      <TerminalView v-else-if="currentView === 'terminal'" />
    </template>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

// Импорт экранин
import BootScreen from './views/BootScreen.vue'
import MidScreen from './views/MidScreen.vue'
import MainScreen from './views/MainScreen.vue'
import TerminalView from './views/TerminalView.vue'
import FullscreenNotice from "./views/FullscreenNotice.vue";

// Управление экранами
const currentView = ref('boot')
const showNotice = ref(true)
const fullscreenElement = ref(null)

function onConfirmNotice() {
  showNotice.value = false
  enterFullscreen()
}

// Переходы между экранами
function goToMidScreen() {
  currentView.value = 'mid'
}
function goToMainScreen() {
  currentView.value = 'main'
}
function goToTerminal() {
  currentView.value = 'terminal'
}

// Вход в fullscreen
async function enterFullscreen() {
  try {
    const el = fullscreenElement.value || document.documentElement
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

// Автоматическое добавление обработчиков
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
