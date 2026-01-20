<template>
  <!-- Главный роутер для всех страниц -->
  <router-view />
</template>

<script setup>
// Основной компонент приложения, теперь только роутер
</script>

<style>
/* Глобальные стили для всех страниц */
body {
  margin: 0;
  background: black;
  font-family: "Anonymous Pro-Regular", monospace;
  color: #dfdfdf;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

/* Темная тема для основного портфолио */
#app:not(.special-page) {
  background-color: black;
}

/* Светлая тема */
#app.light-theme {
  background-color: white;
}

/* Стили для специальных страниц (OSH и PP) */
.special-page {
  background: black;
}

.special-page.light-theme {
  background: white;
}

/* Полноэкранные стили */
:fullscreen {
  background: black;
}

:fullscreen #app {
  background: black;
}

:fullscreen #app.light-theme {
  background: white;
}

/* Убираем скроллбар в полноэкранном режиме основного портфолио */
:fullscreen body {
  overflow: hidden;
}

/* Для страниц OSH и PP оставляем скролл */
.special-page body {
  overflow-y: auto;
}

/* Стили для уведомления о полноэкранном режиме */
.fullscreen-notice {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Анимации загрузки */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

/* CRT эффект для всех страниц */
.crt-effect::before {
  content: " ";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
  linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
  z-index: 9998;
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0% { opacity: 0.15; }
  50% { opacity: 0.18; }
  100% { opacity: 0.15; }
}

/* Медиа-запросы для мобильных устройств */
@media (max-width: 1024px) {
  body {
    font-size: 14px;
  }

  /* На мобильных устройствах отключаем полноэкранный режим для специальных страниц */
  .special-page {
    position: static !important;
    height: auto !important;
  }
}

/* Для очень маленьких экранов */
@media (max-width: 480px) {
  body {
    font-size: 12px;
  }
}

/* Печать */
@media print {
  .fullscreen-notice,
  .crt-effect::before {
    display: none !important;
  }

  body {
    background: white !important;
    color: black !important;
  }
}
</style>