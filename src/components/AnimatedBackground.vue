<template>
  <canvas ref="canvas" class="animated-bg" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);

const PALETTE = [
  [53, 191, 171],   // teal
  [49, 180, 200],   // blue-green
  [31, 201, 231],   // cyan
  [100, 210, 190],  // mint
  [70, 160, 180],   // muted teal
];

// ===== Large background blobs =====
class Blob {
  constructor(w, h, large = false) {
    this.radius = large
      ? 160 + Math.random() * 220
      : 90 + Math.random() * 140;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    this.color = `rgba(${c[0]},${c[1]},${c[2]},0.18)`;
    this.vx = (Math.random() - 0.5) * 0.025;
    this.vy = (Math.random() - 0.5) * 0.025;
    this.phase = Math.random() * Math.PI * 2;
    this.freq = 0.06 + Math.random() * 0.05;
    this.amp = 25 + Math.random() * 50;
    this.t = Math.random() * 1000;
    // Sub-circles for organic shape
    this.subCircles = [];
    const count = 3 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      this.subCircles.push({
        ox: (Math.random() - 0.5) * this.radius * 0.5,
        oy: (Math.random() - 0.5) * this.radius * 0.5,
        r: this.radius * (0.3 + Math.random() * 0.4),
      });
    }
  }

  update(w, h) {
    this.t += 0.0005;
    const dx = Math.sin(this.t * this.freq + this.phase) * this.amp * 0.05;
    const dy = Math.cos(this.t * this.freq * 1.3 + this.phase) * this.amp * 0.05;
    this.x += this.vx + dx;
    this.y += this.vy + dy;
    if (this.x < -this.radius) this.x = w + this.radius;
    if (this.x > w + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = h + this.radius;
    if (this.y > h + this.radius) this.y = -this.radius;
  }

  draw(ctx) {
    for (const sc of this.subCircles) {
      const cx = this.x + sc.ox;
      const cy = this.y + sc.oy;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, sc.r);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(cx - sc.r, cy - sc.r, sc.r * 2, sc.r * 2);
    }
  }
}

// ===== Floating particles (Proxio-style dots) =====
class Particle {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = 1.2 + Math.random() * 2.8;
    const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    this.alpha = 0.15 + Math.random() * 0.35;
    this.color = `rgba(${c[0]},${c[1]},${c[2]},${this.alpha})`;
    // Very slow drift
    this.vx = (Math.random() - 0.5) * 0.015;
    this.vy = (Math.random() - 0.5) * 0.015;
    this.phase = Math.random() * Math.PI * 2;
    this.freq = 0.04 + Math.random() * 0.04;
    this.amp = 15 + Math.random() * 35;
    this.t = Math.random() * 1000;
  }

  update(w, h) {
    this.t += 0.0004;
    const dx = Math.sin(this.t * this.freq + this.phase) * this.amp * 0.04;
    const dy = Math.cos(this.t * this.freq * 1.4 + this.phase) * this.amp * 0.04;
    this.x += this.vx + dx;
    this.y += this.vy + dy;
    if (this.x < 0) this.x = w;
    if (this.x > w) this.x = 0;
    if (this.y < 0) this.y = h;
    if (this.y > h) this.y = 0;
    // Subtle alpha pulsing
    this.alpha = 0.15 + Math.sin(this.t * 0.5 + this.phase) * 0.08 + 0.1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    // Soft glow
    const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
    glow.addColorStop(0, this.color);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(this.x - this.size * 4, this.y - this.size * 4, this.size * 8, this.size * 8);
  }
}

let animId = null;
let blobs = [];
let particles = [];
let ctx = null;
let w = 0;
let h = 0;

function resize() {
  if (!canvas.value) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.value.width = w * dpr;
  canvas.value.height = h * dpr;
  canvas.value.style.width = `${w}px`;
  canvas.value.style.height = `${h}px`;
  ctx = canvas.value.getContext('2d');
  ctx.scale(dpr, dpr);
}

function init() {
  blobs = [];
  particles = [];
  for (let i = 0; i < 3; i++) blobs.push(new Blob(w, h, true));
  for (let i = 0; i < 4; i++) blobs.push(new Blob(w, h, false));
  const particleCount = Math.min(50, Math.floor((w * h) / 25000));
  for (let i = 0; i < particleCount; i++) particles.push(new Particle(w, h));
}

function animate() {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  for (const blob of blobs) {
    blob.update(w, h);
    blob.draw(ctx);
  }
  for (const p of particles) {
    p.update(w, h);
    p.draw(ctx);
  }
  animId = requestAnimationFrame(animate);
}

onMounted(() => {
  resize();
  init();
  animate();
  window.addEventListener('resize', () => { resize(); init(); });
});

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId);
  window.removeEventListener('resize', () => {});
});
</script>

<style scoped>
.animated-bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  filter: blur(50px) saturate(1.15);
  opacity: var(--canvas-opacity, 0.88);
}
</style>
