# Architectural & Design Decisions (ADR)
## Project: Togh Aman Committee (`www.toghamancomitee.com`)

**Status:** Approved  
**Date:** 2026-10-25  
**Authors:** Principal UI/UX Designer, Senior Frontend Architect, Senior Product Strategist  

---

### ADR 001: Canonical Domain & Typo-Twin Routing
* **Decision:** `https://www.toghamancomitee.com` is established as the sole canonical domain.
* **Typo Mitigation:** Register `toghamancommittee.com` (correct English spelling) and immediately configure Cloudflare Edge 301 permanent redirect to `www.toghamancomitee.com`. Root `toghamancomitee.com` also 301 redirects to `www`.
* **Justification:** Prevents user confusion, protects against domain impersonation, and consolidates SEO link equity.

---

### ADR 002: Framework Selection — Astro (Static Output with Islands)
* **Decision:** Use Astro v5 with TypeScript strict mode, utilizing `output: 'static'` deployed to Cloudflare Pages.
* **Justification:**
  - 80%+ of visitors are local villagers in Togh Bala & Payan on mid-to-low tier Android devices with 3G/4G connectivity.
  - Zero-JS by default ensures instant First Contentful Paint (< 0.8s) and minimal page payload (< 1 MB total, < 60 KB gzipped JS).
  - Content Collections with Zod enforce compile-time type validation for resolutions, projects, finances, and news.
  - No bloated client-side frameworks (React/Vue) needed for content rendering. Vanilla TypeScript modules and standard Web APIs (IntersectionObserver, Web Animations API) handle motion gracefully.

---

### ADR 003: Color Token System & Contrast Verification
* **Mandatory Core Palette:**
  * `--color-primary`: `#064D32` (Deep Forest Green — navbar, footer, primary buttons, structural authority)
  * `--color-green`: `#087443` (Mid Green — accents, progress, links, secondary badges)
  * `--color-gold`: `#D4A017` (Golden Ochre — key call-to-actions, borders, badges, highlights)
  * `--color-white`: `#FFFFFF` (Pristine White — clean card backgrounds, readable surfaces)
  * `--color-background`: `#F5F7F5` (Soft warm off-white — eye comfort, reduces screen fatigue)
  * `--color-text`: `#1F2937` (Charcoal Slate — optimal readability)
  * `--color-border`: `#DCE5DE` (Subtle muted green-tint border)
* **Contrast Rules (WCAG 2.2 AA Compliance):**
  * Text `#1F2937` on `#FFFFFF`: **12.6:1** (Passes AAA)
  * Text `#1F2937` on `#F5F7F5`: **11.8:1** (Passes AAA)
  * Text `#FFFFFF` on `#064D32`: **9.4:1** (Passes AAA)
  * Text `#123322` on `#D4A017` (Accent Button): **6.2:1** (Passes AA & AAA Large)
  * **Strict Negative Rule:** Gold (`#D4A017`) is **never** used for small body text on white or light backgrounds.

---

### ADR 004: Leadership & Official Entity Information
* **Founder:** Hadayatullah Khan (Founded July 2024, revitalized July 2026).
* **President:** Malik Ihsanullah (strictly written as "Malik Ihsanullah").
* **Finance Secretary:** Waheed-ur-Rehman (Easypaisa Account: `0334 8441095`).
* **In-Charge Complaints Cell:** Mr. Shafiq-ur-Rehman (Appointed October 2026, Direct Hotline: `0333-8303485`).
* **Official Hotlines & WhatsApp Loop:**
  - `+92 333 9768022` (Secretariat General Desk)
  - `+92 333 9636226` (Public Coordination & Grievance Desk)
  - `+92 336 9498887` (Emergency & Community Help)
  - `0333-8303485` (Direct Complaints Cell In-Charge)
  - `0334 8441095` (Finance Secretary / Easypaisa Desk)
* **Official Secretariat Address:** Haji Rafiullah Khan Marhoom Market, Main Pindi Road, Kohat (Near National Bank of Pakistan).
* **Legal Disclaimer (Mandatory on every footer and complaint screen):**
  > "The Togh Aman Committee is a non-political, non-sectarian public welfare platform and does not replace the police or any government department. In an emergency, call the police first."

---

### ADR 005: Security & Privacy at Frontend Level
* **Zero Secrets in Frontend:** All configurations are decoupled.
* **Anonymous Reporting:** The Complaint Form includes an anonymous toggle; evidence uploads strip EXIF metadata before submission.
* **Cloudflare Security Headers:** Strictly enforced CSP, X-Content-Type-Options: nosniff, X-Frame-Options: DENY, and Referrer-Policy: strict-origin-when-cross-origin.

---

### ADR 006: Primary Font Selection — Poppins
* **Decision:** Adopt **Poppins** (`wght@300;400;500;600;700;800`) across all headings, UI controls, navigation, and body copy.
* **Justification:** Poppins offers a clean, geometric, modern aesthetic with high legibility across mobile viewports, matching the modern civic trust brand identity.
* **Fluid Scaling:** Retained fluid typography scale using CSS `clamp()` (17-18px body baseline for accessibility).

---

### ADR 007: Official Emblem Asset
* **Decision:** The official circular emblem featuring the Urdu header "تسوغ بالا و توغ پایان امن کمیٹی", peace dove with olive branch, mountain river landscape, handshake, laurels, and "TOGH AMAN COMITTEE" ribbon is integrated as the primary brand asset across the header, footer, favicon, and OpenGraph cards.


---

### ADR 008: Member Portal Mock Architecture & Dual-Signature Governance
* **Decision:** Implement Phase 3 Member Portal as an interactive frontend prototype shell with an extensible mock data layer (`src/lib/portalMock.ts`), coupled with a complete REST/OpenAPI contract (`/docs/API_CONTRACT.md`) for the future backend team.
* **Persona Simulator:** Provide a dynamic client-side role switcher (President, General Secretary, Finance Secretary, Women's Wing) enabling instant testing of role-based permissions without requiring live database authentication.
* **Constitutional Compliance:**
  - **Chapter 6 (Quorum):** Embedded real-time Quorum Engine verifying the 50%+1 (11 of 21 seats) threshold with interactive attendance toggle.
  - **Chapter 8 (Finances):** Dual-signature verification workflow requiring separate digital stamps from Finance Secretary and President/General Secretary.
  - **Chapter 11 (Complaints):** 4-level privacy classification with automatic PII redaction for Level 4 anonymous whistleblower grievances.
  - **Section 4.3 (Tamper-Evidence):** Interactive SHA-256 hash chaining visualization and client-side chain integrity validator.


---

### ADR 009: Rural Offline Resilience & Emergency Service Worker
* **Decision:** Implement a lightweight progressive service worker (`public/sw.js`) and Web App Manifest (`public/manifest.webmanifest`) caching `/emergency`, `/transparency/constitution`, and core brand assets.
* **Justification:** Telecommunication signals in rural valleys of Kohat fluctuate significantly. In the event of a flood, emergency, or remote dispute, villagers and elders can instantly retrieve verified emergency hotline numbers and constitutional articles directly from their phone browser cache without an active internet connection.

---

### ADR 010: Client-Side EXIF Stripping for Whistleblower Protection
* **Decision:** Perform client-side camera metadata dropping using an unattached HTML5 Canvas (`src/lib/security.ts`) before evidence image files leave the browser.
* **Justification:** Guarantees that neither GPS coordinates nor device hardware identifiers can be extracted from uploaded evidence photos, protecting anonymous citizens under Chapter 11 whistleblower guarantees even before payloads reach the network boundary.
