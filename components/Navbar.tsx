import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SITE } from '../config/site';
import { BookButton } from './BookLinks';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'What We Do', path: '/what-we-do' },
  { name: 'Academy', path: '/academy' },
  { name: 'About Me', path: '/about' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brandBlack/90 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-5" aria-label="Main">
        <Link to="/" className="shrink-0" aria-label="Foot Forward Edinburgh home">
          <img src={SITE.logo} alt="Foot Forward Edinburgh" width={120} height={48} className="h-11 w-auto object-contain" />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-brandRed' : 'text-neutral-400 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <BookButton where="nav" className="btn-primary px-5 py-2.5 text-xs sm:text-sm" icon={false}>
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book a session</span>
          </BookButton>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="-mr-2 p-2 text-white lg:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="absolute inset-x-0 top-[72px] border-b border-white/10 bg-brandBlack px-5 pb-8 pt-4 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `block border-b border-white/5 py-4 font-heading text-lg font-bold ${isActive ? 'text-brandRed' : 'text-white'}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <BookButton where="mobile-menu" className="btn-primary w-full py-4" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
