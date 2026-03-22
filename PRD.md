# Product Requirements Document — SBA TMU
**Sustainable Business Association · Toronto Metropolitan University**
Last updated: 2026-03-21

---

## 1. Overview

The **Sustainable Business Association (SBA)** at Toronto Metropolitan University is a student club dedicated to integrating sustainability into business education and practice. This repository contains two deliverables:

1. **Landing Website** — A public-facing, single-page site to introduce the club, recruit members, and promote events.
2. **Promo Video** — A 25-second vertical (9:16) animated video built in Remotion for social media recruitment campaigns.

Both deliverables share a unified visual identity: forest greens, lime yellows, clean typography, and animation-first design.

---

## 2. Goals & Success Criteria

| Goal | Success Metric |
|---|---|
| Communicate SBA's mission to prospective members | Visitor can articulate SBA's purpose after one scroll |
| Drive membership sign-ups | Users click "Join" CTA and reach the contact/sign-up flow |
| Showcase the team and build trust | Team section loads correctly with current member info |
| Promote events | Event categories visible and linkable |
| Social media recruitment | Promo video renders and exports for Instagram/TikTok |
| Discoverability | Site is live on GitHub Pages and indexed |

---

## 3. Stakeholders

- **Club Leadership** — Provides content, approves copy, manages team roster
- **SBA Members** — End users; contributors to video content and events
- **TMU Students (Prospective Members)** — Primary audience for the website and video
- **Developers/AI Agents** — Anyone continuing work on this codebase

---

## 4. Technology Stack

### Website
| Layer | Technology |
|---|---|
| Markup | HTML5 (single-file `index.html`) |
| Styling | CSS3 — Flexbox, Grid, custom properties |
| Scripting | Vanilla JavaScript |
| Animation | GSAP 3.12.5 + ScrollTrigger, TextPlugin, ScrollToPlugin |
| 3D Parallax | Atropos 2.0 |
| Fonts | Google Fonts — Playfair Display, DM Sans, Dancing Script |
| Hosting | GitHub Pages via GitHub Actions (`/.github/workflows/static.ymlS`) |

### Promo Video
| Layer | Technology |
|---|---|
| Framework | Remotion 4.0.436 |
| Language | TypeScript 5.9.3 |
| UI | React 19.2.3 |
| Styling | Tailwind CSS 4.0.0 |
| Validation | Zod 4.3.6 |
| Fonts | @remotion/google-fonts (Playfair Display, DM Sans) |
| Output | JPEG frames, 1080×1920, 30fps, 750 frames (25s) |

### Brand Colors
```
Forest Green  #1A6B2A
Mid Green     #4A9B1A
Lime Green    #7EC820
Glow Yellow   #C8E800
Off-white     #F9FAF0
Dark          #0D2E10
```

---

## 5. Website — Feature Specification

### 5.1 Navigation
- Fixed top bar with SBA logo, section links, and "Join" CTA button
- Smooth-scroll to sections on link click
- Hamburger menu on mobile (≤768px) with slide-in drawer
- **Status: Complete**

### 5.2 Hero Section
- Full-viewport, animated SBA logo (spring reveal)
- Subtitle text fade-in
- Two CTA buttons: "Join the Club" and "Learn More"
- Canvas-based floating logo particles with physics simulation
- Custom animated cursor (yellow glow dot, desktop only)
- **Status: Complete**

### 5.3 What is the SBA
- Three feature cards with 3D Atropos parallax tilt on hover
- Cards describe: Mission, Values, Community
- Scroll-triggered GSAP fade-in
- **Status: Complete — content may need copy updates**

### 5.4 Sustainable Business as a Lifestyle
- Dark-background section with three pillar columns:
  1. Stay Ambitious
  2. Rest & Recharge
  3. Protect Your Health
- **Status: Complete**

### 5.5 Events & Community
- Event category cards with animated pill/tag badges
- Pill categories: Workshops, Networking, Panels, Socials, etc.
- **Status: Complete (UI) — Needs real event data and links**

### 5.6 What You'll Learn
- 6-card grid with education topic tiles
- Topics: Resource Wisdom, ESG & Sustainable Finance, Ethical Leadership, and 3 others
- **Status: Complete (UI) — Content is placeholder; needs real curriculum info**

### 5.7 Meet the Team
- Horizontal scrolling carousel (3 cards currently)
- Swipe support on mobile
- Dot pagination indicator
- **Status: Complete (UI) — Needs full roster (names, roles, photos, bios)**

### 5.8 Join CTA
- Full-width section with "Join the SBA" heading
- Links to signup form or contact
- **Status: Complete — needs destination URL**

### 5.9 Footer
- SBA logo, club description, contact email, social links
- **Status: Complete — verify links are live and correct**

### 5.10 Responsive Design
- Breakpoints: 960px (tablet), 768px (mobile), 420px (small mobile)
- **Status: Complete**

---

## 6. Promo Video — Feature Specification

Composition: `SBAPromo` · 1080×1920 · 30fps · 750 frames (25 seconds)

### Scene Breakdown

| Scene | Frames | Duration | Description |
|---|---|---|---|
| 1 — Logo Reveal | 0–120 | 4s | SBA logo scales in, underline sweeps, subtitle fades |
| 2 — Tagline | 120–300 | 6s | TMU eyebrow, "Sustainable Business Association" stagger, three bullet points |
| 3 — What We Are | 300–450 | 5s | Green BG, "A different kind of business club", three key points |
| 4 — Lifestyle | 450–600 | 5s | Dark BG, numbered cards (Stay Ambitious, Rest & Recharge, Protect Your Health) |
| 5 — Join CTA | 600–750 | 5s | Radial gradient, pulsing logo, email pill, "Open to all TMU students" |

### Persistent Elements
- SBA logo watermark (bottom-right, all scenes)
- Consistent color palette across scenes
- Spring-based physics animations throughout

### Transition Utilities (`transitions.tsx`)
- `FadeIn` — opacity fade
- `SlideUp` — vertical slide with spring
- `ScaleIn` — scale from small to full
- `WordReveal` — per-word stagger slide-up
- `LineReveal` — single-line overflow clip

### Status: Complete — ready to render/export. Audio not yet integrated.

---

## 7. Outstanding Work (Backlog)

### High Priority
- [ ] **Team Roster** — Add all current members with real names, roles, headshots, and bios to the website carousel
- [ ] **Event Data** — Populate the Events section with real upcoming events, dates, and registration links
- [ ] **Join/Signup Flow** — Connect "Join" CTAs to an actual form (Google Form, Linktree, or native form with backend)
- [ ] **Footer Links** — Verify and populate Instagram, LinkedIn, email links
- [ ] **GitHub Pages URL** — Confirm the site is live and the workflow file is correctly named (`static.yml` not `static.ymlS`)

### Medium Priority
- [ ] **What You'll Learn** — Replace placeholder card content with real curriculum descriptions
- [ ] **What is the SBA cards** — Review and finalize copy for the three parallax cards
- [ ] **Video Audio** — Add background music or voiceover to the Remotion promo video
- [ ] **Analytics** — Add Google Analytics or Plausible to track site traffic
- [ ] **SEO** — Add meta description, Open Graph tags, and Twitter card to `index.html`

### Low Priority
- [ ] **Video: Arc/Atom Integration** — `HelloWorld/Logo.tsx` contains animated orbital components not yet used in SBAVideo
- [ ] **Video: Additional Scenes** — Testimonials, event highlights, or sponsor recognition scenes
- [ ] **Form Validation** — If a native contact form is added, implement client-side validation
- [ ] **Cookie/Privacy Banner** — Required if analytics or cookies are used
- [ ] **Dark/Light Mode** — Currently dark-mode-only; consider respecting `prefers-color-scheme`

---

## 8. Content Requirements

The following content must be gathered from the SBA executive team before the site can be considered complete:

| Content Item | Location | Owner | Status |
|---|---|---|---|
| Team member names, roles, photos | Meet the Team section | Club President | Missing |
| Team member short bios (1–2 sentences) | Meet the Team cards | Each member | Missing |
| Upcoming event list (name, date, type) | Events section | Events Director | Missing |
| Event registration links | Events section | Events Director | Missing |
| Membership signup form link | All CTA buttons | Any exec | Missing |
| Instagram handle / LinkedIn URL | Footer | VP Marketing | Missing |
| "What You'll Learn" descriptions | Learning section | VP Education | Missing |
| Club founding year / formal mission statement | Footer / About | Club President | Partial |

---

## 9. Deployment

### Website
- Host: **GitHub Pages**
- Trigger: Push to `main` branch
- Workflow file: `/.github/workflows/static.ymlS` *(note: filename has trailing "S" — verify this is correct or rename to `static.yml`)*
- Entry point: `/index.html`

### Video
- Render command: `npm run build` (inside `/video/`)
- Output: JPEG frame sequence or MP4 (configure in `remotion.config.ts`)
- Export for: Instagram Reels, TikTok, YouTube Shorts (all 1080×1920)

---

## 10. File Structure Reference

```
SBA TMU/
├── index.html              # Main website (single-page, self-contained)
├── images/
│   ├── SBA-logo.svg        # Primary logo (SVG)
│   └── SBA-logo.png        # Raster fallback
├── README.md               # Brief project description
├── PRD.md                  # This file
├── .github/
│   └── workflows/
│       └── static.ymlS     # GitHub Pages deployment
└── video/
    ├── package.json
    ├── remotion.config.ts
    ├── tsconfig.json
    ├── src/
    │   ├── index.ts        # Remotion entrypoint
    │   ├── Root.tsx        # Composition registry (SBAPromo defined here)
    │   ├── index.css       # Global styles
    │   ├── SBAVideo/
    │   │   ├── SBAVideo.tsx    # Main video component (5 scenes, 708 lines)
    │   │   └── transitions.tsx # Reusable animation helpers
    │   └── HelloWorld/         # Template/example (not used in production)
    │       ├── Arc.tsx
    │       ├── Atom.tsx
    │       ├── Logo.tsx
    │       ├── Subtitle.tsx
    │       ├── Title.tsx
    │       └── constants.ts
    └── .agents/            # AI agent skill configurations (Remotion best practices)
```

---

## 11. Design Principles

1. **Animation-first** — Motion reinforces brand personality; every section entrance is animated
2. **Green-forward palette** — Colors reinforce the sustainability mission
3. **Mobile-ready** — Responsive at all breakpoints; video is vertical-first for social
4. **Minimal dependencies** — Website uses no npm/build system; pure HTML+CSS+JS with CDN libs
5. **Accessibility** — Semantic HTML, aria labels, keyboard-navigable nav
6. **Consistency** — Website and video share identical colors, typography, and brand voice

---

## 12. Contact

- **Email:** sba.torontomu@gmail.com
- **University:** Toronto Metropolitan University
- **Club Type:** Voluntary student organization, open to all TMU students
