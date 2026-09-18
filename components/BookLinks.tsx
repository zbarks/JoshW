import React from 'react';
import { CalendarCheck, Smartphone } from 'lucide-react';
import { usePlatform, trackApp, trackBooking } from './usePlatform';

interface Props { where: string; className?: string; children?: React.ReactNode; icon?: boolean }

export const BookButton: React.FC<Props> = ({ where, className = 'btn-primary', children, icon = true }) => {
  const { bookUrl } = usePlatform();
  return (
    <a href={bookUrl} target="_blank" rel="noopener" onClick={() => trackBooking(where)} className={className}>
      {icon && <CalendarCheck size={18} aria-hidden />}
      {children ?? 'Book a session'}
    </a>
  );
};

export const AppButton: React.FC<Props> = ({ where, className = 'btn-secondary', children, icon = true }) => {
  const { appUrl } = usePlatform();
  return (
    <a href={appUrl} target="_blank" rel="noopener" onClick={() => trackApp(where)} className={className}>
      {icon && <Smartphone size={18} aria-hidden />}
      {children ?? 'Get the app'}
    </a>
  );
};
