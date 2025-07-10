<template>
  <div class="page" :class="{ 'light-theme': isLightTheme }">
    <header class="nav">
      <span class="lang" @click="toggleLanguage">{{ currentLanguage }}</span>
      <nav class="left_nav">
        <a href="">{{ t('home') }}</a>
        <a href="#skills">{{ t('skills') }}</a>
        <a href="#portfolio">{{ t('portfolio') }}</a>
        <a href="#contacts">{{ t('contacts') }}</a>
        <img
            :src="themeIcon"
            alt="toggle theme"
            class="icon"
            @click="toggleTheme"
        />
      </nav>
    </header>
    <header class="mobile-nav">
      <span class="lang" @click="toggleLanguage">{{ currentLanguage }}</span>

      <!-- Кнопка бургер-меню -->
      <button class="menu-toggle" @click="toggleMenu">
        <span :class="{'line': true, 'active': isMenuOpen}"></span>
        <span :class="{'line': true, 'active': isMenuOpen}"></span>
        <span :class="{'line': true, 'active': isMenuOpen}"></span>
      </button>

      <!-- Выпадающее меню -->
      <nav class="mobile-menu" :class="{'open': isMenuOpen}">
        <a href="" @click="closeMenu">{{ t('home') }}</a>
        <a href="#skills" @click="closeMenu">{{ t('skills') }}</a>
        <a href="#portfolio" @click="closeMenu">{{ t('portfolio') }}</a>
        <a href="#contacts" @click="closeMenu">{{ t('contacts') }}</a>
      </nav>

      <!-- Иконка темы -->
      <img
          :src="themeIcon"
          alt="toggle theme"
          class="theme-icon"
          @click="toggleTheme"
      />
    </header>

    <main>
      <section class="intro">
        <h1>Nikita<br/>Vakhmianin</h1>
        <p class="role">{{ t('frontendDeveloper') }}</p>
        <p class="alias">
          {{ t('alsoKnownAs') }} <b>O_R_P_H</b> {{ t('asDeveloper') }}<br/>
          {{ t('alsoKnownAs') }} <b>tsukawa</b> {{ t('asArtist') }}
        </p>
      </section>

      <section class="skills">
        <hr/>
        <a href="#skills">
          <div class="downarrow">
            <img src="../../src/assets/img/down_arrow.svg" alt="downarrow">
          </div>
        </a>
        <div id="skills" style="height: 10px"></div>
        <h2>{{ t('skills') }}</h2>
        <div class="tags">
          <span
              style="padding-left: 56px;padding-right: 56px">OOP</span><span>SOLID-Principles</span><span>Java Script</span>
          <span>Type Script</span><span>VUE 3</span><span>Electron JS</span>
          <span>REST API</span><span>Agile</span><span>SCRUM</span>
          <span>GIT</span><span>HTML</span><span>CSS</span>
        </div>
        <p class="description">
          {{ t('aboutMe') }}
        </p>
      </section>

      <section class="portfolio">
        <hr/>
        <a href="#portfolio">
          <div class="downarrow">
            <img src="../../src/assets/img/down_arrow.svg" alt="downarrow">
          </div>
        </a>
        <div id="portfolio" style="height: 10px"></div>
        <h2>{{ t('portfolio') }}</h2>
        <div class="projects">
          <div class="project">
            <img src="../../src/assets/img/minplayer.png" alt="Minimal Player Screenshot"/>
            <div style="display: flex; align-items: flex-start;max-width: 540px; justify-content: space-between;">
              <h3>{{ t('playerNaming') }}</h3>
              <a target="_blank" href="https://diplom.tsukawa.ru"><button class="view_button">{{ t('view') }}</button></a>
            </div>
            <p>{{ t('minimalPlayerDescription') }}</p>
          </div>
          <div class="project">
            <img src="../../src/assets/img/CSM_prj.png" alt="Minimal Player Screenshot"/>
            <div style="display: flex;max-width: 540px; align-items: flex-start; justify-content: space-between;">
              <h3 style="max-width: 420px">{{ t('csmNaming') }}</h3>
              <a href="https://lk.nncsm.ru/" target="_blank"><button class="view_button">{{ t('view') }}</button></a>
            </div>
            <p>{{ t('csmDescription') }}</p>
          </div>
          <div class="project">
            <img :src="plantImage" alt="Minimal Player Screenshot"/>
            <h3>{{ t('plantsNaming') }}</h3>
            <p>{{ t('plantsDescription') }}</p>
          </div>
          <div class="project">
            <img src="../../src/assets/img/choco_prj.png" alt="Minimal Player Screenshot"/>
            <h3 style="max-width: 540px">{{ t('chocoNaming') }}</h3>
            <p>{{ t('chocoDescription') }}</p>
          </div>
        </div>
      </section>

      <section class="contacts">
        <hr/>
        <a>
          <div class="downarrow">
          </div>
        </a>
        <div id="contacts"></div>
        <h2>{{ t('contacts') }}</h2>
        <ul>
          <li>
            <div>
              <span>&gt; {{ t('name') }}:</span> Nikita Vakhmianin
            </div>
            <button @click="(e) => copyToClipboard('Nikita Vakhmianin', e)">{{ t('copy') }}</button>
          </li>
          <li>
            <div>
              <span>&gt; {{ t('email') }}:</span> nikitavahmanin@gmail.com
            </div>
            <a href="mailto:nikitavahmanin@gmail.com?subject=Contact%20from%20portfolio" ><button>{{ t('write') }}</button></a>
          </li>
          <li>
            <div>
              <span>&gt; {{ t('telegram') }}:</span> @O_R_P_H
            </div>
            <a href="https://t.me/O_R_P_H"
               target="_blank"
               rel="noopener noreferrer"> <button>{{ t('write') }}</button></a>
          </li>
          <li>
            <div><span>&gt; {{ t('github') }}:</span> github.com/O-R-P-H</div>
            <a href="https://github.com/O-R-P-H"
               target="_blank"
               rel="noopener noreferrer"
               class="contact-button"><button>{{ t('view') }}</button></a>
          </li>
          <li>
            <div>
              <span>&gt; {{ t('location') }}:</span> Nizhny Novgorod, Russia
            </div>
            <button @click="(e) => copyToClipboard('Nizhny Novgorod, Russia', e)">{{ t('copy') }}</button>
          </li>
          <li>
            <div>
              <span>&gt; {{ t('availability') }}:</span> {{ t('availabilityText') }}
            </div></li>
        </ul>
      </section>
    </main>
    <CRTOverlay></CRTOverlay>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import CRTOverlay from "./components/CRTOverlay.vue";
import toggleWhite from '@/assets/img/switch_theme_white.svg';
import toggleBlack from '@/assets/img/switch_theme_black.svg';



const isLightTheme = ref(false);
const isMenuOpen = ref(false);
const currentLanguage = ref('eng');

const translations = {
  eng: {
    home: 'home',
    skills: 'skills',
    portfolio: 'portfolio',
    contacts: 'contacts',
    frontendDeveloper: 'frontend—developer',
    alsoKnownAs: 'also known as',
    asDeveloper: 'as a developer',
    asArtist: 'as an artist',
    aboutMe: 'My name is Nikita Vakhmianin. I was born in Nizhny Novgorod and work as a frontend developer. I have over a 2 years of official work experience and an additional three years of personal projects. Besides work, I am passionate about Arduino development, making music, and 3D modeling. I work both individually and in a team using the Agile or SCRUM methodology. My professional goals include continuous development and learning new technologies, creating user-friendly interfaces, and working on meaningful projects.',
    minimalPlayerDescription: 'As part of my pet project, I developed a minimalist music player using Vue 3, using Spotify as a key reference. The main goal of the project was to allow listeners to enjoy music in FLAC format. In addition to Vue, I utilized Electron, enabling the application to run not only in browsers but also natively on macOS and Windows. During the development, I gained additional skills in deploying my software on servers, learned to write the backend, designed the user interface, and worked with file compression algorithms.',
    csmDescription: 'As part of this commercial project, I developed a personal account system for the Nizhny Novgorod Center for Standardization and Metrology using Vue 3. The goal was to create a convenient interface for clients to submit applications, track their status, and manage documents. The system integrates with the organization\'s internal services and provides role-based access for different user categories. During development, I worked with complex form validation, implemented real-time status updates, and ensured compatibility with legacy systems used by the organization.',
    plantsDescription: 'This pet project involved creating an e-commerce platform for selling houseplants using Vue 3. The store features product catalog with filters, shopping cart, and secure checkout. I implemented interactive plant care guides and a virtual "plant doctor" to help customers maintain their purchases. The project allowed me to deepen my knowledge of payment system integration, inventory management, and creating responsive product pages that work equally well on desktop and mobile devices.',
    chocoDescription: 'I created this landing page for a local chocolate artisan to showcase products and attract customers. Using Vue 3, I developed an interactive product gallery with 3D views, an order form with delivery options, and a section for customer testimonials. The page includes animation effects to highlight special offers and seasonal products. This project helped me master techniques for creating high-converting landing pages that effectively present small business offerings while maintaining fast load times and SEO optimization.',
    name: 'name',
    email: 'email',
    telegram: 'telegram',
    github: 'github',
    location: 'location',
    availability: 'availability',
    availabilityText: 'open to remote work / freelance',
    view: 'view',
    write: 'write',
    copy: 'copy',
    playerNaming:'/minimal player',
    plantsNaming:'/PLANTS online store',
    chocoNaming:'/landing page for small business',
    csmNaming:'/personal account system for NN CSM'
  },
  ru: {
    home: 'главная',
    skills: 'навыки',
    portfolio: 'портфолио',
    contacts: 'контакты',
    frontendDeveloper: 'фронтенд-разработчик',
    alsoKnownAs: 'также известен как',
    asDeveloper: 'как разработчик',
    asArtist: 'как художник',
    aboutMe: 'Меня зовут Никита Вахмянин. Я родился в Нижнем Новгороде и работаю фронтенд-разработчиком. У меня более 2 лет официального опыта работы и дополнительно три года личных проектов. Помимо работы, я увлекаюсь разработкой на Arduino, созданием музыки и 3D-моделированием. Я работаю как индивидуально, так и в команде, используя методологии Agile или SCRUM. Мои профессиональные цели включают постоянное развитие и изучение новых технологий, создание удобных интерфейсов и работу над значимыми проектами.',
    playerNaming:'/минималистичный аудиосервис',
    minimalPlayerDescription: 'В рамках личного проекта я разработал минималистичный музыкальный плеер на Vue 3, используя Spotify в качестве ключевого ориентира. Основная цель проекта - позволить слушателям наслаждаться музыкой в формате FLAC. Помимо Vue, я использовал Electron, что позволило приложению работать не только в браузерах, но и нативно на macOS и Windows. В процессе разработки я приобрел дополнительные навыки в развертывании программного обеспечения на серверах, научился писать бэкенд, проектировать пользовательский интерфейс и работать с алгоритмами сжатия файлов.',
    csmNaming:'/личный кабинет клиента для "НН ЦСМ"',
    csmDescription: 'В рамках этого коммерческого проекта я разработал систему личного кабинета для Нижегородского центра стандартизации и метрологии на Vue 3. Целью было создание удобного интерфейса для клиентов, позволяющего подавать заявки, отслеживать их статус и управлять документами. Система интегрируется с внутренними сервисами организации и предоставляет ролевой доступ для разных категорий пользователей. В процессе разработки я работал со сложной валидацией форм, реализовал обновление статусов в реальном времени и обеспечил совместимость с устаревшими системами, используемыми организацией.',
    plantsNaming:'/магазин растений',
    plantsDescription: 'Этот личный проект включал создание платформы электронной коммерции для продажи комнатных растений с использованием Vue 3. Магазин включает каталог товаров с фильтрами, корзину покупок и безопасное оформление заказа. Я реализовал интерактивные руководства по уходу за растениями и виртуального "доктора растений", чтобы помочь покупателям ухаживать за своими покупками. Проект позволил мне углубить знания в интеграции платежных систем, управлении запасами и создании адаптивных товарных страниц, одинаково хорошо работающих как на компьютерах, так и на мобильных устройствах.',
    chocoNaming:'/лендинг для малого бизнеса',
    chocoDescription: 'Я создал эту целевую страницу для местного шоколатье, чтобы демонстрировать продукцию и привлекать клиентов. Используя Vue 3, я разработал интерактивную галерею продуктов с 3D-просмотром, форму заказа с вариантами доставки и раздел с отзывами клиентов. Страница включает анимационные эффекты для выделения специальных предложений и сезонных продуктов. Этот проект помог мне освоить техники создания высококонверсионных лендингов, которые эффективно представляют предложения малого бизнеса, сохраняя при этом быструю загрузку и SEO-оптимизацию.',
    name: 'имя',
    email: 'почта',
    telegram: 'telegram',
    github: 'github',
    location: 'местоположение',
    availability: 'доступность',
    availabilityText: 'открыт для удаленной работы / фриланса',
    view: 'посмотреть',
    write: 'написать',
    copy: 'копировать',
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

const copyToClipboard = (text, event) => {
  const button = event?.currentTarget;

  if (button) {
    const originalText = button.textContent;
    button.textContent = currentLanguage.value === 'eng' ? 'copied!' : 'скопировано!';
    button.style.background = '#64c24d';
    button.style.color = 'white';

    navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Copied to clipboard:', text);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
          } catch (fallbackErr) {
            console.error('Fallback copy failed:', fallbackErr);
          } finally {
            document.body.removeChild(textarea);
          }
        });

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
      button.style.color = '';
    }, 2000);
  }
};

watch(isLightTheme, (newVal) => {
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.classList.toggle('light-theme', newVal);
  }
}, { immediate: true });

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isLightTheme.value = savedTheme === 'light';
  }

  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.classList.toggle('light-theme', isLightTheme.value);
  }
});

const themeIcon = computed(() => {
  return isLightTheme.value
      ? toggleWhite
      : toggleBlack
});

const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value;
  document.documentElement.classList.toggle('light-theme', isLightTheme.value);
  localStorage.setItem('theme', isLightTheme.value ? 'light' : 'dark');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap');

/* Общие стили для обеих тем */
a:hover, p:hover, nav:hover, span:hover, h1:hover, h2:hover {
  cursor: pointer;
  color: white;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
}

a, p, nav, span, h1, h2 {
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.page {
  height: 100%;
  max-width: 1440px;
  margin: 0 auto;
  font-family: 'Anonymous Pro', monospace;
  padding-left: 5vw;
  padding-right: 5vw;
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Темная тема (по умолчанию) */
.page {
  background: black;
  color: #dfdfdf;
}

.page .nav {
  background-color: inherit;
}

.page .tags span {
  background: white;
  color: black;
}

.page .view_button {
  background-color: #dfdfdf;
  color: black;
}

.page .contacts button {
  background: white;
  color: black;
}

/* Светлая тема */
.page.light-theme {
  background: white;
  color: #333;
}

.downarrow {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.downarrow img {
  animation: swing-vertical 2.3s ease-in-out infinite;
  width: 20px;
  cursor: pointer;
  transition: filter 0.3s ease;
}

/* Темная тема - стрелка белая (исходное состояние) */
.page .downarrow img {
  filter: invert(0);
}

/* Светлая тема - стрелка черная */
.page.light-theme .downarrow img {
  filter: invert(1);
}

.page.light-theme .tags span {
  background: black;
  color: white;
}

.page.light-theme .view_button {
  background-color: #333;
  color: white;
}

.page.light-theme .contacts button {
  background: black;
  color: white;
}

.page.light-theme a:hover,
.page.light-theme p:hover,
.page.light-theme nav:hover,
.page.light-theme span:hover,
.page.light-theme h1:hover,
.page.light-theme h2:hover {
  color: black;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.page.light-theme .tags span:hover {
  color: white !important;
}
/* Остальные стили остаются без изменений */
b {
  color: white;
  font-family: "Anonymous Pro-Bold", sans-serif;
  animation: glowFlickerSharp 1.8s ease-out forwards;
}

.nav {
  height: 8vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  background-color: inherit;
}

.left_nav {
  display: flex;
  align-items: center;
}

.nav nav a {
  transition: all 0.3s ease-out;
  margin-left: 54px;
  text-decoration: none;
  color: #dfdfdf;
}

.page.light-theme .nav nav a {
  color: #333;
}

.nav nav a:hover {
  cursor: pointer;
  color: white;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
  text-decoration: underline;
}

.page.light-theme .nav nav a:hover {
  color: black;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.icon {
  width: 32px;
  height: 32px;
  margin-left: 54px;
}

.icon:hover {
  transition: color 0.3s ease, text-shadow 0.3s ease;
  filter: drop-shadow(0 0 24px rgba(255, 255, 255, 0.9));
}

.page.light-theme .icon:hover {
  filter: drop-shadow(0 0 24px rgba(0, 0, 0, 0.7));
}

.intro h1 {
  font-family: "Anonymous Pro-Bold", sans-serif;
  font-size: 92px;
  line-height: 1.1;
  font-weight: 700;
  margin-top: 75px;
  animation: glowFlickerSharp 1.8s ease-out forwards;
}

@keyframes glowFlickerSharp {
  0% {
    opacity: 0.3;
    text-shadow: none;
  }
  5% {
    text-shadow: 0 2px 2px rgba(255, 255, 255, 0.2);
  }
  10% {
    text-shadow: none;
  }
  15% {
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.4);
  }
  20% {
    text-shadow: none;
  }
  30% {
    text-shadow: 0 2px 6px rgba(255, 255, 255, 0.6);
  }
  45% {
    text-shadow: none;
  }
  60% {
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
  }
  80% {
    text-shadow: none;
  }
  100% {
    text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
  }
}

.page.light-theme b {
  color: black;
}

.role {
  font-size: 32px;
  margin-top: 15px;
}

.alias {
  margin-top: 115px;
  font-size: 13px;
  line-height: 1.4;
  color: #ccc;
}

.page.light-theme .alias {
  color: #666;
}

.skills hr {
  box-shadow: 0 0 24px 4px rgba(255, 255, 255, 0.3);
  border: 3px solid white;
  border-radius: 40px;
  bottom: 30px;
  margin-top: 130px;
}

.page.light-theme .skills hr,
.page.light-theme .portfolio hr,
.page.light-theme .contacts hr {
  box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.3);
  border: 3px solid black;
}

:fullscreen .skills hr {
  margin-top: 220px;
}

.downarrow {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.downarrow img {
  animation: swing-vertical 2.3s ease-in-out infinite;
  width: 20px;
  cursor: pointer;
}

@keyframes swing-vertical {
  0%, 100% {
    transform: translateY(3px);
  }
  50% {
    transform: translateY(-3px);
  }
}

:fullscreen #skills {
  height: 20px !important;
}

.skills h2,
.portfolio h2,
.contacts h2 {
  margin-top: 10px;
  text-align: center;
  font-size: 46px;
  font-weight: bold;
  margin-bottom: 40px;
}

.tags {
  transition: all 0.3s ease-out;
  max-width: 1095px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 40px;
}

.tags span:hover {
  scale: 105%;
  box-shadow: 0 0 24px 4px rgba(255, 255, 255, 0.3);
}

.page.light-theme .tags span:hover {
  box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.3);
}

.tags span {
  transition: all 0.3s ease-out;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 20px;
}

.description {
  font-size: 36px;
  text-align: justify;
  line-height: 112.9%;
}

.portfolio hr {
  box-shadow: 0 0 24px 4px rgba(255, 255, 255, 0.3);
  border: 3px solid white;
  border-radius: 40px;
  margin-top: 150px;
}

:fullscreen .portfolio hr {
  margin-top: 220px;
}

:fullscreen #portfolio {
  height: 20px !important;
}

.projects {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  margin-top: 48px;
}

.project img {
  transition: all 0.3s ease-out;
  margin-bottom: 16px;
  max-width: 540px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #222;
}
.project img:hover {
  box-shadow: 0 0 24px 4px rgba(255, 255, 255, 0.15);
  scale: 105%;
}
.project h3 {
  font-size: 32px;
  font-weight: bold;
}

.project p {
  max-width: 540px;
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.6;
}

.view_button {
  padding: 2px 10px;
  cursor: pointer;
  border-radius: 6px;
  min-width: 60px;
  height: 30px;
  font-family: "Anonymous Pro-Bold", sans-serif;
  font-size: 15px;
  transition:all 0.2s ease-out;
  border: none;
}
.view_button:hover {
  scale: 105%;
}
.contacts hr {
  box-shadow: 0 0 24px 4px rgba(255, 255, 255, 0.3);
  border: 3px solid white;
  border-radius: 40px;
  margin-top: 100px;
}

:fullscreen .contacts hr {
  margin-top: 70px;
}
.contacts {
  margin-bottom: 200px;
}

.contacts ul {
  list-style: none;
  font-size: 24px;
  padding: 0;
  margin-top: 40px;
  line-height: 2;
}

.contacts li span {
  font-weight: bold;
}
.contacts li{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.contacts button {
  margin-left: 10px;
  padding: 2px 10px;
  cursor: pointer;
  border-radius: 6px;
  text-align: center;
  min-width: 100px;
  height: 30px;
  font-family: "Anonymous Pro-Bold", sans-serif;
  font-size: 15px;
  transition:all 0.2s ease-out;
  border: none;
}
.page.light-theme ::-webkit-scrollbar-thumb {
  background-color: black !important; /* Чёрный ползунок в светлой теме */
}

/* Для Firefox */
.page {
  scrollbar-color: white transparent;
  scrollbar-width: auto;
}

.page.light-theme {
  scrollbar-color: black transparent !important; /* Чёрный ползунок в светлой теме */
}

@media (min-width: 1025px) {
  .mobile-nav{display: none}
}
@media (max-width: 1024px) {
  .mobile-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: inherit !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    z-index: 1000;
    border-bottom: 1px solid #333;
  }

  .page.light-theme .mobile-nav {
    background: inherit;
    border-bottom: 1px solid #ddd;
  }

  .lang {
    font-family: 'Anonymous Pro', monospace;
    font-size: 16px;
  }

  .theme-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .menu-toggle {
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

  .line {
    display: block;
    width: 100%;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
  }

  .page.light-theme .line {
    background: black;
  }

  .line.active:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .line.active:nth-child(2) {
    opacity: 0;
  }

  .line.active:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .mobile-menu {
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

  .page.light-theme .mobile-menu {
    background: white;
    border-bottom: 1px solid #ddd;
  }

  .mobile-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .mobile-menu a {
    color: white;
    text-decoration: none;
    font-family: 'Anonymous Pro', monospace;
    padding: 12px 0;
    border-bottom: 1px solid #333;
  }

  .page.light-theme .mobile-menu a {
    color: black;
    border-bottom: 1px solid #ddd;
  }

  .mobile-menu a:last-child {
    border-bottom: none;
  }
  .nav{
    display: none;
  }
  .page {
    padding: 40px 24px;
  }

  .projects {
    grid-template-columns: 1fr;
  }
  .projects h3{
    font-size: 26px;
  }
  .intro h1 {
    margin-top: 150px;
    font-size: 48px;
  }
  .skills hr{
    margin-top: 50px;
  }
  .alias{
    margin-top: 240px;
  }
  #skills{margin-bottom: 60px}
  :fullscreen .skills hr{
    margin-top: 140px;
  }
  :fullscreen #skills{
    margin-bottom: 60px;
  }
  .description{
    font-size: 24px;
  }
  .portfolio hr{
    margin-top: 50px;
  }
  :fullscreen .portfolio hr{
    margin-top: 40px;
  }
  #portfolio{
    margin-bottom: 60px;
  }
  .portfolio .downarrow{display: none}
  #contacts{
    margin-bottom: 80px;
  }
  .contacts ul{
    font-size: 14px;
  }
  .contacts button{
    padding: 2px 5px;
    text-align: center;
    font-size: 12px;
    height: 25px;
    width: 20px;
  }
  .contacts li{
    margin-bottom: 10px;
  }
  .contacts{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
