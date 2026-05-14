<template>
  <v-app>
    <!-- Loading Screen -->
    <div class="loading-screen" :class="{ 'loading-screen--hidden': !loading }">
      <span class="loading-logo">k</span>
    </div>

    <!-- Aurora Background -->
    <div class="aurora-layer">
      <div class="aurora-orb aurora-orb--1" />
      <div class="aurora-orb aurora-orb--2" />
      <div class="aurora-orb aurora-orb--3" />
      <div class="aurora-orb aurora-orb--4" />
    </div>

    <!-- Cursor Glow -->
    <div class="cursor-glow" :style="cursorStyle" />

    <main class="page-shell">
      <!-- Hero Section -->
      <section class="hero-grid">
        <v-container class="content-wrap" fluid>
          <nav class="top-nav">
            <a class="brand" href="#top" aria-label="kikko home">
              <span class="brand-mark">k</span>
              <span>{{ profile.name }}</span>
            </a>
            <div class="nav-links">
              <a href="#about">About</a>
              <a href="#interests">Interests</a>
              <a href="#now">Now</a>
              <a href="#work">Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </nav>

          <div id="top" class="hero-layout">
            <div class="hero-copy">
              <p class="eyebrow">
                <span class="eyebrow-dot" />
                {{ profile.status }} · {{ profile.location }}
              </p>
              <h1>
                <span class="hero-title-line">Hi, I'm {{ profile.name }}</span>
              </h1>
              <p class="lead">{{ profile.tagline }}</p>

              <div class="hero-actions">
                <v-btn class="primary-btn" size="large" href="#contact">
                  Say hello
                  <v-icon end icon="mdi-arrow-right" />
                </v-btn>
                <v-btn class="ghost-btn" size="large" variant="outlined" :href="profile.github" target="_blank">
                  GitHub
                  <v-icon end icon="mdi-github" />
                </v-btn>
              </div>
            </div>

            <aside class="profile-card" aria-label="profile card">
              <div class="avatar-wrap">
                <img v-if="profile.avatar" :src="profile.avatar" alt="kikko avatar" />
                <span v-else>k</span>
              </div>
              <div>
                <p class="card-kicker">ShanghaiTech · SIST</p>
                <h2>{{ profile.name }}</h2>
                <p>Incoming graduate student exploring embodied intelligence, code, and small personal experiments.</p>
              </div>
              <div class="signal-row">
                <span v-for="signal in signals" :key="signal">{{ signal }}</span>
              </div>
            </aside>
          </div>
        </v-container>
      </section>

      <!-- Content Sections -->
      <v-container class="section-wrap">
        <section id="about" class="section-block about-block" data-reveal>
          <div>
            <p class="section-label">About</p>
            <h2>一个正在探索具身智能的上海科技大学研 0 学生。</h2>
          </div>
          <p>
            我目前是上海科技大学信息科学与技术学院的研 0 学生，研究方向是具身智能。
            现阶段我还在打基础、读论文、补工程能力，也在慢慢寻找自己真正感兴趣的问题。
            这个网站暂时不是正式学术主页，更像是一个个人数字空间：用于自我介绍、记录想法，
            也放一些自己搓着玩的项目。
          </p>
        </section>

        <section id="interests" class="section-block" data-reveal>
          <div class="section-heading">
            <div>
              <p class="section-label">Interests</p>
              <h2>Things I am curious about</h2>
            </div>
            <span class="tiny-note">learning in progress</span>
          </div>
          <div class="chip-cloud" data-reveal-stagger>
            <v-chip v-for="interest in interests" :key="interest" color="primary" variant="tonal">{{ interest }}</v-chip>
          </div>
        </section>

        <section id="now" class="section-block" data-reveal>
          <div class="section-heading">
            <div>
              <p class="section-label">Now</p>
              <h2>What I am doing now</h2>
            </div>
          </div>
          <div class="now-list" data-reveal-stagger>
            <article v-for="item in nowItems" :key="item.title" class="now-item">
              <span>{{ item.mark }}</span>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </article>
          </div>
        </section>

        <section id="work" class="section-block" data-reveal>
          <div class="section-heading">
            <div>
              <p class="section-label">Projects</p>
              <h2>Small things I am building</h2>
            </div>
          </div>
          <div class="project-grid" data-reveal-stagger>
            <article v-for="project in projects" :key="project.title" class="project-card">
              <div class="project-index">{{ project.index }}</div>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
            </article>
          </div>
        </section>

        <section id="contact" class="contact-panel" data-reveal>
          <div>
            <p class="section-label">Contact</p>
            <h2>如果你想了解我，可以从这些链接开始。</h2>
            <p>这里会逐步整理我的 GitHub、邮箱、学习记录和未来可能的学术主页。现在，它先是一个轻量的自我介绍入口。</p>
          </div>
          <div class="contact-actions">
            <v-btn color="primary" size="large" :href="`mailto:${profile.email}`">
              Email me
              <v-icon end icon="mdi-email-outline" />
            </v-btn>
            <v-btn variant="outlined" size="large" :href="profile.github" target="_blank">
              View GitHub
              <v-icon end icon="mdi-open-in-new" />
            </v-btn>
          </div>
        </section>
      </v-container>

      <!-- Footer -->
      <footer class="page-footer">
        <p>&copy; {{ currentYear }} <a :href="profile.github" target="_blank">{{ profile.name }}</a> &mdash; Built with Vue &amp; Vuetify</p>
      </footer>
    </main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useScrollReveal } from './composables/useScrollReveal';

const loading = ref(true);
const mouseX = ref(50);
const mouseY = ref(50);
const currentYear = new Date().getFullYear();

const cursorStyle = computed(() => ({
  '--cursor-x': `${mouseX.value}%`,
  '--cursor-y': `${mouseY.value}%`,
}));

const profile = {
  name: import.meta.env.VITE_SITE_NAME || 'kikko',
  tagline: import.meta.env.VITE_SITE_TAGLINE || 'ShanghaiTech SIST graduate student exploring embodied intelligence, code, and small personal experiments.',
  location: import.meta.env.VITE_SITE_LOCATION || 'Shanghai, China',
  status: import.meta.env.VITE_SITE_STATUS || 'Embodied Intelligence · Graduate Year 0',
  github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/Hendrix0707',
  email: import.meta.env.VITE_EMAIL || 'hello@example.com',
  avatar: import.meta.env.VITE_AVATAR_URL || '/touxiang.jpg',
};

const signals = ['ShanghaiTech', 'Embodied AI', 'Personal site'];
const interests = [
  'Embodied Intelligence',
  'Robot Learning',
  'Vision-Language-Action',
  'Simulation Environments',
  'Human-centered AI',
  'Useful AI Systems',
];

const nowItems = [
  {
    mark: '01',
    title: 'Preparing for graduate study',
    description: 'Getting ready for life at ShanghaiTech SIST and building a stronger foundation for research.',
  },
  {
    mark: '02',
    title: 'Learning embodied intelligence',
    description: 'Reading, coding, and trying to understand how agents perceive, reason, and act in the world.',
  },
  {
    mark: '03',
    title: 'Building this little homepage',
    description: 'Treating this site as a small side project and a place to keep my identity, links, and notes together.',
  },
];

const projects = [
  {
    index: '01',
    title: 'Personal homepage',
    description: 'A small Vue + Vuetify website built as my digital home and self-introduction page.',
  },
  {
    index: '02',
    title: 'Learning notes',
    description: 'A future space for notes on embodied intelligence, robotics, AI systems, and web development.',
  },
  {
    index: '03',
    title: 'Tiny experiments',
    description: 'Small demos, tools, and weekend projects made while learning and exploring new ideas.',
  },
];

// Scroll reveal
useScrollReveal();

// Mouse tracking for cursor glow (desktop only)
function onMouseMove(e) {
  mouseX.value = (e.clientX / window.innerWidth) * 100;
  mouseY.value = (e.clientY / window.innerHeight) * 100;
}

onMounted(() => {
  // Loading screen
  setTimeout(() => {
    loading.value = false;
  }, 800);

  // Cursor glow
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
  }
});
</script>
