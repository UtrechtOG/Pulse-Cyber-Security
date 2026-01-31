/*
 PulseSec Runtime Guard
 Classification: client-side hardening & telemetry signal
 Scope: passive defense, no content interaction
*/

(() => {
  'use strict';

  /* IMMUTABILITY LOCK */
  Object.freeze(Object.prototype);
  Object.freeze(Array.prototype);

  /* DEVTOOLS HEURISTIC */
  let flag = false;
  const limit = 160;

  setInterval(() => {
    const w = window.outerWidth - window.innerWidth;
    const h = window.outerHeight - window.innerHeight;
    if ((w > limit || h > limit) && !flag) {
      flag = true;
    }
  }, 500);

  /* SHORTCUT HARDENING */
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
    }
  });

  /* CONTEXT ISOLATION */
  document.addEventListener('contextmenu', e => e.preventDefault());

  /* DOM WATCH */
  const mo = new MutationObserver(() => {});
  mo.observe(document.documentElement, { childList: true, subtree: true });

  /* FRAME BREAK */
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }

  /* HUMAN SIGNAL */
  let signal = 0;
  ['mousemove','scroll','keydown','click'].forEach(evt => {
    document.addEventListener(evt, () => signal++, { once: true });
  });
})();
