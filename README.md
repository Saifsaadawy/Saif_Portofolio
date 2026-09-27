# Saifallah Ehab — Personal Portfolio

A premium, animated personal portfolio built with plain **HTML5, CSS3 and vanilla
JavaScript** — no frameworks, no build step.

## Run it locally

No installation or build tools needed.

1. Download / unzip this folder.
2. Double-click `index.html` to open it in your browser.

   Or, for the most reliable experience (some browsers restrict certain features
   when opening files directly), serve it with a tiny local server:

   ```bash
   # Python 3
   python3 -m http.server 8000
   # then open http://localhost:8000 in your browser
   ```

   ```bash
   # Node.js (if you have it)
   npx serve .
   ```
3. To publish it, upload the whole folder to any static host — GitHub Pages,
   Netlify, Vercel, or your own hosting — no server-side code required.

## Folder structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/     ← your photo + project thumbnails go here
│   ├── files/       ← your real CV replaces the placeholder PDF here
│   └── icons/       ← optional: custom icons/favicon if you want your own
└── README.md
```

## Customizing your content

| What to change | Where |
|---|---|
| Your photo | Add `assets/images/profile.jpg` (square image, ~800×800px works best). Until it's added, a clean placeholder icon shows instead of a broken image. |
| Your CV | Replace `assets/files/Saifallah_Ehab_CV.pdf` with your real CV, keeping the same filename (or update the link in `index.html`). |
| Hero titles | Edit the `roles` array near the top of `js/script.js` to change the typed titles. |
| About text | Edit the paragraphs inside `<section id="about">` in `index.html`. |
| Skills & percentages | Each skill is a `.skill-bar` block in `index.html` with a `data-level="0-100"` attribute — change the number (and the matching `%` text) to adjust the bar. |
| Projects | Duplicate a `.project-card` block inside `<section id="projects">`. Set `data-category` to `ai`, `web` or `systems` so the filter buttons work. Delete the GitHub/Live Demo `<a>` button if you don't have that link yet — don't leave a fake URL. |
| Education / Experience | Edit the `.timeline__item` blocks inside `<section id="education">` and `<section id="experience">`. The experience section currently contains sample placeholder content clearly marked "Sample content — replace me". |
| Certifications | Duplicate a `.cert-card` block inside `<section id="certifications">`. |
| Contact details | Update the email, phone, LinkedIn and GitHub links inside `<section id="contact">`. |
| Theme colors | All colors are CSS custom properties at the top of `css/style.css` under `:root` — change `--orange`, `--black`, etc. to re-theme the whole site. |

## About the contact form

The contact form validates input and shows success/error feedback, but it is
**front-end only** — a static HTML page cannot send emails by itself. To make
it actually deliver messages, connect it to a free form backend such as
[Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com), then
replace the `fetch()`-ready comment block inside the form submit handler in
`js/script.js`.

## Features implemented

- [x] Responsive layout (desktop, tablet, mobile)
- [x] Dark theme (black/charcoal/orange) with a light-theme toggle
- [x] Scroll-reveal animations (fade/slide) that replay on scroll up and down, via Intersection Observer
- [x] Staggered card reveal animations
- [x] Scroll-direction–aware navbar styling (background + shadow on scroll)
- [x] Animated typing effect for professional titles
- [x] Animated skill bars that fill when scrolled into view
- [x] Subtle parallax on hero background shapes
- [x] Smooth scrolling + active-section highlighting in the navbar
- [x] Mobile hamburger menu with animated open/close
- [x] Scroll progress indicator bar
- [x] Back-to-top button
- [x] Custom animated cursor (desktop only, disabled on touch devices)
- [x] Project filtering by category
- [x] Contact form with validation and clear success/error feedback
- [x] `prefers-reduced-motion` respected throughout
- [x] Keyboard-accessible navigation and visible focus states
- [x] No fake photos, links, certificates or work history — all placeholders are clearly labeled

## Notes

- Icons are loaded from Font Awesome via CDN (`cdnjs.cloudflare.com`) — no local
  icon files are required, but `assets/icons/` is kept for any custom icons you
  add later.
- Fonts (Space Grotesk + Inter) load from Google Fonts via CDN.
- Everything else is fully self-contained — no other external dependencies.
