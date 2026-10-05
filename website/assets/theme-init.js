// Run before paint. A blocked storage API must never break the page.
try{if(localStorage.getItem('ivan-theme')==='dark')document.documentElement.dataset.theme='dark'}catch{}
