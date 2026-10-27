# Technical Architecture & Engineering Specification
## Togh Aman Committee — `www.toghamancomitee.com`

**Document Type:** Senior Engineering Architecture, Security Blueprint & Delivery Plan  
**Core Framework:** Astro.js (`astro.build`) — Hybrid SSG + SSR Architecture  
**Prepared For:** Founder (Hadayatullah Khan), President (Malik Ihsanullah), Executive Committee & Lead Engineers  
**Canonical Domain:** `https://www.toghamancomitee.com`  
**Version:** 2.0 (Production-Grade Engineering Blueprint)  
**Status:** Approved for Implementation  

---

## 0. Executive Summary & Engineering Vision

The Togh Aman Committee constitution mandates absolute **transparency, accountability, lawful conduct, and community trust**. To reflect these principles digitally without accumulating technical debt or compromising security, the system departs from legacy CMS setups (e.g., WordPress) and adopts a **Unified Astro.js Hybrid Architecture**.

### The Architectural Thesis: Astro.js Unified Monorepo / Application
1. **Zero-JS by Default for Public Pages (SSG + Edge Caching):**
   - The public website (Constitution, Manifesto, News, Projects, Public Resolutions) is pre-rendered at build time or edge-cached.
   - Result: Sub-second page loads (< 1.2s on 3G rural mobile networks), zero client-side JavaScript overhead for content reading, and near-zero server CPU cost.
2. **Secure SSR & Dynamic API Layer for Portal & Complaints:**
   - Interactive sections (Complaint Submission, Member Portal, Resolution Voting, Finance Ledger) run via Astro Server Endpoints / SSR mode backed by Node.js or Docker container runtime with PostgreSQL.
   - Eliminates data-fragmentation issues: Public pages and private administration share the exact same database, schema, and type definitions (TypeScript).
3. **Defense-in-Depth Security:**
   - Automated EXIF/Metadata stripping for anonymous whistleblower uploads.
   - Field-Level Encryption (AES-256-GCM) for sensitive complaint logs.
   - Cryptographically hash-chained, append-only immutable audit logging.
   - Strict Content Security Policy (CSP), HttpOnly SameSite cookies, Cloudflare Turnstile, and distributed rate limiting.
4. **Day-One SEO Rigor:**
   - Strict canonical configuration (`https://www.toghamancomitee.com`).
   - Title tags capped at **<= 55 characters** and Meta Descriptions capped at **<= 155 characters**.
   - Full Schema.org JSON-LD (NGO, GovernmentService, FAQ, Article) and bilingual `hreflang` (Urdu `ur-PK` / English `en`).

---

## 1. Domain, Canonical Routing & DNS Configuration

### 1.1 Canonical Domain Strategy
* **Primary Canonical URL:** `https://www.toghamancomitee.com`
* **Redirect Rules (301 Permanent via Cloudflare Edge):**
  * `http://toghamancomitee.com` ➔ `https://www.toghamancomitee.com`
  * `https://toghamancomitee.com` ➔ `https://www.toghamancomitee.com`
  * `http://www.toghamancomitee.com` ➔ `https://www.toghamancomitee.com`
  * `https://toghamancommittee.com` (Typo twin) ➔ `https://www.toghamancomitee.com` (301 redirect to capture misspellings and prevent brand hijacking).

### 1.2 Routing & Subdomain Layout

| Route / Subdomain | Mode | Purpose | Access Control |
|---|---|---|---|
| `www.toghamancomitee.com/` | Astro SSG / Edge Cached | Public portal, manifesto, news, reports | Public |
| `www.toghamancomitee.com/complaints/submit` | Astro SSR + Turnstile | Whistleblower & issue intake pipeline | Public + Rate Limiting |
| `portal.toghamancomitee.com` (or `/portal/*`) | Astro SSR | Internal ERP (resolutions, meetings, finance) | Auth (2FA + RBAC) |
| `files.toghamancomitee.com` | Private S3 / CDN | Public assets & pre-signed secure document links | Public / Signed URLs |

### 1.3 Email Security & Deliverability
To protect against phishing, fraudulent donation solicitations, and impersonation:
* **SPF Record:** `v=spf1 include:_spf.mx.cloudflare.net ~all` (or authorized provider).
* **DKIM:** 2048-bit RSA keys configured on DNS.
* **DMARC Policy:** `v=DMARC1; p=reject; rua=mailto:dmarc-reports@toghamancomitee.com; pct=100; aspf=s; adkim=s` (strict enforcement).

---

## 2. Day-One SEO & Social Graph Architecture

### 2.1 Character Constraints & Standards
Search Engine Result Pages (SERP) truncate titles past 580–600px (~55-60 chars) and meta descriptions past 960–990px (~155-160 chars).

* **Title Tag Rule:** **Strictly <= 55 characters** (Brand suffix included).
* **Meta Description Rule:** **Strictly <= 155 characters** (Action-oriented, bilingual, keyword-rich).
* **Canonical Tag:** Present on every single page:
  ```html
  <link rel="canonical" href="https://www.toghamancomitee.com/canonical-slug" />
  ```

### 2.2 Core SEO Metadata Registry

| Page / Route | SEO Title (<= 55 chars) | Meta Description (<= 155 chars) | Focus Keyword |
|---|---|---|---|
| Home (`/`) | `Togh Aman Committee \| Peace & Welfare` (39 chars) | `Official portal of Togh Aman Committee. Promoting peace, transparency, rule of law, and community development.` (107 chars) | Togh Aman Committee |
| About (`/about`) | `About Us \| Togh Aman Committee` (30 chars) | `Learn about the mission, constitution, and leadership of Togh Aman Committee serving Togh Bala and Payan.` (107 chars) | Togh Committee mission |
| Transparency (`/transparency`) | `Transparency Centre \| Resolutions & Audits` (44 chars) | `Access verified public resolutions, financial reports, meeting minutes, and development projects of Togh Aman.` (113 chars) | Togh Aman transparency |
| Complaints (`/complaints`) | `Submit Issue \| Confidential Public Portal` (43 chars) | `Submit confidential community issues, complaints, and evidence directly to Togh Aman Committee for lawful resolution.` (120 chars) | submit complaint Togh |
| Projects (`/projects`) | `Development Projects \| Togh Aman Tracker` (41 chars) | `Track real-time progress, budgets, and verified completion reports for all community development projects in Togh.` (115 chars) | Togh development projects |
| Finance (`/transparency/finances`) | `Financial Reports \| Verified Income & Spend` (45 chars) | `Inspect audited monthly and quarterly donation ledgers, expense vouchers, and verified public balance sheets.` (111 chars) | Togh committee finances |

### 2.3 Structured Data (Schema.org JSON-LD)
Astro layout dynamically injects JSON-LD scripts:
1. **NGO / Community Organization:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "NGO",
     "name": "Togh Aman Committee",
     "alternateName": "طوغ امن کمیٹی",
     "url": "https://www.toghamancomitee.com",
     "logo": "https://www.toghamancomitee.com/assets/brand/logo.svg",
     "foundingDate": "2024-07",
     "address": {
       "@type": "PostalAddress",
       "addressLocality": "Togh Bala & Payan",
       "addressRegion": "Khyber Pakhtunkhwa",
       "addressCountry": "PK"
     },
     "nonprofitStatus": "NonprofitType"
   }
   ```
2. **BreadcrumbList:** Embedded on all hierarchical pages.
3. **FAQPage:** Integrated on the Complaints and Transparency FAQ sections for SERP rich snippets.

---

## 3. Astro.js System Architecture

### 3.1 High-Level Architecture Diagram

```
                              ┌────────────────────────────────────────┐
                              │  Cloudflare Edge (DNS / SSL / WAF /    │
                              │  Turnstile / DDoS / CDN Caching)       │
                              └───────────────────┬────────────────────┘
                                                  │
                 ┌────────────────────────────────┴────────────────────────────────┐
                 ▼ (Static Content Cache)                                          ▼ (SSR / API Requests)
       ┌──────────────────────────────┐                                  ┌──────────────────────────────┐
       │   Astro Static Engine        │                                  │   Astro SSR Node Engine      │
       │   - Pre-rendered HTML/CSS    │                                  │   - Complaint Ingestion API  │
       │   - RTL / Urdu Subsets       │                                  │   - Auth & Session Manager   │
       │   - JSON-LD & OpenGraph      │                                  │   - Protected Portal Views   │
       └──────────────────────────────┘                                  └──────────────┬───────────────┘
                                                                                        │
                                               ┌────────────────────────────────┼────────────────────────────────┐
                                               ▼                                ▼                                ▼
                                  ┌─────────────────────────┐      ┌─────────────────────────┐      ┌─────────────────────────┐
                                  │ PostgreSQL (Primary DB) │      │ Redis + BullMQ Worker   │      │ Private Object Storage  │
                                  │ - Encrypted Complaints  │      │ - EXIF Stripping        │      │ - Stripped Evidence     │
                                  │ - Hash-Chained Audits   │      │ - Automated PDF Gen     │      │ - Encrypted Vouchers    │
                                  │ - RBAC & Finance Ledger │      │ - WhatsApp / SMS Queue  │      │ - Signed S3 URLs        │
                                  └─────────────────────────┘      └─────────────────────────┘      └─────────────────────────┘
```

### 3.2 Astro Project Structure
```
toghamancomitee/
├── astro.config.mjs             # Hybrid output, Node adapter, Tailwind RTL, Image optimization
├── src/
│   ├── components/              # UI Components (Zero-JS Astro components by default)
│   │   ├── common/              # Navbar, Footer, LanguageSwitcher (RTL/LTR)
│   │   ├── cards/               # ProjectCard, ResolutionCard, FinanceCard
│   │   ├── forms/               # TurnstileProtected ComplaintForm, LoginForm
│   │   └── seo/                 # SEOHead.astro (Canonical, 55-char title, 155-char desc, JSON-LD)
│   ├── layouts/
│   │   ├── BaseLayout.astro     # Core HTML5, dir="rtl" / "ltr", dynamic font loading
│   │   ├── PublicLayout.astro   # Standard header/footer layout
│   │   └── PortalLayout.astro   # Authenticated dashboard sidebar & security boundary
│   ├── middleware/              # Auth verification, CSRF validation, Security headers
│   │   └── index.ts
│   ├── pages/
│   │   ├── index.astro          # SSG: Landing page
│   │   ├── about/               # SSG: Preamble, leadership, manifesto pillars
│   │   ├── transparency/        # SSG/SSR: Resolutions, budgets, reports
│   │   ├── complaints/          # SSR: Public complaint intake + tracking status
│   │   ├── api/                 # Server endpoints (REST/JSON)
│   │   │   ├── complaints/      # POST (submit), GET (status check)
│   │   │   ├── auth/            # 2FA login, session token rotation, logout
│   │   │   └── portal/          # Internal CRUD for resolutions, finance, minutes
│   │   └── portal/              # SSR: RBAC Authenticated Area
│   │       ├── dashboard.astro
│   │       ├── resolutions/
│   │       ├── finance/
│   │       └── complaints/
│   ├── lib/
│   │   ├── db/                  # Drizzle ORM / Prisma schema & client
│   │   ├── crypto/              # AES-256-GCM encryption & SHA-256 hash chaining
│   │   ├── queue/               # BullMQ job dispatchers
│   │   └── sanitize/            # Sharp-based EXIF stripper & file validator
│   └── locales/                 # i18n dictionaries (ur.json, en.json)
└── docker-compose.yml           # App, PostgreSQL, Redis, Worker services
```

---

## 4. Senior-Level Security & Whistleblower Pipeline

### 4.1 Whistleblower Anonymity & EXIF Sanitization
When a user submits evidence (photograph, screenshot, document) of a crime or issue:
1. **Streaming Upload Inspection:** Max file size capped at 10 MB per file, max 3 files.
2. **Magic Bytes Validation:** Files are verified by file signatures (e.g., `0xFFD8FFE0` for JPEG, `0x89504E47` for PNG, `%PDF` for PDF). Extensions like `.jpg` or `.pdf` are discarded and regenerated.
3. **EXIF & IPTC Stripping Pipeline:**
   Before storing any image to object storage, an automated worker processes the buffer using `sharp`:
   ```typescript
   import sharp from 'sharp';

   export async function sanitizeAndStripImage(inputBuffer: Buffer): Promise<Buffer> {
     // Strips GPS coordinates, camera serial numbers, and device timestamps
     return await sharp(inputBuffer)
       .rotate() // Auto-orient based on EXIF before stripping
       .withMetadata({ exif: {}, iptc: {}, xmp: {} }) // Completely strip metadata
       .webp({ quality: 82 }) // Convert to modern, optimized, sanitized WebP
       .toBuffer();
   }
   ```
4. **Isolated Private Storage:** All uploaded evidence is stored in a private, non-public S3 bucket. Access is strictly granted through short-lived (5-minute expiration) pre-signed URLs, accessible only to authorized roles.

### 4.2 Field-Level Encryption (At Rest)
Sensitive columns (Complainant Name, Complainant Phone, Sensitive Description, Identity Notes) are encrypted using **AES-256-GCM** before database writes.
* Even if an attacker gains read access to raw database tables or backup SQL dumps, the whistleblower's identity and raw testimony remain unreadable without the master key kept in the environment runtime.
* Master Key rotation is supported via key version prefixes (`v1:iv:authTag:ciphertext`).

### 4.3 Immutable & Hash-Chained Audit Logs
To guarantee that records cannot be altered by rogue administrators:
* Every audit log entry computes a cryptographic SHA-256 checksum:
  $$\text{Hash}_n = \text{SHA256}(\text{Hash}_{n-1} + \text{Timestamp} + \text{UserID} + \text{Action} + \text{Payload})$$
* **Database Privilege Segregation:** The application database role for the audit logger possesses only `INSERT` and `SELECT` rights on the `audit_logs` table. `UPDATE` and `DELETE` commands are revoked at the PostgreSQL engine level.

### 4.4 Defense-in-Depth HTTP Security Headers
Astro middleware injects hardened headers on all responses:
```http
Content-Security-Policy: default-src 'self'; img-src 'self' data: https://files.toghamancomitee.com https://challenges.cloudflare.com; script-src 'self' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://challenges.cloudflare.com; frame-ancestors 'none';
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 5. Database Schema & Data Models (PostgreSQL)

### 5.1 Relational Schema Diagram

```
┌──────────────────┐       ┌──────────────────────┐       ┌────────────────────────┐
│     users        │──────<│    portal_sessions   │       │      resolutions       │
├──────────────────┤       ├──────────────────────┤       ├────────────────────────┤
│ id (UUIDv4)      │       │ id (UUIDv4)          │       │ id (UUIDv4)            │
│ email (Unique)   │       │ user_id (FK)         │       │ resolution_no (Unique) │
│ role (Enum)      │       │ token_hash           │       │ status (Enum)          │
│ two_factor_secret│       │ expires_at           │       │ visibility (Enum)      │
└────────┬─────────┘       └──────────────────────┘       └───────────┬────────────┘
         │                                                            │
         │                 ┌──────────────────────┐                   │
         └────────────────<│     audit_logs       │                   │
                           ├──────────────────────┤                   │
                           │ id (BigSerial)       │                   │
                           │ prev_hash (Char64)   │                   │
                           │ current_hash (Char64)│                   │
                           │ action / payload     │                   │
                           └──────────────────────┘                   │
                                                                      │
┌───────────────────────────┐     ┌───────────────────────┐          │
│        complaints         │     │     finance_entries   │          │
├───────────────────────────┤     ├───────────────────────┤          │
│ id (UUIDv4)               │     │ id (UUIDv4)           │          │
│ tracking_code (Unique)    │     │ resolution_id (FK)────┼──────────┘
│ category (Enum)           │     │ type (Income/Expense) │
│ description_encrypted    │     │ amount (Decimal 12,2) │
│ privacy_level (Enum)      │     │ voucher_s3_key        │
│ status (Enum)             │     │ approved_by (FK)      │
└───────────────────────────┘     └───────────────────────┘
```

### 5.2 State Machine Definitions
* **Complaints Workflow:**
  $$\text{SUBMITTED} \longrightarrow \text{TRIAGED} \longrightarrow \text{ASSIGNED} \longrightarrow \text{IN\_PROGRESS} \longrightarrow \text{RESOLVED} \longrightarrow \text{ARCHIVED}$$
  *(Transitions between states generate mandatory, signed audit events).*
* **Resolutions Workflow:**
  $$\text{DRAFT} \longrightarrow \text{UNDER\_REVIEW} \longrightarrow \text{VOTED\_APPROVED} \longrightarrow \text{IN\_EXECUTION} \longrightarrow \text{COMPLETED}$$
* **Finance Expenditure:**
  $$\text{PROPOSED} \longrightarrow \text{LINKED\_TO\_RESOLUTION} \longrightarrow \text{COMMITTEE\_APPROVED} \longrightarrow \text{DISBURSED\_WITH\_VOUCHER}$$
  *(No expense over Rs. 10,000 can be marked disbursed without a valid `resolution_id`).*

---

## 6. Background Queue & Asynchronous Architecture

In rural KP, synchronous email/PDF/API calls over slow uplinks cause browser timeouts. An asynchronous job queue is mandatory:

* **Engine:** Redis + BullMQ worker running in an isolated worker process.
* **Queued Tasks:**
  1. `IMAGE_SANITIZE_JOB`: Strips EXIF metadata, converts to WebP, uploads to secure storage.
  2. `PDF_GENERATE_JOB`: Generates official signed PDF receipts and resolution extracts using server-side `@react-pdf/renderer` or headless Chromium.
  3. `WHATSAPP_DISPATCH_JOB`: Sends template status notifications to the complainant (if phone was opted-in) and Executive members via official WhatsApp Cloud API or verified SMS gateway.
  4. `DATABASE_BACKUP_JOB`: Nightly encrypted pg_dump, client-side GPG encryption, pushed to off-site S3 Object Storage with 90-day immutability lock.

---

## 7. دیہی علاقوں کے لیے پرفارمنس اور نیٹ ورک آپٹیمائزیشن (Performance & RTL)

### 7.1 Font Subsetting & Zero-Layout Shift
* **Noto Nastaliq Urdu** is beautiful but weighs ~3.2 MB. Loading it raw causes severe FOIT (Flash of Invisible Text) and data wastage on 3G connections.
* **Optimization Strategy:**
  1. Use **Unicode Subsetting** to strip obsolete glyphs, bringing the file size below 120 KB (woff2).
  2. Use **Noto Naskh Arabic** (`font-display: swap`) for small body copy and inputs (ultra-readable on small screens).
  3. Reserve Nastaliq exclusively for headings (`<h1>` to `<h3>`).

### 7.2 Logical CSS & RTL Framework
* Tailwind CSS configured with `tailwindcss-rtl` plugin.
* Strictly enforce CSS Logical Properties:
  * Use `start-*` and `end-*` instead of `left-*` and `right-*`.
  * Use `ms-*` (margin-inline-start) and `me-*` (margin-inline-end).
  * Page `<html>` tag automatically toggles `dir="rtl" lang="ur"` or `dir="ltr" lang="en"`.

---

## 8. DevOps, Containerization & Disaster Recovery

### 8.1 Dockerized Production Topology (`docker-compose.yml`)
The entire system is reproducible with four decoupled containers:
1. `app`: Astro SSR Node server (Port 3000, unprivileged user).
2. `worker`: BullMQ background processor (PDF generation & EXIF sanitization).
3. `postgres`: PostgreSQL 16 (Alpine, optimized connection pool, pgbouncer optional).
4. `redis`: Redis 7 (Alpine, AOF persistence enabled).

### 8.2 Disaster Recovery & Business Continuity
* **RPO (Recovery Point Objective):** <= 24 hours.
* **RTO (Recovery Time Objective):** <= 2 hours (Single-command deployment: `docker compose up -d` + database restore script).
* **Immutability (Anti-Ransomware):** Nightly encrypted backups pushed to Cloudflare R2 / AWS S3 with **Object Lock (Compliance Mode)** enabled for 90 days. Neither a compromised server nor compromised admin credentials can overwrite or delete existing backup archives.

---

## 9. Phased Implementation Roadmap

```
Phase 0: Infrastructure & Security Foundation (Weeks 1-2)
  ├── Canonical DNS, Cloudflare WAF, Turnstile, SPF/DKIM/DMARC
  └── Docker environments, Astro boilerplate, Tailwind RTL

Phase 1: Public Core & Day-One SEO Launch (Weeks 3-5)
  ├── 55-char Titles, 155-char Descriptions, JSON-LD Schema
  ├── Preamble, Constitution, Manifesto 14 Pillars, Leadership Pages
  └── Anonymous Complaint Intake Pipeline (EXIF stripping + Turnstile)

Phase 2: Transparency Engine & Document Vault (Weeks 6-8)
  ├── Dynamic Resolution Register (filterable by year/category)
  ├── Project Milestone Tracker (Problem → Proposal → Completion)
  └── Public Financial Disclosures (monthly PDF ledgers)

Phase 3: Member Portal & Governance System (Weeks 9-13)
  ├── RBAC Auth + 2FA (President, GS, Finance, Women's Wing)
  ├── Meeting Minutes (MoM) Builder & Quorum Calculator
  ├── Field-Encrypted Complaint Management & Privacy Triage
  └── Finance Ledger, Double-Signature Vouchers & Receipt Generator

Phase 4: Integrations & Resilience (Weeks 14-16)
  ├── WhatsApp / SMS Cloud Notification Worker
  ├── Automated Hash-Chained Audit Ledger verification
  └── Disaster Recovery restore drills & offline PWA emergency caching

Phase 5: Pen-Testing, Handover & Launch (Weeks 17-18)
  ├── External penetration test & vulnerability assessment
  ├── Dual Technical Custodian credential sealing
  └── Executive training & official public go-live
```

---

## 10. Go-Live Verification & Acceptance Checklist

### Security & Integrity
- [ ] EXIF metadata completely stripped from sample uploaded photos.
- [ ] Database field encryption verified: `SELECT description_encrypted FROM complaints;` returns unreadable ciphertext.
- [ ] Audit log hash-chaining tested: tampering with row $N$ invalidates checksum on row $N+1$.
- [ ] Turnstile CAPTCHA blocks automated bot submissions on `/complaints/submit`.
- [ ] Content Security Policy (CSP) evaluates with zero console violations.
- [ ] Database backups run automatically and restored successfully in a staging drill.

### SEO & Performance
- [ ] Canonical URL `https://www.toghamancomitee.com` strictly applied; 301 redirects operational from root and typo twin domains.
- [ ] All public page titles are **<= 55 characters**.
- [ ] All public meta descriptions are **<= 155 characters**.
- [ ] Google Rich Results test passes with 0 errors for NGO, Breadcrumb, and FAQ schemas.
- [ ] Mobile Google Lighthouse Performance score >= 90 on simulated 3G network.
- [ ] Urdu fonts load via woff2 subsetting with zero layout shift (CLS < 0.05).

---

## 11. Closing Engineering Principle

The code, architecture, and deployment of `www.toghamancomitee.com` are built to outlast individual personalities. By anchoring every feature to the Constitution through immutable audit logs, field-level encryption, zero-JS performance, and disciplined SEO, the technology honors the foundational motto:

> **"یہ کسی کی ذاتی جاگیر نہیں بلکہ قوم کی امانت ہے۔"**  
> *(Not anyone's personal property — a sacred trust of the people.)*
