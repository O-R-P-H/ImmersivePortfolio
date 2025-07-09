<template>
  <div class="page">
    <header class="nav">
      <span class="lang">eng</span>
      <nav class="left_nav">
        <a href="">home</a>
        <a href="#skills">skills</a>
        <a href="#portfolio">portfolio</a>
        <a href="#contacts">contacts</a>
        <img src="../../src/assets/img/switch_theme_black.svg" alt="toggle theme" class="icon"/>
      </nav>
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
            <h3>/minimal player</h3>
            <p>As part of my pet project, I developed a minimalist music player using Vue 3, using Spotify as a key
              reference. The main goal of the project was to allow listeners to enjoy music in FLAC format. In addition
              to Vue, I utilized Electron, enabling the application to run not only in browsers but also natively on
              macOS and Windows. During the development, I gained additional skills in deploying my software on servers,
              learned to write the backend, designed the user interface, and worked with file compression
              algorithms.</p>
          </div>
          <div class="project">
            <img src="../../src/assets/img/minplayer.png" alt="Minimal Player Screenshot"/>
            <h3>/minimal player</h3>
            <p>As part of my pet project, I developed a minimalist music player using Vue 3, using Spotify as a key
              reference. The main goal of the project was to allow listeners to enjoy music in FLAC format. In addition
              to Vue, I utilized Electron, enabling the application to run not only in browsers but also natively on
              macOS and Windows. During the development, I gained additional skills in deploying my software on servers,
              learned to write the backend, designed the user interface, and worked with file compression
              algorithms.</p>
          </div>
          <div class="project">
            <img src="../../src/assets/img/minplayer.png" alt="Minimal Player Screenshot"/>
            <h3>/minimal player</h3>
            <p>As part of my pet project, I developed a minimalist music player using Vue 3, using Spotify as a key
              reference. The main goal of the project was to allow listeners to enjoy music in FLAC format. In addition
              to Vue, I utilized Electron, enabling the application to run not only in browsers but also natively on
              macOS and Windows. During the development, I gained additional skills in deploying my software on servers,
              learned to write the backend, designed the user interface, and worked with file compression
              algorithms.</p>
          </div>
          <div class="project">
            <img src="../../src/assets/img/minplayer.png" alt="Minimal Player Screenshot"/>
            <h3>/minimal player</h3>
            <p>As part of my pet project, I developed a minimalist music player using Vue 3, using Spotify as a key
              reference. The main goal of the project was to allow listeners to enjoy music in FLAC format. In addition
              to Vue, I utilized Electron, enabling the application to run not only in browsers but also natively on
              macOS and Windows. During the development, I gained additional skills in deploying my software on servers,
              learned to write the backend, designed the user interface, and worked with file compression
              algorithms.</p>
          </div>
        </div>
      </section>

      <section class="contacts">
        <h2 id="contacts">contacts</h2>
        <ul>
          <li><span>&gt; name:</span> Nikita Vakhmianin</li>
          <li><span>&gt; email:</span> nikitavahmanin@gmail.com
            <button>write</button>
          </li>
          <li><span>&gt; telegram:</span> @O_R_P_H
            <button>write</button>
          </li>
          <li><span>&gt; github:</span> github.com/O-R-P-H
            <button>view</button>
          </li>
          <li><span>&gt; location:</span> Nizhny Novgorod, Russia</li>
          <li><span>&gt; availability:</span> open to remote work / freelance</li>
        </ul>
      </section>
    </main>
    <CRTOverlay></CRTOverlay>
  </div>
</template>


<script setup>
// No logic required for static layout
import CRTOverlay from "./components/CRTOverlay.vue";
</script>

<style scoped>
a:hover, p:hover, nav:hover, span:hover, h1:hover, h2:hover {
  cursor: pointer;
  color: white;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
}

a, p, nav, span, h1, h2 {
  transition: color 0.3s ease, text-shadow 0.3s ease;
}


@import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap');
b {
  color: white;
  font-family: "Anonymous Pro-Bold", sans-serif;
  animation: glowFlickerSharp 1.8s ease-out forwards;
}

.page {
  max-width: 1440px;
  margin: 0 auto;
  background: black;
  font-family: 'Anonymous Pro', monospace;
  padding-left: 8vw;
  padding-right: 8vw;
}

.nav {
  background-color: black;
  height: 8vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
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

.nav nav a:hover {
  cursor: pointer;
  color: white;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
  text-decoration: underline;
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

.skills hr {
  box-shadow: 0 0 24px 4px rgba(255, 255, 255, 0.3);
  border: 3px solid white;
  border-radius: 40px;
  bottom: 30px;
  margin-top: 80px;

}

:fullscreen .skills hr {
  margin-top: 165px;
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
  margin-bottom: 32px;
}

.tags {
  transition: all 0.3s ease-out;
  max-width: 1095px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 36px;
}

.tags span:hover {
  scale: 105%;
  box-shadow: 0 0 24px 4px rgba(255, 255, 255, 0.3);
}

.tags span {
  transition: all 0.3s ease-out;
  background: white;
  color: black;
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
  margin-top: 120px;

}

:fullscreen .portfolio hr {
  margin-top: 185px;
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
  max-width: 540px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #222;
}

.project h3 {
  margin-top: 16px;
  font-size: 32px;
  font-weight: bold;
}

.project p {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.6;
}

.contacts {
  margin-bottom: 400px;
}

.contacts ul {
  list-style: none;
  font-size: 14px;
  padding: 0;
  margin-top: 40px;
  line-height: 2;
}

.contacts li span {
  font-weight: bold;
}

.contacts button {
  margin-left: 10px;
  padding: 2px 10px;
  font-size: 12px;
  background: white;
  color: black;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .page {
    padding: 40px 24px;
  }

  .projects {
    grid-template-columns: 1fr;
  }

  .intro h1 {
    font-size: 48px;
  }
}
</style>

