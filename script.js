(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.querySelector('#main-nav');
  const toggle = document.querySelector('.menu-toggle');
  const setMenu = (open) => {
    if (!menu || !toggle) return;
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Cerrar ×' : 'Menú +';
  };
  toggle?.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  // El contenido sigue visible sin JavaScript o sin IntersectionObserver.
  if ('IntersectionObserver' in window && !reduced.matches) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.04, rootMargin: '0px 0px 30px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal-ready', 'reveal-pending'); io.observe(el);
      }
    });
    reduced.addEventListener?.('change', e => {
      if (e.matches) document.querySelectorAll('.reveal-pending').forEach(el => el.classList.add('reveal-visible'));
    });
  }
  let ticking = false;
  const progress = document.querySelector('.progress');
  const updateProgress = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); } }, { passive: true });
  window.addEventListener('resize', updateProgress); updateProgress();
  const dialog = document.querySelector('#gallery-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('a[data-lightbox]').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      dialog.querySelector('img').src = a.href;
      dialog.querySelector('img').alt = a.querySelector('img')?.alt || 'Imagen de Hollow House';
      dialog.querySelector('p').textContent = a.closest('figure')?.querySelector('figcaption')?.textContent || '';
      dialog.showModal();
    }));
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  }
  const filters = document.querySelectorAll('[data-filter-year]');
  const search = document.querySelector('#archive-search');
  let selectedYear = 'all';
  const normalize = value => value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const applyFilter = () => {
    const query = normalize(search?.value || ''); let total = 0;
    document.querySelectorAll('[data-case-year]').forEach(card => {
      const visible = (selectedYear === 'all' || card.dataset.caseYear === selectedYear) && normalize(card.textContent).includes(query);
      card.hidden = !visible; if (visible) total++;
    });
    const count = document.querySelector('#filter-count');
    if (count) count.textContent = total ? `${total} expediente${total === 1 ? '' : 's'} en el archivo` : 'No hay expedientes con esa búsqueda.';
  };
  filters.forEach(btn => btn.addEventListener('click', () => {
    selectedYear = btn.dataset.filterYear;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === btn))); applyFilter();
  }));
  search?.addEventListener('input', applyFilter);
  document.querySelector('[data-copy-email]')?.addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText('hollowhouse54@gmail.com');
      if (status) status.textContent = 'Correo copiado.';
    } catch (_) {
      if (status) status.textContent = 'Selecciona y copia este correo: hollowhouse54@gmail.com';
    }
  });
  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
  const yt = document.querySelector('[data-youtube]');
  yt?.addEventListener('click', () => {
    const host = document.querySelector('#trailer-player');
    if (!host) return;
    host.querySelector('video')?.pause();
    const frame = document.createElement('iframe');
    frame.className = 'youtube-frame';
    frame.src = 'https://www.youtube-nocookie.com/embed/xGU8IVj4Clg?rel=0&autoplay=0';
    frame.title = 'Hollow House 0.13.40: video oficial en YouTube';
    frame.allow = 'encrypted-media; picture-in-picture; fullscreen';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    host.replaceChildren(frame);
    yt.hidden = true;
  });
})();
