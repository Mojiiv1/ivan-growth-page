(() => {
  const toggle = document.querySelector('[data-menu]');
  const menu = document.querySelector('[data-mobile-nav]');
  if (toggle && menu) {
    const close = (restore = false) => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
      if (restore) toggle.focus();
    };
    toggle.addEventListener('click', () => {
      const open = !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('open')) close(true);
    });
    menu.addEventListener('click', event => event.target.closest('a') && close());
  }
  const dialog = document.querySelector('.lightbox');
  const openers = [...document.querySelectorAll('[data-gallery-open]')];
  if (!dialog || !openers.length || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  const counter = dialog.querySelector('[data-lightbox-count]');
  const previous = dialog.querySelector('[data-lightbox-prev]');
  const next = dialog.querySelector('[data-lightbox-next]');
  const closeButton = dialog.querySelector('[data-lightbox-close]');
  let index = 0;
  let opener = null;
  let swipeStart = null;
  const show = (nextIndex) => {
    index = (nextIndex + openers.length) % openers.length;
    const source = openers[index].querySelector('img');
    image.src = openers[index].href || source.currentSrc || source.src;
    image.alt = source.alt;
    const photoCaption = source.closest('figure').querySelector('figcaption span')?.textContent || source.alt;
    caption.textContent = photoCaption;
    if (counter) counter.textContent = String(index+1).padStart(2,'0') + ' / ' + String(openers.length).padStart(2,'0');
  };
  openers.forEach((link, i) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    opener = link;
    show(i);
    dialog.showModal();
    document.body.classList.add('dialog-open');
    closeButton?.focus();
  }));
  previous?.addEventListener('click', () => show(index - 1));
  next?.addEventListener('click', () => show(index + 1));
  closeButton?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const rtl = document.documentElement.dir === 'rtl';
      const towardNext = event.key === 'ArrowRight' ? !rtl : rtl;
      show(index + (towardNext ? 1 : -1));
    }
  });
  dialog.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) { swipeStart = null; return; }
    swipeStart = {x:event.touches[0].clientX,y:event.touches[0].clientY};
  }, {passive:true});
  dialog.addEventListener('touchend', event => {
    if (!swipeStart) return;
    const x = event.changedTouches[0].clientX - swipeStart.x;
    const y = event.changedTouches[0].clientY - swipeStart.y;
    const rtl = document.documentElement.dir === 'rtl';
    if (Math.abs(x) > 65 && Math.abs(x) > 1.4*Math.abs(y)) {
      show(index + ((x < 0) !== rtl ? 1 : -1));
    }
    swipeStart = null;
  }, {passive:true});
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    image.removeAttribute('src');
    if (opener && opener.isConnected) opener.focus({preventScroll:true});
  });
})();
