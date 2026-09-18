import { useEffect, useState } from 'react';
import { appUrlFor, bookingHref, detectPlatform, type Platform } from '../config/site';

declare global {
  interface Window { fbq?: (...args: any[]) => void }
}

export const usePlatform = () => {
  const [platform, setPlatform] = useState<Platform>('desktop');
  useEffect(() => setPlatform(detectPlatform()), []);
  return {
    platform,
    appUrl: appUrlFor(platform),
    bookUrl: bookingHref(platform),
    storeName: platform === 'android' ? 'Google Play' : 'the App Store',
  };
};

// Fire-and-forget tracking. Links open in a new tab, so no redirect delay is needed.
export const trackBooking = (where: string) => window.fbq?.('trackCustom', 'BookSessionClick', { where });
export const trackApp = (where: string) => window.fbq?.('trackCustom', 'AppDownloadClick', { where });
