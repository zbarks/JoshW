// Single source of truth for links and business details.
// Anything used in more than one place lives here.

// PRIMARY BOOKING LINK
// Paste the booking URL between the quotes. Every "Book a session" button on the
// site uses this. While it is empty, the buttons fall back to the app store link.
export const BOOKING_URL = 'https://app.teamfeepay.com/foot-forward-coaching/store/3579';

export const APP_STORE_URL = 'https://apps.apple.com/gb/app/foot-forward-coaching/id6443740570';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=app.activitypro.footforwardcoaching&hl=en_GB';

export const SITE = {
  name: 'Foot Forward Edinburgh',
  legalName: 'Foot Forward Coaching',
  url: 'https://www.footforwardedinburgh.com',
  coach: 'Josh Walker',
  email: 'footforwardcoaching@gmail.com',
  phoneDisplay: '07521 484647',
  phoneHref: 'tel:+447521484647',
  venue: "George Watson's College",
  pitch: 'Top Astro Pitch',
  street: 'Colinton Rd',
  locality: 'Edinburgh',
  postcode: 'EH10 5EG',
  logo: 'https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/9051e63e-e492-4263-8522-45cd791b967c/d98634da-d16b-4742-a66d-f153c34045c6__2_-removebg-preview.png?format=750w',
  // Add the real profile URLs here. Icons only show in the footer once a URL is set.
  social: {
    instagram: '',
    facebook: '',
  },
};

export type Platform = 'ios' | 'android' | 'desktop';

export const detectPlatform = (): Platform => {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';
  return 'desktop';
};

export const appUrlFor = (p: Platform) => (p === 'android' ? PLAY_STORE_URL : APP_STORE_URL);

export const bookingHref = (p: Platform) => BOOKING_URL || appUrlFor(p);
