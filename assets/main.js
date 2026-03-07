if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        delay: i * 0.03,
        scrollTrigger: {
          trigger: el,
          start: 'top 86%'
        }
      }
    );
  });

  const heroTitle = document.querySelector('.hero h1, .page-hero h1');
  if (heroTitle) {
    gsap.from(heroTitle, { y: 42, opacity: 0, duration: 1, ease: 'power4.out' });
  }
  gsap.from('.hero p, .page-hero p', { y: 22, opacity: 0, duration: 1, delay: 0.15, ease: 'power3.out' });
  gsap.from('.hero-actions .btn, .page-hero .btn', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1, delay: 0.25 });
  gsap.from('.fact-card, .mini, .stat, .service-card, .card, .gallery-card, .contact-card', {
    y: 18,
    opacity: 0,
    duration: 0.7,
    stagger: 0.06,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top'
    }
  });

  gsap.to('.glow-ring', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
  gsap.to('.wire-grid', { backgroundPosition: '80px 40px', duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.map-route', { filter: 'brightness(1.25)', duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
}
