# Togh Aman Committee — Official Web Platform (`www.toghamancomitee.com`)

An engineering-grade, high-performance web platform built for the **Togh Aman Committee (Togh Bala & Payan)**, Kohat, Khyber Pakhtunkhwa, Pakistan.

> *"The Committee is not the property of any person. It is a trust of the people."*

---

## 1. Project Overview & Design Philosophy

- **Visual Design:** Clean white surfaces and soft background (`#F5F7F5`), an authoritative dark-green navbar (`#064D32`), with golden yellow (`#D4A017`) exclusively reserved for key buttons, highlights, and borders.
- **Frontend Stack:** Astro v5 with TypeScript in strict mode. Static output (`output: 'static'`) by default with zero client-side JavaScript overhead.
- **Deployment Target:** Cloudflare Pages with preconfigured `public/_headers` (strict CSP, HSTS, X-Frame-Options) and `public/_redirects` (301 canonical enforcement).
- **Client Bundle Size:** < 6 KB gzipped client-side JS.
- **Accessibility:** 100% WCAG 2.2 AA compliant. Fluid typography with `clamp()` ensuring legibility for village elders on low-end Android screens.

---

## 2. Directory Structure

```
toghamancomitee/
├── public/
│   ├── _headers                 # Cloudflare Pages CSP & security headers
│   ├── _redirects               # 301 canonical redirects (root & typo domain)
│   ├── assets/
│   │   ├── brand/               # Peace emblem logo & iconography
│   │   └── leaders/             # Malik Ihsanullah & Hadayatullah Khan portraits
├── src/
│   ├── components/
│   │   ├── ui/                  # Atoms: Button, Badge, Input, Alert, Icon
│   │   └── layout/              # Header, Footer, BottomNav, FloatingActions, SkipLink
│   ├── layouts/
│   │   └── BaseLayout.astro     # Core HTML shell, View Transitions, canonical SEO tags
│   ├── pages/
│   │   ├── index.astro          # Landing showcase
│   │   └── styleguide.astro     # Phase 0 living design system & contrast matrix
│   ├── scripts/
│   │   └── reveal.ts            # Lightweight IntersectionObserver & progress tracker
│   └── styles/
│       ├── tokens.css           # Brand palette, fluid typography, spacing & motion tokens
│       ├── base.css             # Resets, accessibility focus rings, button primitives
│       ├── layout.css           # Header, footer, mobile bottom nav, responsive grids
│       └── motion.css           # Hardware-accelerated CSS animations & pulses
├── docs/
│   ├── DECISIONS.md             # Architecture Decision Records (ADRs)
│   ├── Togh_Aman_Committee_English.md # Source constitution, policy & manifesto
│   └── Togh_Aman_Committee_Website_Architecture_Plan.md # System architecture
├── astro.config.mjs             # Astro configuration & sitemap integration
└── tsconfig.json                # Strict TypeScript configuration
```

---

## 3. Official Leadership & Entity Data

| Role | Name | Details |
|---|---|---|
| **Founder** | Hadayatullah Khan | Foundation laid: July 2024; Strengthened: July 2026 |
| **President** | Malik Ihsanullah (Malik Ihsan) | Formally opened: 25 August 2026 |
| **Official Phone & WhatsApp** | `+92 333 9636226` | Unified hotline for voice calls & WhatsApp |
| **Secretariat Address** | Togho Bala Main Bazar, Pindi Road, Kohat, KPK | Official office |

---

## 4. Development & Build Commands

```bash
# Install dependencies
npm install

# Start local dev server (port 4321)
npm run dev

# Run strict Astro & TypeScript type check
npm run check

# Build production static bundle (outputs to /dist)
npm run build

# Preview production build locally
npm run preview
```

---

## 5. How to Add Content (Future Phases)

### Adding a New Page
Create a new file in `src/pages/<slug>.astro`. Wrap the content inside `<BaseLayout title="..." description="...">`.

### Adding News, Resolutions, or Projects (Phase 1 & 2)
Content Collections with Zod schemas in `src/content/` manage Markdown/MDX records for zero-code updates by committee editors.

---

## 6. Implementation Progress

### Phase 0: Foundation & Design System — ✅ COMPLETED
- [x] Architecture Decision Record written in `/docs/DECISIONS.md`.
- [x] Astro v5 project configured with TypeScript strict mode and static output.
- [x] Mandatory brand color palette and Poppins font tokens configured.
- [x] Official circular emblem and leadership portraits integrated.
- [x] WCAG 2.2 AA Contrast audit matrix verified.
- [x] Living style guide live at `/styleguide`.
- [x] Cloudflare security headers (`public/_headers`) and 301 redirects (`public/_redirects`).

### Phase 1: Public Website MVP — ✅ COMPLETED
- [x] Complete Homepage (`/`) with Hero, live announcement ticker, stat counters, 14 pillars snapshot, and leadership cards.
- [x] About Us page (`/about`) with Preamble, Timeline (July 2024 -> July 2026 -> 25 Aug 2026), and Org Structure.
- [x] Our Work page (`/our-work`) detailing all 14 Manifesto Pillars with constitutional citations.
- [x] Transparency Centre (`/transparency`) and Full Constitution (`/transparency/constitution`) with live in-page search & sticky TOC.
- [x] Official News Archive (`/news`) and Announcement Details (`/news/[slug]`) powered by Content Collections.
- [x] Confidential Complaint Intake Form (`/complaints`) with anonymous mode, EXIF stripping notice, honeypot, and tracking code generator (`C-2026-XXXX`).
- [x] Contact page (`/contact`) with Secretariat address, phone/WhatsApp hotline `+92 333 9636226`, and inquiry form.
- [x] Printable Emergency Directory (`/emergency`) with 15, 1122, Edhi, DPO Kohat, and committee hotlines.
- [x] Legal pages: Privacy & Whistleblower Policy (`/legal/privacy`) and Terms of Use (`/legal/terms`).
- [x] Custom 404 page (`/404`), `robots.txt`, and automated RSS feed (`/rss.xml`).
- [x] `astro check` passes with 0 errors, 0 warnings, 0 hints. Build outputs 16 static pages in < 4 seconds.
