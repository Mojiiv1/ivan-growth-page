(()=>{
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const menu=$('[data-menu]'), nav=$('#navigation'), theme=$('button[data-theme]');
  // Only collapse the progressively enhanced navigation when handlers are ready.
  document.documentElement.classList.add('js');
  function closeMenu(restore=false){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu';if(restore)menu.focus()}
  menu.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close':'Menu';if(open)nav.querySelector('a').focus()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu(true)}});
  document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!menu.contains(e.target))closeMenu(nav.contains(document.activeElement))});
  document.addEventListener('focusin',e=>{if(!nav.contains(e.target)&&!menu.contains(e.target))closeMenu()});
  matchMedia('(min-width:761px)').addEventListener('change',()=>closeMenu());
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
  function applyTheme(value){const dark=value==='dark';document.documentElement.dataset.theme=dark?'dark':'light';theme.textContent=dark?'Light ◐':'Dark ◐';theme.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');theme.setAttribute('aria-pressed',String(dark));$('meta[name="theme-color"]').content=dark?'#22231f':'#f6f2ea'}
  theme.hidden=false;applyTheme(document.documentElement.dataset.theme);
  theme.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';applyTheme(next);try{localStorage.setItem('ivan-theme',next)}catch{}});
  window.addEventListener('storage',e=>{if(e.key==='ivan-theme'||e.key===null)applyTheme(e.newValue)});
  const dialog=$('#lightbox'), photos=$$('[data-photo]');
  if(dialog&&photos.length&&typeof dialog.showModal==='function'){
    let index=0,opener=null,start=null;
    function render(){const source=photos[index].querySelector('img');dialog.querySelector('img').src=photos[index].href;dialog.querySelector('img').alt=source.alt;dialog.querySelector('img').width=Number(source.getAttribute('width'));dialog.querySelector('img').height=Number(source.getAttribute('height'));$('#photo-caption').textContent=source.alt;$('#photo-count').textContent=`Photo ${index+1} of ${photos.length}`}
    function move(delta){index=(index+delta+photos.length)%photos.length;render()}
    photos.forEach((a,i)=>a.addEventListener('click',e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();index=i;opener=a;render();dialog.showModal();document.body.classList.add('modal-open');$('#close-photo').focus()}));
    $('#close-photo').addEventListener('click',()=>dialog.close());$('#previous-photo').addEventListener('click',()=>move(-1));$('#next-photo').addEventListener('click',()=>move(1));
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
    dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}if(e.key==='ArrowRight'){e.preventDefault();move(1)}if(e.key==='Tab'){const b=[...dialog.querySelectorAll('button')];if(e.shiftKey&&document.activeElement===b[0]){e.preventDefault();b.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===b.at(-1)){e.preventDefault();b[0].focus()}}});
    dialog.addEventListener('touchstart',e=>{if(e.touches.length!==1){start=null;return}const t=e.changedTouches[0];start={x:t.clientX,y:t.clientY}},{passive:true});
    dialog.addEventListener('touchend',e=>{if(!start)return;const t=e.changedTouches[0],dx=t.clientX-start.x,dy=t.clientY-start.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy))move(dx>0?-1:1);start=null},{passive:true});
    dialog.addEventListener('touchcancel',()=>{start=null},{passive:true});
    dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus()});
  }
})();
