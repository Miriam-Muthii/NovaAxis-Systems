# NovaAxis Systems – Miriam Muthoni Portfolio

Personal portfolio website for **Miriam Muthoni Muthii** — Full Stack Software Developer & AI Developer.

Live at: **https://novaaxissystems.vercel.app/**

---

## Quick Start (no build step)

This is plain HTML/CSS/JS. Open `index.html` in a browser to preview locally.

---

## How to Add Your Photos & CV

1. Copy your profile photo into `assets/img/` and name it **`profile.jpg`**  
   (or rename the file and update `src="assets/img/profile.jpg"` in `index.html`)

2. Copy your CV PDF into `assets/img/` and name it **`cv.pdf`**  
   (both "Download CV" buttons already point to `assets/img/cv.pdf`)

3. For project screenshots, add them to `assets/img/` and update each `<img src="...">` inside `.project-card`

---

## How to Add Your Work Experience

Open `index.html` and find the **Experience** timeline (search for `[Role – add from CV]`).  
Replace the placeholder `<span class="placeholder-text">` blocks with your real data from your CV:

```html
<span class="timeline-date">Jan 2022 – Present</span>
<h4 class="timeline-title">Software Developer</h4>
<p class="timeline-org">Company Name</p>
<ul class="timeline-achievements">
  <li>Achievement one.</li>
  <li>Achievement two.</li>
</ul>
```

---

## How to Add Real Projects

Each project card is an `<article class="project-card" data-category="...">` block.  
Replace the placeholder content:

- `data-category` — one of: `web`, `ai`, `erp`, `api`
- `<img src="assets/img/your-screenshot.png">`
- Project title, description, tech tags
- `href` on the two `.project-link` anchors (live URL + GitHub URL)

---

## How to Configure the Contact Form (Formspree)

The form is already configured with ID `xjyypkgk` and delivers messages to `miriammuthoni29@gmail.com`.

No further setup needed. If you ever need to change the email or create a new form:
1. Go to **https://formspree.io** and log in
2. Find your form or create a new one
3. In `index.html`, update the `action` attribute:
   ```html
   action="https://formspree.io/f/YOUR_NEW_ID"
   ```

---

## Deploy to GitHub & Vercel

### From a Computer

**Step 1 – Create a GitHub repository**
1. Go to https://github.com/Miriam-Muthii
2. Click **New repository**
3. Name it: `NovaAxis-Systems`
4. Set it to **Public**, leave everything else default
5. Click **Create repository**

**Step 2 – Push your files**

Open a terminal (PowerShell or Git Bash) in the project folder and run:

```powershell
git init
git add .
git commit -m "Initial portfolio build"
git branch -M main
git remote add origin https://github.com/Miriam-Muthii/NovaAxis-Systems.git
git push -u origin main
```

**Step 3 – Deploy on Vercel**
1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New → Project**
3. Select the `NovaAxis-Systems` repository
4. Vercel auto-detects static HTML — no settings to change
5. Click **Deploy**
6. Once deployed, go to **Settings → Domains** and set your custom domain to:  
   `novaaxissystems.vercel.app`

---

### From a Phone

**GitHub (mobile)**
1. Open https://github.com in your browser
2. Create the repository as above
3. Use the GitHub mobile app or upload files via the website (**Add file → Upload files**)
4. Upload all files maintaining the folder structure:
   - `index.html`
   - `assets/css/style.css`
   - `assets/js/main.js`
   - `assets/img/` (all images)
5. Commit with message: `Initial portfolio build`

**Vercel (mobile)**
1. Open https://vercel.com on your phone
2. Sign in with GitHub
3. Tap **Add New → Project**, select `NovaAxis-Systems`
4. Tap **Deploy** — done

---

## Mobile Testing Checklist

Test at these widths (use Chrome DevTools or browser resize):

- [ ] **360px** – No horizontal scroll. Hero name visible without scrolling.
- [ ] **375px (iPhone SE)** – Notch/safe-area padding correct.
- [ ] **480px** – Single column skills and projects.
- [ ] **768px** – 2-column projects and skills.
- [ ] **1024px** – Sidebar hamburger menu visible.
- [ ] **1280px+** – Sidebar shows on the left.

Functionality checks:
- [ ] Hamburger opens/closes sidebar; Escape key closes it.
- [ ] Tapping a nav link closes sidebar and scrolls to section.
- [ ] Light/dark toggle works and persists after page reload.
- [ ] Typing animation plays (or shows first title on reduced motion).
- [ ] Project filter tabs show/hide correct cards.
- [ ] Stat counters animate on scroll.
- [ ] Contact form shows validation errors for empty required fields.
- [ ] Contact form shows "not configured" message until Formspree ID is set.
- [ ] All images load (profile, projects).
- [ ] CV download link works.
- [ ] WhatsApp button opens WhatsApp with pre-filled message.
- [ ] No layout shift or overlapping elements.
- [ ] Text contrast passes in both light and dark mode.

---

## File Structure

```
NovaAxis-Systems/
├── index.html              ← All content lives here
├── assets/
│   ├── css/
│   │   └── style.css       ← All styles
│   ├── js/
│   │   └── main.js         ← All interactivity
│   └── img/
│       ├── profile.jpg     ← Add your photo here
│       ├── cv.pdf          ← Add your CV here
│       ├── favicon.svg
│       ├── avatar-placeholder.svg
│       ├── project-placeholder.svg
│       └── [project screenshots]
└── README.md
```

---

## Customisation Quick Reference

| What to change | Where |
|---|---|
| Name, tagline, bio | `index.html` — sidebar profile & about section |
| Work experience | `index.html` — Resume section, timeline items |
| Projects | `index.html` — Projects section, `.project-card` blocks |
| Accent colour | `assets/css/style.css` — `--accent: #149ddd;` in `:root` |
| Typing job titles | `assets/js/main.js` — `titles` array in `initTyping()` |
| Formspree form ID | `index.html` — `action="https://formspree.io/f/YOUR_FORM_ID"` |
| Add more nav links | `index.html` — `.sidebar-nav ul` + new `<section id="...">` |

---

*Built with plain HTML, CSS and JavaScript. No build step required.*
