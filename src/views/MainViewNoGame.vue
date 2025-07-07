// App.vue
<template>
  <div class="app-layout">
    <header class="app-header">
      <h1>Nikita Vakhmianin</h1>
      <p>frontend—developer</p>
    </header>

    <section class="skills">
      <h2>skills</h2>
      <div class="tags">
        <span v-for="skill in skills" :key="skill">{{ skill }}</span>
      </div>
    </section>

    <section class="portfolio">
      <h2>portfolio</h2>
      <div class="projects">
        <div class="project" v-for="project in projects" :key="project">
          {{ project }}
        </div>
      </div>
    </section>

    <footer class="contacts">
      <h2>contacts</h2>
      <ul>
        <li>› name: Nikita Vakhmianin</li>
        <li>› email: nikitavahmanin@gmail.com</li>
        <li>› telegram: @O_R_P_H</li>
        <li>› github: github.com/O–R–P–H</li>
        <li>› location: Nizhny Novgorod, Russia</li>
        <li>› availability: open to remote work / freelance</li>
      </ul>
    </footer>

    <CRTOverlay />
  </div>
</template>

<script setup>
import CRTOverlay from './components/CRTOverlay.vue'

const skills = [
  'OOP', 'SOLID-Principles', 'Java Script', 'Type Script',
  'VUE 3', 'Electron JS', 'REST API', 'Agile',
  'SCRUM', 'GIT', 'HTML', 'CSS'
]

const projects = [
  '/minimal player',
  '/personal account system for NN CSM',
  '/PLANTS online store',
  '/landing page for small business'
]
</script>

<style scoped>
.app-layout {
  font-family: 'Anonymous Pro', monospace;
  background: black;
  color: #e6e6e6;
  padding: 60px;
  max-width: 1440px;
  margin: 0 auto;
}

.app-header h1 {
  font-size: 42px;
  font-weight: bold;
}
.app-header p {
  font-size: 18px;
  margin-top: 10px;
}

.skills h2,
.portfolio h2,
.contacts h2 {
  font-size: 20px;
  margin-top: 80px;
  margin-bottom: 20px;
}
.tags span {
  display: inline-block;
  margin: 6px;
  padding: 6px 12px;
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
  font-size: 16px;
}
.projects .project {
  margin-bottom: 20px;
  padding: 20px;
  background: #333;
  border-radius: 6px;
}

.contacts ul {
  margin-top: 20px;
  font-size: 16px;
  list-style: none;
  padding: 0;
}
</style>
