<template>
  <div class="osh-page" :class="{ 'light-theme': isLightTheme }">
    <!-- Навигация -->
    <header class="osh-nav">
      <span class="osh-lang" @click="toggleLanguage">{{ currentLanguage }}</span>
      <nav class="osh-left-nav">
        <a href="/">← {{ t('backToPortfolio') }}</a>
        <img
            :src="themeIcon"
            alt="toggle theme"
            class="osh-icon"
            @click="toggleTheme"
        />
      </nav>
    </header>

    <!-- Мобильная навигация -->
    <header class="osh-mobile-nav" :style="navStyle">
      <span class="osh-lang" @click="toggleLanguage">{{ currentLanguage }}</span>

      <button class="osh-menu-toggle" @click="toggleMenu">
        <span :class="{'osh-line': true, 'active': isMenuOpen}"></span>
        <span :class="{'osh-line': true, 'active': isMenuOpen}"></span>
        <span :class="{'osh-line': true, 'active': isMenuOpen}"></span>
      </button>

      <nav class="osh-mobile-menu" :class="{'open': isMenuOpen}">
        <a href="/" @click="closeMenu">{{ t('backToPortfolio') }}</a>
      </nav>

      <img
          :src="themeIcon"
          alt="toggle theme"
          class="osh-theme-icon"
          @click="toggleTheme"
      />
    </header>

    <!-- Основной контент -->
    <main class="osh-main">
      <section class="osh-intro">
        <h1 class="osh-title">OSH</h1>
        <p class="osh-description">
          {{ t('pageDescription') }}
        </p>
      </section>

      <section class="osh-content">
        <div class="osh-section-divider">
          <hr class="osh-hr"/>

        </div>

        <a href="/PP" class="osh-section-title">Privacy Policy</a>


      </section>

    </main>

    <!-- CRT эффект -->
    <CRTOverlay></CRTOverlay>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import toggleWhite from '@/assets/img/switch_theme_white.svg';
import toggleBlack from '@/assets/img/switch_theme_black.svg';
import arrowWhite from '@/assets/img/down_arrow.svg';
import arrowBlack from '@/assets/img/down_arrow.svg';
import CRTOverlay from "@/views/components/CRTOverlay.vue";

const isLightTheme = ref(false);
const isMenuOpen = ref(false);
const currentLanguage = ref('eng');
const isTyping = ref(false);
const terminalLines = ref([]);

const translations = {
  eng: {
    backToPortfolio: 'back to portfolio',
    pageSubtitle: 'Open Source Hardware',
    pageDescription: 'OSH is a company specializing in the development and promotion of software.\n' +
        '\n' +
        'The company\'s core activity focuses on creating modern and efficient IT solutions for businesses and individual users. The OSH team handles the entire product lifecycle: from market analysis and product architecture design to direct development, testing, implementation, and subsequent technical support.\n' +
        '\n' +
        'The company is client-oriented, focusing on understanding customer needs and offering a personalized approach, flexibility in project execution, and the use of cutting-edge technologies. OSH\'s products and services are designed to assist users in digital transformation, process automation, productivity improvement, and achieving strategic goals.\n' +
        '\n' +
        'OSH\'s core principles are quality, reliability, innovation, and customer focus.\n' +
        '\n.',
    contentTitle: 'Content',
    emptyText: 'Content will be added here soon...',
    infoTitle: 'Information',
    feature1Title: 'Schematics',
    feature1Desc: 'Detailed circuit diagrams and PCB layouts for various projects.',
    feature2Title: 'Documentation',
    feature2Desc: 'Comprehensive guides and tutorials for building and programming.',
    feature3Title: 'Resources',
    feature3Desc: 'Links to components, tools, and community resources.',
  },
  ru: {
    backToPortfolio: 'вернуться к портфолио',
    pageSubtitle: 'Открытое Аппаратное Обеспечение',
    pageDescription: 'Документация и ресурсы для проектов с открытым исходным кодом, электронные схемы и руководства по сборке.',
    contentTitle: 'Содержание',
    emptyText: 'Содержание будет добавлено здесь в ближайшее время...',
    infoTitle: 'Информация',
    feature1Title: 'Схемы',
    feature1Desc: 'Подробные принципиальные схемы и разводки печатных плат для различных проектов.',
    feature2Title: 'Документация',
    feature2Desc: 'Полные руководства и туториалы по сборке и программированию.',
    feature3Title: 'Ресурсы',
    feature3Desc: 'Ссылки на компоненты, инструменты и ресурсы сообщества.',
  }
};

const t = (key) => {
  return translations[currentLanguage.value][key] || key;
};

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'eng' ? 'ru' : 'eng';
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const themeIcon = computed(() => {
  return isLightTheme.value ? toggleWhite : toggleBlack;
});

const arrowIcon = computed(() => {
  return isLightTheme.value ? arrowBlack : arrowWhite;
});

const navStyle = computed(() => {
  return {
    backgroundColor: isLightTheme.value ? 'white' : 'black',
    borderBottom: `1px solid ${isLightTheme.value ? '#ddd' : '#333'}`
  };
});

const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value;
  localStorage.setItem('osh-theme', isLightTheme.value ? 'light' : 'dark');
};

// Эффект набора текста в терминале
const typeText = async () => {
  isTyping.value = true;
  const lines = [
    'Welcome to OSH documentation',
    'Initializing system...',
    'Loading schematics database...',
    'Checking component availability...',
    'System ready for queries',
    'Type "help" for available commands'
  ];

  for (let i = 0; i < lines.length; i++) {
    terminalLines.value.push(lines[i]);
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  isTyping.value = false;
};

onMounted(() => {
  // Загружаем сохраненную тему
  const savedTheme = localStorage.getItem('osh-theme');
  if (savedTheme) {
    isLightTheme.value = savedTheme === 'light';
  }

  // Запускаем эффект набора текста
  setTimeout(() => {
    typeText();
  }, 1000);

  // Обновляем стили при изменении темы
  watch(isLightTheme, (newVal) => {
    document.documentElement.classList.toggle('light-theme', newVal);
  }, { immediate: true });
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap');

/* Базовые стили */
.osh-page {
  position: relative;
  min-height: 100vh;
  font-family: 'Anonymous Pro', monospace;
  padding: 0 5vw;
  background: black;
  color: #dfdfdf;
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden;
}

.osh-page.light-theme {
  background: white;
  color: #333;
}

/* CRT эффект */
.osh-crt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  background:
      linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
      linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 2px, 3px 100%;
  opacity: 0.15;
  animation: flicker 0.15s infinite;
}

.osh-page.light-theme .osh-crt-overlay {
  background:
      linear-gradient(rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.1) 50%),
      linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
  opacity: 0.1;
}

@keyframes flicker {
  0% { opacity: 0.15; }
  50% { opacity: 0.18; }
  100% { opacity: 0.15; }
}

.osh-page.light-theme .osh-crt-overlay {
  animation: flicker-light 0.2s infinite;
}

@keyframes flicker-light {
  0% { opacity: 0.05; }
  50% { opacity: 0.08; }
  100% { opacity: 0.05; }
}

/* Навигация */
.osh-nav {
  height: 8vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  background-color: inherit;
}

.osh-left-nav {
  display: flex;
  align-items: center;
}

.osh-nav nav a {
  transition: all 0.3s ease-out;
  margin-left: 54px;
  text-decoration: none;
  color: #dfdfdf;
}

.osh-page.light-theme .osh-nav nav a {
  color: #333;
}

.osh-nav nav a:hover {
  cursor: pointer;
  color: white;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
  text-decoration: underline;
}

.osh-page.light-theme .osh-nav nav a:hover {
  color: black;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.osh-icon {
  width: 32px;
  height: 32px;
  margin-left: 54px;
  cursor: pointer;
  transition: filter 0.3s ease;
}

.osh-icon:hover {
  filter: drop-shadow(0 0 24px rgba(255, 255, 255, 0.9));
}

.osh-page.light-theme .osh-icon:hover {
  filter: drop-shadow(0 0 24px rgba(0, 0, 0, 0.7));
}

.osh-lang {
  cursor: pointer;
  transition: all 0.3s ease;
}

.osh-lang:hover {
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
}

.osh-page.light-theme .osh-lang:hover {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Заголовок */
.osh-intro {
  margin-top: 75px;
}

.osh-title {
  font-family: "Anonymous Pro-Bold", sans-serif;
  font-size: 92px;
  line-height: 1.1;
  font-weight: 700;
  margin-bottom: 15px;
  animation: glowFlickerSharp 1.8s ease-out forwards;
}

@keyframes glowFlickerSharp {
  0% { opacity: 0.3; text-shadow: none; }
  5% { text-shadow: 0 2px 2px rgba(255, 255, 255, 0.2); }
  10% { text-shadow: none; }
  15% { text-shadow: 0 2px 4px rgba(255, 255, 255, 0.4); }
  20% { text-shadow: none; }
  30% { text-shadow: 0 2px 6px rgba(255, 255, 255, 0.6); }
  45% { text-shadow: none; }
  60% { text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8); }
  80% { text-shadow: none; }
  100% { text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5); }
}

.osh-page.light-theme .osh-title {
  animation: glowFlickerSharpLight 1.8s ease-out forwards;
}

@keyframes glowFlickerSharpLight {
  0% { opacity: 0.3; text-shadow: none; }
  100% { text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); }
}

.osh-subtitle {
  font-size: 32px;
  margin-bottom: 30px;
  color: #ccc;
}

.osh-page.light-theme .osh-subtitle {
  color: #666;
}

.osh-description {
  font-size: 24px;
  line-height: 1.6;
  margin-bottom: 60px;
}

/* Разделители */
.osh-hr {
  box-shadow: 0 0 24px 4px rgba(255, 255, 255, 0.3);
  border: 3px solid white;
  border-radius: 40px;
  margin-top: 60px;
  margin-bottom: 25px;
}

.osh-page.light-theme .osh-hr {
  box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.3);
  border: 3px solid black;
}

.osh-down-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.osh-down-arrow img {
  animation: swing-vertical 2.3s ease-in-out infinite;
  width: 20px;
  cursor: pointer;
  transition: filter 0.3s ease;
  filter: invert(0);
}

.osh-page.light-theme .osh-down-arrow img {
  filter: invert(1);
}

@keyframes swing-vertical {
  0%, 100% { transform: translateY(3px); }
  50% { transform: translateY(-3px); }
}

/* Заголовки разделов */
.osh-section-title {
  text-align: center;
  font-size: 46px;
  font-weight: bold;
  margin-bottom: 40px;
}

/* Контейнер текста */
.osh-text-container {
  max-width: 900px;
  margin: 0 auto 80px;
}

.osh-empty-text {
  font-size: 36px;
  text-align: center;
  padding: 60px;
  border: 2px dashed #666;
  border-radius: 10px;
  margin-bottom: 60px;
  color: #999;
  background: rgba(255, 255, 255, 0.05);
}

.osh-page.light-theme .osh-empty-text {
  color: #666;
  background: rgba(0, 0, 0, 0.05);
  border-color: #ccc;
}

/* Терминал */
.osh-terminal {
  background: rgba(20, 20, 20, 0.9);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.2);
  border: 1px solid #333;
}

.osh-page.light-theme .osh-terminal {
  background: rgba(240, 240, 240, 0.9);
  box-shadow: 0 0 30px rgba(0, 100, 0, 0.1);
  border: 1px solid #ddd;
}

.osh-terminal-header {
  background: #222;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.osh-page.light-theme .osh-terminal-header {
  background: #ddd;
}

.osh-terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.osh-terminal-dot.red { background: #ff5f56; }
.osh-terminal-dot.yellow { background: #ffbd2e; }
.osh-terminal-dot.green { background: #27ca3f; }

.osh-terminal-title {
  margin-left: auto;
  font-size: 14px;
  color: #888;
}

.osh-terminal-content {
  padding: 20px;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  line-height: 1.6;
  min-height: 200px;
  color: #00ff00;
}

.osh-page.light-theme .osh-terminal-content {
  color: #008800;
}

.osh-prompt {
  color: #00aaff;
  margin-right: 10px;
}

.osh-page.light-theme .osh-prompt {
  color: #0066cc;
}

.osh-cursor {
  display: inline-block;
  animation: blink 1s infinite;
  color: #00ff00;
}

.osh-cursor.blinking {
  animation: blink 0.7s infinite;
}

.osh-page.light-theme .osh-cursor {
  color: #008800;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Теги */
.osh-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 60px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.osh-tags span {
  background: white;
  color: black;
  padding: 8px 20px;
  border-radius: 999px;
  font-size: 18px;
  transition: all 0.3s ease-out;
}

.osh-page.light-theme .osh-tags span {
  background: black;
  color: white;
}

.osh-tags span:hover {
  transform: scale(1.05);
  box-shadow: 0 0 24px 4px rgba(255, 255, 255, 0.3);
  cursor: pointer;
}

.osh-page.light-theme .osh-tags span:hover {
  box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.3);
}

/* Фичи */
.osh-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto 100px;
}

.osh-feature {
  background: rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #333;
  transition: all 0.3s ease;
}

.osh-page.light-theme .osh-feature {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid #ddd;
}

.osh-feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
  border-color: #666;
}

.osh-page.light-theme .osh-feature:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: #999;
}

.osh-feature h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #fff;
}

.osh-page.light-theme .osh-feature h3 {
  color: #333;
}

.osh-feature p {
  font-size: 18px;
  line-height: 1.5;
  color: #ccc;
}

.osh-page.light-theme .osh-feature p {
  color: #666;
}

/* Мобильная навигация */
@media (max-width: 1024px) {
  .osh-nav {
    display: none;
  }

  .osh-mobile-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    z-index: 1000;
    background: black;
  }

  .osh-page.light-theme .osh-mobile-nav {
    background: white;
  }

  .osh-theme-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .osh-menu-toggle {
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 34px;
    height: 18px;
    cursor: pointer;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .osh-line {
    display: block;
    width: 100%;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
  }

  .osh-page.light-theme .osh-line {
    background: black;
  }

  .osh-line.active:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .osh-line.active:nth-child(2) {
    opacity: 0;
  }

  .osh-line.active:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .osh-mobile-menu {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: black;
    display: flex;
    flex-direction: column;
    padding: 20px;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .osh-page.light-theme .osh-mobile-menu {
    background: white;
    border-bottom: 1px solid #ddd;
  }

  .osh-mobile-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .osh-mobile-menu a {
    color: white;
    text-decoration: none;
    font-family: 'Anonymous Pro', monospace;
    padding: 12px 0;
    border-bottom: 1px solid #333;
  }

  .osh-page.light-theme .osh-mobile-menu a {
    color: black;
    border-bottom: 1px solid #ddd;
  }

  .osh-intro {
    margin-top: 100px;
  }

  .osh-title {
    font-size: 48px;
  }

  .osh-subtitle {
    font-size: 24px;
  }

  .osh-description {
    font-size: 18px;
  }

  .osh-section-title {
    font-size: 32px;
  }

  .osh-empty-text {
    font-size: 24px;
    padding: 30px;
  }

  .osh-features {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .osh-tags {
    gap: 8px;
  }

  .osh-tags span {
    font-size: 14px;
    padding: 6px 15px;
  }
}

/* Десктоп стили */
@media (min-width: 1025px) {
  .osh-mobile-nav {
    display: none;
  }
}

/* Общие hover эффекты */
a:hover, p:hover, nav:hover, span:hover, h1:hover, h2:hover, h3:hover {
  cursor: pointer;
  color: white;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
}

.osh-page.light-theme a:hover,
.osh-page.light-theme p:hover,
.osh-page.light-theme nav:hover,
.osh-page.light-theme span:hover,
.osh-page.light-theme h1:hover,
.osh-page.light-theme h2:hover,
.osh-page.light-theme h3:hover {
  color: black;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Скроллбар */
.osh-page::-webkit-scrollbar {
  width: 10px;
}

.osh-page::-webkit-scrollbar-track {
  background: transparent;
}

.osh-page::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 5px;
}

.osh-page.light-theme::-webkit-scrollbar-thumb {
  background: black;
}

/* Для Firefox */
.osh-page {
  scrollbar-color: white transparent;
  scrollbar-width: thin;
}

.osh-page.light-theme {
  scrollbar-color: black transparent;
}
</style>