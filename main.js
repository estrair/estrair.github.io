/* ============================================================
   EstrAir™ — main.js
   Precision Localized Estrogen Therapy
   ============================================================ */

(function () {
  'use strict';

  /* ── Sticky Navigation ──────────────────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── Mobile Hamburger ───────────────────────────────────────── */
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Hero Logo Animation ────────────────────────────────────── *
   *
   *  Pure SVG logo — no image masking needed.
   *
   *  Sequence (on page load):
   *  0.0s  Wordmark "EstrAir" fades in (JS, 0.6s)
   *  0.5s  Tagline fades in (JS, 0.5s)
   *  0.8s  Arc begins drawing itself (JS, stroke-dashoffset, 1.8s)
   *  0.9s  Teal travel dot appears at i-dot and rides the arc (JS rAF, 1.7s)
   *  2.6s  Travel dot fades out, bullseye pops in
   *  3.0s  Headline, subtext, buttons fade in (CSS)
   *
   * ──────────────────────────────────────────────────────────── */
  window.addEventListener('load', () => {
    const wordmark  = document.getElementById('hero-wordmark');
    const tagline   = document.getElementById('hero-tagline');
    const arcDraw   = document.getElementById('hero-arc-draw');
    const arcPath   = document.getElementById('hero-arc');
    const travelDot = document.getElementById('hero-travel-dot');
    const bullseye  = document.getElementById('hero-bullseye');
    const headline  = document.querySelector('.hero-headline');
    const heroSub   = document.querySelector('.hero-sub');
    const heroBtns  = document.querySelector('.hero-btns');

    if (!arcPath || !travelDot || !bullseye) return;

    // ── Step 1: Fade in wordmark ─────────────────────────────────
    if (wordmark) {
      wordmark.style.transition = 'opacity 0.6s ease';
      wordmark.style.opacity = '1';
    }

    // ── Step 2: Fade in tagline (slight delay) ───────────────────
    setTimeout(() => {
      if (tagline) {
        tagline.style.transition = 'opacity 0.5s ease';
        tagline.style.opacity = '1';
      }
    }, 400);

    // ── Step 3: Arc draw + travel dot ───────────────────────────
    const TRAVEL_DURATION = 1800; // ms
    const ARC_START_DELAY = 800;  // ms after load

    // Measure path length for stroke-dashoffset and getPointAtLength
    const totalLen = arcPath.getTotalLength();

    // Set up arc for drawing animation
    if (arcDraw) {
      arcDraw.style.strokeDasharray  = totalLen;
      arcDraw.style.strokeDashoffset = totalLen;
      arcDraw.style.opacity = '1';
    }

    // Smooth ease-in-out
    function easeInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    setTimeout(() => {
      // Trigger CSS arc draw
      if (arcDraw) {
        arcDraw.style.transition =
          `stroke-dashoffset ${TRAVEL_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        arcDraw.style.strokeDashoffset = '0';
      }

      // Start travel dot slightly after arc begins
      setTimeout(() => {
        const startPt = arcPath.getPointAtLength(0);
        travelDot.setAttribute('cx', startPt.x);
        travelDot.setAttribute('cy', startPt.y);
        travelDot.setAttribute('opacity', '1');

        let startTime = null;

        function animateTravelDot(timestamp) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const raw     = Math.min(elapsed / TRAVEL_DURATION, 1);
          const t       = easeInOut(raw);

          const pt = arcPath.getPointAtLength(t * totalLen);
          travelDot.setAttribute('cx', pt.x);
          travelDot.setAttribute('cy', pt.y);

          // Fade out in final 10% of travel
          const alpha = raw > 0.90 ? Math.max(0, 1 - (raw - 0.90) / 0.10) : 1;
          travelDot.setAttribute('opacity', alpha);

          if (raw < 1) {
            requestAnimationFrame(animateTravelDot);
          } else {
            travelDot.setAttribute('opacity', '0');
            revealBullseye();
          }
        }

        requestAnimationFrame(animateTravelDot);
      }, 100); // dot starts 100ms after arc begins

    }, ARC_START_DELAY);

    // ── Step 4: Bullseye reveal ──────────────────────────────────
    function revealBullseye() {
      bullseye.querySelectorAll('.bs-layer').forEach((layer, i) => {
        setTimeout(() => {
          layer.style.transition = 'opacity 0.3s ease, transform 0.45s cubic-bezier(0.34,1.4,0.64,1)';
          layer.style.opacity    = layer.dataset.opacity || '1';
          layer.style.transform  = 'scale(1)';
        }, i * 90);
      });
    }

    // ── Step 5: Headline + content fade in ──────────────────────
    // These are handled by CSS animation with a 3s delay,
    // but we also ensure they're visible after animation completes
    const CONTENT_DELAY = ARC_START_DELAY + TRAVEL_DURATION + 400;
    setTimeout(() => {
      [headline, heroSub, heroBtns].forEach(el => {
        if (el) {
          el.style.animation = 'none';
          el.style.opacity   = '1';
          el.style.transform = 'none';
        }
      });
    }, CONTENT_DELAY);

  });

  /* ── Scroll Reveal ──────────────────────────────────────────── *
   *  Very subtle: 14px upward drift + opacity only.
   *  Threshold 0.12 so it triggers just as the element enters view.
   * ──────────────────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Contact Form ───────────────────────────────────────────── */
  const cform = document.getElementById('cform');
  if (cform) {
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.btn-submit');
      btn.textContent = 'Message Sent ✓';
      btn.classList.add('sent');
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.classList.remove('sent');
        this.reset();
      }, 3500);
    });
  }

})();
