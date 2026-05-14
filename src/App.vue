<template>
  <v-app>
    <!-- Loading Screen -->
    <div class="loading-screen" :class="{ 'loading-screen--hidden': !loading }">
      <span class="loading-logo">k</span>
    </div>

    <!-- Canvas Animated Background -->
    <AnimatedBackground />

    <main class="page-shell">
      <!-- Navigation -->
      <nav class="top-nav">
        <div class="nav-inner">
          <a class="brand" href="#top">
            <img
              v-if="profile.avatar"
              :src="profile.avatar"
              alt="avatar"
              class="nav-avatar"
            />
            <span class="brand-name">{{ profile.name }}</span>
          </a>
          <div class="nav-right">
            <a href="#works" class="nav-link">Projects</a>
            <a href="#research" class="nav-link">Research</a>
            <a href="#about" class="nav-link">About</a>
            <a href="#contact" class="nav-link">Contact</a>
            <button class="theme-toggle" @click="toggleTheme" :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
              <v-icon :icon="theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'" size="18" />
            </button>
          </div>
          <button
            class="hamburger"
            :class="{ 'hamburger--open': mobileMenuOpen }"
            @click="toggleMenu"
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div
        class="mobile-menu"
        :class="{ 'mobile-menu--open': mobileMenuOpen }"
        @click.self="closeMenu"
      >
        <a href="#works" @click="closeMenu">Projects</a>
        <a href="#research" @click="closeMenu">Research</a>
        <a href="#about" @click="closeMenu">About</a>
        <a href="#contact" @click="closeMenu">Contact</a>
      </div>

      <!-- Hero Section -->
      <header id="top" class="hero">
        <div class="hero-layout">
          <div class="hero-content">
            <span class="hero-dot" aria-hidden="true" />
            <p class="hero-line hero-support hero-eyebrow" style="--stagger: 0">
              {{ profile.status }} · {{ profile.location }}
            </p>
            <h1 class="hero-line hero-title" style="--stagger: 1">
              Hi, I'm {{ profile.name }}
            </h1>
            <p class="hero-line hero-support" style="--stagger: 2">
              {{ profile.tagline }}
            </p>
            <div class="hero-actions" style="--stagger: 3">
              <a class="hero-cta hero-cta--primary" href="#contact">
                Say hello
                <v-icon icon="mdi-arrow-right" size="16" />
              </a>
              <a
                class="hero-cta"
                :href="profile.github"
                target="_blank"
                rel="noopener"
              >
                GitHub
                <v-icon icon="mdi-github" size="16" />
              </a>
              <a class="hero-cta" :href="`mailto:${profile.email}`">
                Email
                <v-icon icon="mdi-email-outline" size="16" />
              </a>
            </div>
            <div class="hero-highlights">
              <div
                class="hero-highlight"
                v-for="(hl, i) in heroHighlights"
                :key="i"
                :style="`--stagger: ${i + 4}`"
              >
                <p class="hero-highlight-value">{{ hl.value }}</p>
                <p class="hero-highlight-label">{{ hl.label }}</p>
              </div>
            </div>
          </div>

          <aside class="profile-card" aria-label="profile card">
            <div class="profile-avatar-wrap">
              <img v-if="profile.avatar" :src="profile.avatar" alt="kikko avatar" />
              <span v-else>k</span>
            </div>
            <div>
              <p class="profile-kicker">ShanghaiTech · SIST</p>
              <h2>{{ profile.name }}</h2>
              <p>Incoming graduate student exploring embodied intelligence, code, and small personal experiments.</p>
            </div>
            <div class="profile-signals">
              <span v-for="signal in profileSignals" :key="signal">{{ signal }}</span>
            </div>
          </aside>
        </div>
      </header>

      <!-- Projects Section -->
      <section id="works" class="section" data-reveal>
        <h2 class="section-title">Projects</h2>
        <div class="projects-grid" data-reveal-stagger>
          <article
            v-for="project in projects"
            :key="project.title"
            class="project-card"
          >
            <div class="project-content">
              <div class="project-header">
                <h3 class="project-name">
                  <strong>{{ project.title }}</strong>
                  <span class="project-subtitle">{{ project.subtitle }}</span>
                </h3>
              </div>
              <p class="project-desc">{{ project.description }}</p>
              <div class="project-meta">
                <div class="project-tags">
                  <span
                    class="tag"
                    v-for="tag in project.tags"
                    :key="tag"
                  >{{ tag }}</span>
                </div>
                <div class="project-links">
                  <a
                    v-for="link in project.links"
                    :key="link.text"
                    :href="link.url"
                    target="_blank"
                    rel="noopener"
                    class="project-link"
                  >{{ link.text }} →</a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Research Section -->
      <section id="research" class="section" data-reveal>
        <h2 class="section-title">Research</h2>
        <div class="projects-grid" data-reveal-stagger>
          <article
            v-for="pub in publications"
            :key="pub.title"
            class="project-card"
          >
            <div class="project-content">
              <div class="project-header">
                <h3 class="project-name">
                  <strong>{{ pub.title }}</strong>
                  <span class="project-subtitle">{{ pub.venue }}</span>
                </h3>
              </div>
              <p class="project-desc">{{ pub.abstract }}</p>
              <div class="project-meta">
                <div class="project-tags">
                  <span
                    class="tag"
                    v-for="tag in pub.tags"
                    :key="tag"
                  >{{ tag }}</span>
                </div>
                <div class="project-links">
                  <a
                    v-for="link in pub.links"
                    :key="link.text"
                    :href="link.url"
                    target="_blank"
                    rel="noopener"
                    class="project-link"
                  >{{ link.text }} →</a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- About + Skills Section -->
      <section id="about" class="section">
        <h2 class="section-title" data-reveal>About</h2>
        <div class="about-grid">
          <article class="about-card" data-reveal>
            <h3 class="about-card-heading">关于我</h3>
            <p class="about-text">
              上海科技大学信息科学与技术学院（SIST）研 0 学生，研究方向是具身智能。在读论文、补工程能力，慢慢寻找自己真正感兴趣的问题。这个网站是个人数字空间：自我介绍、记录想法，也放一些自己搓着玩的项目。
            </p>
          </article>

          <article class="about-card" data-reveal>
            <h3 class="about-card-heading">能力栈</h3>
            <div class="skill-groups">
              <div
                class="skill-group"
                v-for="group in skillGroups"
                :key="group.category"
              >
                <p class="skill-category">{{ group.category }}</p>
                <p class="skill-items">{{ group.items }}</p>
              </div>
            </div>
          </article>

          <article class="about-card" data-reveal style="grid-column: 1 / -1;">
            <h3 class="about-card-heading">研究兴趣</h3>
            <div class="chip-cloud">
              <span
                class="tag"
                v-for="interest in interests"
                :key="interest"
              >{{ interest }}</span>
            </div>
          </article>
        </div>
      </section>

      <!-- Now Section -->
      <section id="now" class="section">
        <h2 class="section-title" data-reveal>Now</h2>
        <div class="now-list" data-reveal-stagger>
          <article
            v-for="item in nowItems"
            :key="item.title"
            class="now-item"
          >
            <span class="now-mark">{{ item.mark }}</span>
            <div>
              <h3 class="now-title">{{ item.title }}</h3>
              <p class="now-desc">{{ item.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="section">
        <h2 class="section-title" data-reveal>Contact</h2>
        <div class="contact-list" data-reveal>
          <a
            v-for="c in contacts"
            :key="c.label"
            :href="c.url"
            target="_blank"
            rel="noopener"
            class="contact-item"
          >
            <span class="contact-text">{{ c.value }}</span>
            <span class="contact-label">{{ c.label }}</span>
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="page-footer">
        <p>&copy; {{ currentYear }} {{ profile.name }} &mdash; Built with Vue &amp; Vuetify</p>
      </footer>
    </main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useScrollReveal } from './composables/useScrollReveal';
import AnimatedBackground from './components/AnimatedBackground.vue';

const loading = ref(true);
const mobileMenuOpen = ref(false);
const theme = ref('light');
const currentYear = new Date().getFullYear();

function getSystemTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

function applyTheme(t) {
  theme.value = t;
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
}

function toggleTheme() {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark');
}

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMenu() {
  mobileMenuOpen.value = false;
}

function onKeyDown(e) {
  if (e.key === 'Escape' && mobileMenuOpen.value) {
    closeMenu();
  }
}

const profile = {
  name: import.meta.env.VITE_SITE_NAME || 'kikko',
  tagline:
    import.meta.env.VITE_SITE_TAGLINE ||
    'ShanghaiTech SIST graduate student exploring embodied intelligence, code, and small personal experiments.',
  location: import.meta.env.VITE_SITE_LOCATION || 'Shanghai, China',
  status:
    import.meta.env.VITE_SITE_STATUS ||
    'Embodied Intelligence · Graduate Year 0',
  github:
    import.meta.env.VITE_GITHUB_URL || 'https://github.com/Hendrix0707',
  email: import.meta.env.VITE_EMAIL || 'a840708483@gmail.com',
  avatar: import.meta.env.VITE_AVATAR_URL || '/touxiang.jpg',
};

const profileSignals = ['ShanghaiTech', 'Embodied AI', 'Personal site'];

const heroHighlights = [
  { value: 'ShanghaiTech', label: 'SIST · 研 0' },
  { value: 'Embodied AI', label: '研究方向' },
  { value: 'Robot Learning', label: 'VLA · Simulation' },
  { value: 'Personal Site', label: 'Built with Vue' },
];

const projects = [
  {
    title: 'Personal homepage',
    subtitle: 'Vue 3 + Vuetify 个人主页',
    description:
      '一个作为数字自我介绍的轻量个人网站，包含关于我、研究兴趣、项目和联系信息。支持浅色主题、Canvas 动画背景和滚动动画。',
    tags: ['Vue 3', 'Vuetify', 'Vite', 'Vercel'],
    links: [
      { text: '查看源码', url: 'https://github.com/Hendrix0707' },
    ],
  },
  {
    title: 'Learning notes',
    subtitle: '学习笔记与知识库',
    description:
      '记录具身智能、机器人学习、AI 系统和 Web 开发方面的学习笔记，正在逐步整理和构建中。',
    tags: ['Notes', 'Research', 'AI', 'Robotics'],
    links: [],
  },
  {
    title: 'Tiny experiments',
    subtitle: '小工具与实验项目',
    description:
      '学习和探索新想法时做的小 Demo、小工具和周末项目，涵盖从仿真环境到 Web 工具的各种实验。',
    tags: ['Experiments', 'Demos', 'Learning'],
    links: [],
  },
];

const publications = [
  {
    title: '基于关系蒸馏的视觉语言模型至轻量模型知识迁移方法',
    venue: '本科毕业论文',
    abstract:
      '围绕视觉语言模型（VLM）的知识蒸馏展开研究，提出基于关系蒸馏的知识迁移方法，将大规模 VLM 的视觉-语言对齐能力高效迁移至轻量级模型，在保持推理效率的同时显著提升下游任务性能。',
    tags: ['Vision-Language', 'Knowledge Distillation', 'Relation Distillation', 'Lightweight Models'],
    links: [],
  },
];

const skillGroups = [
  {
    category: 'AI & Research',
    items:
      'Embodied Intelligence, Robot Learning, Vision-Language-Action, Simulation Environments (Isaac Sim, MuJoCo)',
  },
  {
    category: 'Engineering',
    items:
      'Python, PyTorch, Vue 3, Vuetify, JavaScript, HTML/CSS, Vite',
  },
  {
    category: 'Tools & Workflow',
    items: 'Git, Linux, Vercel, VS Code, LaTeX, Markdown',
  },
];

const interests = [
  'Embodied Intelligence',
  'Robot Learning',
  'Vision-Language-Action',
  'Simulation Environments',
  'Human-Centered AI',
  'Useful AI Systems',
];

const nowItems = [
  {
    mark: '01',
    title: 'Preparing for graduate study',
    description:
      'Getting ready for life at ShanghaiTech SIST and building a stronger foundation for research.',
  },
  {
    mark: '02',
    title: 'Learning embodied intelligence',
    description:
      'Reading, coding, and trying to understand how agents perceive, reason, and act in the world.',
  },
  {
    mark: '03',
    title: 'Building this homepage',
    description:
      'Treating this site as a small side project and a place to keep my identity, links, and notes together.',
  },
];

const contacts = [
  {
    value: profile.email,
    label: '邮箱',
    url: `mailto:${profile.email}`,
  },
  {
    value: profile.github.replace('https://', ''),
    label: 'GitHub',
    url: profile.github,
  },
];

// Scroll reveal
useScrollReveal();

onMounted(() => {
  // Init theme
  const saved = localStorage.getItem('theme');
  applyTheme(saved || getSystemTheme());

  setTimeout(() => {
    loading.value = false;
  }, 800);

  window.addEventListener('keydown', onKeyDown);
});
</script>
