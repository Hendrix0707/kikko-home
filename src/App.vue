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
            <a href="#about" class="nav-link">About</a>
            <a href="#contact" class="nav-link">Contact</a>
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
        <a href="#about" @click="closeMenu">About</a>
        <a href="#contact" @click="closeMenu">Contact</a>
      </div>

      <!-- Hero Section -->
      <header id="top" class="hero">
        <div class="hero-content">
          <span class="hero-dot" aria-hidden="true" />
          <p class="hero-line hero-lead" style="--stagger: 0">
            你好，我是 {{ profile.name }}，
          </p>
          <p class="hero-line hero-support" style="--stagger: 1">
            {{ profile.status }} · {{ profile.location }}
          </p>
          <p class="hero-line hero-support" style="--stagger: 2">
            {{ profile.tagline }}
          </p>
          <div class="hero-actions" style="--stagger: 3">
            <a class="hero-cta hero-cta--primary" href="#contact">
              Say hello
              <v-icon icon="mdi-arrow-right" size="18" />
            </a>
            <a
              class="hero-cta"
              :href="profile.github"
              target="_blank"
              rel="noopener"
            >
              GitHub
              <v-icon icon="mdi-github" size="18" />
            </a>
            <a class="hero-cta" :href="`mailto:${profile.email}`">
              Email
              <v-icon icon="mdi-email-outline" size="18" />
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
      </header>

      <!-- Projects Section -->
      <section id="works" class="section" data-reveal>
        <h2 class="section-title">Projects</h2>
        <div class="projects-grid" data-reveal-stagger>
          <article
            v-for="project in projects"
            :key="project.title"
            class="project-card"
            :style="{ backgroundColor: project.bg, borderColor: project.border }"
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

      <!-- About + Skills Section -->
      <section id="about" class="section">
        <h2 class="section-title" data-reveal>About</h2>
        <div class="about-grid">
          <article class="about-card" data-reveal>
            <h3 class="about-card-heading">关于我</h3>
            <p class="about-text">
              我目前是上海科技大学信息科学与技术学院（SIST）的研 0 学生，研究方向是具身智能。现阶段还在打基础、读论文、补工程能力，慢慢寻找自己真正感兴趣的问题。这个网站是一个个人数字空间：用于自我介绍、记录想法，也放一些自己搓着玩的项目。
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

          <article class="about-card" data-reveal>
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
        <p>&copy; {{ currentYear }} {{ profile.name }}</p>
      </footer>
    </main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useScrollReveal } from './composables/useScrollReveal';

const loading = ref(true);
const mobileMenuOpen = ref(false);
const currentYear = new Date().getFullYear();

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

// cursor glow removed

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
  email: import.meta.env.VITE_EMAIL || 'hello@example.com',
  avatar: import.meta.env.VITE_AVATAR_URL || '/touxiang.jpg',
};

const heroHighlights = [
  { value: 'ShanghaiTech', label: 'SIST · 研 0' },
  { value: 'Embodied AI', label: '研究方向' },
  { value: 'Robot Learning', label: 'VLA · Simulation' },
  { value: 'Personal Site', label: 'Built with Vue & Vuetify' },
];

const projects = [
  {
    title: 'Personal homepage',
    subtitle: 'Vue 3 + Vuetify 个人主页',
    description:
      '一个作为数字自我介绍的轻量个人网站，包含关于我、研究兴趣、项目和联系信息。支持暗色主题、极光背景和滚动动画。',
    tags: ['Vue 3', 'Vuetify', 'Vite', 'Vercel'],
    bg: 'rgba(50, 30, 35, 0.45)',
    border: 'rgba(248, 180, 180, 0.12)',
    links: [
      { text: '查看源码', url: 'https://github.com/Hendrix0707' },
    ],
  },
  {
    title: 'Learning notes',
    subtitle: '学习笔记与知识库',
    description:
      '未来用于记录具身智能、机器人学习、AI 系统和 Web 开发方面的学习笔记。正在逐步整理和构建中。',
    tags: ['Notes', 'Research', 'AI', 'Robotics'],
    bg: 'rgba(35, 50, 35, 0.45)',
    border: 'rgba(180, 220, 180, 0.12)',
    links: [],
  },
  {
    title: 'Tiny experiments',
    subtitle: '小工具与实验项目',
    description:
      '学习和探索新想法时做的小 Demo、小工具和周末项目。涵盖从仿真环境到 Web 工具的各种实验。',
    tags: ['Experiments', 'Demos', 'Learning'],
    bg: 'rgba(38, 38, 55, 0.45)',
    border: 'rgba(180, 180, 240, 0.12)',
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

// Mouse tracking removed — cursor glow disabled

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 800);

  window.addEventListener('keydown', onKeyDown);
});
</script>
