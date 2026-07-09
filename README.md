# EstrAir™ — estrair.github.io

**Precision Localized Estrogen Therapy**  
Website for [www.estrair.com](https://www.estrair.com) — hosted on GitHub Pages.

---

## Overview

This is the source code for the EstrAir™ single-page website. It is a fully static site with no build step required — just push to the `main` branch and GitHub Pages serves it automatically.

---

## File Structure

```
estrair.github.io/
├── index.html          ← Single-page site (all sections)
├── style.css           ← All styles (CSS custom properties, responsive)
├── main.js             ← All JavaScript (animations, particles, form)
├── logo.jpg            ← Primary logo (used in hero, nav, footer)
├── logo.png            ← Logo PNG variant
├── favicon.ico         ← Browser tab icon
├── favicon.png         ← PNG favicon (32×32)
├── apple-touch-icon.png← iOS home screen icon (180×180)
├── CNAME               ← Custom domain: www.estrair.com
└── README.md           ← This file
```

---

## Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#home` | Animated logo, headline, particle background |
| Platform | `#platform` | Why Localized + convergence graphic + 4 pillars |
| Applications | `#applications` | 4 application cards (oral, airway, voice, future) |
| Science | `#science` | Biology copy + animated bar chart |
| Vision | `#vision` | Dark full-width vision statement |
| Founder | `#founder` | Amy Urban, DMD biography |
| Contact | `#contact` | Contact info + message form |

---

## Brand

| Token | Value | Use |
|---|---|---|
| `--teal` | `#0E7286` | Primary brand color, nav, headings |
| `--orange` | `#F56B3A` | Accent, target dot, card borders |
| `--charcoal` | `#1A2332` | Body text, dark sections |
| `--bg-alt` | `#F8FAFC` | Alternating section backgrounds |
| Font | Manrope | All text (Google Fonts) |

---

## Animations

- **Hero logo**: Arc draws itself, teal dot travels along the path, orange target bursts in with a pulse ring
- **Particle canvas**: 160 teal/orange particles drift and coalesce toward the center as you scroll
- **Convergence SVG**: Circles appear, lines draw toward the target on scroll-into-view
- **Bar chart**: Bars grow upward on scroll-into-view
- **Scroll reveal**: All sections fade + slide up as they enter the viewport

---

## Deployment

### GitHub Pages (automatic)

1. Push all files to the `main` branch of `estrair/estrair.github.io`
2. In **Settings → Pages**, set source to `main` branch, root `/`
3. The `CNAME` file handles the custom domain `www.estrair.com`
4. Ensure your DNS has a `CNAME` record: `www → estrair.github.io`

### Local Preview

```bash
# Python 3
python3 -m http.server 8080
# Then open http://localhost:8080
```

---

## Updating Content

All content is in `index.html`. Key areas:

- **Founder bio**: Search for `founder-bio` in `index.html`
- **Founder photo**: Replace the `<div class="founder-photo">` block with an `<img>` tag
- **LinkedIn URL**: Search for `linkedin.com` and replace with the actual profile URL
- **Contact form**: Currently client-side only. To add email delivery, integrate [Formspree](https://formspree.io) or [Netlify Forms](https://www.netlify.com/products/forms/)

### Adding a real contact form backend (Formspree)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and copy your endpoint URL (e.g. `https://formspree.io/f/xabc1234`)
3. In `index.html`, change `<form id="cform" novalidate>` to:
   ```html
   <form id="cform" action="https://formspree.io/f/xabc1234" method="POST">
   ```
4. Remove the `e.preventDefault()` submit handler in `main.js` (or keep it for the success animation and let Formspree handle the redirect)

---

## SEO & Meta

- Full OpenGraph tags (title, description, image)
- Twitter Card (`summary_large_image`)
- JSON-LD structured data (Organization schema)
- Canonical URL
- `robots` meta tag

---

## Accessibility

- Semantic HTML5 landmarks (`<nav>`, `<section>`, `<footer>`)
- All interactive elements have `aria-label` or visible text
- `aria-hidden="true"` on decorative SVGs
- `prefers-reduced-motion` media query disables animations
- Keyboard-navigable mobile menu

---

## License

&copy; 2026 EstrAir™. All rights reserved.  
Investigational only. Not FDA approved.
