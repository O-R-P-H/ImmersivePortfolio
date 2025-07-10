<template>
  <div class="page" :class="{ 'light-theme': isLightTheme }">
    <header class="nav">
      <span class="lang">eng</span>
      <nav class="left_nav">
        <a href="">home</a>
        <a href="#skills">skills</a>
        <a href="#portfolio">portfolio</a>
        <a href="#contacts">contacts</a>
        <img
            :src="themeIcon"
            alt="toggle theme"
            class="icon"
            @click="toggleTheme"
        />
      </nav>
    </header>
    <header class="mobile-nav">
      <span class="lang">eng</span>

      <!-- Кнопка бургер-меню -->
      <button class="menu-toggle" @click="toggleMenu">
        <span :class="{'line': true, 'active': isMenuOpen}"></span>
        <span :class="{'line': true, 'active': isMenuOpen}"></span>
        <span :class="{'line': true, 'active': isMenuOpen}"></span>
      </button>

      <!-- Выпадающее меню -->
      <nav class="mobile-menu" :class="{'open': isMenuOpen}">
        <a href="" @click="closeMenu">home</a>
        <a href="#skills" @click="closeMenu">skills</a>
        <a href="#portfolio" @click="closeMenu">portfolio</a>
        <a href="#contacts" @click="closeMenu">contacts</a>
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
        <p class="role">frontend—developer</p>
        <p class="alias">
          also known as <b>O_R_P_H</b> as a developer<br/>
          also known as <b>tsukawa</b> as an artist
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
        <h2>skills</h2>
        <div class="tags">
          <span
              style="padding-left: 56px;padding-right: 56px">OOP</span><span>SOLID-Principles</span><span>Java Script</span>
          <span>Type Script</span><span>VUE 3</span><span>Electron JS</span>
          <span>REST API</span><span>Agile</span><span>SCRUM</span>
          <span>GIT</span><span>HTML</span><span>CSS</span>
        </div>
        <p class="description">
          My name is Nikita Vakhmianin. I was born in Nizhny Novgorod and work as a frontend developer. I have over a 2
          years of official work experience and an additional three years of personal projects. Besides work, I am
          passionate about Arduino development, making music, and 3D modeling. I work both individually and in a team
          using the Agile or SCRUM methodology. My professional goals include continuous development and learning new
          technologies, creating user-friendly interfaces, and working on meaningful projects.
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
        <h2>portfolio</h2>
        <div class="projects">
          <div class="project">
            <img src="../../src/assets/img/minplayer.png" alt="Minimal Player Screenshot"/>
            <div style="display: flex; align-items: center;max-width: 540px; justify-content: space-between;">
              <h3>/minimal player</h3>
              <a target="_blank" href="https://diplom.tsukawa.ru"><button class="view_button">view</button></a>
            </div>
            <p>As part of my pet project, I developed a minimalist music player using Vue 3, using Spotify as a key
              reference. The main goal of the project was to allow listeners to enjoy music in FLAC format. In addition
              to Vue, I utilized Electron, enabling the application to run not only in browsers but also natively on
              macOS and Windows. During the development, I gained additional skills in deploying my software on servers,
              learned to write the backend, designed the user interface, and worked with file compression
              algorithms.</p>
          </div>
          <div class="project">
            <img src="../../src/assets/img/CSM_prj.png" alt="Minimal Player Screenshot"/>
            <div style="display: flex;max-width: 540px; align-items: flex-start; justify-content: space-between;">
              <h3 style="max-width: 420px">/personal account system for NN CSM</h3>
              <a href="https://lk.nncsm.ru/" target="_blank"><button class="view_button">view</button></a>
            </div>
            <p>As part of this commercial project, I developed a personal account system for the Nizhny Novgorod Center for Standardization and Metrology using Vue 3. The goal was to create a convenient interface for clients to submit applications, track their status, and manage documents. The system integrates with the organization's internal services and provides role-based access for different user categories. During development, I worked with complex form validation, implemented real-time status updates, and ensured compatibility with legacy systems used by the organization.

            </p>
          </div>
          <div class="project">
            <img src="../../src/assets/img/plants_prj.png" alt="Minimal Player Screenshot"/>
            <h3>/PLANTS online store</h3>
            <p>This pet project involved creating an e-commerce platform for selling houseplants using Vue 3. The store features product catalog with filters, shopping cart, and secure checkout. I implemented interactive plant care guides and a virtual "plant doctor" to help customers maintain their purchases. The project allowed me to deepen my knowledge of payment system integration, inventory management, and creating responsive product pages that work equally well on desktop and mobile devices.</p>
          </div>
          <div class="project">
            <img src="../../src/assets/img/choco_prj.png" alt="Minimal Player Screenshot"/>
            <h3 style="max-width: 540px">/landing page for small business</h3>
            <p>I created this landing page for a local chocolate artisan to showcase products and attract customers. Using Vue 3, I developed an interactive product gallery with 3D views, an order form with delivery options, and a section for customer testimonials. The page includes animation effects to highlight special offers and seasonal products. This project helped me master techniques for creating high-converting landing pages that effectively present small business offerings while maintaining fast load times and SEO optimization.</p>
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
        <h2>contacts</h2>
        <ul>
          <li>
            <div>
              <span>&gt; name:</span> Nikita Vakhmianin

            </div>
            <button @click="(e) => copyToClipboard('Nikita Vakhmianin', e)">copy</button>
          </li>
          <li>
            <div>
              <span>&gt; email:</span> nikitavahmanin@gmail.com
            </div>
            <a href="mailto:nikitavahmanin@gmail.com?subject=Contact%20from%20portfolio" ><button>write</button></a>
          </li>
          <li>
            <div>
              <span>&gt; telegram:</span> @O_R_P_H
            </div>
            <a href="https://t.me/O_R_P_H"
               target="_blank"
               rel="noopener noreferrer"> <button>write</button></a>
          </li>
          <li>
            <div><span>&gt; github:</span> github.com/O-R-P-H</div>
            <a href="https://github.com/O-R-P-H"
               target="_blank"
               rel="noopener noreferrer"
               class="contact-button"><button>view</button></a>
          </li>
          <li>
           <div>
             <span>&gt; location:</span> Nizhny Novgorod, Russia

           </div>
            <button @click="(e) => copyToClipboard('Nizhny Novgorod, Russia', e)">copy</button>
          </li>
          <li>
            <div>
              <span>&gt; availability:</span> open to remote work / freelance
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

const isLightTheme = ref(false);


const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
const copyToClipboard = (text, event) => {
  const button = event?.currentTarget;

  if (button) {
    // Сохраняем оригинальный текст кнопки
    const originalText = button.textContent;

    // Меняем текст кнопки
    button.textContent = 'copied!';
    button.style.background = '#64c24d'; // Зеленый цвет для успеха
    button.style.color = 'white';

    // Копируем текст в буфер обмена
    navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Copied to clipboard:', text);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
          // Fallback для старых браузеров
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

    // Возвращаем оригинальный текст через 2 секунды
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
      button.style.color = '';
    }, 2000);
  }
};



// Обработчик темы для корневого элемента
watch(isLightTheme, (newVal) => {
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.classList.toggle('light-theme', newVal);
  }
}, { immediate: true });

// Проверяем сохраненную тему при загрузке
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isLightTheme.value = savedTheme === 'light';
  }

  // Инициализация темы для корневого элемента
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.classList.toggle('light-theme', isLightTheme.value);
  }
});

const themeIcon = computed(() => {
  return isLightTheme.value
      ? '../../src/assets/img/switch_theme_white.svg'
      : '../../src/assets/img/switch_theme_black.svg';
});

const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value;
  // Добавляем/удаляем класс к html элементу
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
  cursor: pointer;
  border-radius: 6px;
  width: 60px;
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
  width: 80px;
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
    background: inherit;
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
    width: 60px;
  }
  .contacts li{
    margin-bottom: 3px;
  }
}
</style>