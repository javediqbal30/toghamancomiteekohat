/**
 * Togh Aman Committee - Official Verified Contact & Secretariat Data
 * Canonical Source of Truth for Addresses, Hotlines, and WhatsApp channels.
 */

export const SECRETARIAT_ADDRESS = {
  market: 'Haji Rafiullah Khan Marhoom Market',
  road: 'Main Pindi Road',
  landmark: 'Near National Bank of Pakistan (NBP)',
  city: 'Kohat, Khyber Pakhtunkhwa',
  full: 'Haji Rafiullah Khan Marhoom Market, Main Pindi Road, Kohat (Near National Bank of Pakistan)',
};

export interface ContactChannel {
  id: string;
  phone: string;
  raw: string; // for tel: and wa.me
  label: string;
  whatsappUrl: string;
  isPrimary?: boolean;
}

export const OFFICIAL_HOTLINES: ContactChannel[] = [
  {
    id: 'hotline-1',
    phone: '+92 333 9768022',
    raw: '923339768022',
    label: 'Secretariat General Desk',
    whatsappUrl: 'https://wa.me/923339768022?text=Peace%20be%20upon%20you,%20I%20am%20contacting%20the%20Togh%20Aman%20Committee.',
    isPrimary: true,
  },
  {
    id: 'hotline-2',
    phone: '+92 333 9636226',
    raw: '923339636226',
    label: 'Public Coordination & Grievance Desk',
    whatsappUrl: 'https://wa.me/923339636226?text=Peace%20be%20upon%20you,%20I%20am%20contacting%20the%20Togh%20Aman%20Committee.',
  },
  {
    id: 'hotline-3',
    phone: '+92 336 9498887',
    raw: '923369498887',
    label: 'Emergency & Community Help',
    whatsappUrl: 'https://wa.me/923369498887?text=Peace%20be%20upon%20you,%20I%20am%20contacting%20the%20Togh%20Aman%20Committee.',
  },
];

export const COMPLAINTS_INCHARGE = {
  name: 'Mr. Shafiq-ur-Rehman',
  title: 'In-Charge Complaints Cell',
  phone: '0333-8303485',
  raw: '923338303485',
  whatsappUrl: 'https://wa.me/923338303485?text=Peace%20be%20upon%20you%20Mr.%20Shafiq-ur-Rehman,%20I%20have%20a%20grievance%20for%20the%20Complaints%20Cell.',
  image: '/assets/leaders/Mr_Shafiq_ur_Rehman.webp',
  mandate: 'Direct contact for any complaints or issues, particularly concerning any member of the Aman Committee.',
};

export const FINANCE_SECRETARY = {
  name: 'Waheed-ur-Rehman',
  title: 'Finance Secretary',
  urduTitle: 'فنانس سیکریٹری',
  phone: '0334 8441095',
  raw: '923348441095',
  easypaisa: '0334 8441095',
  whatsappUrl: 'https://wa.me/923348441095?text=Peace%20be%20upon%20you%20Waheed-ur-Rehman%20Sahib,%20I%20am%20contacting%20regarding%20Togh%20Aman%20Committee%20finance.',
  image: '/assets/leaders/Waheed_ur_Rehman.webp',
  mandate: 'Custodian of official committee treasury, documented receipts, and Easypaisa collection account.',
};
