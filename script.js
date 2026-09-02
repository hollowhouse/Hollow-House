const cfg = window.HOLLOW_HOUSE_CONFIG || {};
document.getElementById('year').textContent = new Date().getFullYear();
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
navToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',open?'true':'false')});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const main = document.getElementById('itch-main');
const status = document.getElementById('itch-status');
if(cfg.itchUrl){
  document.querySelectorAll('.itch-link').forEach(a=>{a.href=cfg.itchUrl;a.target='_blank';a.rel='noopener'});
  status.textContent='Descarga y novedades en itch.io.';
}else{
  document.querySelectorAll('.itch-link').forEach(a=>a.addEventListener('click',(e)=>{
    if(a.getAttribute('href')==='#' || a.id==='itch-main'){e.preventDefault();alert('Falta configurar la URL de itch.io en site-config.js');}
  }));
}

const revealTargets = [
  ...document.querySelectorAll('.section'),
  ...document.querySelectorAll('.feature'),
  ...document.querySelectorAll('.shot'),
  ...document.querySelectorAll('.lore-card'),
  ...document.querySelectorAll('.download-content'),
  ...document.querySelectorAll('footer')
];

revealTargets.forEach((el, index) => {
  el.classList.add('reveal');
  if (el.classList.contains('feature') || el.classList.contains('shot')) {
    el.classList.add(`reveal-delay-${(index % 3) + 1}`);
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => observer.observe(el));

const heroContent = document.querySelector('.hero-content');
heroContent?.classList.add('is-visible');
