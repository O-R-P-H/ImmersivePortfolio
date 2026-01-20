<template>
  <div class="pp-page" :class="{ 'light-theme': isLightTheme }">
    <!-- Навигация -->
    <header class="pp-nav">
      <span class="pp-lang" @click="toggleLanguage">{{ currentLanguage }}</span>
      <nav class="pp-left-nav">
        <a href="/">← {{ t('backToPortfolio') }}</a>
        <img
            :src="themeIcon"
            alt="toggle theme"
            class="pp-icon"
            @click="toggleTheme"
        />
      </nav>
    </header>

    <!-- Мобильная навигация -->
    <header class="pp-mobile-nav" :style="navStyle">
      <span class="pp-lang" @click="toggleLanguage">{{ currentLanguage }}</span>

      <button class="pp-menu-toggle" @click="toggleMenu">
        <span :class="{'pp-line': true, 'active': isMenuOpen}"></span>
        <span :class="{'pp-line': true, 'active': isMenuOpen}"></span>
        <span :class="{'pp-line': true, 'active': isMenuOpen}"></span>
      </button>

      <nav class="pp-mobile-menu" :class="{'open': isMenuOpen}">
        <a href="/" @click="closeMenu">{{ t('backToPortfolio') }}</a>
      </nav>

      <img
          :src="themeIcon"
          alt="toggle theme"
          class="pp-theme-icon"
          @click="toggleTheme"
      />
    </header>

    <!-- Основной контент -->
    <main class="pp-main">
      <section class="pp-intro">
        <h1 class="pp-title">Privacy Policy</h1>
        <p class="pp-subtitle">{{ t('pageSubtitle') }}</p>
      </section>

      <section class="pp-content">
        <div class="pp-section-divider">
          <hr class="pp-hr"/>
        </div>

        <div class="pp-policy-content">
          <div class="pp-section">
            <h2>1. {{ t('section1Title') }}</h2>
            <p>{{ t('section1Content') }}</p>
          </div>

          <div class="pp-section">
            <h2>2. {{ t('section2Title') }}</h2>
            <p>{{ t('section2Content') }}</p>
            <ul>
              <li>{{ t('dataItem1') }}</li>
              <li>{{ t('dataItem2') }}</li>
              <li>{{ t('dataItem3') }}</li>
              <li>{{ t('dataItem4') }}</li>
              <li>{{ t('dataItem5') }}</li>
            </ul>
          </div>

          <div class="pp-section">
            <h2>3. {{ t('section3Title') }}</h2>
            <p>{{ t('section3Content') }}</p>
          </div>

          <div class="pp-section">
            <h2>4. {{ t('section4Title') }}</h2>
            <p>{{ t('section4Content') }}</p>
          </div>

          <div class="pp-section">
            <h2>5. {{ t('section5Title') }}</h2>
            <p>{{ t('section5Content') }}</p>
          </div>

          <div class="pp-section">
            <h2>6. {{ t('section6Title') }}</h2>
            <p>{{ t('section6Content') }}</p>
          </div>

          <div class="pp-section">
            <h2>7. {{ t('section7Title') }}</h2>
            <p>{{ t('section7Content') }}</p>
          </div>
        </div>

      </section>
    </main>

    <!-- CRT эффект -->
    <CRTOverlay></CRTOverlay>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import toggleWhite from '@/assets/img/switch_theme_white.svg';
import toggleBlack from '@/assets/img/switch_theme_black.svg';
import CRTOverlay from "@/views/components/CRTOverlay.vue";

const router = useRouter();
const isLightTheme = ref(false);
const isMenuOpen = ref(false);
const currentLanguage = ref('eng');
const effectiveDate = ref('January 1, 2024');

const translations = {
  eng: {
    backToPortfolio: 'back to portfolio',
    pageSubtitle: 'Your privacy is important to us',
    section1Title: 'Introduction',
    section1Content: 'OSH ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.',
    section2Title: 'Information We Collect',
    section2Content: 'We may collect information about you in a variety of ways. The information we may collect includes:',
    dataItem1: 'Personal Data (name, email address, phone number)',
    dataItem2: 'Derivative Data (IP address, browser type, access times)',
    dataItem3: 'Financial Data (payment information for purchases)',
    dataItem4: 'Mobile Device Data (device ID, model, operating system)',
    dataItem5: 'Third-Party Data (information from social media platforms)',
    section3Title: 'Use of Your Information',
    section3Content: 'We use the information we collect to: deliver products/services, improve our website, communicate with you, process transactions, and comply with legal obligations.',
    section4Title: 'Disclosure of Your Information',
    section4Content: 'We may share information we have collected about you in certain situations, including with business partners, affiliates, and when required by law.',
    section5Title: 'Security of Your Information',
    section5Content: 'We use administrative, technical, and physical security measures to protect your personal information. While we have taken reasonable steps, no electronic transmission is 100% secure.',
    section6Title: 'Policy for Children',
    section6Content: 'We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children, please contact us.',
    section7Title: 'Changes to This Policy',
    section7Content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Effective Date" at the top of this Privacy Policy.',
    contactTitle: 'Contact Us',
    contactContent: 'If you have questions or comments about this Privacy Policy, please contact us at:',
    email: 'Email',
    effectiveDate: 'Effective Date'
  },
  ru: {
    backToPortfolio: 'вернуться к портфолио',
    pageSubtitle: 'Ваша конфиденциальность важна для нас',
    section1Title: 'Введение',
    section1Content: 'OSH ("мы", "наш") обязуется защищать вашу конфиденциальность. Эта Политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию при посещении нашего веб-сайта.',
    section2Title: 'Информация, которую мы собираем',
    section2Content: 'Мы можем собирать информацию о вас различными способами. Информация, которую мы можем собирать, включает:',
    dataItem1: 'Персональные данные (имя, адрес электронной почты, номер телефона)',
    dataItem2: 'Производные данные (IP-адрес, тип браузера, время доступа)',
    dataItem3: 'Финансовые данные (информация об оплате для покупок)',
    dataItem4: 'Данные мобильных устройств (ID устройства, модель, операционная система)',
    dataItem5: 'Данные третьих сторон (информация из социальных сетей)',
    section3Title: 'Использование вашей информации',
    section3Content: 'Мы используем собранную информацию для: предоставления продуктов/услуг, улучшения нашего веб-сайта, общения с вами, обработки транзакций и соблюдения юридических обязательств.',
    section4Title: 'Раскрытие вашей информации',
    section4Content: 'Мы можем делиться собранной информацией о вас в определенных ситуациях, включая партнеров по бизнесу, аффилированные лица и когда это требуется по закону.',
    section5Title: 'Безопасность вашей информации',
    section5Content: 'Мы используем административные, технические и физические меры безопасности для защиты вашей личной информации. Хотя мы предприняли разумные шаги, ни одна электронная передача не является на 100% безопасной.',
    section6Title: 'Политика для детей',
    section6Content: 'Мы не собираем информацию от детей младше 13 лет и не ориентируем на них маркетинг. Если вы узнаете о любых данных, которые мы собрали от детей, пожалуйста, свяжитесь с нами.',
    section7Title: 'Изменения в политике',
    section7Content: 'Мы можем время от времени обновлять эту Политику конфиденциальности. Мы уведомим вас о любых изменениях, обновив "Дату вступления в силу" в верхней части этой Политики конфиденциальности.',
    contactTitle: 'Свяжитесь с нами',
    contactContent: 'Если у вас есть вопросы или комментарии по поводу этой Политики конфиденциальности, пожалуйста, свяжитесь с нами:',
    email: 'Электронная почта',
    effectiveDate: 'Дата вступления в силу'
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

const navStyle = computed(() => {
  return {
    backgroundColor: isLightTheme.value ? 'white' : 'black',
    borderBottom: `1px solid ${isLightTheme.value ? '#ddd' : '#333'}`
  };
});

const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value;
  localStorage.setItem('pp-theme', isLightTheme.value ? 'light' : 'dark');
};

onMounted(() => {
  // Загружаем сохраненную тему
  const savedTheme = localStorage.getItem('pp-theme');
  if (savedTheme) {
    isLightTheme.value = savedTheme === 'light';
  }

  // Обновляем стили при изменении темы
  watch(isLightTheme, (newVal) => {
    document.documentElement.classList.toggle('light-theme', newVal);
  }, { immediate: true });
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap');

/* Базовые стили */
.pp-page {
  position: relative;
  min-height: 100vh;
  font-family: 'Anonymous Pro', monospace;
  padding: 0 5vw;
  background: black;
  color: #dfdfdf;
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden;
}

.pp-page.light-theme {
  background: white;
  color: #333;
}

/* Навигация */
.pp-nav {
  height: 8vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  background-color: inherit;
}

.pp-left-nav {
  display: flex;
  align-items: center;
}

.pp-nav nav a {
  transition: all 0.3s ease-out;
  margin-left: 54px;
  text-decoration: none;
  color: #dfdfdf;
}

.pp-page.light-theme .pp-nav nav a {
  color: #333;
}

.pp-nav nav a:hover {
  cursor: pointer;
  color: white;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
  text-decoration: underline;
}

.pp-page.light-theme .pp-nav nav a:hover {
  color: black;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.pp-icon {
  width: 32px;
  height: 32px;
  margin-left: 54px;
  cursor: pointer;
  transition: filter 0.3s ease;
}

.pp-icon:hover {
  filter: drop-shadow(0 0 24px rgba(255, 255, 255, 0.9));
}

.pp-page.light-theme .pp-icon:hover {
  filter: drop-shadow(0 0 24px rgba(0, 0, 0, 0.7));
}

.pp-lang {
  cursor: pointer;
  transition: all 0.3s ease;
}

.pp-lang:hover {
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
}

.pp-page.light-theme .pp-lang:hover {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Заголовок */
.pp-intro {
  margin-top: 75px;
  text-align: center;
}

.pp-title {
  font-family: "Anonymous Pro-Bold", sans-serif;
  font-size: 92px;
  line-height: 1.1;
  font-weight: 700;
  margin-bottom: 20px;
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

.pp-page.light-theme .pp-title {
  animation: glowFlickerSharpLight 1.8s ease-out forwards;
}

@keyframes glowFlickerSharpLight {
  0% { opacity: 0.3; text-shadow: none; }
  100% { text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); }
}

.pp-subtitle {
  font-size: 32px;
  margin-bottom: 60px;
  color: #ccc;
}

.pp-page.light-theme .pp-subtitle {
  color: #666;
}

/* Разделители */
.pp-hr {
  box-shadow: 0 0 24px 4px rgba(255, 255, 255, 0.3);
  border: 3px solid white;
  border-radius: 40px;
  margin: 60px 0;
}

.pp-page.light-theme .pp-hr {
  box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.3);
  border: 3px solid black;
}

/* Контент политики */
.pp-policy-content {
  max-width: 900px;
  margin: 0 auto;
}

.pp-section {
  margin-bottom: 50px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid #333;
  transition: all 0.3s ease;
}

.pp-page.light-theme .pp-section {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid #ddd;
}

.pp-section:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.1);
}

.pp-page.light-theme .pp-section:hover {
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.pp-section h2 {
  font-size: 28px;
  margin-bottom: 20px;
  color: white;
}

.pp-page.light-theme .pp-section h2 {
  color: #333;
}

.pp-section p {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 15px;
  color: #ccc;
}

.pp-page.light-theme .pp-section p {
  color: #666;
}

.pp-section ul {
  margin: 20px 0;
  padding-left: 30px;
}

.pp-section li {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 10px;
  color: #aaa;
}

.pp-page.light-theme .pp-section li {
  color: #555;
}

/* Контактная информация */
.pp-contact {
  max-width: 900px;
  margin: 0 auto 100px;
  text-align: center;
}

.pp-contact h2 {
  font-size: 36px;
  margin-bottom: 30px;
}

.pp-contact-info {
  margin-top: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid #666;
}

.pp-page.light-theme .pp-contact-info {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid #ccc;
}

.pp-contact-info p {
  font-size: 20px;
  margin-bottom: 15px;
}

.pp-contact-info strong {
  color: white;
}

.pp-page.light-theme .pp-contact-info strong {
  color: black;
}

/* Мобильная навигация */
@media (max-width: 1024px) {
  .pp-nav {
    display: none;
  }

  .pp-mobile-nav {
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

  .pp-page.light-theme .pp-mobile-nav {
    background: white;
  }

  .pp-theme-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .pp-menu-toggle {
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

  .pp-line {
    display: block;
    width: 100%;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
  }

  .pp-page.light-theme .pp-line {
    background: black;
  }

  .pp-line.active:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .pp-line.active:nth-child(2) {
    opacity: 0;
  }

  .pp-line.active:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .pp-mobile-menu {
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

  .pp-page.light-theme .pp-mobile-menu {
    background: white;
    border-bottom: 1px solid #ddd;
  }

  .pp-mobile-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .pp-mobile-menu a {
    color: white;
    text-decoration: none;
    font-family: 'Anonymous Pro', monospace;
    padding: 12px 0;
    border-bottom: 1px solid #333;
  }

  .pp-page.light-theme .pp-mobile-menu a {
    color: black;
    border-bottom: 1px solid #ddd;
  }

  .pp-intro {
    margin-top: 100px;
  }

  .pp-title {
    font-size: 48px;
  }

  .pp-subtitle {
    font-size: 24px;
  }

  .pp-section {
    padding: 20px;
  }

  .pp-section h2 {
    font-size: 24px;
  }

  .pp-section p {
    font-size: 18px;
  }

  .pp-contact h2 {
    font-size: 28px;
  }

  .pp-contact-info p {
    font-size: 18px;
  }
}

/* Десктоп стили */
@media (min-width: 1025px) {
  .pp-mobile-nav {
    display: none;
  }
}

/* Общие hover эффекты */
a:hover, p:hover, nav:hover, span:hover, h1:hover, h2:hover, h3:hover {
  cursor: pointer;
  color: white;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
}

.pp-page.light-theme a:hover,
.pp-page.light-theme p:hover,
.pp-page.light-theme nav:hover,
.pp-page.light-theme span:hover,
.pp-page.light-theme h1:hover,
.pp-page.light-theme h2:hover,
.pp-page.light-theme h3:hover {
  color: black;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Скроллбар */
.pp-page::-webkit-scrollbar {
  width: 10px;
}

.pp-page::-webkit-scrollbar-track {
  background: transparent;
}

.pp-page::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 5px;
}

.pp-page.light-theme::-webkit-scrollbar-thumb {
  background: black;
}

/* Для Firefox */
.pp-page {
  scrollbar-color: white transparent;
  scrollbar-width: thin;
}

.pp-page.light-theme {
  scrollbar-color: black transparent;
}
</style>