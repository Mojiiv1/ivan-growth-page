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
    document.addEventListener('keydown', event => event.key === 'Escape' && menu.classList.contains('open') && close(true));
    menu.addEventListener('click', event => event.target.closest('a') && close());
  }

  const dialog = document.querySelector('.lightbox');
  const openers = [...document.querySelectorAll('[data-gallery-open]')];
  if (!dialog || !openers.length) return;
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  let index = 0;
  let opener;
  const show = next => {
    index = (next + openers.length) % openers.length;
    const source = openers[index].querySelector('img');
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    caption.textContent = source.closest('figure').querySelector('figcaption')?.textContent || source.alt;
  };
  openers.forEach((button, i) => button.addEventListener('click', () => {
    opener = button;
    show(i);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }));
  dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => show(index + 1));
  dialog.querySelector('[data-lightbox-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => event.target === dialog && dialog.close());
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    opener?.focus();
  });
})();
