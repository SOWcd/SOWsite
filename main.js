/* ===================================================
   SOWER — Minimalist Theme main.js
   Subtle star field, parallax & Copy functionality
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

// ── Parallax Effect on Mouse Move ─────────────────────
(function initParallax() {
  const channels = document.querySelectorAll('.channel-block');
  if (channels.length === 0) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    channels.forEach(block => {
      block.style.transform = `translateZ(0) rotateX(${y * 0.05}deg) rotateY(${x * 0.05}deg)`;
    });
  });

  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    channels.forEach(block => {
      block.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
    });
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

// ── Ripple Effect on Click ──────────────────────────
(function initRippleEffect() {
  const links = document.querySelectorAll('.link, .channel-block');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: translate(${x}px, ${y}px) scale(0);
        pointer-events: none;
        animation: ripple 0.6s ease-out;
      `;
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
})();

// ── Add Ripple Animation to CSS ─────────────────────
const style = document.createElement('style');
style.innerHTML = `
  @keyframes ripple {
    0% {
      transform: translate(var(--x, 0), var(--y, 0)) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate(var(--x, 0), var(--y, 0)) scale(1);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

