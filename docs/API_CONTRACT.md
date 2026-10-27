# Togh Aman Committee - Backend API Contract & Specification
**Document Version:** 1.0.0  
**Status:** Canonical Interface Specification for Backend & Database Team  
**Framework Target:** Astro SSR / Node.js Express / PostgreSQL  
**Authentication Standard:** HTTP-Only Secure JWT + TOTP 2FA + SHA-256 Chained Auditing  

---

## 1. Authentication & Session Endpoints (`/api/auth/*`)

### 1.1 Step 1: Member Credentials Challenge
- **Endpoint:** `POST /api/auth/challenge`
- **Rate Limit:** 5 requests / 15 minutes per IP
- **Request Body:**
  ```json
  {
    "memberIdOrEmail": "president@toghamancomitee.com",
    "password": "ClearTextPasswordFromClientHTTPS"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "requires2FA": true,
    "challengeToken": "chal_eyJhbGciOi...",
    "dispatchedTo": "+92 333 ***6226",
    "expiresInSeconds": 300
  }
  ```

### 1.2 Step 2: 2FA TOTP Verification & Session Issuance
- **Endpoint:** `POST /api/auth/verify-2fa`
- **Request Body:**
  ```json
  {
    "challengeToken": "chal_eyJhbGciOi...",
    "totpCode": "123456"
  }
  ```
- **Response `200 OK`:**
  - Header: `Set-Cookie: __Host-tac_session=sess_eyJhbGci...; Secure; HttpOnly; SameSite=Strict; Path=/portal; Max-Age=28800`
  - Body:
    ```json
    {
      "user": {
        "id": "usr-001",
        "name": "Malik Ihsanullah",
        "role": "president",
        "permissions": ["SIGN_VOUCHERS_L2", "RATIFY_RESOLUTIONS", "VIEW_COMPLAINTS_L4", "DISPATCH_POLICE_REFERRAL"]
      }
    }
    ```

---

## 2. Governance & Meeting Endpoints (`/api/portal/meetings/*`)

### 2.1 Get Executive Council Meetings
- **Endpoint:** `GET /api/portal/meetings`
- **Auth Required:** Valid session (`president`, `general_secretary`, `finance_secretary`, `womens_wing`)
- **Response `200 OK`:** Array of meeting records matching `MeetingRecord` schema.

### 2.2 Record Minutes of Meeting (MoM)
- **Endpoint:** `POST /api/portal/meetings/{id}/mom`
- **Auth Required:** `general_secretary` (Author) or `president` (Countersign)
- **Request Body:**
  ```json
  {
    "meetingNumber": 14,
    "attendedMemberIds": ["mem-01", "mem-02", "mem-03", "..."],
    "quorumSatisfied": true,
    "agendaDecisions": [
      { "itemNumber": 1, "decision": "Passed unanimously with Rs. 450,000 allocation." }
    ]
  }
  ```

---

## 3. Confidential Complaints Management (`/api/portal/complaints/*`)

### 3.1 Fetch Complaints Queue with Privacy Masking
- **Endpoint:** `GET /api/portal/complaints`
- **Authorization Enforcement:**
  - If role is not authorized for Level 4, complainant PII must be encrypted or omitted from payload.
- **Response `200 OK`:**
  ```json
  [
    {
      "id": "CMP-2026-004",
      "trackingCode": "TAC-WHT-3392",
      "privacyLevel": 4,
      "isEncrypted": true,
      "summary": "Allegation of sub-standard gravel used in street drainage...",
      "complainant": null
    }
  ]
  ```

### 3.2 Update Complaint Workflow State
- **Endpoint:** `PATCH /api/portal/complaints/{id}/status`
- **Request Body:**
  ```json
  {
    "status": "referred_police",
    "policeIntimationNumber": "KP-902",
    "notes": "Forwarded to DPO Kohat with stripped PII per Chapter 11 guidelines."
  }
  ```

---

## 4. Finance & Dual-Signature Vouchers (`/api/portal/finance/*`)

### 4.1 Create Expense Voucher (Draft)
- **Endpoint:** `POST /api/portal/finance/vouchers`
- **Auth Required:** `finance_secretary`
- **Request Body:**
  ```json
  {
    "category": "Water Infrastructure",
    "amountPKR": 42500,
    "payee": "Haji Farman & Brothers Hardware",
    "description": "3-inch high-density polyethylene pipeline segments (120 meters)",
    "chequeNumber": "CHQ-NBP-992015"
  }
  ```

### 4.2 Apply Mandatory 2nd Signature (President or General Secretary)
- **Endpoint:** `POST /api/portal/finance/vouchers/{id}/countersign`
- **Auth Required:** `president` OR `general_secretary` (Rule: Cannot be the same user who applied Signature 1)
- **Response `200 OK`:**
  ```json
  {
    "voucherNumber": "VOU-2026-082",
    "status": "disbursed",
    "signature2": {
      "signerRole": "President",
      "signerName": "Malik Ihsanullah",
      "signedAt": "2026-08-25T14:10:00Z",
      "auditHash": "9a7e3d1b8c2f4a5e6d7c8b9a0f1e2d3c..."
    }
  }
  ```

---

## 5. Cryptographic Audit Chain (`/api/portal/audit/*`)

### 5.1 Verification Endpoint
- **Endpoint:** `GET /api/portal/audit/verify`
- **Response `200 OK`:**
  ```json
  {
    "status": "intact",
    "totalBlocks": 1048,
    "genesisHash": "0000000000000000000000000000000000000000000000000000000000000000",
    "headHash": "9a7e3d1b8c2f4a5e6d7c8b9a0f1e2d3c4b5a697887e6d5c4b3a2f1e0d9c8b7a6",
    "discrepancies": 0
  }
  ```
