import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { SITE } from '../config/site';
import { BookButton } from './BookLinks';

const Footer: React.FC = () => (
  <footer className="border-t border-white/10 bg-brandBlack px-5 pb-8 pt-16">
    <div className="container-page">
      <div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <img src={SITE.logo} alt="Foot Forward Edinburgh" width={140} height={56} loading="lazy" className="mb-6 h-14 w-auto" />
          <p className="mb-6 max-w-xs text-sm leading-relaxed text-neutral-400">
            Edinburgh's leading football academy. Professional standards for every player. Managed by Josh Walker.
          </p>
          <BookButton where="footer" className="btn-primary px-5 py-2.5" icon={false} />
          {(SITE.social.instagram || SITE.social.facebook) && (
            <div className="mt-6 flex gap-5">
              {SITE.social.instagram && (
                <a href={SITE.social.instagram} aria-label="Instagram" className="text-neutral-500 hover:text-white"><Instagram size={22} /></a>
              )}
              {SITE.social.facebook && (
                <a href={SITE.social.facebook} aria-label="Facebook" className="text-neutral-500 hover:text-white"><Facebook size={22} /></a>
              )}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-5 font-heading text-sm font-bold text-white">Direct links</h2>
          <ul className="space-y-3 text-sm">
            {[
              ['What We Do', '/what-we-do'],
              ['Academy', '/academy'],
              ['About Me', '/about'],
              ['Reviews', '/reviews'],
              ['Gallery', '/gallery'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <li key={to}><Link to={to} className="text-neutral-400 transition-colors hover:text-white">{label}</Link></li>
            ))}
          </ul>
        </div>

        <address className="not-italic">
          <h2 className="mb-5 font-heading text-sm font-bold text-white">Contact</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-brandRed" aria-hidden />
              <a href={`mailto:${SITE.email}`} className="break-all text-neutral-400 hover:text-white">{SITE.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-brandRed" aria-hidden />
              <a href={SITE.phoneHref} className="text-neutral-400 hover:text-white">{SITE.phoneDisplay}</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brandRed" aria-hidden />
              <span className="text-neutral-400">{SITE.venue}, {SITE.street}, {SITE.locality} {SITE.postcode}</span>
            </li>
          </ul>
        </address>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-neutral-500 md:flex-row">
        <p>© {new Date().getFullYear()} Foot Forward Coaching. Edinburgh football academy.</p>
        <a href="https://www.barkerdigital.co.uk/" target="_blank" rel="noopener" className="hover:text-white">
          Designed by Barker Digital
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
