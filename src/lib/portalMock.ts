/**
 * Togh Aman Committee - Member Portal Mock Data & Type Definitions
 * Represents the Chapter 6 (Governance), Chapter 8 (Finances), and Chapter 11 (Complaints) data models.
 * Frontend prototype layer with full TypeScript contracts.
 */

export type Role = 'president' | 'general_secretary' | 'finance_secretary' | 'womens_wing';

export interface UserPersona {
  id: string;
  name: string;
  title: string;
  role: Role;
  email: string;
  phone: string;
  avatarInitials: string;
  permissions: {
    canSignVouchersLevel1: boolean; // Finance Secretary
    canSignVouchersLevel2: boolean; // President or General Secretary
    canDraftMoM: boolean;           // General Secretary
    canRatifyResolution: boolean;   // President / Executive Quorum
    canViewEncryptedIntake: boolean; // Whistleblower triage committee
    canReferToPolice: boolean;      // President & Legal Liaison
  };
}

export const USER_PERSONAS: Record<Role, UserPersona> = {
  president: {
    id: 'usr-001',
    name: 'Malik Ihsanullah',
    title: 'President & Executive Head',
    role: 'president',
    email: 'president@toghamancomitee.com',
    phone: '+92 333 9768022',
    avatarInitials: 'MI',
    permissions: {
      canSignVouchersLevel1: false,
      canSignVouchersLevel2: true,
      canDraftMoM: true,
      canRatifyResolution: true,
      canViewEncryptedIntake: true,
      canReferToPolice: true,
    },
  },
  general_secretary: {
    id: 'usr-002',
    name: 'Engr. Tariq Khattak',
    title: 'General Secretary',
    role: 'general_secretary',
    email: 'secretary@toghamancomitee.com',
    phone: '+92 333 9123456',
    avatarInitials: 'TK',
    permissions: {
      canSignVouchersLevel1: false,
      canSignVouchersLevel2: true,
      canDraftMoM: true,
      canRatifyResolution: false,
      canViewEncryptedIntake: true,
      canReferToPolice: false,
    },
  },
  finance_secretary: {
    id: 'usr-003',
    name: 'Haji Noor Muhammad',
    title: 'Finance Secretary & Treasurer',
    role: 'finance_secretary',
    email: 'finance@toghamancomitee.com',
    phone: '+92 333 9876543',
    avatarInitials: 'NM',
    permissions: {
      canSignVouchersLevel1: true,
      canSignVouchersLevel2: false,
      canDraftMoM: false,
      canRatifyResolution: false,
      canViewEncryptedIntake: false,
      canReferToPolice: false,
    },
  },
  womens_wing: {
    id: 'usr-004',
    name: 'Bibi Maryam Khattak',
    title: 'Women’s Wing Coordinator',
    role: 'womens_wing',
    email: 'womenswing@toghamancomitee.com',
    phone: '+92 333 9554433',
    avatarInitials: 'BM',
    permissions: {
      canSignVouchersLevel1: false,
      canSignVouchersLevel2: false,
      canDraftMoM: false,
      canRatifyResolution: false,
      canViewEncryptedIntake: true, // Specifically for women's inheritance & domestic welfare grievances
      canReferToPolice: false,
    },
  },
};

export interface ComplaintRecord {
  id: string;
  trackingCode: string;
  submittedAt: string;
  location: string;
  category: 'water' | 'land' | 'narcotics' | 'inheritance' | 'civic';
  categoryLabel: string;
  privacyLevel: 1 | 2 | 3 | 4;
  privacyLabel: string;
  status: 'new' | 'investigating' | 'council_review' | 'referred_police' | 'resolved';
  statusLabel: string;
  isEncrypted: boolean;
  complainantName: string; // Redacted for Level 4
  phone: string;
  summary: string;
  assignedOfficer: string;
  notesCount: number;
}

export const MOCK_COMPLAINTS: ComplaintRecord[] = [
  {
    id: 'CMP-2026-001',
    trackingCode: 'TAC-WTR-8821',
    submittedAt: '2026-08-14 10:30',
    location: 'Togh Bala, Khwaja Khel Mohallah',
    category: 'water',
    categoryLabel: 'Irrigation & Drinking Water',
    privacyLevel: 1,
    privacyLabel: 'Level 1: Public Welfare',
    status: 'investigating',
    statusLabel: 'Investigating',
    isEncrypted: false,
    complainantName: 'Fazal Rehman (Farmer)',
    phone: '+92 334 5511223',
    summary: 'Concrete rubble deposited into the communal gravity-flow water course, reducing tail-end supply by 40%.',
    assignedOfficer: 'Engr. Tariq Khattak',
    notesCount: 3,
  },
  {
    id: 'CMP-2026-002',
    trackingCode: 'TAC-LND-9104',
    submittedAt: '2026-08-18 14:15',
    location: 'Togh Payan / Shamilat Border',
    category: 'land',
    categoryLabel: 'Communal Shamilat Land',
    privacyLevel: 2,
    privacyLabel: 'Level 2: Council Mediation',
    status: 'council_review',
    statusLabel: 'Council Review',
    isEncrypted: false,
    complainantName: 'Gulzar Khan & 4 Family Members',
    phone: '+92 331 4455667',
    summary: 'Disputed stone embankment encroaching 12 feet into common cattle grazing corridor.',
    assignedOfficer: 'Malik Ihsanullah',
    notesCount: 5,
  },
  {
    id: 'CMP-2026-003',
    trackingCode: 'TAC-NAR-7740',
    submittedAt: '2026-08-20 21:00',
    location: 'Kohat Pindi Road Bypass intersection',
    category: 'narcotics',
    categoryLabel: 'Anti-Narcotics Enforcement',
    privacyLevel: 3,
    privacyLabel: 'Level 3: Police Referral',
    status: 'referred_police',
    statusLabel: 'Referred to Kohat Police',
    isEncrypted: true,
    complainantName: '[PII Redacted - Law Enforcement Case #KP-902]',
    phone: '[Redacted]',
    summary: 'Suspected distribution node operating after dark near abandoned kiln. Official intimation dispatched to DPO Kohat.',
    assignedOfficer: 'Malik Ihsanullah & Legal Liaison',
    notesCount: 2,
  },
  {
    id: 'CMP-2026-004',
    trackingCode: 'TAC-WHT-3392',
    submittedAt: '2026-08-22 09:40',
    location: 'Togho Bala Main Bazar',
    category: 'civic',
    categoryLabel: 'Procurement Integrity',
    privacyLevel: 4,
    privacyLabel: 'Level 4: Anonymous Whistleblower (Encrypted)',
    status: 'new',
    statusLabel: 'New Intake',
    isEncrypted: true,
    complainantName: '[Whistleblower Identity Protected by Chapter 11]',
    phone: '[Cryptographically Stripped]',
    summary: 'Allegation of sub-standard gravel used in street drainage repair contractor batch #4. Requesting physical core testing.',
    assignedOfficer: 'Audit Committee',
    notesCount: 1,
  },
  {
    id: 'CMP-2026-005',
    trackingCode: 'TAC-INH-6619',
    submittedAt: '2026-08-23 16:20',
    location: 'Togho Payan, Mohallah Qasim Khel',
    category: 'inheritance',
    categoryLabel: 'Women’s Inheritance Welfare',
    privacyLevel: 2,
    privacyLabel: 'Level 2: Women’s Wing Mediation',
    status: 'investigating',
    statusLabel: 'Investigating',
    isEncrypted: false,
    complainantName: 'Confidential Female Petitioner (Rep: Bibi Maryam)',
    phone: '+92 333 9554433',
    summary: 'Request for traditional Jirga facilitation regarding peaceful distribution of registered agricultural parcel under Islamic Shariah.',
    assignedOfficer: 'Bibi Maryam Khattak',
    notesCount: 4,
  },
];

export interface CommitteeMemberSeat {
  id: string;
  name: string;
  village: 'Togh Bala' | 'Togh Payan';
  portfolio: string;
  isExecutive: boolean;
  isPresent: boolean;
}

export const COMMITTEE_ROSTER: CommitteeMemberSeat[] = [
  { id: 'mem-01', name: 'Malik Ihsanullah', village: 'Togh Bala', portfolio: 'President', isExecutive: true, isPresent: true },
  { id: 'mem-02', name: 'Engr. Tariq Khattak', village: 'Togh Payan', portfolio: 'General Secretary', isExecutive: true, isPresent: true },
  { id: 'mem-03', name: 'Haji Noor Muhammad', village: 'Togh Bala', portfolio: 'Finance Secretary', isExecutive: true, isPresent: true },
  { id: 'mem-04', name: 'Bibi Maryam Khattak', village: 'Togh Payan', portfolio: 'Women’s Wing Lead', isExecutive: true, isPresent: true },
  { id: 'mem-05', name: 'Malik Zafar Iqbal', village: 'Togh Bala', portfolio: 'Senior Vice President', isExecutive: true, isPresent: true },
  { id: 'mem-06', name: 'Dr. Aslam Khattak', village: 'Togh Payan', portfolio: 'Health & Sanitation Secretary', isExecutive: false, isPresent: true },
  { id: 'mem-07', name: 'Qari Abdul Rasheed', village: 'Togh Bala', portfolio: 'Religious & Ethics Liaison', isExecutive: false, isPresent: true },
  { id: 'mem-08', name: 'Subedar (R) Farooq Khan', village: 'Togh Payan', portfolio: 'Security & Peace Vigilance', isExecutive: true, isPresent: true },
  { id: 'mem-09', name: 'Muhammad Naeem Khattak', village: 'Togh Bala', portfolio: 'Youth & Sports Coordinator', isExecutive: false, isPresent: true },
  { id: 'mem-10', name: 'Advocate Shaukat Ali', village: 'Togh Bala', portfolio: 'Legal Advisor', isExecutive: true, isPresent: true },
  { id: 'mem-11', name: 'Haji Mir Baz Khan', village: 'Togh Payan', portfolio: 'Elder Council Member', isExecutive: false, isPresent: true },
  { id: 'mem-12', name: 'Kamran Khan', village: 'Togh Bala', portfolio: 'Education Welfare Liaison', isExecutive: false, isPresent: true },
  { id: 'mem-13', name: 'Sher Zaman', village: 'Togh Payan', portfolio: 'Farmer & Irrigation Rep', isExecutive: false, isPresent: true },
  { id: 'mem-14', name: 'Akhtar Munir', village: 'Togh Bala', portfolio: 'Bazar Traders Association Rep', isExecutive: false, isPresent: true },
  { id: 'mem-15', name: 'Sardar Ali', village: 'Togh Payan', portfolio: 'Dispute Mediation Member', isExecutive: false, isPresent: false },
  { id: 'mem-16', name: 'Haji Ghulam Habib', village: 'Togh Bala', portfolio: 'Elder Council Member', isExecutive: false, isPresent: false },
  { id: 'mem-17', name: 'Bibi Zainab Bibi', village: 'Togh Bala', portfolio: 'Women’s Welfare Council', isExecutive: false, isPresent: true },
  { id: 'mem-18', name: 'Arshad Mahmood', village: 'Togh Payan', portfolio: 'Overseas Affairs Rep', isExecutive: false, isPresent: false },
  { id: 'mem-19', name: 'Gulzar Ahmad', village: 'Togh Bala', portfolio: 'Social Forestry & Env Rep', isExecutive: false, isPresent: true },
  { id: 'mem-20', name: 'Habibullah Khan', village: 'Togh Payan', portfolio: 'Transport & Roads Liaison', isExecutive: false, isPresent: false },
  { id: 'mem-21', name: 'Javed Iqbal', village: 'Togh Bala', portfolio: 'Press & Media Liaison', isExecutive: false, isPresent: true },
];

export interface MeetingRecord {
  id: string;
  meetingNumber: number;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'scheduled' | 'adjourned' | 'minutes_signed';
  totalSeats: number;
  attendedSeats: number;
  quorumPercentage: number;
  quorumSatisfied: boolean;
  agendaItems: {
    number: number;
    title: string;
    mover: string;
    decision: string;
  }[];
  signOff: {
    recordedBy: string;
    approvedBy: string;
    signedAt: string;
  };
}

export const MOCK_MEETINGS: MeetingRecord[] = [
  {
    id: 'MTG-2026-14',
    meetingNumber: 14,
    title: '14th Regular Executive Council Session',
    date: '2026-08-25',
    time: '15:00 PKT',
    location: 'Togh Aman Secretariat, Haji Rafiullah Khan Marhoom Market, Main Pindi Road, Kohat',
    status: 'scheduled',
    totalSeats: 21,
    attendedSeats: 16,
    quorumPercentage: 76.2,
    quorumSatisfied: true, // 16/21 > 50%+1 (11 required)
    agendaItems: [
      {
        number: 1,
        title: 'Ratification of Solar Pumping Pipeline Phase 2 procurement quotation',
        mover: 'Engr. Tariq Khattak',
        decision: 'Scheduled for formal vote. Requires Rs. 450,000 community allocation.',
      },
      {
        number: 2,
        title: 'Review of Shamilat Land Boundary Dispute #CMP-2026-002 mediation report',
        mover: 'Malik Ihsanullah',
        decision: 'Jirga subcommittee to present joint demarcation signed by both families.',
      },
      {
        number: 3,
        title: 'Authorization of Anti-Drug Youth Sports Gala budget allocation',
        mover: 'Muhammad Naeem Khattak',
        decision: 'Rs. 35,000 provision approved under Resolution RES-04-2026.',
      },
      {
        number: 4,
        title: 'Women’s Wing proposal for handicraft vocational training camp in Togho Payan',
        mover: 'Bibi Maryam Khattak',
        decision: 'Community hall reservation granted for first week of September.',
      },
    ],
    signOff: {
      recordedBy: 'Engr. Tariq Khattak (General Secretary)',
      approvedBy: 'Malik Ihsanullah (President)',
      signedAt: 'Pending Final Ratification',
    },
  },
  {
    id: 'MTG-2026-13',
    meetingNumber: 13,
    title: '13th Monthly Executive Council Review & Quarterly Audit',
    date: '2026-07-28',
    time: '16:00 PKT',
    location: 'Togh Aman Central Secretariat',
    status: 'minutes_signed',
    totalSeats: 21,
    attendedSeats: 17,
    quorumPercentage: 80.9,
    quorumSatisfied: true,
    agendaItems: [
      {
        number: 1,
        title: 'Approval of June 2026 Financial Balance Sheet & Public Disclosure',
        mover: 'Haji Noor Muhammad',
        decision: 'Passed unanimously. Published to website under Chapter 8 transparency rules.',
      },
      {
        number: 2,
        title: 'Establishment of Youth Anti-Narcotics Volunteer Patrol Teams',
        mover: 'Subedar (R) Farooq Khan',
        decision: 'Coordinated patrol schedule submitted to DPO Kohat.',
      },
    ],
    signOff: {
      recordedBy: 'Engr. Tariq Khattak',
      approvedBy: 'Malik Ihsanullah',
      signedAt: '2026-07-28 18:45 PKT',
    },
  },
];

export interface VoucherRecord {
  id: string;
  voucherNumber: string;
  date: string;
  category: 'Dispensary & Health' | 'Water Infrastructure' | 'Youth & Sports' | 'Secretariat Office' | 'Legal & Peace';
  payee: string;
  amountPKR: number;
  description: string;
  budgetHead: string;
  status: 'draft' | 'awaiting_signature_2' | 'approved' | 'disbursed';
  statusLabel: string;
  signature1: {
    role: 'Finance Secretary';
    name: string;
    signed: boolean;
    timestamp?: string;
  };
  signature2: {
    role: 'President or General Secretary';
    name: string;
    signed: boolean;
    timestamp?: string;
  };
  chequeNumber: string;
  bankAccount: string;
}

export const MOCK_VOUCHERS: VoucherRecord[] = [
  {
    id: 'vch-081',
    voucherNumber: 'VOU-2026-081',
    date: '2026-08-10',
    category: 'Dispensary & Health',
    payee: 'Kohat Solar Power Solutions Ltd.',
    amountPKR: 85000,
    description: 'Procurement of 3.2kVA Hybrid Solar Inverter + tubular battery for Togho Bala Basic Health Facility.',
    budgetHead: 'Public Welfare Infrastructure (Fund #2)',
    status: 'disbursed',
    statusLabel: 'Fully Authorized & Disbursed',
    signature1: {
      role: 'Finance Secretary',
      name: 'Haji Noor Muhammad',
      signed: true,
      timestamp: '2026-08-10 11:20 PKT',
    },
    signature2: {
      role: 'President or General Secretary',
      name: 'Malik Ihsanullah (President)',
      signed: true,
      timestamp: '2026-08-10 14:05 PKT',
    },
    chequeNumber: 'CHQ-NBP-992014',
    bankAccount: 'National Bank of Pakistan, Kohat Main Branch (A/C: 0144-002948-1)',
  },
  {
    id: 'vch-082',
    voucherNumber: 'VOU-2026-082',
    date: '2026-08-19',
    category: 'Water Infrastructure',
    payee: 'Haji Farman & Brothers Hardware',
    amountPKR: 42500,
    description: '3-inch high-density polyethylene pipeline segments (120 meters) for Mohallah Khattakan gravity channel.',
    budgetHead: 'Irrigation & Drinking Water Supply',
    status: 'awaiting_signature_2',
    statusLabel: 'Awaiting 2nd Signature (President / GS)',
    signature1: {
      role: 'Finance Secretary',
      name: 'Haji Noor Muhammad',
      signed: true,
      timestamp: '2026-08-19 16:30 PKT',
    },
    signature2: {
      role: 'President or General Secretary',
      name: 'Pending Authorization',
      signed: false,
    },
    chequeNumber: 'CHQ-NBP-992015',
    bankAccount: 'National Bank of Pakistan, Kohat Main Branch',
  },
  {
    id: 'vch-083',
    voucherNumber: 'VOU-2026-083',
    date: '2026-08-22',
    category: 'Youth & Sports',
    payee: 'Khyber Sports Store, Kohat Cantt',
    amountPKR: 18000,
    description: 'Football tournament championship trophies, winner medals, and referee gear.',
    budgetHead: 'Youth Welfare & Narcotics Prevention',
    status: 'draft',
    statusLabel: 'Draft Voucher (Pending Finance Review)',
    signature1: {
      role: 'Finance Secretary',
      name: 'Pending Verification',
      signed: false,
    },
    signature2: {
      role: 'President or General Secretary',
      name: 'Pending Authorization',
      signed: false,
    },
    chequeNumber: 'Unassigned',
    bankAccount: 'National Bank of Pakistan, Kohat Main Branch',
  },
];

export interface AuditLogEntry {
  sequence: number;
  timestamp: string;
  userId: string;
  userName: string;
  role: string;
  action: string;
  targetId: string;
  ipAddress: string;
  sha256Hash: string;
  previousHash: string;
}

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    sequence: 1048,
    timestamp: '2026-08-25 09:14:02 PKT',
    userId: 'usr-001',
    userName: 'Malik Ihsanullah',
    role: 'President',
    action: 'VOUCHER_SIGNATURE_2_APPLIED',
    targetId: 'VOU-2026-081',
    ipAddress: '182.180.92.14 (Kohat Fiber)',
    sha256Hash: '9a7e3d1b8c2f4a5e6d7c8b9a0f1e2d3c4b5a697887e6d5c4b3a2f1e0d9c8b7a6',
    previousHash: 'f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3',
  },
  {
    sequence: 1047,
    timestamp: '2026-08-24 17:45:18 PKT',
    userId: 'usr-003',
    userName: 'Haji Noor Muhammad',
    role: 'Finance Secretary',
    action: 'VOUCHER_CREATED_LEVEL_1',
    targetId: 'VOU-2026-082',
    ipAddress: '182.180.92.18 (Kohat Fiber)',
    sha256Hash: 'f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3',
    previousHash: 'e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2',
  },
  {
    sequence: 1046,
    timestamp: '2026-08-23 11:22:45 PKT',
    userId: 'usr-002',
    userName: 'Engr. Tariq Khattak',
    role: 'General Secretary',
    action: 'MEETING_AGENDA_DRAFTED',
    targetId: 'MTG-2026-14',
    ipAddress: '39.40.112.55 (Jazz 4G LTE)',
    sha256Hash: 'e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2',
    previousHash: 'd2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1',
  },
  {
    sequence: 1045,
    timestamp: '2026-08-22 10:05:11 PKT',
    userId: 'system_crypto_worker',
    userName: 'Automated Encryption Worker',
    role: 'Security Engine',
    action: 'COMPLAINT_ENCRYPTED_AT_REST',
    targetId: 'CMP-2026-004',
    ipAddress: '127.0.0.1 (Local IPC)',
    sha256Hash: 'd2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1',
    previousHash: 'c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0',
  },
];
