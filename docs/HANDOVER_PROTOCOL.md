# Togh Aman Committee - Technical Handover & Custodianship Protocol
**Document Version:** 2.0.0  
**Target Domain:** `https://www.toghamancomitee.com`  
**Classification:** Confidential — Committee Leadership & Lead Technical Custodians  
**Constitutional Reference:** Chapter 6 (Governance) & Chapter 8 (Financial Integrity)  

---

## 1. Dual Technical Custodian Model

To prevent single-point-of-failure risks and protect the Committee from unilateral administrative tampering, no single officer or technician shall hold unilateral master access to production infrastructure.

### 1.1 Designated Custodian Roles
1. **Primary Custodian (Infrastructure & DNS):** Held by the General Secretary or nominated Senior Technical Lead.
2. **Secondary Custodian (Cryptographic Keys & Cloudflare Security):** Held by the Executive President (Malik Ihsanullah) or Constitutional Legal Advisor.

### 1.2 Multi-Signature Access Policy
- All Cloudflare domain DNS records, production environment variables, and database master credentials require **M-of-N split secrets (Shamir’s Secret Sharing or two distinct YubiKeys)**.
- Neither custodian alone can wipe server logs, purge the cryptographic hash ledger, or re-route canonical domain traffic.

---

## 2. Cloudflare Pages Deployment & Edge Routing

The production website is designed for zero-maintenance deployment on **Cloudflare Pages (Static Edge Network)**.

### 2.1 Build Configuration
- **Framework Preset:** Astro
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Node.js Version:** `20.x` or higher

### 2.2 Canonical Routing & 301 Rules (`public/_redirects`)
To preserve domain authority and neutralize typo-squatting:
```
# Naked root redirects to canonical subdomain
https://toghamancomitee.com/* https://www.toghamancomitee.com/:splat 301!

# Common misspelling redirected to canonical
https://toghamancommittee.com/* https://www.toghamancomitee.com/:splat 301!
https://www.toghamancommittee.com/* https://www.toghamancomitee.com/:splat 301!
```

### 2.3 Strict Edge Headers (`public/_headers`)
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none';
```

---

## 3. Cryptographic Storage & Backup Policy

### 3.1 Immutable Offsite Backups
* **Backup Schedule:** Automated nightly snapshot at 02:00 PKT.
* **Storage Location:** AWS S3 / Cloudflare R2 with **Object Lock (Compliance Mode)** enabled for 90 days.
* **Anti-Ransomware Guarantee:** Files written to Object Lock storage cannot be modified or deleted by any administrative account until the retention window expires.

### 3.2 Recovery Time Objective (RTO) & Recovery Point Objective (RPO)
* **RPO:** $\le 24$ hours (maximum data at risk in a total catastrophic failure).
* **RTO:** $\le 2$ hours (complete rebuild from cold storage using `git clone` + `npm run build`).

---

## 4. Emergency Incident Response & Police Liaison

In case of a cybersecurity breach, unauthorized defacement attempt, or illegal intimidation regarding confidential complaints:

1. **Immediate Freeze:** Primary Custodian activates Cloudflare "Under Attack Mode".
2. **Log Extraction:** Pull the latest SHA-256 hash sequence from the audit logger.
3. **Formal Notification:** Disclose breach report to the President, General Secretary, and District Police Officer (DPO) Kohat per Article 19 of the Constitution.
4. **Official Hotline Verification:** Maintain caller hotlines `+92 333 9768022` / `+92 333 9636226` / `+92 336 9498887` for public inquiry reassurance.
