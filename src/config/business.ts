export interface WeeklyHourRow {
  day: string;
  openingTime: string;
  closingTime: string;
  note?: string;
}

export const BUSINESS_CONFIG = {
  name: 'IRON MAN FITNESS & GYM',
  shortName: 'IRON MAN',
  category: 'Unisex Fitness Center',
  tagline: 'Train Hard. Stay Strong. Live Better.',
  phoneDisplay: '+91 95009 95577',
  phoneRaw: '9500995577',
  phoneTel: 'tel:+919500995577',
  whatsappNumber: '919500995577',
  defaultWhatsAppMessage:
    "Hi IRON MAN FITNESS & GYM! I'm interested in joining your gym. Please share your membership plans and details.",
  address: {
    line1: 'No. 13-A, State Bank Complex, Upstairs of Vasanth & Co',
    line2: 'Nethaji Road, Manjakuppam',
    city: 'Cuddalore',
    state: 'Tamil Nadu',
    postalCode: '607001',
    full: 'No. 13-A, State Bank Complex, Upstairs of Vasanth & Co, Nethaji Road, Manjakuppam, Cuddalore, Tamil Nadu – 607001.',
  },
  googleRating: 4.8,
  googleReviewCount: 211,
  googleBusinessUrl:
    'https://www.google.com/maps/search/?api=1&query=IRON+MAN+FITNESS+%26+GYM+Manjakuppam+Cuddalore+607001',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=State+Bank+Complex,+Nethaji+Road,+Manjakuppam,+Cuddalore,+Tamil+Nadu+607001',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=IRON%20MAN%20FITNESS%20%26%20GYM%20Manjakuppam%20Cuddalore%20607001&t=&z=16&ie=UTF8&iwloc=&output=embed',
  confirmedClosingTime: '9:30 PM',
  weeklyHours: [
    { day: 'Monday', openingTime: 'Confirm opening time', closingTime: '9:30 PM' },
    { day: 'Tuesday', openingTime: 'Confirm opening time', closingTime: '9:30 PM' },
    { day: 'Wednesday', openingTime: 'Confirm opening time', closingTime: '9:30 PM' },
    { day: 'Thursday', openingTime: 'Confirm opening time', closingTime: '9:30 PM' },
    { day: 'Friday', openingTime: 'Confirm opening time', closingTime: '9:30 PM' },
    { day: 'Saturday', openingTime: 'Confirm opening time', closingTime: '9:30 PM' },
    { day: 'Sunday', openingTime: 'Confirm schedule', closingTime: 'Confirm schedule', note: 'Call to verify' },
  ] as WeeklyHourRow[],
} as const;

export function buildWhatsAppUrl(customMessage?: string): string {
  const message = customMessage?.trim() || BUSINESS_CONFIG.defaultWhatsAppMessage;
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
