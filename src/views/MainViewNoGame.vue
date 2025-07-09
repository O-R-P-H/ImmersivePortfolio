<template>
  <div class="page">
    <header class="nav">
      <span class="lang">eng</span>
      <nav>
        <a href="#home">home</a>
        <a href="#skills">skills</a>
        <a href="#portfolio">portfolio</a>
        <a href="#contacts">contacts</a>
        <img src="" alt="toggle theme" class="icon" />
      </nav>
    </header>

    <main>
      <section class="intro">
        <h1>Nikita<br />Vakhmianin</h1>
        <p class="role">frontend—developer</p>
        <p class="alias">
          also known as <b>O_R_P_H</b> as a developer<br />
          also known as <b>tsukawa</b> as an artist
        </p>
      </section>

      <section class="skills">
        <hr />
        <h2>skills</h2>
        <div class="tags">
          <span>OOP</span><span>SOLID-Principles</span><span>Java Script</span>
          <span>Type Script</span><span>VUE 3</span><span>Electron JS</span>
          <span>REST API</span><span>Agile</span><span>SCRUM</span>
          <span>GIT</span><span>HTML</span><span>CSS</span>
        </div>
        <p class="description">
          My name is Nikita Vakhmianin. I was born in Nizhny Novgorod and work as a frontend developer...
        </p>
      </section>

      <section class="portfolio">
        <h2>portfolio</h2>
        <div class="projects">
          <div class="project">
            <img src="" alt="Minimal Player Screenshot" />
            <h3>/minimal player</h3>
            <p>As part of my pet project, I developed...</p>
          </div>
          <!-- 3 других блока по аналогии -->
        </div>
      </section>

      <section class="contacts">
        <h2 id="contacts">contacts</h2>
        <ul>
          <li><span>&gt; name:</span> Nikita Vakhmianin</li>
          <li><span>&gt; email:</span> nikitavahmanin@gmail.com <button>write</button></li>
          <li><span>&gt; telegram:</span> @O_R_P_H <button>write</button></li>
          <li><span>&gt; github:</span> github.com/O-R-P-H <button>view</button></li>
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
@import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap');

.page {
  max-width: 1440px;
  margin: 0 auto;
  background: black;
  color: white;
  font-family: 'Anonymous Pro', monospace;
  padding: 60px 80px;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 60px;
}

.nav nav a {
  margin-left: 24px;
  text-decoration: none;
  color: white;
}

.nav nav a:hover {
  text-decoration: underline;
}

.icon {
  width: 18px;
  height: 18px;
  margin-left: 12px;
}

.intro h1 {
  font-size: 64px;
  line-height: 1.1;
  font-weight: 700;
  margin-bottom: 16px;
}

.role {
  font-size: 18px;
  margin-bottom: 12px;
}

.alias {
  font-size: 13px;
  line-height: 1.4;
  color: #ccc;
}

.skills hr {
  border: 1px solid white;
  margin: 60px 0 40px;
}

.skills h2,
.portfolio h2,
.contacts h2 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 32px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 36px;
}

.tags span {
  background: white;
  color: black;
  padding: 5px 14px;
  border-radius: 999px;
  font-weight: bold;
  font-size: 14px;
}

.description {
  max-width: 920px;
  text-align: center;
  margin: 0 auto;
  line-height: 1.7;
}

.projects {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  margin-top: 48px;
}

.project img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #222;
}

.project h3 {
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
}

.project p {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.6;
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

