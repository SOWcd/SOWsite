/* ===================================================
   SOWER — Minimalist Theme main.js
   Subtle star field & Copy functionality
   =================================================== */

// ── Minimalist Star field ───────────────────────────
(function createStars() {
  const container = document.getElementById('bgStars');
  if (!container) return;
  const count = 150;
  const frag = document.createDocumentFragment();

  // Monochromatic star colors (white, gray, silver)
  const starColors = [
    '#ffffff',
    '#e8e8e8',
    '#d0d0d0',
    '#b8b8b8',
    '#a0a0a0'
  ];

  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    const size = Math.random() * 2 + 0.5;
    const dur  = (Math.random() * 4 + 2).toFixed(1);
    const op   = (Math.random() * 0.4 + 0.15).toFixed(2);
    const color = starColors[Math.floor(Math.random() * starColors.length)];
    
    s.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      --dur:${dur}s; --op:${op};
      animation-delay:${(Math.random() * 4).toFixed(1)}s;
      background:${color};
      box-shadow: 0 0 ${size}px ${color};
    `;
    frag.appendChild(s);
  }
  container.appendChild(frag);
})();

// ── Channel Accent Colors ─────────────────────────────
(function initChannelAccentColors() {
  const channelBlocks = document.querySelectorAll('.channel-block');
  channelBlocks.forEach(block => {
    const accentColor = block.getAttribute('data-accent-color');
    if (accentColor) {
      block.style.setProperty('--channel-accent', accentColor);
    }
  });
})();

// ── Copy to Clipboard ───────────────────────────────
(function initCopyLinks() {
  const toast = document.getElementById('copyToast');
  let toastTimeout;

  function copyText(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      if (toast) {
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
          toast.classList.remove('show');
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  // New split-button: copy btn on Riot Games card
  const copyBtns = document.querySelectorAll('.link__copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const linkContainer = btn.closest('.link--split');
      if (linkContainer) {
        const textToCopy = linkContainer.getAttribute('data-copy');
        copyText(textToCopy);
      }
    });
  });

  // Legacy: copy badge (other cards if any)
  const copyBadges = document.querySelectorAll('.link__copy-badge');
  copyBadges.forEach(badge => {
    badge.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const linkContainer = badge.closest('.link');
      if (linkContainer) {
        const textToCopy = linkContainer.getAttribute('data-copy');
        copyText(textToCopy);
      }
    });
  });

  // Legacy: whole-card copy (Discord etc.)
  const copyLinks = document.querySelectorAll('.link--copy');
  copyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = link.getAttribute('data-copy');
      copyText(textToCopy);
    });
  });
})();
