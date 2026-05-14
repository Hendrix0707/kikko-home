import { onMounted, onUnmounted } from 'vue';

export function useScrollReveal() {
  let observer = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach((el) => {
      observer.observe(el);
    });
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
}
