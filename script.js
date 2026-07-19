// Nav solidify on scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Animated counters
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('es-CO');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('es-CO');
    };
    requestAnimationFrame(step);
  };
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterIO.observe(c));

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();