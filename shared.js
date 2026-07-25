// ═══════════════════════════════════════════════
// KASHMIR SINTHAN TOP — SHARED JS
// ═══════════════════════════════════════════════

// ── Custom Cursor ──
function initCursor(){
  const dot=document.getElementById('cur-dot'),ring=document.getElementById('cur-ring');
  if(!dot||!ring)return;
  document.addEventListener('mousemove',e=>{
    dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';
    ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px';
  });
  document.querySelectorAll('a,button,.card,.wc,.rv').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.style.transform='translate(-50%,-50%) scale(1.8)';ring.style.borderColor='var(--gold3)'});
    el.addEventListener('mouseleave',()=>{ring.style.transform='translate(-50%,-50%) scale(1)';ring.style.borderColor='var(--gold2)'});
  });
}

// ── Navbar scroll solid ──
function initNav(){
  const nav=document.getElementById('nav');
  if(!nav)return;
  const alwaysSolid=nav.classList.contains('dark-nav');
  const check=()=>nav.classList.toggle('solid',alwaysSolid||window.scrollY>80);
  check();
  window.addEventListener('scroll',check,{passive:true});
  // Hero parallax
  window.addEventListener('scroll',()=>{
    const bg=document.querySelector('.hero-bg');
    if(bg&&window.scrollY<window.innerHeight) bg.style.transform=`translateY(${window.scrollY*.3}px)`;
  },{passive:true});
}

// ── Mobile Drawer ──
let drawerOpen=false;
function tNav(){
  drawerOpen=!drawerOpen;
  const d=document.getElementById('navDrawer'),h=document.getElementById('ham');
  if(d) d.classList.toggle('open',drawerOpen);
  document.body.style.overflow=drawerOpen?'hidden':'';
  if(h){
    h.querySelectorAll('span')[0].style.transform=drawerOpen?'rotate(45deg) translate(5px,5px)':'';
    h.querySelectorAll('span')[1].style.opacity=drawerOpen?'0':'1';
    h.querySelectorAll('span')[2].style.transform=drawerOpen?'rotate(-45deg) translate(5px,-5px)':'';
  }
}
function closeDrawer(){
  drawerOpen=false;
  const d=document.getElementById('navDrawer'),h=document.getElementById('ham');
  if(d) d.classList.remove('open');
  document.body.style.overflow='';
  if(h){
    h.querySelectorAll('span')[0].style.transform='';
    h.querySelectorAll('span')[1].style.opacity='1';
    h.querySelectorAll('span')[2].style.transform='';
  }
}

// ── Scroll Reveal ──
function initReveal(){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.1});
  document.querySelectorAll('.ra').forEach(el=>io.observe(el));
}

// ── Counter animation ──
function initCounters(){
  const co=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      const t=+e.target.dataset.count,step=Math.ceil(t/55);
      let c=0;
      const ti=setInterval(()=>{c=Math.min(c+step,t);e.target.textContent=c.toLocaleString()+'+';if(c>=t)clearInterval(ti)},22);
      co.unobserve(e.target);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));
}

// ── Set active nav link ──
function setActiveNav(){
  const page=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href&&(href===page||href.endsWith(page))) a.classList.add('active');
  });
}

// ── Toast helper ──
function showToast(msg,type='success'){
  let t=document.getElementById('toast');
  if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);}
  t.textContent=msg;
  t.className='toast '+(type==='error'?'error':'');
  requestAnimationFrame(()=>t.classList.add('show'));
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ── WhatsApp form ──
function sendWA(){
  const emojiMap={fn:'👤',fp:'📱',fd:'📍',fdt:'📅',fgs:'👥',fm:'💬'};
  let t='Hello Kashmir Sinthan Top! 🏔️\n\n';
  ['fn','fp','fd','fdt','fgs','fm'].forEach(id=>{
    const el=document.getElementById(id);
    if(el&&el.value.trim()) t+=`${emojiMap[id]} ${el.value.trim()}\n`;
  });
  window.open('https://wa.me/919797125922?text='+encodeURIComponent(t),'_blank');
}

// ── Init all on DOM ready ──
document.addEventListener('DOMContentLoaded',()=>{
  initCursor();
  initNav();
  initReveal();
  initCounters();
});
