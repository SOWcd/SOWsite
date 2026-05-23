/**
 * SOWER — Futuristic Protocol main.js
 */

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initCursor();
    initTextScramble();
    initCopySystem();
    initBentoHover();
});

// ── Starfield ───────────────────────────
function initStarfield() {
    const container = document.getElementById('bgStars');
    if (!container) return;
    const count = 100;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const s = document.createElement('span');
        s.className = 'star';
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;

        s.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #fff;
            left: ${x}%;
            top: ${y}%;
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            box-shadow: 0 0 ${size * 2}px #fff;
            animation: twinkle ${duration}s infinite ease-in-out ${delay}s;
        `;
        frag.appendChild(s);
    }
    container.appendChild(frag);
}

// ── Custom Cursor ───────────────────────
function initCursor() {
    const cursorEl = document.querySelector('.cursor-follower');
    if (!cursorEl) return;

    const cursor = {
        x: 0, y: 0,
        targetX: 0, targetY: 0,
        scale: 1, targetScale: 1
    };

    document.addEventListener('mousemove', (e) => {
        cursor.targetX = e.clientX;
        cursor.targetY = e.clientY;
    });

    function animate() {
        cursor.x += (cursor.targetX - cursor.x) * 0.15;
        cursor.y += (cursor.targetY - cursor.y) * 0.15;
        cursor.scale += (cursor.targetScale - cursor.scale) * 0.15;

        cursorEl.style.transform = `translate3d(${cursor.x - 10}px, ${cursor.y - 10}px, 0) scale(${cursor.scale})`;
        requestAnimationFrame(animate);
    }
    animate();

    // Hover effects
    function updateInteractive() {
        const interactive = document.querySelectorAll('a, button, .modern-link, .bento-item, [data-copy]');
        interactive.forEach(el => {
            if (el._cursorBound) return;
            el.addEventListener('mouseenter', () => {
                cursor.targetScale = 2;
                cursorEl.style.backgroundColor = 'rgba(255,255,255,0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.targetScale = 1;
                cursorEl.style.backgroundColor = 'transparent';
            });
            el._cursorBound = true;
        });
    }
    updateInteractive();
}

// ── Text Scramble ───────────────────────
function initTextScramble() {
    const el = document.querySelector('.profile__name');
    if (!el) return;

    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const text = el.getAttribute('data-value') || el.innerText;
    let frame = 0;
    let timeout;

    function scramble() {
        let output = '';
        let complete = 0;
        for (let i = 0; i < text.length; i++) {
            if (i < frame / 3) {
                output += text[i];
                complete++;
            } else {
                output += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        el.innerText = output;
        if (complete < text.length) {
            frame++;
            timeout = setTimeout(scramble, 30);
        }
    }

    el.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        frame = 0;
        scramble();
    });

    // Initial trigger
    scramble();
}

// ── Copy System ─────────────────────────
function initCopySystem() {
    const toast = document.getElementById('copyToast');
    const copyElements = document.querySelectorAll('[data-copy]');

    copyElements.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Stop navigation if it's inside a link

            const text = el.getAttribute('data-copy');
            if (text) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast();
                });
            }
        });
    });

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
}

// ── Bento Hover Parallax ────────────────
function initBentoHover() {
    const items = document.querySelectorAll('.bento-item');
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
}
