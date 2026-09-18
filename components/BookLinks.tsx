import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { ACADEMY_BOOKING_URL, BOOKING_URL } from '../config/site';

declare global {
  interface Window { fbq?: (...args: any[]) => void }
}

interface Props {
  where: string;
  className?: string;
  children?: React.ReactNode;
  icon?: boolean;
  // 'academy' sends people to the Academy membership booking page
  link?: 'main' | 'academy';
}

export const BookButton: React.FC<Props> = ({ where, className = 'btn-primary', children, icon = true, link = 'main' }) => (
  <a
    href={link === 'academy' ? ACADEMY_BOOKING_URL : BOOKING_URL}
    target="_blank"
    rel="noopener"
    onClick={() => window.fbq?.('trackCustom', 'BookSessionClick', { where, link })}
    className={className}
  >
    {icon && <CalendarCheck size={18} aria-hidden />}
    {children ?? 'Book a session'}
  </a>
);
