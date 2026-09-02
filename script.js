const cfg=window.HOLLOW_HOUSE_CONFIG||{itchUrl:'https://hollow-house2026.itch.io/hollow-house'};
const topbar=document.querySelector('.topbar');
const progress=document.querySelector('.progress');
const nav=document.querySelector('.nav');
const toggle=document.querySelector('.nav-toggle');
const year=document.getElementById('year');
if(year) year.textContent=new Date().getFullYear();
if(cfg.itchUrl){document.querySelectorAll('.itch-link').forEach(a=>{a.href=cfg.itchUrl;a.target='_blank';a.rel='noopener'});}
window.addEventListener('scroll',()=>{
  topbar?.classList.toggle('scrolled',scrollY>30);
  const max=document.documentElement.scrollHeight-innerHeight;
  if(progress) progress.style.width=(max?scrollY/max*100:0)+'%';
},{passive:true});
toggle?.addEventListener('click',()=>{const o=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',o?'true':'false')});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal,.stagger').forEach(el=>io.observe(el));
const lb=document.querySelector('.lightbox'),lbImg=lb?.querySelector('img');
document.querySelectorAll('[data-lightbox]').forEach(img=>img.addEventListener('click',()=>{if(lb&&lbImg){lbImg.src=img.src;lbImg.alt=img.alt||'';lb.classList.add('open');document.body.style.overflow='hidden'}}));
const close=()=>{if(lb){lb.classList.remove('open');document.body.style.overflow=''}};
lb?.addEventListener('click',e=>{if(e.target===lb||e.target.tagName==='BUTTON')close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
