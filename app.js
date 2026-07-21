(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const body = document.body;
  const menuButton = $('#mobileMenuToggle');
  const scrim = $('#railScrim');
  const portal = $('#portalTransition');
  const portalTitle = $('#portalTitle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function releaseBoot() {
    if (typeof window.__AXIAL_RELEASE_BOOT__ === 'function') {
      window.__AXIAL_RELEASE_BOOT__();
      return;
    }
    const screen = $('#bootScreen');
    if (screen) screen.classList.add('is-hidden');
  }

  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
  }

  menuButton?.addEventListener('click', () => {
    setMenu(!body.classList.contains('menu-open'));
  });

  scrim?.addEventListener('click', () => setMenu(false));

  $$('.site-nav a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: .11, rootMargin: '0px 0px -4% 0px' })
    : null;

  $$('.reveal').forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 38, 220)}ms`;
    if (observer) observer.observe(element);
    else element.classList.add('is-visible');
  });

  document.addEventListener('click', event => {
    const localAnchor = event.target.closest('a[href^="#"]');
    if (!localAnchor) return;

    const target = document.querySelector(localAnchor.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  function navigateTop(url) {
    try {
      window.top.location.href = url;
    } catch (_) {
      window.location.href = url;
    }
  }

  $$('.package-card').forEach(card => {
    card.addEventListener('click', event => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const destination = card.dataset.destination || card.href;
      if (!destination) return;

      event.preventDefault();

      if (reducedMotion) {
        navigateTop(destination);
        return;
      }

      if (body.classList.contains('is-transitioning')) return;

      body.classList.add('is-transitioning');
      card.classList.add('is-entering');

      const title = $('.package-copy h3', card)?.textContent?.trim() || 'ARQUIVO AXIAL';
      if (portalTitle) portalTitle.textContent = title;
      if (portal) portal.classList.add('is-active');

      window.setTimeout(() => navigateTop(destination), 690);

      // Safety fallback in case the first navigation call is blocked.
      window.setTimeout(() => navigateTop(destination), 1250);
    });

    if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
      card.addEventListener('pointermove', event => {
        if (card.classList.contains('is-entering')) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform =
          `perspective(1000px) rotateY(${x * 3.5}deg) rotateX(${y * -3.5}deg) translateY(-10px) scale(1.012)`;
      });

      card.addEventListener('pointerleave', () => {
        if (!card.classList.contains('is-entering')) card.style.transform = '';
      });
    }
  });

  try {
    window.setTimeout(releaseBoot, 1400);
  } catch (error) {
    console.error('[Terra Axial] Falha de inicialização:', error);
    releaseBoot();
  }
})();